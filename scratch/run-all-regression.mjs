import { execSync } from 'child_process';

const testSuites = [
  { name: 'npm run test:i18n', cmd: 'npm run test:i18n' },
  { name: 'scripts/test-phase3-blog.mjs', cmd: 'node scripts/test-phase3-blog.mjs' },
  { name: 'scripts/audit-english-routes.mjs', cmd: 'node scripts/audit-english-routes.mjs' },
  { name: 'scripts/check-all-links.mjs', cmd: 'node scripts/check-all-links.mjs' },
  { name: 'scripts/test-owasp-2025.mjs', cmd: 'node scripts/test-owasp-2025.mjs' },
  { name: 'scratch/verify-dist-blog.mjs', cmd: 'node scratch/verify-dist-blog.mjs' },
  { name: 'scratch/verify_canonicals.mjs', cmd: 'node scratch/verify_canonicals.mjs' },
  { name: 'scratch/run-full-audit.mjs', cmd: 'node scratch/run-full-audit.mjs' },
  { name: 'scratch/verify_release_inventory.mjs', cmd: 'node scratch/verify_release_inventory.mjs' },
  { name: 'scratch/check-2528b3b-slugs.mjs', cmd: 'node scratch/check-2528b3b-slugs.mjs' },
  { name: 'scratch/verify-blog-i18n.mjs', cmd: 'node scratch/verify-blog-i18n.mjs' },
  { name: 'scratch/verify-redirects.mjs', cmd: 'node scratch/verify-redirects.mjs' },
  { name: 'scratch/test-phase4b2.mjs', cmd: 'node scratch/test-phase4b2.mjs' },
  { name: 'scratch/test-phase4b3.mjs', cmd: 'node scratch/test-phase4b3.mjs' }
];

let allPassed = true;
const results = [];

for (const suite of testSuites) {
  try {
    const out = execSync(suite.cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    results.push({ name: suite.name, status: 'PASS', exitCode: 0 });
    console.log(`[PASS] ${suite.name}`);
  } catch (err) {
    allPassed = false;
    results.push({ name: suite.name, status: 'FAIL', exitCode: err.status, error: err.stderr || err.stdout });
    console.error(`[FAIL] ${suite.name} (exit ${err.status})`);
    console.error(err.stderr || err.stdout);
  }
}

console.log('\n--- REGRESSION SUMMARY ---');
console.table(results);

if (!allPassed) {
  process.exit(1);
}
console.log('ALL 14 REGRESSION SUITES PASSED CLEANLY!');
