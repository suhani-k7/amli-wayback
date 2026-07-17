import os
from datetime import datetime, timezone

from dotenv import load_dotenv
from pymongo import MongoClient
from gridfs import GridFSBucket

load_dotenv()
MONGO_URI = os.environ.get("MONGO_URI")
DB_NAME = "website_archive"


class MongoStorage:
    def __init__(self):
        self.client = MongoClient(MONGO_URI)
        self.db = self.client[DB_NAME]
        self.bucket = GridFSBucket(self.db, bucket_name="resources")
        self.snapshots = self.db["snapshots"]

    def save_resource(self, site, date, rel_path, data: bytes, content_type: str, original_url: str, category: str):
        """Save one resource file (CSS/JS/image/font/etc.) to GridFS."""
        return self.bucket.upload_from_stream(
            rel_path,
            data,
            metadata={
                "site": site,
                "date": date,
                "contentType": content_type,
                "originalUrl": original_url,
                "category": category,
            },
        )

    def save_index_html(self, site, date, html: str):
        """Save the rewritten index.html to GridFS, return its file id."""
        return self.bucket.upload_from_stream(
            "index.html",
            html.encode("utf-8"),
            metadata={"site": site, "date": date, "contentType": "text/html"},
        )

    def save_snapshot_metadata(self, site, date, url, status_code, resource_map,
                                failed_resources, captured_count, failed_count, index_html_id):
        """Save/update the snapshot's metadata document."""
        doc = {
            "site": site,
            "url": url,
            "date": date,
            "capturedAt": datetime.now(timezone.utc),
            "statusCode": status_code,
            "capturedResourcesCount": captured_count,
            "failedResourcesCount": failed_count,
            "failedResources": failed_resources,
            "resourceMap": resource_map,
            "indexHtmlGridFsId": index_html_id,
        }
        self.snapshots.update_one(
            {"site": site, "date": date},
            {"$set": doc},
            upsert=True,
        )