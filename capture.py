import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

from PIL import Image
from playwright.sync_api import sync_playwright

BASE_DIR = Path(__file__).parent
SITES_FILE = BASE_DIR / "sites.txt"
ARCHIVE_DIR = BASE_DIR / "archive"

IST = ZoneInfo("Asia/Kolkata")

# Today's date, used as the folder name (YYYY-MM-DD)
TODAY = datetime.now(IST).strftime("%Y-%m-%d")

def load_urls():
    with open(SITES_FILE, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]


def url_to_folder_name(url: str) -> str:
    # Turn a URL into a safe folder name, e.g. https://blog.yourcompany.com -> blog.yourcompany.com
    name = re.sub(r"^https?://", "", url)
    name = re.sub(r"[/:?&=]+", "_", name)
    return name


def scroll_to_bottom(page):
    # Scroll incrementally to trigger lazy loading and dynamically expand page height
    current_scroll = 0
    scroll_step = 1500
    while True:
        scroll_height = page.evaluate("document.documentElement.scrollHeight || document.body.scrollHeight")
        page.evaluate(f"window.scrollTo(0, {current_scroll})")
        current_scroll += scroll_step
        page.wait_for_timeout(200) # Wait a bit for lazy-loaded assets to fetch and render
        
        new_scroll_height = page.evaluate("document.documentElement.scrollHeight || document.body.scrollHeight")
        if current_scroll >= new_scroll_height:
            # Scroll to the absolute bottom just in case
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(500)
            break


def capture_and_stitch(page, total_width, total_height, output_path):
    segment_height = 8000
    temp_files = []
    
    # Store original viewport size
    orig_viewport = page.viewport_size
    
    # Create a temporary directory next to the output image
    temp_dir = Path(output_path).parent / "temp_segments"
    temp_dir.mkdir(exist_ok=True)
    
    # Change viewport size to match segment size
    page.set_viewport_size({"width": total_width, "height": segment_height})
    page.wait_for_timeout(500)
    
    try:
        # Convert fixed/sticky to absolute positioning to lock them to their starting offset
        page.evaluate("""() => {
            window._modifiedElements = [];
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.position === 'fixed' || style.position === 'sticky') {
                    window._modifiedElements.push({
                        el: el,
                        originalPosition: el.style.position
                    });
                    el.style.position = 'absolute';
                }
            });
        }""")
        
        y_offset = 0
        segment_idx = 0
        while y_offset < total_height:
            # Scroll to offset. Ensure we don't scroll past document bounds.
            scroll_target = min(y_offset, total_height - segment_height)
            if scroll_target < 0:
                scroll_target = 0
                
            page.evaluate(f"window.scrollTo(0, {scroll_target})")
            page.wait_for_timeout(300) # Settle animations / layout changes
            
            temp_path = temp_dir / f"segment_{segment_idx}.png"
            page.screenshot(path=str(temp_path), full_page=False)
            temp_files.append((scroll_target, temp_path))
            
            if y_offset + segment_height >= total_height:
                break
            y_offset += segment_height
            segment_idx += 1
            
        # Restore original positioning
        page.evaluate("""() => {
            if (window._modifiedElements) {
                window._modifiedElements.forEach(item => {
                    item.el.style.position = item.originalPosition;
                });
                delete window._modifiedElements;
            }
        }""")
        
        # Stitch
        print(f"  Stitching {len(temp_files)} segments...")
        stitched_image = Image.new("RGB", (total_width, total_height))
        for scroll_y, segment_path in temp_files:
            img = Image.open(segment_path)
            stitched_image.paste(img, (0, scroll_y))
            img.close()
            os.remove(segment_path)
            
        stitched_image.save(output_path)
    finally:
        # Clean up temp folder and remaining segment files
        for _, p_file in temp_files:
            try:
                if p_file.exists():
                    os.remove(p_file)
            except Exception:
                pass
        try:
            temp_dir.rmdir()
        except Exception:
            pass
            
        # Restore original viewport size
        if orig_viewport:
            page.set_viewport_size(orig_viewport)
            page.wait_for_timeout(300)


def capture_url(page, url: str):
    domain_folder = url_to_folder_name(url)
    out_dir = ARCHIVE_DIR / domain_folder / TODAY
    out_dir.mkdir(parents=True, exist_ok=True)

    print(f"Capturing: {url}")
    try:
        response = page.goto(url, wait_until="load", timeout=800000)

        # 1. Scroll to the bottom first to load lazy content and find final height
        scroll_to_bottom(page)
        
        # Get dimensions
        total_width = page.evaluate("window.innerWidth") or 1440
        total_height = page.evaluate("document.documentElement.scrollHeight || document.body.scrollHeight") or 900
        
        # Scroll back to the top
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(500)

        # Save screenshot
        screenshot_path = out_dir / "screenshot.png"
        if total_height <= 15000:
            page.screenshot(path=str(screenshot_path), full_page=True)
        else:
            capture_and_stitch(page, total_width, total_height, str(screenshot_path))

        # Save fully-rendered HTML (after JS has run)
        html = page.content()
        (out_dir / "page.html").write_text(html, encoding="utf-8")

        # Save a small metadata file (status code, timestamp, final URL after redirects)
        meta = {
            "url": url,
            "finalUrl": page.url,
            "statusCode": response.status if response else None,
            "capturedAt": datetime.now(IST).isoformat(),
        }
        (out_dir / "meta.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")

        print(f"  ✓ Saved to {out_dir}")
    except Exception as e:
        print(f"  ✗ Failed to capture {url}: {e}")
        # Log failures so you notice a site was down/unreachable that day
        (out_dir / "error.txt").write_text(
            f"{datetime.now(IST).isoformat()} - {e}", encoding="utf-8"
        )


def main():
    urls = load_urls()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        for url in urls:
            capture_url(page, url)

        browser.close()

    print(f"Done. All sites captured for {TODAY}")


if __name__ == "__main__":
    main()