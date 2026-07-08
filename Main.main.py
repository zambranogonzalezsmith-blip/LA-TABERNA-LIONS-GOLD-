# main.py
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

PORT = int(os.environ.get("PORT", 8080))

class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        super().end_headers()

os.chdir(os.path.dirname(os.path.abspath(__file__)))

print(f"🦁 LIONS-GOLD server running at http://localhost:{PORT}")
httpd = HTTPServer(("0.0.0.0", PORT), Handler)
httpd.serve_forever()
