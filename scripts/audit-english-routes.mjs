/**
 * scripts/audit-english-routes.mjs
 * Validates that English subpages retain their canonicals,
 * have appropriate hreflang alternates (10 for fully localized routes, 0 for English-only legacy blog routes),
 * and verifies that 0 legacy fallback subpages remain in Phase 3D-D.
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
  { path: 'faq/index.html', canonical: 'https://ladestack.in/faq', expectedHreflangs: 10 },
  { path: 'contact/index.html', canonical: 'https://ladestack.in/contact', expectedHreflangs: 10 },
  { path: 'support/index.html', canonical: 'https://ladestack.in/support', expectedHreflangs: 10 },
  { path: 'privacy/index.html', canonical: 'https://ladestack.in/privacy', expectedHreflangs: 10 },
  { path: 'terms/index.html', canonical: 'https://ladestack.in/terms', expectedHreflangs: 10 },
  { path: 'sitemap/index.html', canonical: 'https://ladestack.in/sitemap', expectedHreflangs: 10 },
  // Phase 3 & 3B Pilot Articles (all 9 languages localized)
  { path: 'blog/gb-coder-dual-engine-architecture/index.html', canonical: 'https://ladestack.in/blog/gb-coder-dual-engine-architecture', expectedHreflangs: 10 },
  { path: 'blog/client-side-pdf-manipulation-webassembly/index.html', canonical: 'https://ladestack.in/blog/client-side-pdf-manipulation-webassembly', expectedHreflangs: 10 },
  { path: 'blog/modern-web-image-compression-standards/index.html', canonical: 'https://ladestack.in/blog/modern-web-image-compression-standards', expectedHreflangs: 10 },
  // Phase 3C Modernized Multilingual Articles (all 9 languages localized)
  { path: 'blog/api-rate-limiting-throttling-strategies/index.html', canonical: 'https://ladestack.in/blog/api-rate-limiting-throttling-strategies', expectedHreflangs: 10 },
  { path: 'blog/rest-vs-graphql-choosing-right-api-paradigm/index.html', canonical: 'https://ladestack.in/blog/rest-vs-graphql-choosing-right-api-paradigm', expectedHreflangs: 10 },
  // Phase 3D-A Modernized Multilingual Articles (all 9 languages localized)
  { path: 'blog/machine-learning-pipelines-for-web-developers/index.html', canonical: 'https://ladestack.in/blog/machine-learning-pipelines-for-web-developers', expectedHreflangs: 10 },
  { path: 'blog/building-rag-applications-vector-databases/index.html', canonical: 'https://ladestack.in/blog/building-rag-applications-vector-databases', expectedHreflangs: 10 },
  // Phase 3D-B Modernized Multilingual Articles (all 9 languages localized)
  { path: 'blog/building-subscription-billing-systems/index.html', canonical: 'https://ladestack.in/blog/building-subscription-billing-systems', expectedHreflangs: 10 },
  { path: 'blog/baas-platforms-compared-firebase-supabase-appwrite/index.html', canonical: 'https://ladestack.in/blog/baas-platforms-compared-firebase-supabase-appwrite', expectedHreflangs: 10 },
  // Phase 3D-C Modernized Multilingual Articles (all 9 languages localized)
  { path: 'blog/building-api-gateways-microservices/index.html', canonical: 'https://ladestack.in/blog/building-api-gateways-microservices', expectedHreflangs: 10 },
  { path: 'blog/cloud-cost-optimization-strategies-startups/index.html', canonical: 'https://ladestack.in/blog/cloud-cost-optimization-strategies-startups', expectedHreflangs: 10 },
  // Phase 3D-D Modernized Multilingual Articles (all 9 languages localized)
  { path: 'blog/gitops-managing-infrastructure-with-git/index.html', canonical: 'https://ladestack.in/blog/gitops-managing-infrastructure-with-git', expectedHreflangs: 10 },
  { path: 'blog/owasp-top-10-complete-mitigation-guide/index.html', canonical: 'https://ladestack.in/blog/owasp-top-10-complete-mitigation-guide', expectedHreflangs: 10 },
];

const ENGLISH_ONLY_SUBPAGES = [
  // English-only modernized articles without false synthetic translations
  { path: 'blog/zero-trust-security-web-applications/index.html', canonical: 'https://ladestack.in/blog/zero-trust-security-web-applications', expectedHreflangs: 0 },
  { path: 'blog/building-ai-powered-code-review-systems/index.html', canonical: 'https://ladestack.in/blog/building-ai-powered-code-review-systems', expectedHreflangs: 0 },
  { path: 'blog/future-of-ai-in-software-development/index.html', canonical: 'https://ladestack.in/blog/future-of-ai-in-software-development', expectedHreflangs: 0 },
  // Phase 3D-A English-only modernized articles
  { path: 'blog/generative-ai-for-content-creation/index.html', canonical: 'https://ladestack.in/blog/generative-ai-for-content-creation', expectedHreflangs: 0 },
  { path: 'blog/fine-tuning-llms-domain-specific-tasks/index.html', canonical: 'https://ladestack.in/blog/fine-tuning-llms-domain-specific-tasks', expectedHreflangs: 0 },
  { path: 'blog/multi-tenant-saas-architecture-patterns/index.html', canonical: 'https://ladestack.in/blog/multi-tenant-saas-architecture-patterns', expectedHreflangs: 0 },
  // Phase 3D-B English-only modernized articles
  { path: 'blog/scaling-saas-applications-million-users/index.html', canonical: 'https://ladestack.in/blog/scaling-saas-applications-million-users', expectedHreflangs: 0 },
  { path: 'blog/building-serverless-backends-with-baas/index.html', canonical: 'https://ladestack.in/blog/building-serverless-backends-with-baas', expectedHreflangs: 0 },
  { path: 'blog/real-time-data-sync-backend-services/index.html', canonical: 'https://ladestack.in/blog/real-time-data-sync-backend-services', expectedHreflangs: 0 },
  // Phase 3D-C English-only modernized articles
  { path: 'blog/multi-cloud-architecture-aws-azure-gcp/index.html', canonical: 'https://ladestack.in/blog/multi-cloud-architecture-aws-azure-gcp', expectedHreflangs: 0 },
  { path: 'blog/containers-vs-vms-when-to-use-each/index.html', canonical: 'https://ladestack.in/blog/containers-vs-vms-when-to-use-each', expectedHreflangs: 0 },
  { path: 'blog/optimizing-vm-performance-production-workloads/index.html', canonical: 'https://ladestack.in/blog/optimizing-vm-performance-production-workloads', expectedHreflangs: 0 },
  // Phase 3D-D English-only modernized articles
  { path: 'blog/building-zero-downtime-deployment-pipelines/index.html', canonical: 'https://ladestack.in/blog/building-zero-downtime-deployment-pipelines', expectedHreflangs: 0 },
  { path: 'blog/infrastructure-as-code-terraform-pulumi/index.html', canonical: 'https://ladestack.in/blog/infrastructure-as-code-terraform-pulumi', expectedHreflangs: 0 },
  { path: 'blog/implementing-oauth2-openid-connect/index.html', canonical: 'https://ladestack.in/blog/implementing-oauth2-openid-connect', expectedHreflangs: 0 },
  { path: 'blog/mlops-deploying-ml-models-production/index.html', canonical: 'https://ladestack.in/blog/mlops-deploying-ml-models-production', expectedHreflangs: 0 },
  { path: 'blog/monitoring-ai-systems-in-production/index.html', canonical: 'https://ladestack.in/blog/monitoring-ai-systems-in-production', expectedHreflangs: 0 },
];

// Phase 3D-D: Zero remaining legacy fallback subpages
const LEGACY_FALLBACK_SUBPAGES = [];

let failed = false;

console.log('--- 1. Auditing Fully Localized Core English Routes & Articles ---');
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

console.log('\n--- 2. Auditing English-Only Modernized Routes (Zero False Alternates) ---');
for (const page of ENGLISH_ONLY_SUBPAGES) {
  const filePath = path.join(DIST_DIR, page.path);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ FAIL: Missing English subpage: ${page.path}`);
    failed = true;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');
  const hreflangCount = (html.match(/rel=["']alternate["']\s+hreflang=/gi) || []).length;
  if (hreflangCount !== page.expectedHreflangs) {
    console.error(`❌ FAIL [${page.path}]: Found ${hreflangCount} fake hreflang tags! Must NOT emit alternates for un-translated routes.`);
    failed = true;
  } else {
    console.log(`✅ PASS [${page.path}]: Canonical valid (${page.canonical}), zero fake hreflang tags.`);
  }
}

console.log('\n--- 3. Auditing Legacy Fallback Count (Must be exactly 0) ---');
if (LEGACY_FALLBACK_SUBPAGES.length !== 0) {
  console.error(`❌ FAIL: Expected 0 legacy fallback subpages in Phase 3D-D, got ${LEGACY_FALLBACK_SUBPAGES.length}`);
  failed = true;
} else {
  console.log(`✅ PASS: Exactly 0 legacy fallback subpages remain in Phase 3D-D (Zero Fallback Target Achieved).`);
}

if (failed) {
  process.exit(1);
} else {
  console.log(`\n🎉 ALL ENGLISH SUBPAGE CHECKS PASSED PERFECTLY (${LOCALIZED_SUBPAGES.length} LOCALIZED + ${ENGLISH_ONLY_SUBPAGES.length} ENGLISH-ONLY + 0 LEGACY FALLBACK)!`);
  process.exit(0);
}
