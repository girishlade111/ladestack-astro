import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, devices } from 'playwright';

function serveDist(port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath.endsWith('/')) reqPath += 'index.html';
    else if (!path.extname(reqPath)) reqPath += '/index.html';

    const filePath = path.join(process.cwd(), 'dist', reqPath);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });

  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

async function capture() {
  const port = 4348;
  const server = await serveDist(port);

  const browser = await chromium.launch({ headless: true });
  const outDir = path.join(process.cwd(), 'scratch', 'rendered_hero');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Desktop Light
  const dLightPage = await browser.newPage();
  await dLightPage.setViewportSize({ width: 1280, height: 800 });
  await dLightPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
  await dLightPage.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });
  await dLightPage.waitForTimeout(400);
  const heroLight = dLightPage.locator('section').first();
  await heroLight.screenshot({ path: path.join(outDir, 'rendered_desktop_light.png') });

  // 2. Desktop Dark
  const dDarkPage = await browser.newPage();
  await dDarkPage.setViewportSize({ width: 1280, height: 800 });
  await dDarkPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
  await dDarkPage.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await dDarkPage.waitForTimeout(400);
  const heroDark = dDarkPage.locator('section').first();
  await heroDark.screenshot({ path: path.join(outDir, 'rendered_desktop_dark.png') });

  // 3. Mobile Light (iPhone 13)
  const mLightPage = await browser.newPage({ ...devices['iPhone 13'] });
  await mLightPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
  await mLightPage.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });
  await mLightPage.waitForTimeout(400);
  const mHeroLight = mLightPage.locator('section').first();
  await mHeroLight.screenshot({ path: path.join(outDir, 'rendered_mobile_light.png') });

  // 4. Mobile Dark (iPhone 13)
  const mDarkPage = await browser.newPage({ ...devices['iPhone 13'] });
  await mDarkPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
  await mDarkPage.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await mDarkPage.waitForTimeout(400);
  const mHeroDark = mDarkPage.locator('section').first();
  await mHeroDark.screenshot({ path: path.join(outDir, 'rendered_mobile_dark.png') });

  console.log('Screenshots saved to scratch/rendered_hero/');
  await browser.close();
  server.close();
}

capture().catch(console.error);

