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

async function test() {
  const port = 4331;
  const server = await serveDist(port);
  console.log(`Server started on ${port}`);

  // 1. Test Desktop
  const browser = await chromium.launch({ headless: true });
  const desktopContext = await browser.newContext();
  const desktopPage = await desktopContext.newPage();

  const logs = [];
  desktopPage.on('console', msg => logs.push(`[Desktop Console] ${msg.type()}: ${msg.text()}`));
  desktopPage.on('pageerror', err => logs.push(`[Desktop PageError] ${err}`));

  await desktopPage.setViewportSize({ width: 1280, height: 800 });
  await desktopPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

  console.log('Desktop: Clicking theme toggle...');
  const desktopBtn = desktopPage.locator('[data-theme-toggle]').first();
  await desktopBtn.click();
  await desktopPage.waitForTimeout(600);

  // 2. Test Mobile (iPhone 13 emulation with touch)
  const iPhone = devices['iPhone 13'];
  const mobileContext = await browser.newContext({
    ...iPhone,
  });
  const mobilePage = await mobileContext.newPage();
  mobilePage.on('console', msg => logs.push(`[Mobile Console] ${msg.type()}: ${msg.text()}`));
  mobilePage.on('pageerror', err => logs.push(`[Mobile PageError] ${err}`));

  await mobilePage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
  console.log('Mobile: Clicking theme toggle...');

  const mobileBtn = mobilePage.locator('[data-theme-toggle]').first();
  const btnBox = await mobileBtn.boundingBox();
  console.log('Mobile button bounding box:', btnBox);

  // Check startViewTransition in mobilePage
  const hasVt = await mobilePage.evaluate(() => typeof document.startViewTransition === 'function');
  console.log('Mobile has document.startViewTransition:', hasVt);

  // Check what happens during click
  await mobilePage.evaluate(() => {
    window.__vtEvents = [];
    const origSvt = document.startViewTransition;
    if (origSvt) {
      document.startViewTransition = function(cb) {
        window.__vtEvents.push('startViewTransition called');
        const vt = origSvt.call(document, cb);
        vt.ready.then(() => window.__vtEvents.push('vt ready resolved')).catch(e => window.__vtEvents.push('vt ready rejected: ' + e));
        vt.finished.then(() => window.__vtEvents.push('vt finished resolved')).catch(e => window.__vtEvents.push('vt finished rejected: ' + e));
        return vt;
      };
    } else {
      window.__vtEvents.push('no startViewTransition');
    }
  });

  await mobileBtn.click();
  await mobilePage.waitForTimeout(600);

  const vtEvents = await mobilePage.evaluate(() => window.__vtEvents);
  console.log('Mobile VT events:', vtEvents);

  console.log('Logs:', logs);

  await browser.close();
  server.close();
}

test().catch(console.error);
