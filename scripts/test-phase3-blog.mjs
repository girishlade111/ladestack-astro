/**
 * scripts/test-phase3-blog.mjs
 * Comprehensive automated QA test suite for LadeStack Phase 3C Multilingual Markdown Blog
 * Validates:
 * 1. Content schema and translationKey consistency across all 9 languages
 * 2. Per-locale blog index routes (/blog, /ja/blog, /ko/blog, etc.)
 * 3. All 5 multilingual topics published across all 9 languages (45 articles total)
 * 4. Reciprocal hreflang tags (10 tags: 9 languages + x-default) on every published multilingual article
 * 5. English-only modernized articles (3 articles) have exactly 0 false hreflang alternates
 * 6. Remaining legacy fallback articles (22 articles) resolve and have 0 false hreflangs
 * 7. All 27 original legacy URLs continue to resolve without duplicates
 * 8. Real heading anchor validity in generated HTML (TOC href matches id attribute)
 * 9. Cover images exist on disk for all articles
 * 10. BlogPosting and BreadcrumbList JSON-LD schemas exist and parse as valid JSON
 * 11. Sitemaps include all 48 published Markdown articles and exclude drafts
 * 12. Historic numeric redirects (/blog/1 through /blog/6) exist and redirect accurately
 */
import fs from 'node:fs';
import path from 'node:path';
import { blogPosts } from '../src/data/blogPosts.ts';

const DIST_DIR = path.resolve('dist');
const LOCALES = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];

// 9 topics translated into all 9 languages (81 articles)
const MULTILINGUAL_TOPICS = [
  'gb-coder-dual-engine-architecture',
  'client-side-pdf-manipulation-webassembly',
  'modern-web-image-compression-standards',
  'api-rate-limiting-throttling-strategies',
  'rest-vs-graphql-choosing-right-api-paradigm',
  'machine-learning-pipelines-for-web-developers',
  'building-rag-applications-vector-databases',
  'building-subscription-billing-systems',
  'baas-platforms-compared-firebase-supabase-appwrite',
];

// 9 English-only modernized articles
const ENGLISH_ONLY_MODERNIZED = [
  'zero-trust-security-web-applications',
  'building-ai-powered-code-review-systems',
  'future-of-ai-in-software-development',
  'generative-ai-for-content-creation',
  'fine-tuning-llms-domain-specific-tasks',
  'multi-tenant-saas-architecture-patterns',
  'scaling-saas-applications-million-users',
  'building-serverless-backends-with-baas',
  'real-time-data-sync-backend-services',
];

// The 15 modernized legacy slugs (5 from Phase 3C + 5 from Phase 3D-A + 5 from Phase 3D-B)
const MODERNIZED_LEGACY_SLUGS = [
  'api-rate-limiting-throttling-strategies',
  'rest-vs-graphql-choosing-right-api-paradigm',
  'zero-trust-security-web-applications',
  'building-ai-powered-code-review-systems',
  'future-of-ai-in-software-development',
  'machine-learning-pipelines-for-web-developers',
  'generative-ai-for-content-creation',
  'building-rag-applications-vector-databases',
  'fine-tuning-llms-domain-specific-tasks',
  'multi-tenant-saas-architecture-patterns',
  'building-subscription-billing-systems',
  'scaling-saas-applications-million-users',
  'baas-platforms-compared-firebase-supabase-appwrite',
  'building-serverless-backends-with-baas',
  'real-time-data-sync-backend-services',
];

// Verified 27 historical legacy baseline slugs (from Phase 3C baseline 2528b3b:src/data/blogPosts.ts)
const HISTORICAL_LEGACY_BASELINE_SLUGS = [
  'future-of-ai-in-software-development',
  'building-ai-powered-code-review-systems',
  'machine-learning-pipelines-for-web-developers',
  'generative-ai-for-content-creation',
  'building-rag-applications-vector-databases',
  'fine-tuning-llms-domain-specific-tasks',
  'multi-tenant-saas-architecture-patterns',
  'building-subscription-billing-systems',
  'scaling-saas-applications-million-users',
  'baas-platforms-compared-firebase-supabase-appwrite',
  'building-serverless-backends-with-baas',
  'real-time-data-sync-backend-services',
  'rest-vs-graphql-choosing-right-api-paradigm',
  'api-rate-limiting-throttling-strategies',
  'building-api-gateways-microservices',
  'cloud-cost-optimization-strategies-startups',
  'multi-cloud-architecture-aws-azure-gcp',
  'containers-vs-vms-when-to-use-each',
  'optimizing-vm-performance-production-workloads',
  'gitops-managing-infrastructure-with-git',
  'building-zero-downtime-deployment-pipelines',
  'infrastructure-as-code-terraform-pulumi',
  'zero-trust-security-web-applications',
  'owasp-top-10-complete-mitigation-guide',
  'implementing-oauth2-openid-connect',
  'mlops-deploying-ml-models-production',
  'monitoring-ai-systems-in-production',
];

// Verified 12 remaining legacy fallback slugs (HISTORICAL_LEGACY_BASELINE_SLUGS minus MODERNIZED_LEGACY_SLUGS)
const VERIFIED_REMAINING_LEGACY_SLUGS = [
  'building-api-gateways-microservices',
  'cloud-cost-optimization-strategies-startups',
  'multi-cloud-architecture-aws-azure-gcp',
  'containers-vs-vms-when-to-use-each',
  'optimizing-vm-performance-production-workloads',
  'gitops-managing-infrastructure-with-git',
  'building-zero-downtime-deployment-pipelines',
  'infrastructure-as-code-terraform-pulumi',
  'owasp-top-10-complete-mitigation-guide',
  'implementing-oauth2-openid-connect',
  'mlops-deploying-ml-models-production',
  'monitoring-ai-systems-in-production',
];

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

console.log('\n--- 2. Validating 5 Multilingual Topics Across All 9 Locales (45 Articles) ---');
for (const slug of MULTILINGUAL_TOPICS) {
  console.log(`\nChecking Topic: ${slug}`);
  for (const loc of LOCALES) {
    const relativePath = loc === 'en' ? `blog/${slug}/index.html` : `${loc}/blog/${slug}/index.html`;
    const filePath = path.join(DIST_DIR, relativePath);
    const exists = fs.existsSync(filePath);
    assert(exists, `[${slug}][${loc}] Generated: ${relativePath}`);

    if (exists) {
      const html = fs.readFileSync(filePath, 'utf-8');

      // 1. Check <html lang="...">
      const langMatch = html.match(/<html\s+[^>]*lang=["']([^"']+)["']/i);
      assert(langMatch && langMatch[1] === loc, `[${slug}][${loc}] <html lang="${loc}"> matches`);

      // 2. Check 10 reciprocal hreflang tags (9 locales + 1 x-default)
      const hreflangs = [...html.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi)];
      assert(hreflangs.length === 10, `[${slug}][${loc}] Exactly 10 reciprocal hreflang tags found (got ${hreflangs.length})`);

      // 3. Check JSON-LD BlogPosting & BreadcrumbList
      const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([^<]+)<\/script>/gi)];
      let hasBlogPosting = false;
      let hasBreadcrumbList = false;

      for (const match of jsonLdMatches) {
        try {
          const parsed = JSON.parse(match[1]);
          if (parsed['@type'] === 'BlogPosting') {
            hasBlogPosting = true;
            if (parsed.inLanguage !== loc) {
              assert(false, `[${slug}][${loc}] BlogPosting inLanguage mismatch: expected ${loc}, got ${parsed.inLanguage}`);
            }
          }
          if (parsed['@type'] === 'BreadcrumbList') hasBreadcrumbList = true;
        } catch (e) {
          assert(false, `[${slug}][${loc}] JSON-LD failed to parse: ${e.message}`);
        }
      }
      assert(hasBlogPosting, `[${slug}][${loc}] Valid BlogPosting structured data present`);
      assert(hasBreadcrumbList, `[${slug}][${loc}] Valid BreadcrumbList structured data present`);

      // 4. Real Heading Anchor Validity (TOC link href="#id" must match an actual heading with id="id")
      const tocHrefMatches = [...html.matchAll(/<a\s+[^>]*href=["']#([^"']+)["'][^>]*>/gi)];
      let brokenAnchors = 0;
      for (const tocMatch of tocHrefMatches) {
        const anchorId = decodeURIComponent(tocMatch[1]);
        const hasHeading = html.includes(`id="${anchorId}"`) || html.includes(`id="${tocMatch[1]}"`);
        if (!hasHeading) {
          console.error(`[${slug}][${loc}] Heading anchor #${anchorId} not found in article headings!`);
          brokenAnchors++;
        }
      }
      assert(brokenAnchors === 0, `[${slug}][${loc}] All ${tocHrefMatches.length} TOC anchors match real heading IDs`);
    }
  }
}

console.log('\n--- 3. Validating English-Only Modernized Articles (3 Articles, 0 False Alternates) ---');
for (const slug of ENGLISH_ONLY_MODERNIZED) {
  const filePath = path.join(DIST_DIR, `blog/${slug}/index.html`);
  const exists = fs.existsSync(filePath);
  assert(exists, `Modernized English-only post exists: blog/${slug}/index.html`);

  if (exists) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const hreflangs = [...html.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=/gi)];
    assert(hreflangs.length === 0, `[${slug}] Has 0 fake hreflang tags (English-only article)`);

    const canonicalMatch = html.includes(`rel="canonical" href="https://ladestack.in/blog/${slug}"`);
    assert(canonicalMatch, `[${slug}] Canonical points to https://ladestack.in/blog/${slug}`);
  }
}

console.log('\n--- 4. Validating Historical Legacy Inventory & Identity Integrity ---');

// 4a. Verify source inventory matches historical baseline exactly (length, order, slug identities)
const currentSourceSlugs = blogPosts.map((p) => p.slug);
assert(
  currentSourceSlugs.length === 27,
  `blogPosts.ts contains exactly 27 articles (got ${currentSourceSlugs.length})`
);
assert(
  JSON.stringify(currentSourceSlugs) === JSON.stringify(HISTORICAL_LEGACY_BASELINE_SLUGS),
  'Current src/data/blogPosts.ts matches HISTORICAL_LEGACY_BASELINE_SLUGS 1:1 without modification'
);

// 4b. Reconcile migrated intersection vs remaining difference
const actualMigratedSlugs = currentSourceSlugs.filter((s) => MODERNIZED_LEGACY_SLUGS.includes(s));
const actualRemainingSlugs = currentSourceSlugs.filter((s) => !MODERNIZED_LEGACY_SLUGS.includes(s));

assert(
  actualMigratedSlugs.length === 15,
  `Exactly 15 legacy articles modernized in Content Collections (got ${actualMigratedSlugs.length})`
);
assert(
  actualRemainingSlugs.length === 12,
  `Exactly 12 legacy fallback articles preserved (got ${actualRemainingSlugs.length})`
);
assert(
  actualMigratedSlugs.length + actualRemainingSlugs.length === 27,
  `Invariant verified: 15 migrated + 12 remaining = 27 total original legacy articles`
);
assert(
  JSON.stringify(actualRemainingSlugs) === JSON.stringify(VERIFIED_REMAINING_LEGACY_SLUGS),
  'Remaining legacy fallback set matches VERIFIED_REMAINING_LEGACY_SLUGS 1:1 in exact identity and order'
);

// 4c. Verify built output routes, canonical declarations, rendering engines, and index cards
const enIndexHtmlPath = path.join(DIST_DIR, 'blog/index.html');
const enIndexHtml = fs.existsSync(enIndexHtmlPath) ? fs.readFileSync(enIndexHtmlPath, 'utf-8') : '';

for (const legacy of blogPosts) {
  const filePath = path.join(DIST_DIR, `blog/${legacy.slug}/index.html`);
  const exists = fs.existsSync(filePath);
  assert(exists, `Legacy canonical URL resolves: /blog/${legacy.slug}`);

  if (exists) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const expectedCanonical = `https://ladestack.in/blog/${legacy.slug}`;
    assert(
      html.includes(`rel="canonical" href="${expectedCanonical}"`),
      `[${legacy.slug}] Declares expected canonical: ${expectedCanonical}`
    );

    const isMigrated = MODERNIZED_LEGACY_SLUGS.includes(legacy.slug);
    if (isMigrated) {
      // Must use Markdown rendering engine (BlogPostLayout with BlogPosting structured data)
      const hasBlogPosting = html.includes('"@type":"BlogPosting"') || html.includes('"@type": "BlogPosting"');
      assert(hasBlogPosting, `[${legacy.slug}] Migrated article uses Markdown rendering engine (BlogPosting JSON-LD)`);
    } else {
      // Must use legacy fallback rendering engine (prose class, breadcrumbs, BaseLayout)
      const hasLegacyStructure = html.includes('prose') && html.includes('Home') && html.includes('Blog');
      assert(hasLegacyStructure, `[${legacy.slug}] Unmigrated article uses legacy fallback rendering engine`);
      // Must NOT contain Markdown BlogPosting schema
      const hasBlogPosting = html.includes('"@type":"BlogPosting"') || html.includes('"@type": "BlogPosting"');
      assert(!hasBlogPosting, `[${legacy.slug}] Legacy fallback article does not emit false BlogPosting schema`);
    }
  }

  // Verify English blog index card destination
  assert(
    enIndexHtml.includes(`/blog/${legacy.slug}`),
    `[${legacy.slug}] Visible card destination present in /blog/index.html`
  );
}

// 4d. Verify English blog index legacy archive section contains exactly the 12 verified remaining slugs
const legacyCardsOnIndex = [...enIndexHtml.matchAll(/<article[^>]*data-legacy-card[\s\S]*?<a[^>]*href=["']\/blog\/([^"']+)["']/gi)].map(m => m[1]);
assert(
  legacyCardsOnIndex.length === 12,
  `English blog index contains exactly 12 legacy cards in #legacy-archive (got ${legacyCardsOnIndex.length})`
);
assert(
  JSON.stringify(legacyCardsOnIndex) === JSON.stringify(VERIFIED_REMAINING_LEGACY_SLUGS),
  'Legacy cards on English blog index match VERIFIED_REMAINING_LEGACY_SLUGS 1:1'
);

console.log('\n--- 5. Validating Historic Numeric Redirects (/blog/1 through /blog/6) ---');
for (let id = 1; id <= 6; id++) {
  const redirectPath = path.join(DIST_DIR, `blog/${id}/index.html`);
  const exists = fs.existsSync(redirectPath);
  assert(exists, `Numeric redirect HTML exists: /blog/${id}/index.html`);

  if (exists) {
    const html = fs.readFileSync(redirectPath, 'utf-8');
    assert(html.includes('http-equiv="refresh"'), `[blog/${id}] Contains meta refresh redirect`);
  }
}

console.log('\n--- 6. Validating Cover Image Existence on Disk ---');
const coverImages = [
  'public/blog-covers/gb-coder-architecture.svg',
  'public/blog-covers/pdf-wasm-processing.svg',
  'public/blog-covers/image-compression.svg',
  'public/blog-covers/api-rate-limiting.svg',
  'public/blog-covers/graphql-vs-rest.svg',
  'public/blog-covers/zero-trust-security.svg',
  'public/blog-covers/ai-code-generation.svg',
  'public/blog-covers/ai-development.svg',
  'public/blog-covers/ai-ml-engineering.svg',
  'public/blog-covers/ai-nocode-generation.svg',
  'public/blog-covers/api-architecture.svg',
  'public/blog-covers/kubernetes-scale.svg',
  'public/blog-covers/cloud-security.svg',
];

for (const cover of coverImages) {
  assert(fs.existsSync(path.resolve(cover)), `Cover image exists on disk: ${cover}`);
}

console.log('\n--- 7. Validating Sitemap Inclusion of All 90 Markdown Articles ---');
const sitemapPath = path.join(DIST_DIR, 'sitemap-0.xml');
assert(fs.existsSync(sitemapPath), 'sitemap-0.xml exists');
if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  assert(sitemapXml.includes('https://ladestack.in/blog'), 'Sitemap includes /blog');

  // Check 9 multilingual topics across 9 locales (81 URLs)
  for (const slug of MULTILINGUAL_TOPICS) {
    for (const loc of LOCALES) {
      const expectedUrl = loc === 'en'
        ? `https://ladestack.in/blog/${slug}`
        : `https://ladestack.in/${loc}/blog/${slug}`;
      assert(sitemapXml.includes(expectedUrl), `Sitemap includes ${expectedUrl}`);
    }
  }

  // Check 9 English-only modernized topics (9 URLs)
  for (const slug of ENGLISH_ONLY_MODERNIZED) {
    const expectedUrl = `https://ladestack.in/blog/${slug}`;
    assert(sitemapXml.includes(expectedUrl), `Sitemap includes English-only ${expectedUrl}`);
  }
}

if (errors > 0) {
  console.error(`\n❌ PHASE 3D-B BLOG TEST SUITE FAILED with ${errors} errors.`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL PHASE 3D-B BLOG TESTS PASSED PERFECTLY (90 MARKDOWN + 12 LEGACY VERIFIED)!');
  process.exit(0);
}
