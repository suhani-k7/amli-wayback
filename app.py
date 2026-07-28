"""
app.py — Flask web frontend for the amli-wayback local disk archive.

Routes
------
GET  /                                          → SPA shell (static/index.html)
GET  /api/sites?q=<query>                       → Autocomplete: all tracked + archived site URLs
POST /api/sites                                 → Add a URL to tracked_sites collection
GET  /api/snapshots/<site>                      → List of snapshot dates for a site
GET  /view/<site>/<date>/                       → Stream archived index.html
GET  /view/<site>/<date>/resources/<cat>/<fn>  → Stream a resource
"""

import re
import os
from flask import Flask, Response, abort, jsonify, request, send_from_directory

from storage import LocalStorage

app = Flask(__name__, static_folder="static", static_url_path="/static")
storage = LocalStorage()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def url_to_site_slug(url: str) -> str:
    """Mirror of full_capture.py's url_to_folder_name() to keep slugs consistent."""
    name = re.sub(r"^https?://", "", url)
    name = re.sub(r"[/:?&=]+", "_", name)
    if name.endswith("_"):
        name = name[:-1]
    return name


# ---------------------------------------------------------------------------
# SPA shell
# ---------------------------------------------------------------------------

@app.route("/")
def index():
    return send_from_directory("static", "index.html")


# ---------------------------------------------------------------------------
# API — sites
# ---------------------------------------------------------------------------

@app.route("/api/sites", methods=["GET"])
def api_get_sites():
    """Return all known sites (tracked + captured) optionally filtered by query."""
    q = request.args.get("q", "").strip().lower()
    sites = storage.get_sites_for_autocomplete()
    if q:
        sites = [s for s in sites if q in s["url"].lower() or q in s["site"].lower()]
    return jsonify(sites)


@app.route("/api/sites", methods=["POST"])
def api_add_site():
    """Add a URL to the tracked_sites collection."""
    data = request.get_json(silent=True) or {}
    url = (data.get("url") or "").strip()
    if not url:
        return jsonify({"error": "url is required"}), 400
    if not re.match(r"^https?://", url):
        return jsonify({"error": "url must start with http:// or https://"}), 400

    site = url_to_site_slug(url)
    storage.add_tracked_site(url, site)
    return jsonify({"url": url, "site": site}), 201


# ---------------------------------------------------------------------------
# API — snapshots
# ---------------------------------------------------------------------------

@app.route("/api/snapshots/<site>")
def api_get_snapshots(site):
    """Return a list of dates that have a stored snapshot for the given site slug."""
    dates = storage.get_snapshot_dates(site)
    return jsonify({"site": site, "dates": dates})


# ---------------------------------------------------------------------------
# Snapshot viewer — stream HTML + resources from local disk
# ---------------------------------------------------------------------------

@app.route("/view/<site>/<date>/")
def view_snapshot(site, date):
    snap = storage.get_snapshot(site, date)
    if not snap:
        # Try to see if site directory exists even if metadata is missing
        dates = storage.get_snapshot_dates(site)
        if not dates or date not in dates:
            abort(404, description=f"No snapshot found for site='{site}' date='{date}'")

    html = storage.get_index_html(site, date)
    if not html:
        abort(404, description=f"index.html not found for site='{site}' date='{date}'")

    # Rewrite absolute live domain URLs (e.g. https://neouat.axismaxlife.com/...) to root-relative paths
    # so that all resource requests go through local Flask app rather than bypassing to live server
    html = re.sub(r'https?://(?:neouat|www)\.axismaxlife\.com/', '/', html)

    # Inject <base href="/view/<site>/<date>/"> into <head> if not already present
    base_tag = f'<base href="/view/{site}/{date}/">'
    if "<head>" in html and "<base " not in html:
        html = html.replace("<head>", f"<head>\n  {base_tag}", 1)
    elif "<head " in html and "<base " not in html:
        html = re.sub(r"(<head[^>]*>)", r"\1\n  " + base_tag, html, count=1)

    return Response(html, mimetype="text/html")


@app.route("/view/<site>/<date>/screenshot")
def view_screenshot(site, date):
    data = storage.get_screenshot(site, date)
    if not data:
        abort(404, description=f"Screenshot not found for site='{site}' date='{date}'")
    return Response(data, mimetype="image/png")


@app.route("/view/<site>/<date>/resources/<category>/<filename>")
def view_resource(site, date, category, filename):
    rel_path = f"resources/{category}/{filename}"
    data, content_type = storage.get_resource(site, date, rel_path)
    if data is None:
        # Fallback to search in all resource subdirectories and dates
        data, content_type = storage.find_resource(site, date, filename)
    if data is None:
        abort(404, description=f"Resource not found: {rel_path}")
    return Response(data, mimetype=content_type)


# ---------------------------------------------------------------------------
# Catch-all asset resolver — handles root paths (e.g. /corp-static/..., /_next/...)
# requested by nested elements or CSS using Referer header or global search
# ---------------------------------------------------------------------------

@app.route("/<path:path>")
def catchall_asset_resolver(path):
    # Ignore API routes and static frontend files
    if path.startswith("api/") or path.startswith("static/"):
        abort(404)

    site, date = "", ""
    referer = request.headers.get("Referer", "")
    match = re.search(r"/view/([^/]+)/([^/]+)/", referer)
    if match:
        site, date = match.group(1), match.group(2)

    # Search snapshot resources for this asset path or filename across current & historical archives
    data, content_type = storage.find_resource(site, date, path)
    if data is not None:
        return Response(data, mimetype=content_type)

    # Clean fallbacks for missing assets
    if path.endswith(".css"):
        # Attempt fallback to ANY css file in the site archive so the layout doesn't break
        data, content_type = storage.find_resource(site, date, ".css")
        if data is not None:
            return Response(data, mimetype="text/css")
        return Response("/* fallback style */", mimetype="text/css")
    elif path.endswith(".js"):
        return Response("/* fallback script */", mimetype="application/javascript")
    elif any(path.endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".svg", ".webp", ".gif", ".ico"]):
        # Attempt fallback to SVG / image
        data, content_type = storage.find_resource(site, date, ".svg")
        if data is not None:
            return Response(data, mimetype=content_type)
        return Response('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"/>', mimetype="image/svg+xml")

    abort(404, description=f"Asset not found: {path}")


# ---------------------------------------------------------------------------
# 404 JSON handler for API routes
# ---------------------------------------------------------------------------

@app.errorhandler(404)
def not_found(e):
    if request.path.startswith("/api/"):
        return jsonify({"error": str(e)}), 404
    return e


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)

