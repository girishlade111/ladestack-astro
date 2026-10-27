// scratch/test-all-locales-navigation.mjs
import { chromium } from 'playwright';
import assert from 'assert';

const LOCALES = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];

(async () => {
  console.log('--- TESTING ALL 9 LOCALES NAVIGATION VIA LANGUAGE SWITCHER ---');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  for (const targetLocale of LOCALES) {
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
    const trigger = page.locator('header [data-lang-trigger]');
    await trigger.click();
    await page.waitForTimeout(100);

    const langLink = page.locator(`header [data-lang-menu] a[lang="${targetLocale}"]`);
    assert.ok(await langLink.count() > 0, `Link for locale ${targetLocale} exists`);
    const href = await langLink.getAttribute('href');
    console.log(`Locale ${targetLocale}: clicking href=${href}`);

    await langLink.click();
    await page.waitForLoadState('networkidle');

    const currentUrl = page.url();
    console.log(`Navigated to: ${currentUrl}`);

    if (targetLocale === 'en') {
      assert.ok(!currentUrl.match(/\/(ja|ko|zh|ru|tr|fr|pt|es)\//), 'EN route should not have non-en prefix');
    } else {
      assert.ok(currentUrl.includes(`/${targetLocale}`), `URL must contain /${targetLocale}`);
    }
  }

  // Also test mobile drawer language switcher
  console.log('\n--- TESTING MOBILE DRAWER LANGUAGE SWITCHER ---');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  const menuOpenBtn = page.locator('[data-menu-open]');
  await menuOpenBtn.click();
  await page.waitForTimeout(200);

  const mobileTrigger = page.locator('[data-mobile-sheet] [data-lang-trigger]');
  assert.ok(await mobileTrigger.isVisible(), 'Mobile language trigger is visible in sheet');
  await mobileTrigger.click();
  await page.waitForTimeout(100);

  const mobileMenu = page.locator('[data-mobile-sheet] [data-lang-menu]');
  assert.ok(await mobileMenu.isVisible(), 'Mobile language menu is visible');

  // Click Japanese in mobile sheet
  const jaLinkMobile = page.locator('[data-mobile-sheet] [data-lang-menu] a[lang="ja"]');
  await jaLinkMobile.click();
  await page.waitForLoadState('networkidle');
  console.log('Mobile switched to JA:', page.url());
  assert.ok(page.url().includes('/ja'), 'Mobile URL must contain /ja');

  await browser.close();
  console.log('\n[ALL 9 LOCALES AND MOBILE SWITCHER PASSED PERFECTLY]');
})();
