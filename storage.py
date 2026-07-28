import os
import json
import mimetypes
from pathlib import Path
from datetime import datetime, timezone

BASE_DIR = Path(__file__).parent
ARCHIVE_DIR = BASE_DIR / "archive"
TRACKED_SITES_FILE = BASE_DIR / "tracked_sites.json"


def is_504_error(html_str: str) -> bool:
    if not html_str:
        return True
    lower = html_str.lower()
    if "504 error" in lower or "cloudfront attempted to establish" in lower or "service temporarily unavailable" in lower:
        return True
    return False


class LocalStorage:
    def __init__(self):
        ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)
        if not TRACKED_SITES_FILE.exists():
            TRACKED_SITES_FILE.write_text("[]", encoding="utf-8")

    def _get_snapshot_dir(self, site: str, date: str) -> Path:
        return ARCHIVE_DIR / site / date

    def save_resource(self, site: str, date: str, rel_path: str, data: bytes, content_type: str, original_url: str, category: str):
        """Save one resource file (CSS/JS/image/font/etc.) to local disk archive."""
        file_path = self._get_snapshot_dir(site, date) / rel_path
        file_path.parent.mkdir(parents=True, exist_ok=True)
        file_path.write_bytes(data)
        return rel_path

    def save_index_html(self, site: str, date: str, html: str):
        """Save the rewritten index.html to local disk archive."""
        snap_dir = self._get_snapshot_dir(site, date)
        snap_dir.mkdir(parents=True, exist_ok=True)
        index_file = snap_dir / "index.html"
        index_file.write_text(html, encoding="utf-8")
        return str(index_file)

    def save_snapshot_metadata(self, site: str, date: str, url: str, status_code: int, resource_map: dict,
                                failed_resources: list, captured_count: int, failed_count: int, index_html_id: str):
        """Save the snapshot's metadata document to metadata.json in the snapshot folder."""
        snap_dir = self._get_snapshot_dir(site, date)
        snap_dir.mkdir(parents=True, exist_ok=True)
        doc = {
            "site": site,
            "url": url,
            "date": date,
            "capturedAt": datetime.now(timezone.utc).isoformat(),
            "statusCode": status_code,
            "capturedResourcesCount": captured_count,
            "failedResourcesCount": failed_count,
            "failedResources": failed_resources,
            "resourceMap": resource_map,
            "indexHtmlGridFsId": index_html_id,
        }
        meta_file = snap_dir / "metadata.json"
        meta_file.write_text(json.dumps(doc, indent=2), encoding="utf-8")

    def get_snapshot(self, site: str, date: str):
        """Load snapshot metadata dictionary from local disk."""
        snap_dir = self._get_snapshot_dir(site, date)
        meta_file = snap_dir / "metadata.json"
        if not meta_file.exists():
            meta_file = snap_dir / "meta.json"
        if not meta_file.exists():
            return None
        try:
            return json.loads(meta_file.read_text(encoding="utf-8"))
        except Exception:
            return None

    def get_index_html(self, index_html_id_or_site=None, date=None):
        """Read index.html from disk for snapshot, with fallback to page.html and fallback to nearest valid snapshot."""
        if date is not None and index_html_id_or_site is not None:
            snap_dir = self._get_snapshot_dir(index_html_id_or_site, date)
            # 1. Try index.html first, then page.html for requested date
            for candidate in ["index.html", "page.html"]:
                f = snap_dir / candidate
                if f.exists():
                    txt = f.read_text(encoding="utf-8", errors="ignore")
                    if not is_504_error(txt):
                        return txt

            # 2. Fallback to nearest valid snapshot date for this site if requested date has 504 error
            site_dir = ARCHIVE_DIR / index_html_id_or_site
            if site_dir.exists():
                for d in sorted(site_dir.iterdir(), reverse=True):
                    if d.is_dir() and d.name != date:
                        for candidate in ["index.html", "page.html"]:
                            f = d / candidate
                            if f.exists():
                                txt = f.read_text(encoding="utf-8", errors="ignore")
                                if not is_504_error(txt):
                                    return txt
            return None
        elif index_html_id_or_site and os.path.exists(index_html_id_or_site):
            txt = Path(index_html_id_or_site).read_text(encoding="utf-8", errors="ignore")
            if not is_504_error(txt):
                return txt
        return None

    def get_resource(self, site: str, date: str, rel_path: str):
        """Read resource content and infer mimetype from disk."""
        file_path = self._get_snapshot_dir(site, date) / rel_path
        if not file_path.exists():
            return None, None
        content_type, _ = mimetypes.guess_type(file_path)
        if not content_type:
            if rel_path.endswith(".js"):
                content_type = "application/javascript"
            elif rel_path.endswith(".css"):
                content_type = "text/css"
            else:
                content_type = "application/octet-stream"
        return file_path.read_bytes(), content_type

    def get_screenshot(self, site: str, date: str):
        """Read screenshot.png for a snapshot if present."""
        snap_dir = self._get_snapshot_dir(site, date)
        screenshot_file = snap_dir / "screenshot.png"
        if screenshot_file.exists():
            return screenshot_file.read_bytes()
        return None

    def find_resource(self, site: str, date: str, path_or_filename: str):
        """Find a resource by exact relative path, filename, stem prefix, cross-date search, or cross-site search."""
        clean_path = path_or_filename.lstrip("/")
        fname = Path(clean_path).name
        stem = Path(fname).stem
        ext = Path(fname).suffix

        # Order of snapshot directories to search:
        # 1. Target date snapshot dir
        # 2. Other snapshot dates of the same site (e.g. July 27, 21, 20, 19, 18, 17)
        # 3. Snapshot dirs of all other sites in archive
        dirs_to_search = []
        site_dir = ARCHIVE_DIR / site
        if site_dir.exists():
            target_snap = site_dir / date
            if target_snap.exists():
                dirs_to_search.append(target_snap)
            for d in sorted(site_dir.iterdir(), reverse=True):
                if d.is_dir() and d != target_snap:
                    dirs_to_search.append(d)

        if ARCHIVE_DIR.exists():
            for other_site in ARCHIVE_DIR.iterdir():
                if other_site.is_dir() and other_site != site_dir:
                    for d in sorted(other_site.iterdir(), reverse=True):
                        if d.is_dir():
                            dirs_to_search.append(d)

        # Phase 1: Search for exact filename match or direct path match
        for snap_d in dirs_to_search:
            res_dir = snap_d / "resources"
            if not res_dir.exists():
                continue

            candidate = res_dir / clean_path
            if candidate.exists() and candidate.is_file():
                content_type, _ = mimetypes.guess_type(candidate)
                return candidate.read_bytes(), content_type or "application/octet-stream"

            if fname:
                for f in res_dir.rglob("*"):
                    if f.is_file() and f.name == fname:
                        content_type, _ = mimetypes.guess_type(f)
                        return f.read_bytes(), content_type or "application/octet-stream"

        # Phase 2: Search for stem match (handles hashed filenames like 3dd13b90f2875e86_635edbf937c23a98.css)
        if fname and len(stem) >= 3:
            for snap_d in dirs_to_search:
                res_dir = snap_d / "resources"
                if not res_dir.exists():
                    continue
                for f in res_dir.rglob("*"):
                    if f.is_file() and f.name.startswith(stem):
                        if not ext or f.name.endswith(ext):
                            content_type, _ = mimetypes.guess_type(f)
                            return f.read_bytes(), content_type or "application/octet-stream"

        return None, None

    @staticmethod
    def _has_html(date_dir: Path) -> bool:
        """Return True if the snapshot directory has a renderable HTML file."""
        return (date_dir / "index.html").exists() or (date_dir / "page.html").exists()

    def list_snapshots(self):
        """Return dict of {site: list_of_snapshots} by scanning archive folder."""
        grouped = {}
        if not ARCHIVE_DIR.exists():
            return grouped

        for site_dir in sorted(ARCHIVE_DIR.iterdir()):
            if not site_dir.is_dir():
                continue
            site_name = site_dir.name
            snaps = []
            for date_dir in sorted(site_dir.iterdir(), reverse=True):
                if not date_dir.is_dir():
                    continue
                if not self._has_html(date_dir):
                    continue  # skip broken/incomplete exports
                date_str = date_dir.name
                meta = self.get_snapshot(site_name, date_str)
                url = meta.get("url", site_name) if meta else site_name
                res_dir = date_dir / "resources"
                res_count = len(list(res_dir.rglob("*"))) if res_dir.exists() else 0
                has_screenshot = (date_dir / "screenshot.png").exists()
                has_index_html = (date_dir / "index.html").exists()
                snaps.append({
                    "site": site_name,
                    "date": date_str,
                    "url": url,
                    "capturedAt": meta.get("capturedAt") if meta else "",
                    "hasResources": res_count > 5,  # full capture has dozens/hundreds of resources
                    "resourceCount": res_count,
                    "hasScreenshot": has_screenshot,
                    "hasIndexHtml": has_index_html,
                })
            if snaps:
                grouped[site_name] = snaps
        return grouped

    def add_tracked_site(self, url: str, site: str) -> None:
        """Upsert a URL into tracked_sites.json."""
        tracked = self._read_tracked_sites()
        for item in tracked:
            if item.get("url") == url:
                item["site"] = site
                item["addedAt"] = datetime.now(timezone.utc).isoformat()
                self._write_tracked_sites(tracked)
                return
        tracked.append({"url": url, "site": site, "addedAt": datetime.now(timezone.utc).isoformat()})
        self._write_tracked_sites(tracked)

    def list_tracked_urls(self) -> list[str]:
        """Return all tracked URLs."""
        return [doc["url"] for doc in self._read_tracked_sites() if "url" in doc]

    def get_sites_for_autocomplete(self) -> list[dict]:
        """Return deduplicated list of {url, site} dicts from tracked_sites and archive dir."""
        seen_sites = {}

        for doc in self._read_tracked_sites():
            if "site" in doc and "url" in doc:
                seen_sites[doc["site"]] = {"url": doc["url"], "site": doc["site"]}

        if ARCHIVE_DIR.exists():
            for site_dir in ARCHIVE_DIR.iterdir():
                if site_dir.is_dir() and site_dir.name not in seen_sites:
                    # check for metadata URL in first snapshot found
                    meta_url = site_dir.name
                    for date_dir in site_dir.iterdir():
                        if date_dir.is_dir():
                            meta = self.get_snapshot(site_dir.name, date_dir.name)
                            if meta and "url" in meta:
                                meta_url = meta["url"]
                                break
                    seen_sites[site_dir.name] = {"url": meta_url, "site": site_dir.name}

        return sorted(seen_sites.values(), key=lambda d: d["url"])

    def get_snapshot_dates(self, site: str) -> list[str]:
        """Return sorted list of snapshot dates for a given site slug (only those with HTML)."""
        site_dir = ARCHIVE_DIR / site
        if not site_dir.exists():
            return []
        dates = [d.name for d in site_dir.iterdir() if d.is_dir() and self._has_html(d)]
        return sorted(dates)

    def _read_tracked_sites(self) -> list[dict]:
        if not TRACKED_SITES_FILE.exists():
            return []
        try:
            return json.loads(TRACKED_SITES_FILE.read_text(encoding="utf-8"))
        except Exception:
            return []

    def _write_tracked_sites(self, data: list[dict]) -> None:
        TRACKED_SITES_FILE.write_text(json.dumps(data, indent=2), encoding="utf-8")