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
# Snapshot viewer — stream HTML + resources from GridFS
# ---------------------------------------------------------------------------

@app.route("/view/<site>/<date>/")
def view_snapshot(site, date):
    snap = storage.get_snapshot(site, date)
    if not snap:
        abort(404, description=f"No snapshot found for site='{site}' date='{date}'")
    html = storage.get_index_html(site, date)  # always use site slug (indexHtmlGridFsId was MongoDB-only)
    if not html:
        abort(404, description=f"index.html not found for site='{site}' date='{date}'")
    return Response(html, mimetype="text/html")


@app.route("/view/<site>/<date>/resources/<category>/<filename>")
def view_resource(site, date, category, filename):
    rel_path = f"resources/{category}/{filename}"
    data, content_type = storage.get_resource(site, date, rel_path)
    if data is None:
        abort(404, description=f"Resource not found: {rel_path}")
    return Response(data, mimetype=content_type)


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
