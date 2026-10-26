import { execSync } from 'child_process';

const tests = [
  { name: 'Astro Typecheck (npm run check)', cmd: 'npm run check' },
  { name: 'i18n Test Suite (npm run test:i18n)', cmd: 'npm run test:i18n' },
  { name: 'Phase 3 Blog Tests (scripts/test-phase3-blog.mjs)', cmd: 'node scripts/test-phase3-blog.mjs' },
  { name: 'English Routes Audit (scripts/audit-english-routes.mjs)', cmd: 'node scripts/audit-english-routes.mjs' },
  { name: 'Link Checker (scripts/check-all-links.mjs)', cmd: 'node scripts/check-all-links.mjs' },
  { name: 'OWASP 2025 Test (scripts/test-owasp-2025.mjs)', cmd: 'node scripts/test-owasp-2025.mjs' },
  { name: 'Dist Blog Verification (scratch/verify-dist-blog.mjs)', cmd: 'node scratch/verify-dist-blog.mjs' },
  { name: 'Canonical URLs Verification (scratch/verify_canonicals.mjs)', cmd: 'node scratch/verify_canonicals.mjs' },
  { name: 'Full Pre-Release Audit (scratch/run-full-audit.mjs)', cmd: 'node scratch/run-full-audit.mjs' },
  { name: 'Release Inventory Verification (scratch/verify_release_inventory.mjs)', cmd: 'node scratch/verify_release_inventory.mjs' },
  { name: '2528b3b Slugs Preserved (scratch/check-2528b3b-slugs.mjs)', cmd: 'node scratch/check-2528b3b-slugs.mjs' },
  { name: 'Blog i18n Verification (scratch/verify-blog-i18n.mjs)', cmd: 'node scratch/verify-blog-i18n.mjs' },
  { name: 'Edge Redirects Verification (scratch/verify-redirects.mjs)', cmd: 'node scratch/verify-redirects.mjs' },
  { name: 'Phase 4B-2 Test Suite (scratch/test-phase4b2.mjs)', cmd: 'node scratch/test-phase4b2.mjs' },
  { name: 'Phase 4B-3 Test Suite (scratch/test-phase4b3.mjs)', cmd: 'node scratch/test-phase4b3.mjs' },
];

console.log('=== RUNNING FULL REGRESSION MATRIX ===\n');

const results = [];
let allPassed = true;

for (const t of tests) {
  process.stdout.write(`Running: ${t.name}... `);
  try {
    const output = execSync(t.cmd, { stdio: 'pipe', encoding: 'utf8' });
    console.log('PASS (exit code 0)');
    results.push({ name: t.name, status: 'PASS', code: 0 });
  } catch (err) {
    console.log(`FAIL (exit code ${err.status})`);
    console.error(err.stdout || err.stderr || err.message);
    results.push({ name: t.name, status: 'FAIL', code: err.status });
    allPassed = false;
  }
}

console.log('\n=== REGRESSION MATRIX SUMMARY ===');
console.table(results);

if (!allPassed) {
  process.exit(1);
} else {
  console.log('\nAll 15 regression suites PASSED with exit code 0.');
}
