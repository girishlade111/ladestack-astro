import fs from 'node:fs';
import path from 'node:path';
import { blogPosts } from '../src/data/blogPosts.ts';

const HISTORICAL_27_SLUGS = [
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
  'monitoring-ai-systems-in-production'
];

const EXPECTED_15_MIGRATED = [
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
  'zero-trust-security-web-applications'
];

const EXPECTED_12_REMAINING = [
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
  'monitoring-ai-systems-in-production'
];

console.log('--- 1. Baseline Verification ---');
const currentSlugs = blogPosts.map(p => p.slug);
let errors = 0;

function assert(condition, msg) {
  if (!condition) {
    console.error(`❌ ${msg}`);
    errors++;
  } else {
    console.log(`✅ ${msg}`);
  }
}

assert(currentSlugs.length === 27, `blogPosts.ts has 27 entries (got ${currentSlugs.length})`);
assert(
  JSON.stringify(currentSlugs) === JSON.stringify(HISTORICAL_27_SLUGS),
  'Current blogPosts.ts matches HISTORICAL_27_SLUGS 1:1'
);

console.log('\n--- 2. Content Collections Audit ---');
const enMdFiles = fs.readdirSync('src/content/blog/en')
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace('.md', ''));
assert(enMdFiles.length === 18, `18 English Markdown articles on disk (got ${enMdFiles.length})`);

const enMdSet = new Set(enMdFiles);
const actualMigrated = HISTORICAL_27_SLUGS.filter(s => enMdSet.has(s));
const actualRemaining = HISTORICAL_27_SLUGS.filter(s => !enMdSet.has(s));
const newArticles = enMdFiles.filter(s => !HISTORICAL_27_SLUGS.includes(s));

assert(actualMigrated.length === 15, `15 legacy articles migrated (got ${actualMigrated.length})`);
assert(
  JSON.stringify(actualMigrated) === JSON.stringify(EXPECTED_15_MIGRATED),
  'Actual migrated slugs match EXPECTED_15_MIGRATED 1:1'
);

assert(actualRemaining.length === 12, `12 legacy fallback articles remaining (got ${actualRemaining.length})`);
assert(
  JSON.stringify(actualRemaining) === JSON.stringify(EXPECTED_12_REMAINING),
  'Actual remaining slugs match EXPECTED_12_REMAINING 1:1'
);

assert(newArticles.length === 3, `3 new non-legacy articles in English collections (got ${newArticles.length})`);
console.log('New non-legacy articles:', newArticles);

console.log('\n--- 3. Invariant Checks ---');
assert(
  actualMigrated.length + actualRemaining.length === 27,
  'Invariant: 15 migrated + 12 remaining = 27 total legacy'
);
assert(
  actualMigrated.length + newArticles.length === 18,
  'Invariant: 15 migrated legacy + 3 new = 18 total English Markdown'
);

console.log('\n--- 4. Dist Route & Rendering Engine Verification ---');
const distDir = path.resolve('dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'blog/index.html'), 'utf8');

for (const slug of HISTORICAL_27_SLUGS) {
  const isMigrated = enMdSet.has(slug);
  const routeHtmlPath = path.join(distDir, `blog/${slug}/index.html`);
  const exists = fs.existsSync(routeHtmlPath);
  assert(exists, `Route exists: dist/blog/${slug}/index.html`);

  if (exists) {
    const html = fs.readFileSync(routeHtmlPath, 'utf8');
    const expectedCanonical = `https://ladestack.in/blog/${slug}`;
    assert(
      html.includes(`rel="canonical" href="${expectedCanonical}"`),
      `[${slug}] Canonical is ${expectedCanonical}`
    );

    if (isMigrated) {
      const hasBlogPosting = html.includes('"@type":"BlogPosting"') || html.includes('"@type": "BlogPosting"');
      assert(hasBlogPosting, `[${slug}] Uses Markdown rendering engine (BlogPosting schema)`);
    } else {
      const isLegacy = html.includes('prose') && html.includes('Historical Documentation');
      // Wait: in [slug].astro, legacy fallback has prose and BaseLayout
      const hasLegacyProse = html.includes('prose') && html.includes('Home') && html.includes('Blog');
      assert(hasLegacyProse, `[${slug}] Uses legacy fallback rendering engine`);
    }
  }

  // Check link in /blog/index.html
  const hasIndexLink = indexHtml.includes(`/blog/${slug}`);
  assert(hasIndexLink, `[${slug}] Linked on English blog index page`);
}

console.log(`\nAll checks completed with ${errors} errors.`);
if (errors > 0) process.exit(1);
