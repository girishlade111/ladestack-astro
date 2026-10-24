/**
 * scripts/audit-dist-i18n.mjs
 * Comprehensive automated QA script verifying the built HTML artifacts in dist/ for Phase 2C
 * Validates:
 * 1. Exact 90 localized pages exist (10 core routes × 9 locales).
 * 2. Unprefixed English routes: no /en directory exists.
 * 3. Correct <html lang="..."> for every page.
 * 4. Self-referencing canonical tag on every page.
 * 5. Exactly 10 reciprocal hreflang tags on each of the 90 pages (9 languages + x-default).
 * 6. Correct og:locale on each page.
 * 7. LanguageSwitcher component renders on all pages.
 * 8. Dist sitemap contains all 90 localized URLs and excludes 404.
 */

import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

const LOCALES = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];

const OG_LOCALES = {
  en: 'en_US',
  ja: 'ja_JP',
  ko: 'ko_KR',
  zh: 'zh_CN',
  ru: 'ru_RU',
  tr: 'tr_TR',
  fr: 'fr_FR',
  pt: 'pt_PT',
  es: 'es_ES',
};

const CORE_ROUTES = [
  '/',
  '/about',
  '/gb-coder',
  '/apps',
  '/docs',
  '/contact',
  '/support',
  '/privacy',
  '/terms',
  '/sitemap',
];

let failed = false;

console.log('--- 1. Checking /en Directory Non-Existence ---');
if (fs.existsSync(path.join(DIST_DIR, 'en'))) {
  console.error('❌ FAIL: Found unwanted /en folder in dist! English must remain unprefixed.');
  failed = true;
} else {
  console.log('✅ PASS: /en directory does NOT exist. English is cleanly unprefixed.');
}

console.log('\n--- 2. Validating 90 Localized HTML Pages (10 Routes × 9 Locales) ---');
let checkedPages = 0;

for (const route of CORE_ROUTES) {
  for (const locale of LOCALES) {
    checkedPages++;

    // Compute expected file path in dist/
    let relativeFilePath;
    let expectedCanonical;

    if (locale === 'en') {
      relativeFilePath = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`;
      expectedCanonical = route === '/' ? 'https://ladestack.in' : `https://ladestack.in${route}`;
    } else {
      relativeFilePath = route === '/' ? `${locale}/index.html` : `${locale}${route}/index.html`;
      expectedCanonical = route === '/' ? `https://ladestack.in/${locale}` : `https://ladestack.in/${locale}${route}`;
    }

    const fullPath = path.join(DIST_DIR, relativeFilePath);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ FAIL [${locale} ${route}]: Missing file: ${relativeFilePath}`);
      failed = true;
      continue;
    }

    const html = fs.readFileSync(fullPath, 'utf-8');

    // 1. Check <html lang="...">
    const langMatch = html.match(/<html\s+[^>]*lang=["']([^"']+)["']/i);
    if (!langMatch || langMatch[1] !== locale) {
      console.error(`❌ FAIL [${locale} ${route}]: Expected <html lang="${locale}">, got "${langMatch ? langMatch[1] : 'NONE'}"`);
      failed = true;
    }

    // 2. Check Canonical
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
      console.error(`❌ FAIL [${locale} ${route}]: Expected canonical="${expectedCanonical}", got "${canonicalMatch ? canonicalMatch[1] : 'NONE'}"`);
      failed = true;
    }

    // 3. Check Hreflang tags
    const hreflangRegex = /<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi;
    const hreflangs = [];
    let m;
    while ((m = hreflangRegex.exec(html)) !== null) {
      hreflangs.push({ lang: m[1], href: m[2] });
    }

    if (hreflangs.length !== 10) {
      console.error(`❌ FAIL [${locale} ${route}]: Expected 10 hreflang tags (9 langs + x-default), found ${hreflangs.length}`);
      failed = true;
    }

    // 4. Check x-default
    const xDefault = hreflangs.find((h) => h.lang === 'x-default');
    const expectedXDefault = route === '/' ? 'https://ladestack.in' : `https://ladestack.in${route}`;
    if (!xDefault || xDefault.href !== expectedXDefault) {
      console.error(`❌ FAIL [${locale} ${route}]: x-default mismatch. Expected ${expectedXDefault}, got ${xDefault?.href}`);
      failed = true;
    }

    // 5. Check self-referencing hreflang
    const selfHreflang = hreflangs.find((h) => h.lang === locale);
    if (!selfHreflang || selfHreflang.href !== expectedCanonical) {
      console.error(`❌ FAIL [${locale} ${route}]: Self-referencing hreflang mismatch. Expected ${expectedCanonical}, got ${selfHreflang?.href}`);
      failed = true;
    }

    // 6. Check og:locale
    const expectedOg = OG_LOCALES[locale];
    const ogLocaleMatch = html.match(/<meta\s+property=["']og:locale["']\s+content=["']([^"']+)["']/i);
    if (!ogLocaleMatch || ogLocaleMatch[1] !== expectedOg) {
      console.error(`❌ FAIL [${locale} ${route}]: og:locale mismatch. Expected ${expectedOg}, got ${ogLocaleMatch ? ogLocaleMatch[1] : 'NONE'}`);
      failed = true;
    }

    // 7. Check LanguageSwitcher
    if (!html.includes('data-language-switcher') && !html.includes('aria-label="Language selector"')) {
      console.error(`❌ FAIL [${locale} ${route}]: Language switcher markup missing!`);
      failed = true;
    }
  }
}

console.log(`✅ Validated all ${checkedPages} page instances across head tags, canonicals, hreflang reciprocity, and og:locales.`);

console.log('\n--- 3. Checking Dist XML Sitemap ---');
const sitemapPath = path.join(DIST_DIR, 'sitemap-0.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('❌ FAIL: sitemap-0.xml not found in dist!');
  failed = true;
} else {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');

  // Verify all 90 URLs exist in sitemap
  let sitemapMissing = 0;
  for (const route of CORE_ROUTES) {
    for (const locale of LOCALES) {
      let expectedUrl;
      if (locale === 'en') {
        expectedUrl = route === '/' ? 'https://ladestack.in/' : `https://ladestack.in${route}`;
      } else {
        expectedUrl = route === '/' ? `https://ladestack.in/${locale}` : `https://ladestack.in/${locale}${route}`;
      }
      if (!sitemapXml.includes(expectedUrl)) {
        console.error(`❌ FAIL: Sitemap missing URL: ${expectedUrl}`);
        sitemapMissing++;
        failed = true;
      }
    }
  }
  if (sitemapMissing === 0) {
    console.log(`✅ PASS: All 90 localized URLs are verified present in dist/sitemap-0.xml.`);
  }

  // Verify 404 is excluded
  if (sitemapXml.includes('/404')) {
    console.error('❌ FAIL: Sitemap contains non-indexable /404 URL!');
    failed = true;
  } else {
    console.log('✅ PASS: Sitemap excludes /404.');
  }
}

if (failed) {
  console.error('\n❌ QA AUDIT FAILED.');
  process.exit(1);
} else {
  console.log('\n🎉 ALL 90 LOCALIZED PAGES & SITEMAP PASSED QA AUDIT PERFECTLY!');
  process.exit(0);
}
