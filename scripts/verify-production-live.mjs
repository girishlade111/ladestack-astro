import { chromium } from 'playwright';

const PROD_ORIGIN = 'https://ladestack.in';
const GA_ID = 'G-C6GRNN3J11';
const CLARITY_ID = 'z5fy1scjjr';

async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function runProductionAudit() {
  console.log('============================================================');
  console.log('LADESTACK — PHASE 4E LIVE PRODUCTION VERIFICATION');
  console.log('Target: ' + PROD_ORIGIN);
  console.log('============================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  // --- SUITE 1: HTTP & Security Headers ---
  console.log('--- SUITE 1: HTTP Status & Headers on ladestack.in ---');
  try {
    const res = await fetchWithTimeout(PROD_ORIGIN, { headers: { 'User-Agent': 'Mozilla/5.0 LadeStackQA/1.0' } });
    assert(res.status === 200, `HTTP status is 200 OK (got ${res.status})`);
    
    const csp = res.headers.get('content-security-policy-report-only') || '';
    assert(csp.includes('https://www.googletagmanager.com'), 'CSP permits https://www.googletagmanager.com');
    assert(csp.includes('https://*.google-analytics.com'), 'CSP permits https://*.google-analytics.com');
    assert(csp.includes('https://www.clarity.ms') || csp.includes('https://*.clarity.ms'), 'CSP permits Clarity domains');
    assert(csp.includes('https://scripts.clarity.ms'), 'CSP permits https://scripts.clarity.ms');
    assert(csp.includes('https://c.bing.com'), 'CSP permits https://c.bing.com');

    const html = await res.text();
    assert(html.includes("gtag('consent', 'default'"), 'Google Consent Mode v2 default denial in HTML head');
    assert(html.includes('id="ladestack-consent-banner"'), 'Consent banner markup present');
    assert(html.includes('id="ladestack-consent-trigger"'), 'Consent persistent trigger present');

    // Verify IDs in /privacy disclosure
    const privRes = await fetchWithTimeout(`${PROD_ORIGIN}/privacy`);
    const privHtml = await privRes.text();
    assert(privHtml.includes(GA_ID), `GA4 Measurement ID ${GA_ID} disclosed in /privacy`);
    assert(privHtml.includes(CLARITY_ID), `Microsoft Clarity ID ${CLARITY_ID} disclosed in /privacy`);
  } catch (err) {
    assert(false, `HTTP fetch failed: ${err.message}`);
  }

  // --- SUITE 2: WWW HTTP 308 Redirect ---
  console.log('\n--- SUITE 2: WWW to Apex Canonical Redirect ---');
  try {
    const resWww = await fetchWithTimeout('https://www.ladestack.in/', { redirect: 'manual' });
    const is308or301 = resWww.status === 308 || resWww.status === 301;
    const location = resWww.headers.get('location') || '';
    assert(is308or301 && location.includes('https://ladestack.in'), `www.ladestack.in redirects with ${resWww.status} to ${location}`);
  } catch (err) {
    assert(false, `WWW redirect check failed: ${err.message}`);
  }

  // --- SUITE 3: SEO & System Assets ---
  console.log('\n--- SUITE 3: Robots.txt & Sitemap Index ---');
  try {
    const robotsRes = await fetchWithTimeout(`${PROD_ORIGIN}/robots.txt`);
    const robotsTxt = await robotsRes.text();
    assert(robotsRes.status === 200, 'robots.txt returns 200');
    assert(robotsTxt.includes('Sitemap: https://ladestack.in/sitemap-index.xml'), 'robots.txt specifies correct sitemap index');

    const sitemapRes = await fetchWithTimeout(`${PROD_ORIGIN}/sitemap-index.xml`);
    assert(sitemapRes.status === 200, 'sitemap-index.xml returns 200');
  } catch (err) {
    assert(false, `SEO assets check failed: ${err.message}`);
  }

  // --- SUITE 4: Nine Locales Accessibility ---
  console.log('\n--- SUITE 4: Nine Locales Health Check ---');
  const locales = ['ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];
  for (const loc of locales) {
    try {
      const locRes = await fetchWithTimeout(`${PROD_ORIGIN}/${loc}`, { headers: { 'User-Agent': 'Mozilla/5.0 LadeStackQA/1.0' } });
      assert(locRes.status === 200, `/${loc} returns 200 OK`);
    } catch (e) {
      assert(false, `/${loc} failed: ${e.message}`);
    }
  }

  // --- SUITE 5: Playwright E2E Live Browser Verification ---
  console.log('\n--- SUITE 5: Playwright Live Browser E2E Consent & Analytics ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 LadeStackQA/1.0'
  });
  const page = await context.newPage();

  const networkRequests = [];
  page.on('request', req => {
    const url = req.url();
    if (
      url.includes('google-analytics.com') ||
      url.includes('googletagmanager.com/gtag') ||
      url.includes('clarity.ms') ||
      url.includes('c.bing.com')
    ) {
      networkRequests.push({ url, method: req.method() });
    }
  });

  // Step 5A: Fresh Visit
  console.log('Testing Scenario 1: Fresh Visit...');
  await page.goto(PROD_ORIGIN, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  
  const bannerVisible = await page.isVisible('#ladestack-consent-banner:not(.hidden)');
  assert(bannerVisible, 'Consent banner is visible on initial load');

  const initialTrackers = networkRequests.filter(r => 
    r.url.includes('googletagmanager.com/gtag') || 
    r.url.includes('google-analytics.com/g/collect') || 
    r.url.includes('clarity.ms/tag') ||
    r.url.includes('clarity.ms/collect')
  );
  assert(initialTrackers.length === 0, `Zero third-party tracking network requests before consent (observed: ${initialTrackers.length})`);

  let cookies = await context.cookies();
  let trackingCookies = cookies.filter(c => c.name.startsWith('_ga') || c.name.startsWith('_cl'));
  assert(trackingCookies.length === 0, `Zero tracking cookies on fresh visit (observed: ${trackingCookies.length})`);

  // Step 5B: Reject Optional
  console.log('Testing Scenario 2: Reject Optional...');
  await page.click('#ladestack-consent-banner [data-action="reject-all"]');
  await page.waitForSelector('#ladestack-consent-banner', { state: 'hidden' });
  
  let consentData = await page.evaluate(() => JSON.parse(localStorage.getItem('ladestack-consent') || '{}'));
  assert(consentData.ga === false && consentData.clarity === false, 'Consent saved as ga=false, clarity=false');

  cookies = await context.cookies();
  trackingCookies = cookies.filter(c => c.name.startsWith('_ga') || c.name.startsWith('_cl'));
  assert(trackingCookies.length === 0, `Zero tracking cookies after Reject Optional (observed: ${trackingCookies.length})`);

  // Step 5C: Persistence across reload
  console.log('Testing Scenario 3: Persistence Across Reload...');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  const bannerHiddenOnReload = !(await page.isVisible('#ladestack-consent-banner:not(.hidden)'));
  assert(bannerHiddenOnReload, 'Banner remains hidden on reload after Reject Optional');

  const postReloadTrackers = networkRequests.filter(r => 
    r.url.includes('google-analytics.com/g/collect') || 
    r.url.includes('clarity.ms/tag')
  );
  assert(postReloadTrackers.length === 0, 'No trackers loaded on reload with rejected consent');

  // Step 5D: Accept GA4 Only via Modal
  console.log('Testing Scenario 4: Granular Consent — GA4 Only...');
  await page.click('#ladestack-consent-trigger');
  await page.waitForSelector('#ladestack-consent-modal:not(.hidden)');

  // Set ga = checked, clarity = unchecked
  const gaCheckbox = await page.$('#consent-toggle-ga');
  const clarityCheckbox = await page.$('#consent-toggle-clarity');
  if (gaCheckbox && clarityCheckbox) {
    const isGaChecked = await gaCheckbox.isChecked();
    if (!isGaChecked) await gaCheckbox.check();
    const isClarityChecked = await clarityCheckbox.isChecked();
    if (isClarityChecked) await clarityCheckbox.uncheck();
  }

  networkRequests.length = 0; // reset log
  await page.click('[data-action="save-preferences"]');
  await page.waitForSelector('#ladestack-consent-modal', { state: 'hidden' });

  consentData = await page.evaluate(() => JSON.parse(localStorage.getItem('ladestack-consent') || '{}'));
  assert(consentData.ga === true && consentData.clarity === false, 'Preferences saved: ga=true, clarity=false');

  // Wait for dynamic tracker injection and collection request
  await page.waitForTimeout(3500);

  const gaScriptLoaded = networkRequests.some(r => r.url.includes('googletagmanager.com/gtag'));
  const gaCollectLoaded = networkRequests.some(r => (r.url.includes('google-analytics.com') || r.url.includes('analytics.google.com')) && r.url.includes('tid=G-C6GRNN3J11'));
  const clarityLoaded = networkRequests.some(r => r.url.includes('clarity.ms'));

  assert(gaScriptLoaded, `GA4 gtag.js script loaded when GA4 accepted (observed: ${gaScriptLoaded})`);
  assert(gaCollectLoaded, `GA4 collection ping (g/collect with tid=G-C6GRNN3J11) fired (observed: ${gaCollectLoaded})`);
  assert(!clarityLoaded, `Clarity script NOT triggered when Clarity rejected (observed: ${!clarityLoaded})`);

  // Step 5E: Accept All in Fresh Context
  console.log('Testing Scenario 5: Accept All in Fresh Context...');
  const contextAll = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 LadeStackQA/1.0'
  });
  const pageAll = await contextAll.newPage();
  const allRequests = [];
  pageAll.on('request', req => {
    const u = req.url();
    if (u.includes('google-analytics.com') || u.includes('googletagmanager.com/gtag') || u.includes('clarity.ms')) {
      allRequests.push(u);
    }
  });

  await pageAll.goto(PROD_ORIGIN, { waitUntil: 'domcontentloaded' });
  await pageAll.waitForSelector('#ladestack-consent-banner:not(.hidden)');
  await pageAll.click('#ladestack-consent-banner [data-action="accept-all"]');
  await pageAll.waitForSelector('#ladestack-consent-banner', { state: 'hidden' });

  await pageAll.waitForTimeout(2500);

  const consentAllData = await pageAll.evaluate(() => JSON.parse(localStorage.getItem('ladestack-consent') || '{}'));
  assert(consentAllData.ga === true && consentAllData.clarity === true, 'Accept All saved: ga=true, clarity=true');

  const gaAllLoaded = allRequests.some(u => u.includes('googletagmanager.com/gtag') || u.includes('google-analytics.com'));
  const clarityAllLoaded = allRequests.some(u => u.includes('clarity.ms'));
  assert(gaAllLoaded, 'GA4 script and collection active in Accept All state');
  assert(clarityAllLoaded, 'Microsoft Clarity script active in Accept All state');

  const clarityAllDefined = await pageAll.evaluate(() => typeof window.clarity === 'function');
  assert(clarityAllDefined, 'window.clarity function initialized in Accept All state');

  await contextAll.close();

  // Step 5F: Consent Withdrawal
  console.log('Testing Scenario 6: Revocation / Withdrawal...');
  await page.click('#ladestack-consent-trigger');
  await page.waitForSelector('#ladestack-consent-modal:not(.hidden)');

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.click('[data-action="withdraw-consent"]')
  ]);

  consentData = await page.evaluate(() => JSON.parse(localStorage.getItem('ladestack-consent') || '{}'));
  assert(consentData.ga === false && consentData.clarity === false, 'After withdrawal: ga=false, clarity=false');

  // Step 5G: Sensitive Field Masking on /contact
  console.log('Testing Scenario 7: Sensitive Input Masking on /contact...');
  await page.goto(`${PROD_ORIGIN}/contact`, { waitUntil: 'domcontentloaded' });
  const formMasked = await page.$eval('form', el => el.getAttribute('data-clarity-mask'));
  const nameMasked = await page.$eval('#name', el => el.getAttribute('data-clarity-mask'));
  const emailMasked = await page.$eval('#email', el => el.getAttribute('data-clarity-mask'));
  const messageMasked = await page.$eval('#message', el => el.getAttribute('data-clarity-mask'));

  assert(formMasked === 'true', 'Contact form has data-clarity-mask="true"');
  assert(nameMasked === 'true', 'Name input has data-clarity-mask="true"');
  assert(emailMasked === 'true', 'Email input has data-clarity-mask="true"');
  assert(messageMasked === 'true', 'Message textarea has data-clarity-mask="true"');

  await browser.close();

  console.log('\n============================================================');
  console.log(`PRODUCTION AUDIT COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log('============================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runProductionAudit().catch(err => {
  console.error('Fatal production audit error:', err);
  process.exit(1);
});
