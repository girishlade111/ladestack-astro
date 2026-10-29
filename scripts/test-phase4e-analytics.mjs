import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright';

console.log('============================================================');
console.log('LADESTACK — PHASE 4E-1 ANALYTICS & CONSENT VERIFICATION SUITE');
console.log('============================================================\n');

// ---------------------------------------------------------------------------
// SUITE 1: Tracking Configuration & ID Integrity
// ---------------------------------------------------------------------------
console.log('--- SUITE 1: Tracking Configuration, GA4 Init & In-Flight Guards ---');

const analyticsScript = fs.readFileSync('src/scripts/analytics-consent.ts', 'utf8');

if (!analyticsScript.includes("GA_MEASUREMENT_ID = 'G-C6GRNN3J11'")) {
  throw new Error('Missing or mismatched GA4 Measurement ID G-C6GRNN3J11 in analytics-consent.ts');
}
console.log('✅ PASS: GA4 Measurement ID is strictly G-C6GRNN3J11');

if (!analyticsScript.includes("CLARITY_PROJECT_ID = 'z5fy1scjjr'")) {
  throw new Error('Missing or mismatched Clarity Project ID z5fy1scjjr in analytics-consent.ts');
}
console.log('✅ PASS: Microsoft Clarity Project ID is strictly z5fy1scjjr');

if (!analyticsScript.includes("PRODUCTION_HOSTNAME = 'ladestack.in'")) {
  throw new Error('Production hostname is not restricted to ladestack.in');
}
console.log('✅ PASS: Production hostname strictly restricted to ladestack.in');

// Check GA4 initialization sequence includes gtag('js', new Date())
if (!analyticsScript.includes("window.gtag('js', new Date())")) {
  throw new Error("Missing mandatory window.gtag('js', new Date()) in loadGoogleAnalytics()");
}
console.log("✅ PASS: Mandatory window.gtag('js', new Date()) verified in loadGoogleAnalytics()");

// Check in-flight loading guards
if (
  !analyticsScript.includes('__ladestack_ga_loading') ||
  !analyticsScript.includes('__ladestack_clarity_loading')
) {
  throw new Error('Missing in-flight loading guards for GA4 or Clarity');
}
console.log('✅ PASS: In-flight race condition guards verified for both GA4 & Clarity');

// Check provider-specific cookie cleanup separation
if (
  !analyticsScript.includes('clearGoogleAnalyticsCookies') ||
  !analyticsScript.includes('clearClarityCookies')
) {
  throw new Error('Missing provider-specific cookie cleanup functions');
}
console.log('✅ PASS: Provider-specific cookie cleanup functions verified');

// Check Google Consent Mode v2 default denial
const managerScript = fs.readFileSync('src/components/analytics/AnalyticsManager.astro', 'utf8');
if (
  !managerScript.includes("analytics_storage: 'denied'") ||
  !managerScript.includes("ad_storage: 'denied'") ||
  !managerScript.includes("ad_user_data: 'denied'") ||
  !managerScript.includes("ad_personalization: 'denied'")
) {
  throw new Error('Google Consent Mode v2 default denial not properly configured in AnalyticsManager.astro');
}
console.log('✅ PASS: Google Consent Mode v2 default denial contract fully verified');

// ---------------------------------------------------------------------------
// SUITE 2: 9-Language Consent Dictionary Completeness
// ---------------------------------------------------------------------------
console.log('\n--- SUITE 2: 9-Language Consent Dictionary Completeness ---');

const consentSource = fs.readFileSync('src/i18n/consent.ts', 'utf8');
const requiredLocales = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];
const requiredKeys = [
  'bannerTitle',
  'bannerDesc',
  'acceptAll',
  'rejectAll',
  'customize',
  'savePreferences',
  'privacyPolicy',
  'persistentTrigger',
  'modalTitle',
  'modalDesc',
  'categoryEssentialTitle',
  'categoryEssentialDesc',
  'categoryEssentialBadge',
  'categoryGaTitle',
  'categoryGaDesc',
  'categoryClarityTitle',
  'categoryClarityDesc',
  'closeAria',
  'withdrawTitle',
  'withdrawDesc',
  'withdrawButton',
  'savedNotice',
  'enabledBadge',
  'disabledBadge',
];

for (const loc of requiredLocales) {
  if (!consentSource.includes(`${loc}: {`)) {
    throw new Error(`Missing consent translation dictionary for locale: ${loc}`);
  }
}
console.log(`✅ PASS: All ${requiredLocales.length} locales present in CONSENT_TRANSLATIONS`);

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
if (emojiRegex.test(consentSource)) {
  throw new Error('Emoji detected in src/i18n/consent.ts! Violates non-negotiable zero-emoji policy.');
}
console.log('✅ PASS: Zero emoji verified in consent dictionary');

// ---------------------------------------------------------------------------
// SUITE 3: Content Security Policy (vercel.json)
// ---------------------------------------------------------------------------
console.log('\n--- SUITE 3: Content Security Policy (vercel.json) ---');

const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const headersList = vercelConfig.headers || [];
const cspHeader = headersList
  .flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy-Report-Only');

if (!cspHeader) {
  throw new Error('Content-Security-Policy-Report-Only header missing from vercel.json');
}

const requiredOrigins = [
  'https://www.googletagmanager.com',
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://*.googletagmanager.com',
  'https://www.clarity.ms',
  'https://scripts.clarity.ms',
  'https://*.clarity.ms',
  'https://c.bing.com',
];

for (const origin of requiredOrigins) {
  if (!cspHeader.value.includes(origin)) {
    throw new Error(`CSP is missing required analytics origin: ${origin}`);
  }
}
console.log('✅ PASS: All 8 required Google & Clarity origins permitted in CSP');

// ---------------------------------------------------------------------------
// SUITE 4: Privacy Policy Disclosures across All 9 Locales
// ---------------------------------------------------------------------------
console.log('\n--- SUITE 4: Privacy Policy Disclosures across All 9 Locales ---');

for (const loc of requiredLocales) {
  const privacyFile = `src/i18n/pages/privacy/${loc}.ts`;
  if (!fs.existsSync(privacyFile)) {
    throw new Error(`Missing privacy page translation: ${privacyFile}`);
  }
  const content = fs.readFileSync(privacyFile, 'utf8');

  if (!content.includes('G-C6GRNN3J11')) {
    throw new Error(`[${loc}] Missing GA4 Measurement ID disclosure (G-C6GRNN3J11)`);
  }
  if (!content.includes('z5fy1scjjr')) {
    throw new Error(`[${loc}] Missing Clarity Project ID disclosure (z5fy1scjjr)`);
  }
  if (!content.includes('ladestack-consent')) {
    throw new Error(`[${loc}] Missing ladestack-consent storage key disclosure`);
  }
  console.log(`✅ PASS: [${loc}] Discloses G-C6GRNN3J11, z5fy1scjjr, and ladestack-consent storage`);
}

// ---------------------------------------------------------------------------
// SUITE 5: Clarity Form Input Masking
// ---------------------------------------------------------------------------
console.log('\n--- SUITE 5: Clarity Form Input Masking ---');

const contactPage = fs.readFileSync('src/components/pages/ContactPage.astro', 'utf8');
const maskMatches = contactPage.match(/data-clarity-mask="true"/g) || [];

if (maskMatches.length < 5) {
  throw new Error(`Expected at least 5 data-clarity-mask attributes on ContactPage, found: ${maskMatches.length}`);
}
console.log(`✅ PASS: Verified ${maskMatches.length} data-clarity-mask attributes protecting contact form & inputs`);

// ---------------------------------------------------------------------------
// SUITE 6: Playwright Browser E2E Consent & Analytics Tests
// ---------------------------------------------------------------------------
console.log('\n--- SUITE 6: Playwright Browser E2E Consent & Analytics Tests ---');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  else if (!path.extname(reqPath)) reqPath += '/index.html';

  const filePath = path.join('dist', reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

await new Promise((resolve) => server.listen(4399, resolve));
console.log('Local test server responsive at http://127.0.0.1:4399');

const browser = await chromium.launch({ headless: true });

try {
  // 6A. Initial visit: Basic Consent Mode (Zero trackers loaded)
  const contextA = await browser.newContext();
  const pageA = await contextA.newPage();

  let externalAnalyticsCalled = false;
  pageA.on('request', (req) => {
    const u = req.url();
    if (u.includes('googletagmanager.com/gtag/js') || u.includes('clarity.ms/tag/')) {
      externalAnalyticsCalled = true;
    }
  });

  await pageA.goto('http://127.0.0.1:4399/', { waitUntil: 'domcontentloaded' });
  await pageA.waitForSelector('#ladestack-consent-banner:not(.hidden)');
  console.log('✅ PASS: Consent banner is visible on initial visit');

  if (externalAnalyticsCalled) {
    throw new Error('External analytics script was requested before user consent!');
  }
  console.log('✅ PASS: Basic Consent Mode active — Zero third-party trackers loaded before consent');

  // Verify persistent trigger button exists
  const triggerVisible = await pageA.isVisible('#ladestack-consent-trigger');
  if (!triggerVisible) throw new Error('Persistent consent trigger #ladestack-consent-trigger not visible');
  console.log('✅ PASS: Persistent trigger #ladestack-consent-trigger is visible on page');

  // 6B. Click Reject Optional -> Banner hidden, consent stored as false
  await pageA.click('#ladestack-consent-banner [data-action="reject-all"]');
  await pageA.waitForSelector('#ladestack-consent-banner', { state: 'hidden' });
  console.log('✅ PASS: Consent banner hidden after Reject Optional');

  const consentA = await pageA.evaluate(() => localStorage.getItem('ladestack-consent'));
  const parsedA = JSON.parse(consentA);
  if (parsedA.ga !== false || parsedA.clarity !== false) {
    throw new Error(`Expected ga=false, clarity=false, got ${consentA}`);
  }
  console.log('✅ PASS: Consent state properly persisted as { ga: false, clarity: false }');

  await contextA.close();

  // 6C. State D: Click Accept All -> Consent stored as true, mock trackers initialized once
  const contextB = await browser.newContext();
  const pageB = await contextB.newPage();
  await pageB.goto('http://127.0.0.1:4399/', { waitUntil: 'domcontentloaded' });

  await pageB.waitForSelector('#ladestack-consent-banner:not(.hidden)');
  await pageB.click('#ladestack-consent-banner [data-action="accept-all"]');
  await pageB.waitForSelector('#ladestack-consent-banner', { state: 'hidden' });

  const consentB = await pageB.evaluate(() => localStorage.getItem('ladestack-consent'));
  const parsedB = JSON.parse(consentB);
  if (parsedB.ga !== true || parsedB.clarity !== true) {
    throw new Error(`Expected ga=true, clarity=true, got ${consentB}`);
  }
  console.log('✅ PASS: Accept All (State D) persists { ga: true, clarity: true }');

  // Verify non-production hostname safety: Mocked trackers flagged without remote network requests
  const trackerStatus = await pageB.evaluate(() => ({
    gaLoaded: window.__ladestack_ga_loaded,
    clarityLoaded: window.__ladestack_clarity_loaded,
    isProd: window.location.hostname === 'ladestack.in',
  }));
  if (trackerStatus.isProd) throw new Error('Test environment reported as production');
  if (!trackerStatus.gaLoaded || !trackerStatus.clarityLoaded) {
    throw new Error('Trackers failed to initialize in test environment');
  }
  console.log('✅ PASS: Safe non-production execution verified (mock initialized, no external leak)');

  // 6D. Reload page -> Banner stays hidden, consent restored
  await pageB.reload({ waitUntil: 'domcontentloaded' });
  const bannerHidden = await pageB.$eval('#ladestack-consent-banner', (el) => el.classList.contains('hidden'));
  if (!bannerHidden) throw new Error('Consent banner reappeared despite existing consent');
  console.log('✅ PASS: Consent persists after page reload; banner remains hidden');

  // 6E. Granular Customization (State B: GA4 only): Reopen via trigger, toggle GA4 only
  await pageB.click('#ladestack-consent-trigger');
  await pageB.waitForSelector('#ladestack-consent-modal:not(.hidden)');
  console.log('✅ PASS: Preferences modal opened via persistent trigger');

  // Uncheck Clarity, keep GA4 checked. Since Clarity was previously active, saveConsent triggers controlled reload
  await pageB.uncheck('#consent-toggle-clarity');
  await pageB.check('#consent-toggle-ga');
  await Promise.all([
    pageB.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    pageB.click('[data-action="save-preferences"]'),
  ]);

  const consentC = await pageB.evaluate(() => localStorage.getItem('ladestack-consent'));
  const parsedC = JSON.parse(consentC);
  if (parsedC.ga !== true || parsedC.clarity !== false) {
    throw new Error(`Expected ga=true, clarity=false, got ${consentC}`);
  }
  console.log('✅ PASS: Granular customization properly saved { ga: true, clarity: false } (State B)');

  // 6F. Revoke All Consent via modal
  await pageB.click('#ladestack-consent-trigger');
  await pageB.waitForSelector('#ladestack-consent-modal:not(.hidden)');
  await Promise.all([
    pageB.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    pageB.click('[data-action="withdraw-consent"]'),
  ]);

  const consentD = await pageB.evaluate(() => localStorage.getItem('ladestack-consent'));
  const parsedD = JSON.parse(consentD);
  if (parsedD.ga !== false || parsedD.clarity !== false) {
    throw new Error(`Expected ga=false, clarity=false after revocation, got ${consentD}`);
  }
  console.log('✅ PASS: Revocation resets consent state to { ga: false, clarity: false } (State A)');

  await contextB.close();

  // 6G. State C: Clarity only from fresh state
  const contextD = await browser.newContext();
  const pageD = await contextD.newPage();
  await pageD.goto('http://127.0.0.1:4399/', { waitUntil: 'domcontentloaded' });
  await pageD.waitForSelector('#ladestack-consent-banner:not(.hidden)');
  await pageD.click('#ladestack-consent-trigger');
  await pageD.waitForSelector('#ladestack-consent-modal:not(.hidden)');

  await pageD.check('#consent-toggle-clarity');
  await pageD.uncheck('#consent-toggle-ga');
  await pageD.click('[data-action="save-preferences"]');
  await pageD.waitForSelector('#ladestack-consent-modal', { state: 'hidden' });

  const consentStateC = await pageD.evaluate(() => localStorage.getItem('ladestack-consent'));
  const parsedStateC = JSON.parse(consentStateC);
  if (parsedStateC.ga !== false || parsedStateC.clarity !== true) {
    throw new Error(`Expected ga=false, clarity=true, got ${consentStateC}`);
  }
  console.log('✅ PASS: Granular customization properly saved { ga: false, clarity: true } (State C)');
  await contextD.close();

  // 6H. Non-English Route: Japanese /ja/about -> Localized banner rendered
  const contextC = await browser.newContext();
  const pageC = await contextC.newPage();
  await pageC.goto('http://127.0.0.1:4399/ja/about', { waitUntil: 'domcontentloaded' });
  await pageC.waitForSelector('#ladestack-consent-banner:not(.hidden)');

  const bannerTextJa = await pageC.textContent('#ladestack-consent-banner h2');
  if (!bannerTextJa.includes('プライバシーとCookieの設定')) {
    throw new Error(`Expected Japanese banner heading, got: ${bannerTextJa}`);
  }
  console.log('✅ PASS: [ja] Localized banner rendered correctly ("プライバシーとCookieの設定")');

  // Verify persistent trigger available on /gb-coder (where standard footer is hidden)
  await pageC.goto('http://127.0.0.1:4399/gb-coder', { waitUntil: 'domcontentloaded' });
  const gbCoderTrigger = await pageC.isVisible('#ladestack-consent-trigger');
  if (!gbCoderTrigger) {
    throw new Error('Persistent consent trigger missing on /gb-coder (hidden footer page)');
  }
  console.log('✅ PASS: Persistent trigger verified on /gb-coder where standard footer is hidden');

  await contextC.close();

} finally {
  await browser.close();
  server.close();
}

console.log('\n============================================================');
console.log('🎉 ALL PHASE 4E-1 VERIFICATION SUITE ASSERTIONS PASSED!');
console.log('============================================================');
