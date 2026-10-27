// scratch/test-preview-deployment.mjs
// Automated Live Test Matrix for Isolated Vercel Preview Deployment

import { execSync } from 'child_process';
import assert from 'assert';

const PREVIEW_BASE = 'https://ladestack-astro-preview.vercel.app';
const PROD_BASE = 'https://ladestack.in';

console.log('=== STARTING LIVE PREVIEW DEPLOYMENT AUDIT ===\n');
console.log('Preview Target:', PREVIEW_BASE);
console.log('Production Target:', PROD_BASE);

let totalPassed = 0;
let totalFailed = 0;

function runCurl(url, args = '-s -S -i') {
  try {
    const cmd = `curl ${args} "${url}"`;
    return execSync(cmd, { encoding: 'utf-8', timeout: 15000 });
  } catch (err) {
    console.error(`Curl error on ${url}:`, err.message);
    return null;
  }
}

function parseHttpResponse(raw) {
  if (!raw) return { status: 0, headers: {}, body: '' };
  
  const parts = raw.split(/\r?\n\r?\n/);
  const headerBlocks = [];
  let body = '';
  
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith('HTTP/')) {
      headerBlocks.push(parts[i]);
    } else {
      body = parts.slice(i).join('\r\n\r\n');
      break;
    }
  }

  const lastHeaderBlock = headerBlocks[headerBlocks.length - 1] || '';
  const lines = lastHeaderBlock.split(/\r?\n/);
  const statusLine = lines[0] || '';
  const statusMatch = statusLine.match(/HTTP\/\S+\s+(\d+)/);
  const status = statusMatch ? parseInt(statusMatch[1], 10) : 0;

  const headers = {};
  for (let j = 1; j < lines.length; j++) {
    const colonIdx = lines[j].indexOf(':');
    if (colonIdx > 0) {
      const key = lines[j].substring(0, colonIdx).trim().toLowerCase();
      const val = lines[j].substring(colonIdx + 1).trim();
      headers[key] = val;
    }
  }

  return { status, headers, body, raw };
}

function check(name, testFn) {
  try {
    testFn();
    console.log(`[PASS] ${name}`);
    totalPassed++;
  } catch (err) {
    console.error(`[FAIL] ${name}: ${err.message}`);
    totalFailed++;
  }
}

// -------------------------------------------------------------
// 1. Live Production Protection Check (Must NOT be affected)
// -------------------------------------------------------------
console.log('\n--- 1. Live Production Shield Verification ---');
const prodRes = parseHttpResponse(runCurl(PROD_BASE, '-s -S -I'));
check('Production domain returns HTTP 307 to www', () => {
  assert.strictEqual(prodRes.status, 307);
  assert.strictEqual(prodRes.headers['location'], 'https://www.ladestack.in/');
});

const prodWwwRes = parseHttpResponse(runCurl('https://www.ladestack.in/', '-s -S -I'));
check('Production www domain serves Vite baseline with ETag 08c97678af10618355f22fba9d21a8e5', () => {
  assert.strictEqual(prodWwwRes.status, 200);
  assert.strictEqual(prodWwwRes.headers['etag'], '"08c97678af10618355f22fba9d21a8e5"');
  assert.strictEqual(prodWwwRes.headers['content-length'], '12299');
});

// -------------------------------------------------------------
// 2. English Core Pages (HTTP 200)
// -------------------------------------------------------------
console.log('\n--- 2. English Core Routes ---');
const coreRoutes = [
  '/',
  '/apps',
  '/blog',
  '/about',
  '/contact',
  '/docs',
  '/gb-coder',
  '/privacy',
  '/terms',
  '/sitemap'
];

for (const route of coreRoutes) {
  const res = parseHttpResponse(runCurl(`${PREVIEW_BASE}${route}`, '-s -S -I'));
  check(`Route ${route} returns HTTP 200`, () => {
    assert.strictEqual(res.status, 200, `Expected 200 on ${route}, got ${res.status}`);
  });
}

// -------------------------------------------------------------
// 3. Localized Homepages (9 locales)
// -------------------------------------------------------------
console.log('\n--- 3. Localized Homepages ---');
const locales = ['es', 'fr', 'pt', 'ru', 'tr', 'zh', 'ja', 'ko'];
for (const loc of locales) {
  const res = parseHttpResponse(runCurl(`${PREVIEW_BASE}/${loc}`, '-s -S -I'));
  check(`Localized homepage /${loc} returns HTTP 200`, () => {
    assert.strictEqual(res.status, 200, `Expected 200 on /${loc}, got ${res.status}`);
  });
}

// -------------------------------------------------------------
// 4. Localized Blog Indexes
// -------------------------------------------------------------
console.log('\n--- 4. Localized Blog Indexes ---');
for (const loc of locales) {
  const res = parseHttpResponse(runCurl(`${PREVIEW_BASE}/${loc}/blog`, '-s -S -I'));
  check(`Localized blog index /${loc}/blog returns HTTP 200`, () => {
    assert.strictEqual(res.status, 200, `Expected 200 on /${loc}/blog, got ${res.status}`);
  });
}

// -------------------------------------------------------------
// 5. Original 27 Historical Blog Articles (from 2528b3b baseline)
// -------------------------------------------------------------
console.log('\n--- 5. Historical 27 Canonical Blog Articles (2528b3b) ---');
const historicalSlugs = [
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

for (const slug of historicalSlugs) {
  const res = parseHttpResponse(runCurl(`${PREVIEW_BASE}/blog/${slug}`, '-s -S -I'));
  check(`Historical blog /blog/${slug} returns HTTP 200`, () => {
    assert.strictEqual(res.status, 200, `Expected 200 on /blog/${slug}, got ${res.status}`);
  });
}

// -------------------------------------------------------------
// 6. All 12 Legacy HTTP 301 Edge Redirects
// -------------------------------------------------------------
console.log('\n--- 6. All 12 Legacy HTTP 301 Edge Redirects ---');
const redirects = [
  { from: '/projects', to: '/apps' },
  { from: '/file-sharing-platform', to: '/apps' },
  { from: '/api-testing-platform', to: '/apps' },
  { from: '/ai-code-viewer-ai', to: '/gb-coder' },
  { from: '/blog/1', to: '/blog/future-of-ai-in-software-development' },
  { from: '/blog/2', to: '/blog/building-ai-powered-code-review-systems' },
  { from: '/blog/3', to: '/blog/machine-learning-pipelines-for-web-developers' },
  { from: '/blog/4', to: '/blog/generative-ai-for-content-creation' },
  { from: '/blog/5', to: '/blog/building-rag-applications-vector-databases' },
  { from: '/blog/6', to: '/blog/fine-tuning-llms-domain-specific-tasks' },
  { from: '/sitemap-pages.xml', to: '/sitemap-index.xml' },
  { from: '/sitemap-blog.xml', to: '/sitemap-index.xml' }
];

for (const rule of redirects) {
  const res = parseHttpResponse(runCurl(`${PREVIEW_BASE}${rule.from}`, '-s -S -I'));
  check(`Redirect ${rule.from} returns HTTP 301 to ${rule.to}`, () => {
    assert.strictEqual(res.status, 301, `Expected 301 on ${rule.from}, got ${res.status}`);
    assert.strictEqual(res.headers['location'], rule.to, `Expected location ${rule.to}, got ${res.headers['location']}`);
  });
}

// -------------------------------------------------------------
// 7. Error Handling (404)
// -------------------------------------------------------------
console.log('\n--- 7. Error Handling (404) ---');
const notFoundRes = parseHttpResponse(runCurl(`${PREVIEW_BASE}/not-found-random-page-test`, '-s -S -i'));
check('Non-existent route returns HTTP 404 and branded page', () => {
  assert.strictEqual(notFoundRes.status, 404);
  assert.ok(notFoundRes.body.includes('404') || notFoundRes.body.includes('Page Not Found'), 'Body includes 404 message');
});

// -------------------------------------------------------------
// 8. Sitemaps and Robots.txt
// -------------------------------------------------------------
console.log('\n--- 8. Sitemaps and Robots.txt ---');
const sitemapIndexRes = parseHttpResponse(runCurl(`${PREVIEW_BASE}/sitemap-index.xml`, '-s -S -i'));
check('/sitemap-index.xml returns HTTP 200 with XML content', () => {
  assert.strictEqual(sitemapIndexRes.status, 200);
  assert.ok(sitemapIndexRes.headers['content-type'].includes('xml'));
  assert.ok(sitemapIndexRes.body.includes('sitemap-0.xml'));
});

const sitemap0Res = parseHttpResponse(runCurl(`${PREVIEW_BASE}/sitemap-0.xml`, '-s -S -i'));
check('/sitemap-0.xml returns HTTP 200 with 233 URLs', () => {
  assert.strictEqual(sitemap0Res.status, 200);
  const count = (sitemap0Res.body.match(/<loc>/g) || []).length;
  assert.strictEqual(count, 233, `Expected 233 URLs in sitemap-0.xml, got ${count}`);
});

const robotsRes = parseHttpResponse(runCurl(`${PREVIEW_BASE}/robots.txt`, '-s -S -i'));
check('/robots.txt returns HTTP 200 with Disallow and Sitemap', () => {
  assert.strictEqual(robotsRes.status, 200);
  assert.ok(robotsRes.body.includes('Disallow: /apps/admin'));
  assert.ok(robotsRes.body.includes('sitemap-index.xml'));
});

// -------------------------------------------------------------
// 9. Security Headers and CSP Report-Only
// -------------------------------------------------------------
console.log('\n--- 9. Security Headers ---');
const homeRes = parseHttpResponse(runCurl(`${PREVIEW_BASE}/`, '-s -S -I'));
check('Security headers are present and properly configured', () => {
  assert.strictEqual(homeRes.headers['x-content-type-options'], 'nosniff');
  assert.strictEqual(homeRes.headers['x-frame-options'], 'DENY');
  assert.strictEqual(homeRes.headers['referrer-policy'], 'strict-origin-when-cross-origin');
  assert.ok(homeRes.headers['permissions-policy'].includes('camera=()'));
  assert.ok(homeRes.headers['content-security-policy-report-only'], 'CSP Report-Only header present');
  assert.ok(homeRes.headers['content-security-policy-report-only'].includes("default-src 'self'"));
});

// -------------------------------------------------------------
// 10. Canonical and Hreflang Tags Fidelity
// -------------------------------------------------------------
console.log('\n--- 10. Canonical & Hreflang Tags Fidelity ---');
const homeBody = runCurl(`${PREVIEW_BASE}/`, '-s -S');
check('Homepage canonical points to https://ladestack.in/', () => {
  assert.ok(homeBody.includes('<link rel="canonical" href="https://ladestack.in">') ||
            homeBody.includes('<link rel="canonical" href="https://ladestack.in/'), 'Canonical tag exists');
});
check('Homepage includes 9 hreflang alternate links + x-default', () => {
  const hreflangMatches = homeBody.match(/hreflang="([^"]+)"/g) || [];
  assert.ok(hreflangMatches.length >= 10, `Expected at least 10 hreflang links, got ${hreflangMatches.length}`);
});

const owaspBody = runCurl(`${PREVIEW_BASE}/blog/owasp-top-10-complete-mitigation-guide`, '-s -S');
check('Blog article canonical points to canonical production URL', () => {
  assert.ok(owaspBody.includes('https://ladestack.in/blog/owasp-top-10-complete-mitigation-guide'), 'Canonical URL points to production');
});

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n=========================================');
console.log(`LIVE AUDIT COMPLETE: ${totalPassed} PASSED, ${totalFailed} FAILED`);
console.log('=========================================\n');

if (totalFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
