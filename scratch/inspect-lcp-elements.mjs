import fs from 'fs';

const routes = ['home', 'apps', 'blog', 'ja-blog', 'owasp'];

console.log('=== LCP ELEMENT & DIAGNOSTIC INSPECTION (REMEDIATION RUNS) ===\n');

for (const r of routes) {
  console.log(`================ ROUTE: ${r.toUpperCase()} ================`);
  const file = `scratch/lighthouse/remediation/run2/${r}.json`;
  if (!fs.existsSync(file)) continue;

  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  // LCP audit
  const lcpAudit = data.audits['largest-contentful-paint-element'];
  console.log('LCP Element Details:');
  if (lcpAudit && lcpAudit.details && lcpAudit.details.items) {
    for (const item of lcpAudit.details.items) {
      console.log('  Node snippet:', item.node?.snippet);
      console.log('  Selector:', item.node?.selector);
      console.log('  Node label:', item.node?.nodeLabel);
    }
  }

  // LCP breakdown
  const lcpBreakdown = data.audits['lcp-breakdown'];
  if (lcpBreakdown && lcpBreakdown.details) {
    console.log('LCP Breakdown items:', JSON.stringify(lcpBreakdown.details.items, null, 2));
  }

  // Render blocking resources
  const rb = data.audits['render-blocking-resources'];
  console.log('Render-blocking requests:');
  if (rb && rb.details && rb.details.items) {
    for (const item of rb.details.items) {
      console.log(`  - ${item.url} (wastedMs: ${item.wastedMs})`);
    }
  }

  // Critical request chains
  const chains = data.audits['critical-request-chains'];
  console.log('Critical request chain count:', Object.keys(chains?.details?.chains || {}).length);

  console.log('LCP Numeric Value:', (data.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2) + 's');
  console.log('FCP Numeric Value:', (data.audits['first-contentful-paint'].numericValue / 1000).toFixed(2) + 's');
  console.log('CLS Numeric Value:', data.audits['cumulative-layout-shift'].numericValue.toFixed(4));
  console.log('TBT Numeric Value:', Math.round(data.audits['total-blocking-time'].numericValue) + 'ms\n');
}
