// scratch/test-language-switcher-and-capture.mjs
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('scratch/reference-screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

(async () => {
  console.log('--- REPRODUCING LANGUAGE SWITCHER & CAPTURING REFERENCE ---');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  // 1. Capture 'How LadeStack operates' section reference in light mode
  const howSection = page.locator('#how-it-works');
  if (await howSection.count() > 0) {
    await howSection.screenshot({ path: path.join(SCREENSHOT_DIR, 'how-it-works-light.png') });
    console.log('[CAPTURED] how-it-works-light.png');
  }

  // 2. Capture 'Features Bento' section reference in light mode
  const featuresSection = page.locator('#features');
  if (await featuresSection.count() > 0) {
    await featuresSection.screenshot({ path: path.join(SCREENSHOT_DIR, 'features-bento-light.png') });
    console.log('[CAPTURED] features-bento-light.png');
  }

  // 3. Switch to dark mode and capture references
  const themeToggle = page.locator('button[data-theme-toggle]');
  await themeToggle.click();
  await page.waitForTimeout(300);

  if (await howSection.count() > 0) {
    await howSection.screenshot({ path: path.join(SCREENSHOT_DIR, 'how-it-works-dark.png') });
    console.log('[CAPTURED] how-it-works-dark.png');
  }
  if (await featuresSection.count() > 0) {
    await featuresSection.screenshot({ path: path.join(SCREENSHOT_DIR, 'features-bento-dark.png') });
    console.log('[CAPTURED] features-bento-dark.png');
  }

  // 4. Test Language Switcher Click
  console.log('\n--- TESTING LANGUAGE SWITCHER BUTTON CLICK ---');
  // Return to light mode
  await themeToggle.click();
  await page.waitForTimeout(200);

  const langButtons = page.locator('[data-lang-trigger]');
  const count = await langButtons.count();
  console.log(`Found ${count} [data-lang-trigger] elements on page.`);

  for (let i = 0; i < count; i++) {
    const btn = langButtons.nth(i);
    const isVisible = await btn.isVisible();
    const parent = btn.locator('..');
    const menu = parent.locator('[data-lang-menu]');
    const menuBefore = await menu.getAttribute('class');
    const expandedBefore = await btn.getAttribute('aria-expanded');

    console.log(`\nTrigger #${i}: visible=${isVisible}, aria-expanded=${expandedBefore}, menuClass="${menuBefore}"`);

    if (isVisible) {
      console.log(`Clicking Trigger #${i}...`);
      await btn.click();
      await page.waitForTimeout(200);

      const expandedAfter = await btn.getAttribute('aria-expanded');
      const menuAfter = await menu.getAttribute('class');
      const menuVisible = await menu.isVisible();

      console.log(`Result #${i}: aria-expanded=${expandedAfter}, menuClass="${menuAfter}", menuVisible=${menuVisible}`);
      if (!menuVisible) {
        console.log(`[DEFECT CONFIRMED] Trigger #${i} failed to open menu or closed immediately!`);
      } else {
        console.log(`[MENU OPENED] Trigger #${i} successfully opened menu!`);
      }
    } else {
      console.log(`Trigger #${i} is not visible (likely in mobile sheet).`);
    }
  }

  await browser.close();
  console.log('\n--- REFERENCE CAPTURE & DEFECT REPRODUCTION COMPLETED ---');
})();
