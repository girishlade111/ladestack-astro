import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const PORT = 4399;
const DIST_DIR = path.resolve('dist');
const ARTIFACT_DIR = path.resolve('scratch/hero-screenshots');

if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(DIST_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, async () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  try {
    const browser = await chromium.launch({ headless: true });
    
    // Desktop Viewport
    const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Switch to dark theme
    const themeBtn = page.locator('button[data-theme-toggle]').first();
    if (await themeBtn.count() > 0) {
      await themeBtn.click();
      await page.waitForTimeout(500);
    }

    const data = await page.evaluate(() => {
      const header = document.querySelector('header');
      const bar = document.querySelector('.lamp-bar');
      const coneLeft = document.querySelector('.lamp-cone-left');
      const section = document.querySelector('section');
      return {
        headerBottom: header?.getBoundingClientRect().bottom,
        sectionTop: section?.getBoundingClientRect().top,
        barRect: bar?.getBoundingClientRect(),
        coneLeftRect: coneLeft?.getBoundingClientRect(),
        scrollY: window.scrollY
      };
    });
    console.log('[DEBUG LAMP DATA]', JSON.stringify(data, null, 2));

    // Desktop Viewport - Dark
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero-dark-viewport.png') });
    console.log('[CAPTURED] hero-dark-viewport.png');

    // Switch back to light theme
    if (await themeBtn.count() > 0) {
      await themeBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero-light-viewport.png') });
      console.log('[CAPTURED] hero-light-viewport.png');
    }

    await browser.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
