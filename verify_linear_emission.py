import os
import time
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
from PIL import Image
import numpy as np
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

        # 1. Desktop Dark
        context_dd = browser.new_context(viewport={'width': 1024, 'height': 576}, color_scheme='dark')
        page_dd = context_dd.new_page()
        page_dd.goto('http://127.0.0.1:4321/')
        page_dd.evaluate('document.documentElement.classList.add("dark")')
        page_dd.wait_for_timeout(500)
        page_dd.screenshot(path='linear_desktop_dark.png')

        # 2. Desktop Light
        context_dl = browser.new_context(viewport={'width': 1024, 'height': 576}, color_scheme='light')
        page_dl = context_dl.new_page()
        page_dl.goto('http://127.0.0.1:4321/')
        page_dl.evaluate('document.documentElement.classList.remove("dark")')
        page_dl.wait_for_timeout(500)
        page_dl.screenshot(path='linear_desktop_light.png')

        # 3. Mobile Dark
        context_md = browser.new_context(viewport={'width': 576, 'height': 1024}, color_scheme='dark')
        page_md = context_md.new_page()
        page_md.goto('http://127.0.0.1:4321/')
        page_md.evaluate('document.documentElement.classList.add("dark")')
        page_md.wait_for_timeout(500)
        page_md.screenshot(path='linear_mobile_dark.png')

        # 4. Mobile Light
        context_ml = browser.new_context(viewport={'width': 576, 'height': 1024}, color_scheme='light')
        page_ml = context_ml.new_page()
        page_ml.goto('http://127.0.0.1:4321/')
        page_ml.evaluate('document.documentElement.classList.remove("dark")')
        page_ml.wait_for_timeout(500)
        page_ml.screenshot(path='linear_mobile_light.png')

        browser.close()

    print('All 4 linear screenshots captured.')

    # Analyze Horizontal Profiles:
    im_dd = np.array(Image.open('linear_desktop_dark.png').convert('RGB'))
    im_dl = np.array(Image.open('linear_desktop_light.png').convert('RGB'))

    # Desktop center is x=512. Lamp diffuser is around y=80..95.
    print('\n=== DESKTOP DARK HORIZONTAL EMISSION PROFILE ===')
    print('Diffuser Line (y=80):')
    for dx in range(0, 160, 20):
        print(f'dx={dx:3d} (x={512+dx}): Left={im_dd[80, 512-dx]} Right={im_dd[80, 512+dx]}')

    print('\nImmediate Downward Emission Line (y=88):')
    for dx in range(0, 160, 20):
        print(f'dx={dx:3d} (x={512+dx}): Left={im_dd[88, 512-dx]} Right={im_dd[88, 512+dx]}')

    print('\nMain Downward Projection Line (y=100):')
    for dx in range(0, 160, 20):
        print(f'dx={dx:3d} (x={512+dx}): Left={im_dd[100, 512-dx]} Right={im_dd[100, 512+dx]}')

    print('\n=== DESKTOP LIGHT HORIZONTAL EMISSION PROFILE ===')
    print('Diffuser Line (y=80):')
    for dx in range(0, 160, 20):
        print(f'dx={dx:3d} (x={512+dx}): Left={im_dl[80, 512-dx]} Right={im_dl[80, 512+dx]}')

    print('\nImmediate Downward Emission Line (y=88):')
    for dx in range(0, 160, 20):
        print(f'dx={dx:3d} (x={512+dx}): Left={im_dl[88, 512-dx]} Right={im_dl[88, 512+dx]}')

    print('\nMain Downward Projection Line (y=100):')
    for dx in range(0, 160, 20):
        print(f'dx={dx:3d} (x={512+dx}): Left={im_dl[100, 512-dx]} Right={im_dl[100, 512+dx]}')

if __name__ == '__main__':
    main()

