import os
import time
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
from PIL import Image
from playwright.sync_api import sync_playwright

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def run_server():
    server = HTTPServer(('127.0.0.1', 4321), lambda *args, **kwargs: QuietHandler(*args, directory='dist', **kwargs))
    server.serve_forever()

def main():
    t = threading.Thread(target=run_server, daemon=True)
    t.start()
    time.sleep(1)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # 1. Desktop Dark (1024x576)
        context_dd = browser.new_context(viewport={'width': 1024, 'height': 576}, color_scheme='dark')
        page_dd = context_dd.new_page()
        page_dd.goto('http://127.0.0.1:4321/')
        page_dd.evaluate('document.documentElement.classList.add("dark")')
        page_dd.wait_for_timeout(500)
        page_dd.screenshot(path='rendered_desktop_dark.png')
        
        # 2. Desktop Light (1024x576)
        context_dl = browser.new_context(viewport={'width': 1024, 'height': 576}, color_scheme='light')
        page_dl = context_dl.new_page()
        page_dl.goto('http://127.0.0.1:4321/')
        page_dl.evaluate('document.documentElement.classList.remove("dark")')
        page_dl.wait_for_timeout(500)
        page_dl.screenshot(path='rendered_desktop_light.png')

        # 3. Mobile Dark (576x1024)
        context_md = browser.new_context(viewport={'width': 576, 'height': 1024}, color_scheme='dark')
        page_md = context_md.new_page()
        page_md.goto('http://127.0.0.1:4321/')
        page_md.evaluate('document.documentElement.classList.add("dark")')
        page_md.wait_for_timeout(500)
        page_md.screenshot(path='rendered_mobile_dark.png')

        # 4. Mobile Light (576x1024)
        context_ml = browser.new_context(viewport={'width': 576, 'height': 1024}, color_scheme='light')
        page_ml = context_ml.new_page()
        page_ml.goto('http://127.0.0.1:4321/')
        page_ml.evaluate('document.documentElement.classList.remove("dark")')
        page_ml.wait_for_timeout(500)
        page_ml.screenshot(path='rendered_mobile_light.png')

        browser.close()

    print('All 4 screenshots captured successfully.')

if __name__ == '__main__':
    main()
