import { LOCALES, DEFAULT_LOCALE, LOCALE_CONFIG } from '../src/i18n/config.ts';
import { TRANSLATIONS, getLocalizedPath, getHreflangLinks, stripLocaleFromPath } from '../src/i18n/utils.ts';

console.log('--- 1. Testing Locale Configuration ---');
console.log('Supported Locales count:', LOCALES.length);
if (LOCALES.length !== 9) {
  throw new Error(`Expected exactly 9 locales, found ${LOCALES.length}`);
}

const requiredLocales = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];
for (const req of requiredLocales) {
  if (!LOCALES.includes(req)) {
    throw new Error(`Missing required locale: ${req}`);
  }
}
console.log('✓ All 9 expected locales are present.');

console.log('\n--- 2. Testing Translation Key Completeness ---');
const enKeys = Object.keys(TRANSLATIONS.en);
console.log(`Master (en) key count: ${enKeys.length}`);

let totalKeysChecked = 0;
let errors = 0;

for (const loc of LOCALES) {
  const dict = TRANSLATIONS[loc];
  if (!dict) {
    console.error(`Missing translation dictionary for locale: ${loc}`);
    errors++;
    continue;
  }
  for (const key of enKeys) {
    totalKeysChecked++;
    const val = dict[key];
    if (typeof val !== 'string' || val.trim().length === 0) {
      console.error(`[${loc}] Missing or empty key: ${key}`);
      errors++;
    }
  }
}

if (errors > 0) {
  throw new Error(`Found ${errors} translation completeness errors.`);
}
console.log(`✓ All ${totalKeysChecked} keys across 9 locales are present, non-empty, and typed.`);

console.log('\n--- 3. Testing Route Path Helpers ---');
const pathTests = [
  { path: '/', locale: 'en', expected: '/' },
  { path: '/', locale: 'ja', expected: '/ja' },
  { path: '/', locale: 'es', expected: '/es' },
  { path: '/ja', locale: 'en', expected: '/' },
  { path: '/ja', locale: 'ko', expected: '/ko' },
  // In Phase 2A: un-localized routes like /about safely stay /about to prevent 404 links
  { path: '/about', locale: 'en', expected: '/about' },
  { path: '/about', locale: 'zh', expected: '/about' },
];

for (const test of pathTests) {
  const actual = getLocalizedPath(test.path, test.locale);
  if (actual !== test.expected) {
    throw new Error(`Path test failed: getLocalizedPath("${test.path}", "${test.locale}") => expected "${test.expected}", got "${actual}"`);
  }
}
console.log('✓ All path transformation assertions passed.');

console.log('\n--- 4. Testing Reciprocal Hreflang Generation ---');
const homeHreflangs = getHreflangLinks('/', LOCALES, 'https://ladestack.in');
console.log(`Generated hreflangs for homepage: ${homeHreflangs.length} tags`);
// Expected: 9 locales + 1 x-default = 10 tags
if (homeHreflangs.length !== 10) {
  throw new Error(`Expected 10 hreflang tags for homepage (9 locales + x-default), got ${homeHreflangs.length}`);
}

const xDefault = homeHreflangs.find((h) => h.lang === 'x-default');
if (!xDefault || xDefault.href !== 'https://ladestack.in') {
  throw new Error(`x-default hreflang incorrect: ${JSON.stringify(xDefault)}`);
}

const jaHreflang = homeHreflangs.find((h) => h.lang === 'ja');
if (!jaHreflang || jaHreflang.href !== 'https://ladestack.in/ja') {
  throw new Error(`ja hreflang incorrect: ${JSON.stringify(jaHreflang)}`);
}

const unsharedHreflangs = getHreflangLinks('/docs', ['en'], 'https://ladestack.in');
if (unsharedHreflangs.length !== 0) {
  throw new Error(`Expected 0 hreflangs for single-locale route /docs, got ${unsharedHreflangs.length}`);
}

console.log('✓ Hreflang generation is reciprocal, includes x-default, and avoids fake alternates for single-locale routes.');
console.log('\n✅ All automated i18n tests PASSED successfully!');
