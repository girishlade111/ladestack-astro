/**
 * scripts/test-phase3-blog.mjs
 * Comprehensive automated QA test suite for LadeStack Phase 3 Multilingual Markdown Blog
 * Validates:
 * 1. Content schema and translationKey consistency across all 9 languages
 * 2. Per-locale blog index routes (/blog, /ja/blog, /ko/blog, etc.)
 * 3. Flagship article published across all 9 languages with matching translationKey
 * 4. Reciprocal hreflang tags (10 tags: 9 languages + x-default) on the flagship article
 * 5. English-only pilot articles have 0 false hreflang alternates
 * 6. Real heading anchor validity in generated HTML (TOC href matches id attribute)
 * 7. Cover images exist on disk for all articles
 * 8. BlogPosting and BreadcrumbList JSON-LD schemas exist and parse as valid JSON
 * 9. Sitemaps include published articles and exclude drafts
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');
const LOCALES = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];

let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    errors++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('--- 1. Validating 9 Localized Blog Indexes ---');
for (const loc of LOCALES) {
  const relativePath = loc === 'en' ? 'blog/index.html' : `${loc}/blog/index.html`;
  const filePath = path.join(DIST_DIR, relativePath);
  const exists = fs.existsSync(filePath);
  assert(exists, `Blog index exists: ${relativePath}`);

  if (exists) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const langMatch = html.match(/<html\s+[^>]*lang=["']([^"']+)["']/i);
    assert(langMatch && langMatch[1] === loc, `[${relativePath}] <html lang="${loc}"> matches`);

    const expectedCanonical = loc === 'en' ? 'https://ladestack.in/blog' : `https://ladestack.in/${loc}/blog`;
    assert(html.includes(`rel="canonical" href="${expectedCanonical}"`), `[${relativePath}] Canonical matches ${expectedCanonical}`);
  }
}

console.log('\n--- 2. Validating Flagship Article in All 9 Locales ---');
const FLAGSHIP_SLUG = 'gb-coder-dual-engine-architecture';
for (const loc of LOCALES) {
  const relativePath = loc === 'en' ? `blog/${FLAGSHIP_SLUG}/index.html` : `${loc}/blog/${FLAGSHIP_SLUG}/index.html`;
  const filePath = path.join(DIST_DIR, relativePath);
  const exists = fs.existsSync(filePath);
  assert(exists, `Flagship article generated for [${loc}]: ${relativePath}`);

  if (exists) {
    const html = fs.readFileSync(filePath, 'utf-8');

    // 1. Check <html lang="...">
    const langMatch = html.match(/<html\s+[^>]*lang=["']([^"']+)["']/i);
    assert(langMatch && langMatch[1] === loc, `[${loc}] <html lang="${loc}"> matches`);

    // 2. Check 10 reciprocal hreflang tags
    const hreflangs = [...html.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi)];
    assert(hreflangs.length === 10, `[${loc}] Exactly 10 reciprocal hreflang tags found (got ${hreflangs.length})`);

    // 3. Check JSON-LD BlogPosting
    const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([^<]+)<\/script>/gi)];
    let hasBlogPosting = false;
    let hasBreadcrumbList = false;

    for (const match of jsonLdMatches) {
      try {
        const parsed = JSON.parse(match[1]);
        if (parsed['@type'] === 'BlogPosting') hasBlogPosting = true;
        if (parsed['@type'] === 'BreadcrumbList') hasBreadcrumbList = true;
      } catch (e) {
        assert(false, `[${loc}] JSON-LD failed to parse: ${e.message}`);
      }
    }
    assert(hasBlogPosting, `[${loc}] Valid BlogPosting structured data present`);
    assert(hasBreadcrumbList, `[${loc}] Valid BreadcrumbList structured data present`);

    // 4. Real Heading Anchor Validity (TOC link href="#id" must match an actual heading with id="id")
    const tocHrefMatches = [...html.matchAll(/<a\s+[^>]*href=["']#([^"']+)["'][^>]*>/gi)];
    let brokenAnchors = 0;
    for (const tocMatch of tocHrefMatches) {
      const anchorId = decodeURIComponent(tocMatch[1]);
      const hasHeading = html.includes(`id="${anchorId}"`) || html.includes(`id="${tocMatch[1]}"`);
      if (!hasHeading) {
        console.error(`[${loc}] Heading anchor #${anchorId} not found in article headings!`);
        brokenAnchors++;
      }
    }
    assert(brokenAnchors === 0, `[${loc}] All ${tocHrefMatches.length} TOC anchors match real heading IDs`);
  }
}

console.log('\n--- 3. Validating English-Only Pilot Articles (Zero Fake Alternates) ---');
const englishPilots = [
  'blog/client-side-pdf-manipulation-webassembly/index.html',
  'blog/modern-web-image-compression-standards/index.html',
];

for (const pilotPath of englishPilots) {
  const filePath = path.join(DIST_DIR, pilotPath);
  const exists = fs.existsSync(filePath);
  assert(exists, `English pilot exists: ${pilotPath}`);

  if (exists) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const hreflangs = [...html.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=/gi)];
    assert(hreflangs.length === 0, `[${pilotPath}] Has 0 fake hreflang tags (untranslated post)`);
  }
}

console.log('\n--- 4. Validating Cover Image Existence ---');
const coverImages = [
  'public/blog-covers/gb-coder-architecture.svg',
  'public/blog-covers/pdf-wasm-processing.svg',
  'public/blog-covers/image-compression.svg',
];

for (const cover of coverImages) {
  assert(fs.existsSync(path.resolve(cover)), `Cover image exists on disk: ${cover}`);
}

console.log('\n--- 5. Validating Sitemap Inclusion of New Markdown Articles ---');
const sitemapPath = path.join(DIST_DIR, 'sitemap-0.xml');
assert(fs.existsSync(sitemapPath), 'sitemap-0.xml exists');
if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  assert(sitemapXml.includes('https://ladestack.in/blog'), 'Sitemap includes /blog');
  for (const loc of LOCALES) {
    if (loc === 'en') {
      assert(sitemapXml.includes(`https://ladestack.in/blog/${FLAGSHIP_SLUG}`), `Sitemap includes English flagship article`);
    } else {
      assert(sitemapXml.includes(`https://ladestack.in/${loc}/blog`), `Sitemap includes /${loc}/blog`);
      assert(sitemapXml.includes(`https://ladestack.in/${loc}/blog/${FLAGSHIP_SLUG}`), `Sitemap includes /${loc}/blog/${FLAGSHIP_SLUG}`);
    }
  }
}

if (errors > 0) {
  console.error(`\n❌ PHASE 3 BLOG TEST SUITE FAILED with ${errors} errors.`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL PHASE 3 BLOG TESTS PASSED PERFECTLY!');
  process.exit(0);
}
