import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const PORT = 4399;
const distDir = path.resolve('dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function startServer() {
  const server = http.createServer((req, res) => {
    let cleanUrl = req.url.split('?')[0].split('#')[0];
    if (cleanUrl.endsWith('/')) cleanUrl += 'index.html';
    let filePath = path.join(distDir, cleanUrl);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Test server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function measureRoute(browser, route) {
  const page = await browser.newPage();
  const requests = [];

  page.on('request', (req) => {
    requests.push({
      url: req.url(),
      resourceType: req.resourceType(),
    });
  });

  const startTime = Date.now();
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'load' });
  const loadTimeMs = Date.now() - startTime;

  // Evaluate performance metrics from PerformanceTiming & PerformanceObserver
  const metrics = await page.evaluate(async () => {
    const navEntries = performance.getEntriesByType('navigation');
    const nav = navEntries.length > 0 ? navEntries[0] : null;

    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find((p) => p.name === 'first-contentful-paint');
    const fcp = fcpEntry ? fcpEntry.startTime : null;

    let cls = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      }
    });
    try {
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}

    // Wait a brief tick for buffered shifts
    await new Promise((r) => setTimeout(r, 100));

    return {
      fcp: fcp ? Math.round(fcp) : null,
      domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
      cls: Number(cls.toFixed(4)),
    };
  });

  await page.close();

  const fontRequests = requests.filter(
    (r) => r.resourceType === 'font' || r.url.includes('fonts.gstatic.com')
  );
  const stylesheetRequests = requests.filter(
    (r) => r.resourceType === 'stylesheet' || r.url.includes('fonts.googleapis.com')
  );

  return {
    route,
    loadTimeMs,
    fcp: metrics.fcp,
    cls: metrics.cls,
    totalRequests: requests.length,
    fontRequests: fontRequests.length,
    stylesheetRequests: stylesheetRequests.length,
    externalFontUrls: fontRequests.map((r) => r.url.split('?')[0]),
  };
}

async function run() {
  const server = await startServer();
  const browser = await chromium.launch();

  const routes = [
    '/',
    '/apps',
    '/gb-coder',
    '/blog',
    '/ja/blog',
    '/faq',
    '/blog/client-side-pdf-manipulation-webassembly',
  ];

  console.log('\n--- Measuring Representative Routes Performance ---');
  const results = [];
  for (const r of routes) {
    const m = await measureRoute(browser, r);
    results.push(m);
    console.log(
      `[${m.route}] FCP: ${m.fcp ?? 'N/A'}ms | Load: ${m.loadTimeMs}ms | CLS: ${m.cls} | Total Req: ${m.totalRequests} | Font Req: ${m.fontRequests}`
    );
  }

  await browser.close();
  server.close();

  console.log('\nMeasurement completed successfully.');
}

run();

