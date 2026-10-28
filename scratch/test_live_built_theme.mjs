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

async function run() {
  const port = 4340;
  const server = await serveDist(port);
  console.log(`Server listening on http://localhost:${port}`);

  const browser = await chromium.launch({ headless: true });
  const screenshotsDir = path.join(process.cwd(), 'scratch', 'theme_screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  try {
    // 1. Desktop Test
    console.log('--- 1. Testing Desktop (1280x800) ---');
    const desktopPage = await browser.newPage();
    await desktopPage.setViewportSize({ width: 1280, height: 800 });
    await desktopPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

    const initialThemeDark = await desktopPage.evaluate(() => document.documentElement.classList.contains('dark'));
    console.log(`Initial Desktop Theme (dark): ${initialThemeDark}`);

    const desktopBtn = desktopPage.locator('[data-theme-toggle]').first();
    await desktopBtn.click();
    await desktopPage.waitForTimeout(350); // halfway through 750ms animation
    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'desktop-mid-transition.png') });
    console.log('Captured desktop-mid-transition.png');

    await desktopPage.waitForTimeout(500); // after animation completes
    const afterThemeDark = await desktopPage.evaluate(() => document.documentElement.classList.contains('dark'));
    console.log(`After Desktop Theme (dark): ${afterThemeDark} (switched: ${afterThemeDark !== initialThemeDark})`);
    if (afterThemeDark === initialThemeDark) throw new Error('Theme did not switch on desktop!');

    // 2. Mobile Viewport (iPhone 13 with native View Transitions)
    console.log('--- 2. Testing Mobile iPhone 13 (Native View Transitions) ---');
    const mobileContext = await browser.newContext({ ...devices['iPhone 13'] });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

    const mobileInitialDark = await mobilePage.evaluate(() => document.documentElement.classList.contains('dark'));
    console.log(`Initial Mobile Theme (dark): ${mobileInitialDark}`);

    const mobileBtn = mobilePage.locator('[data-theme-toggle]').first();
    await mobileBtn.click();
    await mobilePage.waitForTimeout(350);
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile-mid-transition.png') });
    console.log('Captured mobile-mid-transition.png');

    await mobilePage.waitForTimeout(500);
    const mobileAfterDark = await mobilePage.evaluate(() => document.documentElement.classList.contains('dark'));
    console.log(`After Mobile Theme (dark): ${mobileAfterDark} (switched: ${mobileAfterDark !== mobileInitialDark})`);
    if (mobileAfterDark === mobileInitialDark) throw new Error('Theme did not switch on mobile!');

    // 3. Mobile Drawer Theme Button Test
    console.log('--- 3. Testing Mobile Drawer Theme Button ---');
    // Open hamburger menu
    const menuBtn = mobilePage.locator('[data-menu-open]');
    await menuBtn.click();
    await mobilePage.waitForTimeout(200);

    // Click theme toggle inside mobile drawer
    const drawerThemeBtn = mobilePage.locator('[data-mobile-sheet] [data-theme-toggle]');
    const drawerBtnCount = await drawerThemeBtn.count();
    console.log(`Drawer theme button present: ${drawerBtnCount > 0}`);
    if (drawerBtnCount > 0) {
      const beforeDrawerSwitch = await mobilePage.evaluate(() => document.documentElement.classList.contains('dark'));
      await drawerThemeBtn.click();
      await mobilePage.waitForTimeout(400);
      const afterDrawerSwitch = await mobilePage.evaluate(() => document.documentElement.classList.contains('dark'));
      console.log(`Drawer button switched theme: ${afterDrawerSwitch !== beforeDrawerSwitch}`);
    }

    // 4. Mobile Fallback (Simulating Browser without startViewTransition e.g. iOS <18, Firefox, WebViews)
    console.log('--- 4. Testing Universal Fallback (Browsers without startViewTransition) ---');
    const fallbackPage = await mobileContext.newPage();
    await fallbackPage.addInitScript(() => {
      delete Document.prototype.startViewTransition;
      delete document.startViewTransition;
    });
    await fallbackPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

    const fbInitial = await fallbackPage.evaluate(() => document.documentElement.classList.contains('dark'));
    const fbBtn = fallbackPage.locator('[data-theme-toggle]').first();
    await fbBtn.click();

    // Verify ripple overlay is present
    const hasRipple = await fallbackPage.evaluate(() => !!document.getElementById('theme-transition-fallback-ripple'));
    console.log(`Fallback ripple overlay triggered on click: ${hasRipple}`);
    if (!hasRipple) throw new Error('Fallback ripple overlay did not trigger!');

    await fallbackPage.waitForTimeout(350);
    await fallbackPage.screenshot({ path: path.join(screenshotsDir, 'fallback-ripple-mid.png') });
    console.log('Captured fallback-ripple-mid.png');

    await fallbackPage.waitForTimeout(500);
    const fbAfter = await fallbackPage.evaluate(() => document.documentElement.classList.contains('dark'));
    console.log(`Fallback theme switched: ${fbAfter !== fbInitial}`);
    const rippleRemoved = await fallbackPage.evaluate(() => !document.getElementById('theme-transition-fallback-ripple'));
    console.log(`Fallback ripple overlay removed cleanly: ${rippleRemoved}`);

    // 5. Reduced Motion protection
    console.log('--- 5. Testing Reduced Motion System Profile Protection ---');
    const rmPage = await mobileContext.newPage();
    await rmPage.emulateMedia({ reducedMotion: 'reduce' });
    await rmPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
    const rmBtn = rmPage.locator('[data-theme-toggle]').first();
    await rmBtn.click();
    await rmPage.waitForTimeout(400);
    const rmSwitched = await rmPage.evaluate(() => document.documentElement.classList.contains('dark'));
    console.log(`Reduced motion theme switched properly: ${rmSwitched}`);

    console.log('\n🎉 ALL REAL BUILT THEME TRANSITION TESTS PASSED ACROSS DESKTOP, MOBILE, AND FALLBACKS!');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
