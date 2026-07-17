import sys
from pathlib import Path
from storage import MongoStorage


def restore(site: str, date: str, output_dir: str):
    storage = MongoStorage()
    snapshot = storage.snapshots.find_one({"site": site, "date": date})
    if not snapshot:
        print(f"No snapshot found for {site} on {date}")
        return

    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)

    # Restore index.html
    index_bytes = storage.bucket.open_download_stream(snapshot["indexHtmlGridFsId"]).read()
    (out_path / "index.html").write_bytes(index_bytes)

    # Restore every resource referenced in the resource map
    restored_count = 0
    for original_url, rel_path in snapshot["resourceMap"].items():
        cursor = storage.bucket.find({"filename": rel_path, "metadata.site": site, "metadata.date": date})
        for grid_file in cursor:
            local_file = out_path / rel_path
            local_file.parent.mkdir(parents=True, exist_ok=True)
            local_file.write_bytes(grid_file.read())
            restored_count += 1
            break  # only need the first match per rel_path

    print(f"✓ Restored {restored_count} resources + index.html to {out_path}/index.html")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python restore_snapshot.py <site> <date> <output_dir>")
        sys.exit(1)
    site, date, output_dir = sys.argv[1], sys.argv[2], sys.argv[3]
    restore(site, date, output_dir)