import os
from flask import Flask, Response, abort, render_template_string
from storage import LocalStorage

app = Flask(__name__)
storage = LocalStorage()

INDEX_TEMPLATE = """
<h1>Archived Snapshots</h1>
{% for site, snaps in grouped.items() %}
  <h3>{{ site }}</h3>
  <ul>
  {% for s in snaps %}
    <li><a href="/view/{{ site }}/{{ s.date }}/">{{ s.date }}</a> — {{ s.url }}</li>
  {% endfor %}
  </ul>
{% endfor %}
"""


@app.route("/")
def index():
    grouped = storage.list_snapshots()
    return render_template_string(INDEX_TEMPLATE, grouped=grouped)


@app.route("/view/<site>/<date>/")
def view_snapshot(site, date):
    snap = storage.get_snapshot(site, date)
    if not snap:
        abort(404)
    html = storage.get_index_html(snap["indexHtmlGridFsId"])
    return Response(html, mimetype="text/html")


@app.route("/view/<site>/<date>/resources/<category>/<filename>")
def view_resource(site, date, category, filename):
    rel_path = f"resources/{category}/{filename}"
    data, content_type = storage.get_resource(site, date, rel_path)
    if data is None:
        abort(404)
    return Response(data, mimetype=content_type)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)