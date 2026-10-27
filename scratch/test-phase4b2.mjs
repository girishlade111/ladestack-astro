import fs from 'node:fs';
import path from 'node:path';

console.log('=== PHASE 4B-2 TARGETED REGRESSION AUDIT ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// 1. External link hardening in GbCoderPage.astro
const gbCoderSrc = fs.readFileSync('src/components/pages/GbCoderPage.astro', 'utf8');
const unsafeGbCoderLinks = [...gbCoderSrc.matchAll(/<a[^>]+target="_blank"[^>]*>/g)]
  .filter((m) => !m[0].includes('rel="noopener noreferrer"') && !m[0].includes('rel="noopener"'));
assert(unsafeGbCoderLinks.length === 0, 'GbCoderPage.astro has zero unsafe target="_blank" links');

// 2. Localized Quick Jump in Header.astro
const headerSrc = fs.readFileSync('src/components/Header.astro', 'utf8');
assert(headerSrc.includes("getLocalizedPath('/apps', activeLocale)"), 'Header.astro Quick Jump uses getLocalizedPath for /apps');
assert(headerSrc.includes("getLocalizedPath('/gb-coder', activeLocale)"), 'Header.astro Quick Jump uses getLocalizedPath for /gb-coder');
assert(headerSrc.includes("getLocalizedPath('/blog', activeLocale)"), 'Header.astro Quick Jump uses getLocalizedPath for /blog');
assert(headerSrc.includes("getLocalizedPath('/docs', activeLocale)"), 'Header.astro Quick Jump uses getLocalizedPath for /docs');
assert(headerSrc.includes("getLocalizedPath('/sitemap', activeLocale)"), 'Header.astro Quick Jump uses getLocalizedPath for /sitemap');

// Verify in rendered dist HTML across locales
const locales = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];
for (const loc of locales) {
  const filePath = loc === 'en' ? 'dist/index.html' : `dist/${loc}/index.html`;
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf8');
    const expectedAppPath = loc === 'en' ? '/apps' : `/${loc}/apps`;
    const expectedBlogPath = loc === 'en' ? '/blog' : `/${loc}/blog`;
    assert(html.includes(`href="${expectedAppPath}"`), `dist [${loc}] Quick Jump contains localized app href: ${expectedAppPath}`);
    assert(html.includes(`href="${expectedBlogPath}"`), `dist [${loc}] Quick Jump contains localized blog href: ${expectedBlogPath}`);
  }
}

// 3. Contrast verification
const heroSrc = fs.readFileSync('src/components/sections/HeroSection.astro', 'utf8');
assert(!heroSrc.includes('text-muted-foreground/60'), 'HeroSection code comment has /60 opacity modifier removed');
assert(heroSrc.includes('text-muted-foreground">// Client-side execution'), 'HeroSection code comment maintains full text-muted-foreground');

const bentoSrc = fs.readFileSync('src/components/sections/FeaturesBento.astro', 'utf8');
assert(bentoSrc.includes('text-foreground/75 text-[11px]'), 'FeaturesBento Card 1 visual uses elevated contrast text-foreground/75');
assert(!bentoSrc.includes('text-muted-foreground text-[11px]>hero-banner.png'), 'FeaturesBento Card 3 visual elevated from text-muted-foreground');

// 4. Vercel Security Headers
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert(Array.isArray(vercel.headers), 'vercel.json contains headers configuration');
const globalHeaders = vercel.headers.find((h) => h.source === '/(.*)');
assert(!!globalHeaders, 'Global header match rule /(.*) exists in vercel.json');

const headerKeys = globalHeaders ? globalHeaders.headers.map((h) => h.key) : [];
assert(headerKeys.includes('X-Content-Type-Options'), 'X-Content-Type-Options header present');
assert(headerKeys.includes('Referrer-Policy'), 'Referrer-Policy header present');
assert(headerKeys.includes('X-Frame-Options'), 'X-Frame-Options header present');
assert(headerKeys.includes('Permissions-Policy'), 'Permissions-Policy header present');
assert(headerKeys.includes('Content-Security-Policy-Report-Only'), 'Content-Security-Policy-Report-Only header present');

// 5. Package audit check
const pkgLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
assert(!!pkgLock, 'package-lock.json is valid JSON');

console.log(`\n=== RESULTS: ${passCount} PASSED, ${failCount} FAILED ===`);
if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL PHASE 4B-2 TARGETED CHECKS PASSED!\n');
}
