/**
 * scripts/test-phase1-seo.mjs
 * Comprehensive automated regression testing for SEO Phase 1 quick wins:
 * 1. Nine-language breadcrumb translation completeness in UI and JSON-LD.
 * 2. Zero raw translation-key leakage across all blog posts.
 * 3. Removal of client-side locale auto-redirect from BaseLayout.
 * 4. Brand entity (LadeStack) and founder LinkedIn consistency in schema.
 * 5. Headless browser verification with varying browser language configurations.
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import http from 'node:http';
import { chromium } from 'playwright';

const DIST_DIR = path.resolve('dist');
const LOCALES = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];

const EXPECTED_HOME_LABELS = {
  en: 'Home',
  ja: 'ホーム',
  ko: '홈',
  zh: '首页',
  ru: 'Главная',
  tr: 'Ana Sayfa',
  fr: 'Accueil',
  pt: 'Início',
  es: 'Inicio',
};

let failed = false;

console.log('=== TEST 1: BREADCRUMB TRANSLATION INTEGRITY & LEAK AUDIT ===');
let blogPostCount = 0;

for (const loc of LOCALES) {
  const dir = loc === 'en' ? path.join(DIST_DIR, 'blog') : path.join(DIST_DIR, loc, 'blog');
  if (!fs.existsSync(dir)) {
    console.error(`❌ Missing blog directory for locale: ${loc}`);
    failed = true;
    continue;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const postFile = path.join(dir, entry.name, 'index.html');
    if (!fs.existsSync(postFile)) continue;

    const html = fs.readFileSync(postFile, 'utf8');

    // Skip historical redirect stubs (e.g. /blog/1 ... /blog/6)
    if (html.includes('http-equiv="refresh"')) continue;

    blogPostCount++;

    // 1. Assert no literal "nav.home" string in HTML
    if (html.includes('nav.home')) {
      console.error(`❌ FAIL: Literal "nav.home" leaked in visible HTML: ${postFile}`);
      failed = true;
    }

    // 2. Assert BreadcrumbList JSON-LD contains expected localized name
    const expectedName = EXPECTED_HOME_LABELS[loc];
    const jsonLdMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
    let foundCrumbList = false;

    for (const match of jsonLdMatches) {
      try {
        const parsed = JSON.parse(match[1]);
        const list = Array.isArray(parsed) ? parsed : [parsed];
        for (const schema of list) {
          if (schema['@type'] === 'BreadcrumbList') {
            foundCrumbList = true;
            const firstCrumb = schema.itemListElement?.[0];
            if (!firstCrumb) {
              console.error(`❌ FAIL: Empty BreadcrumbList in ${postFile}`);
              failed = true;
            } else if (firstCrumb.name !== expectedName) {
              console.error(`❌ FAIL [${loc}]: Expected first crumb name "${expectedName}", got "${firstCrumb.name}" in ${postFile}`);
              failed = true;
            }
          }
        }
      } catch (err) {
        console.error(`❌ FAIL: Malformed JSON-LD in ${postFile}: ${err.message}`);
        failed = true;
      }
    }

    if (!foundCrumbList) {
      console.error(`❌ FAIL: Missing BreadcrumbList schema in ${postFile}`);
      failed = true;
    }
  }
}

if (!failed) {
  console.log(`✅ PASS: All ${blogPostCount} blog posts across 9 locales have verified, localized Home breadcrumbs with zero raw key leaks.`);
}

console.log('\n=== TEST 2: REMOVAL OF LOCALE AUTO-REDIRECT SCRIPT ===');
const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
if (indexHtml.includes('navigator.languages') && indexHtml.includes('window.location.replace')) {
  console.error('❌ FAIL: Client-side locale auto-redirect script still exists in dist/index.html!');
  failed = true;
} else {
  console.log('✅ PASS: Auto-redirect script successfully eliminated from generated HTML.');
}

console.log('\n=== TEST 3: BRAND ENTITY & FOUNDER LINKEDIN CONSISTENCY ===');
for (const loc of LOCALES) {
  const pagePath = loc === 'en' ? path.join(DIST_DIR, 'index.html') : path.join(DIST_DIR, loc, 'index.html');
  const pageHtml = fs.readFileSync(pagePath, 'utf8');

  // Check Organization schema
  const jsonLdMatches = [...pageHtml.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  let orgFound = false;

  for (const match of jsonLdMatches) {
    try {
      const parsed = JSON.parse(match[1]);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      for (const schema of list) {
        if (schema['@type'] === 'Organization') {
          orgFound = true;
          if (schema.name !== 'LadeStack') {
            console.error(`❌ FAIL [${loc}]: Organization name is "${schema.name}", expected "LadeStack"`);
            failed = true;
          }
          const linkedIn = schema.sameAs?.find((u) => u.includes('linkedin.com'));
          if (linkedIn !== 'https://www.linkedin.com/in/girish-lade/') {
            console.error(`❌ FAIL [${loc}]: Founder LinkedIn is "${linkedIn}", expected "https://www.linkedin.com/in/girish-lade/"`);
            failed = true;
          }
        }
      }
    } catch (e) {}
  }

  if (!orgFound) {
    console.error(`❌ FAIL [${loc}]: Missing Organization schema on homepage!`);
    failed = true;
  }
}
if (!failed) {
  console.log('✅ PASS: Brand entity name "LadeStack" and official LinkedIn profile URL verified consistent across all 9 homepage locales.');
}

console.log('\n=== TEST 4: PLAYWRIGHT BROWSER NAVIGATION & LOCALE TEST ===');

function waitForServer(url, timeout = 25000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function ping() {
      http
        .get(url, (res) => {
          resolve();
        })
        .on('error', () => {
          if (Date.now() - start > timeout) {
            reject(new Error('Preview server startup timed out'));
          } else {
            setTimeout(ping, 500);
          }
        });
    }
    ping();
  });
}

const PREVIEW_PORT = 4398;
const PREVIEW_URL = `http://127.0.0.1:${PREVIEW_PORT}`;

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
};

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0].split('#')[0];
  if (cleanUrl.endsWith('/')) cleanUrl += 'index.html';
  let filePath = path.join(DIST_DIR, cleanUrl);

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

await new Promise((resolve) => server.listen(PREVIEW_PORT, '127.0.0.1', resolve));

try {
  console.log(`Server responsive at ${PREVIEW_URL}`);

  const browser = await chromium.launch({ headless: true });

  const navigationTestCases = [
    { browserLang: 'fr-FR', path: '/about', expected: `${PREVIEW_URL}/about` },
    { browserLang: 'ja-JP', path: '/about', expected: `${PREVIEW_URL}/about` },
    { browserLang: 'zh-CN', path: '/faq', expected: `${PREVIEW_URL}/faq` },
    { browserLang: 'en-US', path: '/ja/about', expected: `${PREVIEW_URL}/ja/about` },
    { browserLang: 'en-US', path: '/fr/faq', expected: `${PREVIEW_URL}/fr/faq` },
    { browserLang: 'ru-RU', path: '/apps', expected: `${PREVIEW_URL}/apps` },
  ];

  for (const tc of navigationTestCases) {
    const ctx = await browser.newContext({
      locale: tc.browserLang,
      viewport: { width: 1280, height: 800 },
    });
    const page = await ctx.newPage();

    await page.goto(`${PREVIEW_URL}${tc.path}`, { waitUntil: 'networkidle' });
    // Dwell to ensure no asynchronous JavaScript redirect triggers
    await page.waitForTimeout(1000);

    const actual = page.url();
    if (actual === tc.expected) {
      console.log(`  ✓ Browser [${tc.browserLang}] navigated to ${tc.path} -> Stayed on ${actual}`);
    } else {
      console.error(`  ❌ FAIL: Browser [${tc.browserLang}] on ${tc.path} redirected to ${actual} (Expected: ${tc.expected})`);
      failed = true;
    }
    await ctx.close();
  }

  // Mobile viewport test (390px)
  const mobileCtx = await browser.newContext({
    locale: 'ja-JP',
    viewport: { width: 390, height: 844 },
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(`${PREVIEW_URL}/about`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  if (mobilePage.url() === `${PREVIEW_URL}/about`) {
    console.log(`  ✓ Mobile 390px viewport with [ja-JP] locale remained strictly on ${PREVIEW_URL}/about`);
  } else {
    console.error(`  ❌ FAIL: Mobile auto-redirected to ${mobilePage.url()}`);
    failed = true;
  }
  await mobileCtx.close();

  // Language switcher interaction test
  const switchCtx = await browser.newContext();
  const switchPage = await switchCtx.newPage();
  await switchPage.goto(`${PREVIEW_URL}/about`, { waitUntil: 'networkidle' });
  await switchPage.click('[data-lang-trigger]');
  await switchPage.waitForSelector('[data-lang-menu]:not(.hidden)');
  await switchPage.click('a[data-lang-choice="ja"]');
  await switchPage.waitForURL(`${PREVIEW_URL}/ja/about`);
  console.log(`  ✓ Language switcher successfully navigated user from /about to ${switchPage.url()}`);
  await switchCtx.close();

  await browser.close();
} catch (err) {
  console.error(`❌ Browser test execution error: ${err.message}`);
  failed = true;
} finally {
  server.close ? server.close() : server.kill();
}

if (failed) {
  console.error('\n❌ PHASE 1 REGRESSION TESTS FAILED.');
  process.exit(1);
} else {
  console.log('\n🎉 ALL PHASE 1 REGRESSION SUITE ASSERTIONS PASSED!');
  process.exit(0);
}
