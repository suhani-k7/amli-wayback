import json
import base64
from pathlib import Path

BACKUP_DIR = Path("/Users/suhani/Desktop/amli/wayback-archive-backup")
ARCHIVE_DIR = Path(__file__).parent / "archive"
TRACKED_FILE = Path(__file__).parent / "tracked_sites.json"


def restore_mongo_dump():
    print("Reading website_archive.snapshots.json...")
    with open(BACKUP_DIR / "website_archive.snapshots.json", "r", encoding="utf-8") as f:
        snapshots = json.load(f)

    print("Reading website_archive.resources.files.json...")
    with open(BACKUP_DIR / "website_archive.resources.files.json", "r", encoding="utf-8") as f:
        files = json.load(f)

    # Build a lookup of file_id -> file metadata
    file_map = {}
    for file_doc in files:
        file_id = file_doc["_id"]["$oid"]
        file_map[file_id] = file_doc

    # Build a index_html map: (site, date) -> html_str/file_id
    index_html_files = {}
    resource_files = {}

    for file_id, file_doc in file_map.items():
        meta = file_doc.get("metadata", {})
        site = meta.get("site")
        date = meta.get("date")
        filename = file_doc.get("filename")

        if filename == "index.html" and site and date:
            index_html_files[file_id] = (site, date)
        elif site and date:
            resource_files[file_id] = (site, date, filename)

    print("Reading website_archive.resources.chunks.json...")
    # Load chunks into memory (chunks can be mapped by files_id)
    chunks_by_file = {}
    with open(BACKUP_DIR / "website_archive.resources.chunks.json", "r", encoding="utf-8") as f:
        chunks_data = json.load(f)

    for chunk in chunks_data:
        file_id = chunk["files_id"]["$oid"]
        n = chunk["n"]
        raw_data = chunk["data"]
        
        # Handle bson binary json format ($binary or string)
        if isinstance(raw_data, dict) and "$binary" in raw_data:
            b64_str = raw_data["$binary"]["base64"]
        elif isinstance(raw_data, str):
            b64_str = raw_data
        else:
            continue

        binary_bytes = base64.b64decode(b64_str)
        if file_id not in chunks_by_file:
            chunks_by_file[file_id] = []
        chunks_by_file[file_id].append((n, binary_bytes))

    # Assemble files on disk
    print("Writing files to archive...")
    restored_resources_count = 0
    for file_id, chunk_list in chunks_by_file.items():
        chunk_list.sort(key=lambda x: x[0])
        full_bytes = b"".join([data for _, data in chunk_list])

        if file_id in index_html_files:
            site, date = index_html_files[file_id]
            out_dir = ARCHIVE_DIR / site / date
            out_dir.mkdir(parents=True, exist_ok=True)
            (out_dir / "index.html").write_bytes(full_bytes)
            restored_resources_count += 1
        elif file_id in resource_files:
            site, date, filename = resource_files[file_id]
            out_file = ARCHIVE_DIR / site / date / filename
            out_file.parent.mkdir(parents=True, exist_ok=True)
            out_file.write_bytes(full_bytes)
            restored_resources_count += 1

    # Write metadata.json for each snapshot
    print("Writing metadata.json for snapshots...")
    for snap in snapshots:
        site = snap["site"]
        date = snap["date"]
        out_dir = ARCHIVE_DIR / site / date
        out_dir.mkdir(parents=True, exist_ok=True)

        meta_doc = {
            "site": site,
            "url": snap.get("url", ""),
            "date": date,
            "capturedAt": snap.get("capturedAt", {}).get("$date", ""),
            "statusCode": snap.get("statusCode", 200),
            "capturedResourcesCount": snap.get("capturedResourcesCount", 0),
            "failedResourcesCount": snap.get("failedResourcesCount", 0),
            "failedResources": snap.get("failedResources", {}),
            "resourceMap": snap.get("resourceMap", {}),
        }
        (out_dir / "metadata.json").write_text(json.dumps(meta_doc, indent=2), encoding="utf-8")

    # Restore tracked_sites.json
    if (BACKUP_DIR / "website_archive.tracked_sites.json").exists():
        with open(BACKUP_DIR / "website_archive.tracked_sites.json", "r", encoding="utf-8") as f:
            tracked_data = json.load(f)
            cleaned_tracked = []
            for item in tracked_data:
                cleaned_tracked.append({
                    "url": item.get("url", ""),
                    "site": item.get("site", ""),
                    "addedAt": item.get("addedAt", {}).get("$date", "")
                })
            TRACKED_FILE.write_text(json.dumps(cleaned_tracked, indent=2), encoding="utf-8")

    print(f"✓ Successfully restored MongoDB backup ({restored_resources_count} files/HTML pages & snapshots) into local archive!")


if __name__ == "__main__":
    restore_mongo_dump()
