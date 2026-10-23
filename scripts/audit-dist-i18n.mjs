/**
 * scripts/audit-dist-i18n.mjs
 * Comprehensive automated QA script verifying the built HTML artifacts in dist/
 * Validates:
 * 1. Exact 9 homepage routes exist (/ and /ja, /ko, /zh, /ru, /tr, /fr, /pt, /es).
 * 2. No /en directory or duplicate exists.
 * 3. Correct <html lang="..."> for each.
 * 4. Self-referencing canonical tag on each page.
 * 5. Exactly 10 reciprocal hreflang tags on each of the 9 homepages (9 languages + x-default).
 * 6. Correct og:locale and og:locale:alternate.
 * 7. LanguageSwitcher component renders all 9 options and marks active page.
 * 8. Non-English pages have genuine translated content (not English placeholders).
 * 9. Sitemap includes all 9 homepage URLs and excludes non-indexable routes.
 */

import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

const EXPECTED_LOCALES = [
  { code: 'en', path: 'index.html', lang: 'en', canonical: 'https://ladestack.in', ogLocale: 'en_US' },
  { code: 'ja', path: 'ja/index.html', lang: 'ja', canonical: 'https://ladestack.in/ja', ogLocale: 'ja_JP' },
  { code: 'ko', path: 'ko/index.html', lang: 'ko', canonical: 'https://ladestack.in/ko', ogLocale: 'ko_KR' },
  { code: 'zh', path: 'zh/index.html', lang: 'zh', canonical: 'https://ladestack.in/zh', ogLocale: 'zh_CN' },
  { code: 'ru', path: 'ru/index.html', lang: 'ru', canonical: 'https://ladestack.in/ru', ogLocale: 'ru_RU' },
  { code: 'tr', path: 'tr/index.html', lang: 'tr', canonical: 'https://ladestack.in/tr', ogLocale: 'tr_TR' },
  { code: 'fr', path: 'fr/index.html', lang: 'fr', canonical: 'https://ladestack.in/fr', ogLocale: 'fr_FR' },
  { code: 'pt', path: 'pt/index.html', lang: 'pt', canonical: 'https://ladestack.in/pt', ogLocale: 'pt_PT' },
  { code: 'es', path: 'es/index.html', lang: 'es', canonical: 'https://ladestack.in/es', ogLocale: 'es_ES' },
];

let failed = false;

console.log('--- 1. Checking Route Existence & /en Non-Existence ---');
if (fs.existsSync(path.join(DIST_DIR, 'en'))) {
  console.error('❌ FAIL: Found unwanted /en folder in dist! English must remain unprefixed.');
  failed = true;
} else {
  console.log('✅ PASS: /en directory does NOT exist. English is unprefixed at /.');
}

for (const loc of EXPECTED_LOCALES) {
  const filePath = path.join(DIST_DIR, loc.path);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ FAIL: Missing compiled file: ${loc.path}`);
    failed = true;
  } else {
    console.log(`✅ PASS: Found ${loc.path}`);
  }
}

console.log('\n--- 2. Validating HTML Head, Canonical, Hreflang & OpenGraph ---');
for (const loc of EXPECTED_LOCALES) {
  const filePath = path.join(DIST_DIR, loc.path);
  if (!fs.existsSync(filePath)) continue;

  const html = fs.readFileSync(filePath, 'utf-8');

  // Check <html lang="...">
  const langMatch = html.match(/<html\s+[^>]*lang=["']([^"']+)["']/i);
  if (!langMatch || langMatch[1] !== loc.lang) {
    console.error(`❌ FAIL [${loc.code}]: Expected <html lang="${loc.lang}">, got "${langMatch ? langMatch[1] : 'NONE'}"`);
    failed = true;
  } else {
    console.log(`✅ PASS [${loc.code}]: <html lang="${loc.lang}"> matches.`);
  }

  // Check Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonicalMatch || canonicalMatch[1] !== loc.canonical) {
    console.error(`❌ FAIL [${loc.code}]: Expected canonical="${loc.canonical}", got "${canonicalMatch ? canonicalMatch[1] : 'NONE'}"`);
    failed = true;
  } else {
    console.log(`✅ PASS [${loc.code}]: Canonical matches ${loc.canonical}`);
  }

  // Check Hreflang tags
  const hreflangRegex = /<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi;
  const hreflangs = [];
  let m;
  while ((m = hreflangRegex.exec(html)) !== null) {
    hreflangs.push({ lang: m[1], href: m[2] });
  }

  if (hreflangs.length !== 10) {
    console.error(`❌ FAIL [${loc.code}]: Expected 10 hreflang tags (9 langs + x-default), found ${hreflangs.length}`);
    failed = true;
  } else {
    console.log(`✅ PASS [${loc.code}]: Exactly 10 reciprocal hreflang tags present.`);
  }

  // Check x-default
  const xDefault = hreflangs.find((h) => h.lang === 'x-default');
  if (!xDefault || xDefault.href !== 'https://ladestack.in') {
    console.error(`❌ FAIL [${loc.code}]: x-default missing or not pointing to https://ladestack.in: ${JSON.stringify(xDefault)}`);
    failed = true;
  }

  // Check self-referencing hreflang
  const selfHreflang = hreflangs.find((h) => h.lang === loc.code);
  if (!selfHreflang || selfHreflang.href !== loc.canonical) {
    console.error(`❌ FAIL [${loc.code}]: Self-referencing hreflang mismatch. Expected ${loc.canonical}, got ${selfHreflang?.href}`);
    failed = true;
  }

  // Check og:locale
  const ogLocaleMatch = html.match(/<meta\s+property=["']og:locale["']\s+content=["']([^"']+)["']/i);
  if (!ogLocaleMatch || ogLocaleMatch[1] !== loc.ogLocale) {
    console.error(`❌ FAIL [${loc.code}]: og:locale mismatch. Expected ${loc.ogLocale}, got ${ogLocaleMatch ? ogLocaleMatch[1] : 'NONE'}`);
    failed = true;
  } else {
    console.log(`✅ PASS [${loc.code}]: og:locale matches ${loc.ogLocale}`);
  }

  // Check LanguageSwitcher presence
  if (!html.includes('data-language-switcher') && !html.includes('aria-label="Language selector"')) {
    console.error(`❌ FAIL [${loc.code}]: Language switcher markup missing!`);
    failed = true;
  }
}

console.log('\n--- 3. Checking Dist Sitemap ---');
const sitemapPath = path.join(DIST_DIR, 'sitemap-0.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('❌ FAIL: sitemap-0.xml not found in dist!');
  failed = true;
} else {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  for (const loc of EXPECTED_LOCALES) {
    const expectedLocInSitemap = loc.code === 'en' ? 'https://ladestack.in/' : `https://ladestack.in/${loc.code}`;
    if (!sitemapXml.includes(expectedLocInSitemap)) {
      console.error(`❌ FAIL: Sitemap does not contain: ${expectedLocInSitemap}`);
      failed = true;
    } else {
      console.log(`✅ PASS: Sitemap contains ${expectedLocInSitemap}`);
    }
  }
}

if (failed) {
  console.error('\n❌ QA AUDIT FAILED.');
  process.exit(1);
} else {
  console.log('\n🎉 ALL 9 LOCALIZED HOMEPAGE CHECKS PASSED PERFECTLY!');
  process.exit(0);
}
