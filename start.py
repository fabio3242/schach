import http.server, socketserver, webbrowser, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
PORT = 8765  # immer denselben Port nutzen, sonst sind deine gespeicherten Daten "woanders"
class H(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                      '.wasm': 'application/wasm', '.webmanifest': 'application/manifest+json', '.js': 'text/javascript'}
    def end_headers(self):
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        super().end_headers()
socketserver.ThreadingTCPServer.allow_reuse_address = True
with socketserver.ThreadingTCPServer(('127.0.0.1', PORT), H) as srv:
    print(f'Schachcomputer läuft auf http://localhost:{PORT}  (Beenden: Strg+C)')
    webbrowser.open(f'http://localhost:{PORT}/index.html')
    srv.serve_forever()
