import fs from 'node:fs';

const html = fs.readFileSync('dist/blog/index.html', 'utf8');
const hasLegacySection = html.includes('id="legacy-archive"');
const legacyMatches = html.match(/class="legacy-card"/g) || [];

console.log('Legacy Archive Section Present:', hasLegacySection);
console.log('Legacy Card Count in dist/blog/index.html:', legacyMatches.length);

const legacySlugs = [
  'saas-architecture-patterns-guide',
  'building-multi-tenant-saas-database-strategies',
  'designing-scalable-microservices-saas',
  'building-subscription-billing-systems',
  'scaling-saas-applications-million-users',
  'baas-platforms-compared-firebase-supabase-appwrite',
  'building-serverless-backends-with-baas',
  'real-time-data-sync-backend-services',
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

const missing = legacySlugs.filter(s => !html.includes('/blog/' + s));
console.log('Missing legacy slugs in /blog index:', missing);

// Check that non-English blog indexes do NOT have the legacy archive
const jaHtml = fs.readFileSync('dist/ja/blog/index.html', 'utf8');
console.log('JA Blog Index has legacy archive:', jaHtml.includes('id="legacy-archive"'));
