/**
 * scripts/audit-english-routes.mjs
 * Validates that English subpages retain their canonicals,
 * have appropriate hreflang alternates (10 for fully localized routes, 0 for English-only blog routes).
 */

import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

const LOCALIZED_SUBPAGES = [
  { path: 'about/index.html', canonical: 'https://ladestack.in/about', expectedHreflangs: 10 },
  { path: 'gb-coder/index.html', canonical: 'https://ladestack.in/gb-coder', expectedHreflangs: 10 },
  { path: 'apps/index.html', canonical: 'https://ladestack.in/apps', expectedHreflangs: 10 },
  { path: 'docs/index.html', canonical: 'https://ladestack.in/docs', expectedHreflangs: 10 },
  { path: 'blog/index.html', canonical: 'https://ladestack.in/blog', expectedHreflangs: 10 },
  { path: 'contact/index.html', canonical: 'https://ladestack.in/contact', expectedHreflangs: 10 },
  { path: 'support/index.html', canonical: 'https://ladestack.in/support', expectedHreflangs: 10 },
  { path: 'privacy/index.html', canonical: 'https://ladestack.in/privacy', expectedHreflangs: 10 },
  { path: 'terms/index.html', canonical: 'https://ladestack.in/terms', expectedHreflangs: 10 },
  { path: 'sitemap/index.html', canonical: 'https://ladestack.in/sitemap', expectedHreflangs: 10 },
];

const ENGLISH_ONLY_SUBPAGES = [
  { path: 'blog/client-side-pdf-manipulation-webassembly/index.html', canonical: 'https://ladestack.in/blog/client-side-pdf-manipulation-webassembly', expectedHreflangs: 0 },
];

let failed = false;

console.log('--- 1. Auditing Fully Localized Core English Routes ---');
for (const page of LOCALIZED_SUBPAGES) {
  const filePath = path.join(DIST_DIR, page.path);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ FAIL: Missing English subpage: ${page.path}`);
    failed = true;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');

  // Check <html lang="en">
  const langMatch = html.match(/<html\s+[^>]*lang=["']([^"']+)["']/i);
  if (!langMatch || langMatch[1] !== 'en') {
    console.error(`❌ FAIL [${page.path}]: Expected <html lang="en">, got "${langMatch ? langMatch[1] : 'NONE'}"`);
    failed = true;
  }

  // Check Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonicalMatch || canonicalMatch[1] !== page.canonical) {
    console.error(`❌ FAIL [${page.path}]: Canonical mismatch: ${canonicalMatch ? canonicalMatch[1] : 'NONE'}`);
    failed = true;
  }

  // Check Hreflangs
  const hreflangCount = (html.match(/rel=["']alternate["']\s+hreflang=/gi) || []).length;
  if (hreflangCount !== page.expectedHreflangs) {
    console.error(`❌ FAIL [${page.path}]: Expected ${page.expectedHreflangs} hreflang tags, found ${hreflangCount}`);
    failed = true;
  } else {
    console.log(`✅ PASS [${page.path}]: Canonical valid (${page.canonical}), exactly ${page.expectedHreflangs} reciprocal hreflang tags.`);
  }
}

console.log('\n--- 2. Auditing English-Only Routes (Zero False Alternates) ---');
for (const page of ENGLISH_ONLY_SUBPAGES) {
  const filePath = path.join(DIST_DIR, page.path);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ FAIL: Missing English subpage: ${page.path}`);
    failed = true;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');
  const hreflangCount = (html.match(/rel=["']alternate["']\s+hreflang=/gi) || []).length;
  if (hreflangCount !== 0) {
    console.error(`❌ FAIL [${page.path}]: Found ${hreflangCount} fake hreflang tags! Must NOT emit alternates for un-translated routes.`);
    failed = true;
  } else {
    console.log(`✅ PASS [${page.path}]: Canonical valid (${page.canonical}), zero fake hreflang tags.`);
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL ENGLISH SUBPAGE CHECKS PASSED PERFECTLY!');
  process.exit(0);
}
