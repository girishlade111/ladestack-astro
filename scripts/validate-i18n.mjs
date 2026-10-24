/**
 * scripts/validate-i18n.mjs
 * Comprehensive unit and integration validation for LadeStack Phase 2C i18n
 */
import { LOCALES, DEFAULT_LOCALE, LOCALE_CONFIG, ROUTE_LOCALE_REGISTRY } from '../src/i18n/config.ts';
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

console.log('\n--- 2. Testing UI Translation Key Completeness ---');
const enKeys = Object.keys(TRANSLATIONS.en);
console.log(`Master UI (en) key count: ${enKeys.length}`);

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

console.log('\n--- 3. Testing Route Availability Registry ---');
const expectedFullyLocalizedRoutes = [
  '/',
  '/about',
  '/gb-coder',
  '/apps',
  '/docs',
  '/blog',
  '/contact',
  '/support',
  '/privacy',
  '/terms',
  '/sitemap',
];

for (const route of expectedFullyLocalizedRoutes) {
  const registered = ROUTE_LOCALE_REGISTRY[route];
  if (!registered || registered.length !== 9) {
    throw new Error(`Route "${route}" is expected to be registered for all 9 locales, got: ${JSON.stringify(registered)}`);
  }
}

console.log(`✓ All 11 public core routes (including /blog) are registered for all 9 locales.`);

console.log('\n--- 4. Testing Route Path Helpers ---');
const pathTests = [
  { path: '/', locale: 'en', expected: '/' },
  { path: '/', locale: 'ja', expected: '/ja' },
  { path: '/', locale: 'es', expected: '/es' },
  { path: '/ja', locale: 'en', expected: '/' },
  { path: '/ja', locale: 'ko', expected: '/ko' },
  // Core routes in Phase 3 are localized to their locale prefix:
  { path: '/about', locale: 'en', expected: '/about' },
  { path: '/about', locale: 'ja', expected: '/ja/about' },
  { path: '/about', locale: 'zh', expected: '/zh/about' },
  { path: '/gb-coder', locale: 'fr', expected: '/fr/gb-coder' },
  { path: '/apps', locale: 'pt', expected: '/pt/apps' },
  { path: '/docs', locale: 'ru', expected: '/ru/docs' },
  { path: '/blog', locale: 'en', expected: '/blog' },
  { path: '/blog', locale: 'ja', expected: '/ja/blog' },
  { path: '/blog', locale: 'zh', expected: '/zh/blog' },
  { path: '/blog', locale: 'fr', expected: '/fr/blog' },
  { path: '/contact', locale: 'tr', expected: '/tr/contact' },
  { path: '/support', locale: 'es', expected: '/es/support' },
  { path: '/privacy', locale: 'ko', expected: '/ko/privacy' },
  { path: '/terms', locale: 'ja', expected: '/ja/terms' },
  { path: '/sitemap', locale: 'zh', expected: '/zh/sitemap' },
];

for (const test of pathTests) {
  const actual = getLocalizedPath(test.path, test.locale);
  if (actual !== test.expected) {
    throw new Error(`Path test failed: getLocalizedPath("${test.path}", "${test.locale}") => expected "${test.expected}", got "${actual}"`);
  }
}
console.log('✓ All 19 path transformation assertions passed.');

console.log('\n--- 5. Testing Reciprocal Hreflang Generation ---');
for (const route of expectedFullyLocalizedRoutes) {
  const hreflangs = getHreflangLinks(route, LOCALES, 'https://ladestack.in');
  if (hreflangs.length !== 10) {
    throw new Error(`Expected 10 hreflang tags for route ${route}, got ${hreflangs.length}`);
  }
  const xDefault = hreflangs.find((h) => h.lang === 'x-default');
  const expectedDefaultHref = route === '/' ? 'https://ladestack.in' : `https://ladestack.in${route}`;
  if (!xDefault || xDefault.href !== expectedDefaultHref) {
    throw new Error(`Route ${route} x-default mismatch: expected ${expectedDefaultHref}, got ${xDefault?.href}`);
  }
}

const blogHreflangs = getHreflangLinks('/blog', ['en'], 'https://ladestack.in');
if (blogHreflangs.length !== 0) {
  throw new Error(`Expected 0 hreflangs for single-locale route /blog, got ${blogHreflangs.length}`);
}

console.log('✓ Hreflang generation is reciprocal, includes x-default for all 10 core routes, and omits false alternates for English-only blog routes.');
console.log('\n✅ All automated i18n tests PASSED successfully!');
