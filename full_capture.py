"""
full_capture.py

A tool for Wayback Machine-style static website resource archiving and offline viewing.
This script crawls a list of URLs from sites.txt, intercepts and saves all CSS, JS,
images, and fonts to a local directory hierarchy, and rewrites the DOM and CSS files
to link to local copies.

================================================================================
KNOWN ARCHIVING LIMITATIONS (As required by Requirement 10):
1. CLIENT-SIDE API CALLS: Any content or data fetched dynamically via client-side JavaScript
   (e.g., fetch, XMLHttpRequest) after the initial page load or during dynamic user interactions
   (like modern Single Page Applications (SPAs) built with React, Vue, or Angular fetching
   product details, user profiles, or pricing dynamically) cannot be statically archived.
2. CLIENT-SIDE ROUTING: Client-side routed pages beyond the initial visited route (i.e. routes
   managed purely by the SPA router in the browser like React Router, without triggering server-side
   document loads) cannot be fully reconstructed for offline use without crawling every client route separately.
3. WEBSOCKETS / STREAMING: Live connections, web sockets, server-sent events, or video/audio
   streaming resources are not captured and cannot function offline.
4. EXCLUDE DYNAMIC INTERACTION STATE: Form submissions, search operations, and database-driven
   interactive widgets will fail when viewed offline.
================================================================================
"""

import os
import re
import json
import hashlib
import mimetypes
from pathlib import Path
from datetime import datetime, timezone
from urllib.parse import urlparse, urljoin
from playwright.sync_api import sync_playwright
from storage import MongoStorage

BASE_DIR = Path(__file__).parent
SITES_FILE = BASE_DIR / "sites.txt"
FULL_ARCHIVE_DIR = BASE_DIR / "full-archive"
TODAY = datetime.now(timezone.utc).strftime("%Y-%m-%d")
storage = MongoStorage()



def load_urls():
    if not SITES_FILE.exists():
        print(f"Error: {SITES_FILE} not found.")
        return []
    with open(SITES_FILE, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]


def url_to_folder_name(url: str) -> str:
    # Turn a URL into a safe folder name, e.g. https://blog.yourcompany.com -> blog.yourcompany.com
    name = re.sub(r"^https?://", "", url)
    name = re.sub(r"[/:?&=]+", "_", name)
    if name.endswith("_"):
        name = name[:-1]
    return name


def strip_url_params(url):
    parsed = urlparse(url)
    return parsed._replace(query="", fragment="").geturl()


def scroll_to_bottom(page):
    current_scroll = 0
    scroll_step = 1500
    while True:
        scroll_height = page.evaluate("document.documentElement.scrollHeight || document.body.scrollHeight")
        page.evaluate(f"window.scrollTo(0, {current_scroll})")
        current_scroll += scroll_step
        page.wait_for_timeout(200)
        
        new_scroll_height = page.evaluate("document.documentElement.scrollHeight || document.body.scrollHeight")
        if current_scroll >= new_scroll_height:
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(500)
            break


def rewrite_css_urls(css_content, css_original_url, css_local_folder, resource_map):
    pattern = re.compile(r'url\s*\(\s*["\']?([^"\'\)]+)["\']?\s*\)', re.IGNORECASE)
    
    def replace_url(match):
        orig_ref = match.group(1).strip()
        if orig_ref.startswith(("data:", "about:", "javascript:")):
            return match.group(0)
            
        abs_url = urljoin(css_original_url, orig_ref)
        abs_url_stripped = strip_url_params(abs_url)
        
        target_local_path = None
        if abs_url in resource_map:
            target_local_path = resource_map[abs_url]
        elif abs_url_stripped in resource_map:
            target_local_path = resource_map[abs_url_stripped]
            
        if target_local_path:
            rel_path = os.path.relpath(target_local_path, start=css_local_folder)
            return f"url('{rel_path}')"
        return match.group(0)
        
    return pattern.sub(replace_url, css_content)


def rewrite_html_content(html_content, base_url, resource_map, page_out_dir):
    # Strip base tags from HTML to prevent base href overriding relative paths
    html_content = re.sub(r'<base\b[^>]*>', '<!-- Removed base tag for offline viewing -->', html_content, flags=re.IGNORECASE)
    
    # Rewrite src, href, data, srcset attributes
    pattern = re.compile(r'\b(href|src|data|srcset)=["\']([^"\']*)["\']', re.IGNORECASE)
    
    def replace_attr(match):
        attr = match.group(1)
        val = match.group(2).strip()
        if not val or val.startswith(("data:", "about:", "javascript:", "#")):
            return match.group(0)
            
        if attr.lower() == 'srcset':
            parts = []
            for part in val.split(','):
                part = part.strip()
                if not part:
                    continue
                subparts = part.split()
                if subparts:
                    img_url = subparts[0]
                    abs_url = urljoin(base_url, img_url)
                    abs_url_stripped = strip_url_params(abs_url)
                    
                    target_local_path = None
                    if abs_url in resource_map:
                        target_local_path = resource_map[abs_url]
                    elif abs_url_stripped in resource_map:
                        target_local_path = resource_map[abs_url_stripped]
                        
                    if target_local_path:
                        rel_path = os.path.relpath(target_local_path, start=page_out_dir)
                        subparts[0] = rel_path
                    parts.append(" ".join(subparts))
            return f'{attr}="{", ".join(parts)}"'
        else:
            abs_url = urljoin(base_url, val)
            abs_url_stripped = strip_url_params(abs_url)
            
            target_local_path = None
            if abs_url in resource_map:
                target_local_path = resource_map[abs_url]
            elif abs_url_stripped in resource_map:
                target_local_path = resource_map[abs_url_stripped]
                
            if target_local_path:
                rel_path = os.path.relpath(target_local_path, start=page_out_dir)
                return f'{attr}="{rel_path}"'
            return match.group(0)

    html_content = pattern.sub(replace_attr, html_content)
    
    # Rewrite inline style URL blocks
    css_pattern = re.compile(r'url\s*\(\s*["\']?([^"\'\)]+)["\']?\s*\)', re.IGNORECASE)
    def replace_css_url(match):
        orig_ref = match.group(1).strip()
        if orig_ref.startswith(("data:", "about:", "javascript:")):
            return match.group(0)
            
        abs_url = urljoin(base_url, orig_ref)
        abs_url_stripped = strip_url_params(abs_url)
        
        target_local_path = None
        if abs_url in resource_map:
            target_local_path = resource_map[abs_url]
        elif abs_url_stripped in resource_map:
            target_local_path = resource_map[abs_url_stripped]
            
        if target_local_path:
            rel_path = os.path.relpath(target_local_path, start=page_out_dir)
            return f"url('{rel_path}')"
        return match.group(0)
        
    html_content = css_pattern.sub(replace_css_url, html_content)
    return html_content


def capture_url(page, url: str):
    sanitized_domain = url_to_folder_name(url)
    page_out_dir = f"{sanitized_domain}/{TODAY}"
    
    captured_resources = {}
    failed_resources = {}
    
    print(f"\n========================================\nArchiving: {url}\nSaving to: {page_out_dir}")
    
    # Response handler closure
    def handle_response(response):
        res_url = response.url
        if not res_url.startswith(("http://", "https://")):
            return
            
        try:
            # Skip main document itself
            if response.request.resource_type == "document" and res_url == url:
                return
                
            if res_url in captured_resources:
                return
                
            status = response.status
            if not (200 <= status < 300):
                if res_url not in captured_resources:
                    failed_resources[res_url] = f"HTTP {status}"
                return
                
            content_type = response.headers.get("content-type", "").lower()
            if "text/html" in content_type:
                # We skip separate HTML files to avoid crawling the whole site recursively
                return
                
            category = "other"
            if "text/css" in content_type:
                category = "css"
            elif any(js_t in content_type for js_t in ["javascript", "x-javascript", "application/javascript"]):
                category = "js"
            elif "image/" in content_type:
                category = "img"
            elif any(font_t in content_type for font_t in ["font", "woff", "otf", "ttf"]):
                category = "fonts"
                
            try:
                body = response.body()
            except Exception as body_err:
                if res_url not in captured_resources:
                    failed_resources[res_url] = f"Body read error: {body_err}"
                return
                
            if not body:
                if res_url not in captured_resources:
                    failed_resources[res_url] = "Empty response body"
                return
                
            # Derive unique, safe filename
            url_hash = hashlib.sha256(res_url.encode("utf-8")).hexdigest()[:16]
            parsed_res = urlparse(res_url)
            base_name = os.path.basename(parsed_res.path)
            orig_name, ext = os.path.splitext(base_name)
            
            ext = re.sub(r'[?#].*$', '', ext)
            if not re.match(r'^\.[a-zA-Z0-9]+$', ext):
                ext = ""
                
            orig_name = re.sub(r'[^a-zA-Z0-9_-]', '_', orig_name)
            if not orig_name:
                orig_name = "resource"
                
            if not ext:
                mime = content_type.split(";")[0].strip()
                guessed_ext = mimetypes.guess_extension(mime)
                if guessed_ext:
                    ext = guessed_ext
                else:
                    ext_map = {"css": ".css", "js": ".js", "img": ".png", "fonts": ".woff", "other": ".dat"}
                    ext = ext_map.get(category, ".dat")
                    
            unique_filename = f"{orig_name}_{url_hash}{ext}"
            rel_path = f"resources/{category}/{unique_filename}"

            captured_resources[res_url] = {
                "data": body,
                "rel_path": rel_path,
                "category": category,
                "content_type": content_type,
            }
            failed_resources.pop(res_url, None)
            
        except Exception as e:
            if res_url not in captured_resources:
                failed_resources[res_url] = f"Interception handler error: {e}"

    # Register response listener
    page.on("response", handle_response)
    
    try:
        # Load page
        response = page.goto(url, wait_until="load", timeout=120000)
        
        # Auto-scroll to trigger lazy loading
        print("  Triggering lazy loading via auto-scroll...")
        scroll_to_bottom(page)
        
        # Wait for dynamic requests to finish
        print("  Waiting for network to settle...")
        try:
            page.wait_for_load_state("networkidle", timeout=10000)
        except Exception:
            pass
            
        # Get final page URL after redirects
        final_url = page.url
        
        # Scroll back to top
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(500)
        
        # Retrieve final HTML content
        html_content = page.content()
        
        # Build resource lookup map (absolute original URL -> absolute local path)
        resource_map = {}
        for original_url, details in captured_resources.items():
            rel_path = details["rel_path"]
            resource_map[original_url] = rel_path
            stripped_url = strip_url_params(original_url)
            if stripped_url not in resource_map:
                resource_map[stripped_url] = rel_path
                
        # Rewrite captured CSS files in-place
        print(f"  Rewriting url(...) links in {len(captured_resources)} resources...")
        for orig_res_url, details in captured_resources.items():
            if details["category"] == "css":
                css_rel_path = details["rel_path"]
                css_local_folder = os.path.dirname(css_rel_path)
                try:
                    css_text = details["data"].decode("utf-8", errors="ignore")
                    rewritten_css = rewrite_css_urls(css_text, orig_res_url, css_local_folder, resource_map)
                    details["data"] = rewritten_css.encode("utf-8")
                except Exception as css_err:
                    print(f"    Failed to rewrite CSS resource {css_rel_path}: {css_err}")
                    
        # Rewrite index.html references
        print("  Rewriting links inside index.html...")
        rewritten_html = rewrite_html_content(html_content, final_url, resource_map, ".")

        
        # Save index.html
        # Save every captured resource (now rewritten where applicable) to MongoDB
        for orig_res_url, details in captured_resources.items():
            storage.save_resource(
                site=sanitized_domain,
                date=TODAY,
                rel_path=details["rel_path"],
                data=details["data"],
                content_type=details["content_type"],
                original_url=orig_res_url,
                category=details["category"],
            )

        # Save the rewritten index.html to MongoDB
        index_html_id = storage.save_index_html(sanitized_domain, TODAY, rewritten_html)

        # Save resource map + status info as the snapshot's metadata document
        debug_resource_map = {orig_url: details["rel_path"] for orig_url, details in captured_resources.items()}
        storage.save_snapshot_metadata(
            site=sanitized_domain,
            date=TODAY,
            url=url,
            status_code=response.status if response else None,
            resource_map=debug_resource_map,
            failed_resources=failed_resources,
            captured_count=len(captured_resources),
            failed_count=len(failed_resources),
            index_html_id=index_html_id,
        )

        print(f"  ✓ Successfully completed: {len(captured_resources)} resources saved, {len(failed_resources)} failed.")

    except Exception as e:
        print(f"  ✗ Failed to archive page {url}: {e}")

    finally:
        # Deregister response listener
        page.remove_listener("response", handle_response)

def main():
    print("========================================")
    print("Starting Wayback Machine-style capture...")
    print("========================================")
    
    urls = load_urls()
    if not urls:
        print("No URLs found in sites.txt.")
        return
        
    with sync_playwright() as p:
        browser = p.chromium.launch()
        
        # User-agent to prevent HTTP 403 Forbidden blocks from automated scraper detectors
        user_agent = (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/122.0.0.0 Safari/537.36"
        )
        
        for url in urls:
            # Using a fresh context per URL ensures browser cache is empty (prevents HTTP 304 Not Modified response body misses)
            context = browser.new_context(
                viewport={"width": 1440, "height": 900},
                user_agent=user_agent
            )
            page = context.new_page()
            
            capture_url(page, url)
            
            context.close()
            
        browser.close()
        
    print("\n========================================")
    print(" Wayback Capture Completed Successfully! ")
    print("========================================")


if __name__ == "__main__":
    main()
