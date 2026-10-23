/**
 * scripts/audit-english-routes.mjs
 * Validates that English subpages (about, apps, docs, blog) remain functional,
 * retain their canonicals, and DO NOT emit fake hreflang tags for nonexistent languages.
 */

import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

const ENGLISH_SUBPAGES = [
  { path: 'about/index.html', canonical: 'https://ladestack.in/about' },
  { path: 'gb-coder/index.html', canonical: 'https://ladestack.in/gb-coder' },
  { path: 'apps/index.html', canonical: 'https://ladestack.in/apps' },
  { path: 'docs/index.html', canonical: 'https://ladestack.in/docs' },
  { path: 'blog/index.html', canonical: 'https://ladestack.in/blog' },
];

let failed = false;

for (const page of ENGLISH_SUBPAGES) {
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

  // Check Hreflangs (Should be 0 because subpages only exist in English in Phase 2A)
  const hreflangCount = (html.match(/rel=["']alternate["']\s+hreflang=/gi) || []).length;
  if (hreflangCount > 0) {
    console.error(`❌ FAIL [${page.path}]: Found ${hreflangCount} fake hreflang tags! Must NOT emit alternates for un-translated routes.`);
    failed = true;
  } else {
    console.log(`✅ PASS [${page.path}]: Canonical valid (${page.canonical}), zero fake hreflang alternates.`);
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL ENGLISH SUBPAGE CHECKS PASSED PERFECTLY!');
  process.exit(0);
}
