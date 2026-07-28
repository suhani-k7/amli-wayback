import sys
import json
from pathlib import Path
from storage import LocalStorage


def restore(site: str, date: str, output_dir: str):
    storage = LocalStorage()
    snapshot = storage.get_snapshot(site, date)
    if not snapshot:
        print(f"No snapshot found for {site} on {date}")
        return

    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)

    # Restore index.html
    html_content = storage.get_index_html(site, date)
    if html_content:
        (out_path / "index.html").write_text(html_content, encoding="utf-8")

    # Restore resources referenced in the resource map
    restored_count = 0
    resource_map = snapshot.get("resourceMap", {})
    for original_url, rel_path in resource_map.items():
        data, _ = storage.get_resource(site, date, rel_path)
        if data is not None:
            local_file = out_path / rel_path
            local_file.parent.mkdir(parents=True, exist_ok=True)
            local_file.write_bytes(data)
            restored_count += 1

    print(f"✓ Restored {restored_count} resources + index.html to {out_path}/index.html")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python restore_snapshot.py <site> <date> <output_dir>")
        sys.exit(1)
    site, date, output_dir = sys.argv[1], sys.argv[2], sys.argv[3]
    restore(site, date, output_dir)