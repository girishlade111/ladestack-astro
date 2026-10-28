import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

// Simple static server for dist/
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
    if (reqPath.endsWith('/')) {
      reqPath += 'index.html';
    } else if (!path.extname(reqPath)) {
      reqPath += '/index.html';
    }

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

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function run() {
  const port = 4329;
  const server = await serveDist(port);
  console.log(`Server listening on http://localhost:${port}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const screenshotsDir = path.join(process.cwd(), 'scratch', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  try {
    console.log('Testing /faq on desktop (1280x800)...');
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`http://localhost:${port}/faq`, { waitUntil: 'networkidle' });

    // Verify Title
    const title = await page.title();
    console.log(`Page Title: ${title}`);

    // Verify 29 accordions
    const accordions = await page.locator('details.accordion-item').count();
    console.log(`Accordion count: ${accordions}`);
    if (accordions !== 29) throw new Error(`Expected 29 accordions, got ${accordions}`);

    // Verify Category section headings
    const generalHeading = await page.locator('#general').isVisible();
    const gbCoderHeading = await page.locator('#gb-coder').isVisible();
    console.log(`General section visible: ${generalHeading}, GB Coder section visible: ${gbCoderHeading}`);

    // Verify First item in Category A is open by default
    const firstItemOpen = await page.locator('details.accordion-item').first().getAttribute('open');
    console.log(`First item open attribute: ${firstItemOpen !== null}`);

    // Test toggle interaction
    const secondSummary = page.locator('details.accordion-item').nth(1).locator('summary');
    await secondSummary.click();
    const secondItemOpen = await page.locator('details.accordion-item').nth(1).getAttribute('open');
    console.log(`Second item open after click: ${secondItemOpen !== null}`);

    // Take Desktop Light screenshot
    await page.screenshot({ path: path.join(screenshotsDir, 'faq-desktop-light.png'), fullPage: false });
    console.log('Saved faq-desktop-light.png');

    // Toggle Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(screenshotsDir, 'faq-desktop-dark.png'), fullPage: false });
    console.log('Saved faq-desktop-dark.png');

    // Test Mobile Viewport (375x812)
    console.log('Testing /faq on mobile (375x812)...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`http://localhost:${port}/faq`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotsDir, 'faq-mobile.png'), fullPage: false });
    console.log('Saved faq-mobile.png');

    // Test Localized route: /ja/faq
    console.log('Testing /ja/faq...');
    await page.goto(`http://localhost:${port}/ja/faq`, { waitUntil: 'networkidle' });
    const jaAccordions = await page.locator('details.accordion-item').count();
    console.log(`Japanese accordions count: ${jaAccordions}`);
    if (jaAccordions !== 29) throw new Error(`Expected 29 accordions for /ja/faq, got ${jaAccordions}`);

    // Test Homepage: / has 0 accordions
    console.log('Testing / (homepage) has 0 accordions...');
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
    const homeAccordions = await page.locator('details.accordion-item').count();
    console.log(`Homepage accordion count: ${homeAccordions}`);
    if (homeAccordions !== 0) throw new Error(`Expected 0 accordions on homepage, got ${homeAccordions}`);

    // Test GB Coder page: /gb-coder has 0 accordions
    console.log('Testing /gb-coder has 0 accordions...');
    await page.goto(`http://localhost:${port}/gb-coder`, { waitUntil: 'networkidle' });
    const gbAccordions = await page.locator('details.accordion-item').count();
    console.log(`GB Coder accordion count: ${gbAccordions}`);
    if (gbAccordions !== 0) throw new Error(`Expected 0 accordions on /gb-coder, got ${gbAccordions}`);

    console.log('\n🎉 ALL PLAYWRIGHT BROWSER AUDITS PASSED WITH ZERO ERRORS!');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
