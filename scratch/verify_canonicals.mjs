import fs from 'node:fs';
import path from 'node:path';

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

const content = fs.readFileSync('src/data/blogPosts.ts', 'utf8');
const regex = /slug:\s*['"]([^'"]+)['"]/g;
const slugs = [];
let match;
while ((match = regex.exec(content)) !== null) {
  slugs.push(match[1]);
}

console.log(`Checking against historical baseline (27 entries)...`);
if (JSON.stringify(slugs) !== JSON.stringify(HISTORICAL_LEGACY_BASELINE_SLUGS)) {
  console.error(`❌ Baseline mismatch: src/data/blogPosts.ts does not match HISTORICAL_LEGACY_BASELINE_SLUGS!`);
  process.exit(1);
} else {
  console.log(`✅ Baseline verified: src/data/blogPosts.ts matches HISTORICAL_LEGACY_BASELINE_SLUGS 1:1.`);
}

console.log(`Testing all ${slugs.length} original canonical legacy URLs in dist:`);
let missing = 0;
for (const slug of slugs) {
  const p = path.join('dist/blog', slug, 'index.html');
  if (!fs.existsSync(p)) {
    console.error(`❌ MISSING ROUTE: ${p}`);
    missing++;
  } else {
    const html = fs.readFileSync(p, 'utf8');
    const expectedCanonical = `https://ladestack.in/blog/${slug}`;
    if (!html.includes(`href="${expectedCanonical}"`)) {
      console.error(`❌ WRONG CANONICAL in ${slug}: expected ${expectedCanonical}`);
      missing++;
    }
  }
}

if (missing === 0) {
  console.log(`✅ ALL ${slugs.length} ORIGINAL CANONICAL LEGACY URLS VERIFIED IN DIST!`);
} else {
  console.error(`❌ ${missing} errors encountered.`);
  process.exit(1);
}
