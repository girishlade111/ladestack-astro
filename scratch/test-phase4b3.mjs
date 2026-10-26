import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

let allPassed = true;

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    allPassed = false;
  } else {
    console.log(`PASS: ${message}`);
  }
}

console.log('--- TEST 1: Exact PostCSS Dependency Versions ---');
const npmLs = execSync('npm ls postcss-selector-parser --json', { encoding: 'utf8' });
const lsData = JSON.parse(npmLs);
const topParser = lsData.dependencies?.['postcss-selector-parser']?.version;
const typoParser = lsData.dependencies?.['@tailwindcss/typography']?.dependencies?.['postcss-selector-parser']?.version;
const nestedParser = lsData.dependencies?.tailwindcss?.dependencies?.['postcss-nested']?.dependencies?.['postcss-selector-parser']?.version;

assert(topParser === '6.1.5' || typoParser === '6.1.5', `postcss-selector-parser 6.1.5 is present in dependency tree`);
assert(typoParser === '6.1.5', `@tailwindcss/typography uses 6.1.5 (actual: ${typoParser})`);
assert(!JSON.stringify(lsData).includes('6.0.10'), 'No vulnerable 6.0.10 instances remain anywhere in npm tree');

console.log('\n--- TEST 2: Vercel Redirects Preservation ---');
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert(Array.isArray(vercelConfig.redirects), 'vercel.json has redirects array');
assert(vercelConfig.redirects.length === 12, `vercel.json preserves exactly 12 redirects (actual: ${vercelConfig.redirects.length})`);
for (const r of vercelConfig.redirects) {
  assert(r.statusCode === 301, `Redirect ${r.source} -> ${r.destination} has statusCode 301`);
}

console.log('\n--- TEST 3: Vercel CSP Configuration Audit ---');
const globalHeader = vercelConfig.headers?.find(h => h.source === '/(.*)');
assert(!!globalHeader, 'Global header rule /(.*) exists in vercel.json');
const cspHeader = globalHeader.headers.find(h => h.key === 'Content-Security-Policy-Report-Only');
assert(!!cspHeader, 'Content-Security-Policy-Report-Only header is configured');
assert(!cspHeader.value.includes('report-to') && !cspHeader.value.includes('report-uri'), 'No fictional or non-existent telemetry endpoints configured in CSP');
assert(!globalHeader.headers.some(h => h.key === 'Content-Security-Policy'), 'Enforcing CSP is NOT enabled prematurely');

console.log('\n--- TEST 4: Security Headers Scope ---');
const headerKeys = globalHeader.headers.map(h => h.key);
assert(headerKeys.includes('X-Content-Type-Options'), 'X-Content-Type-Options present');
assert(headerKeys.includes('Referrer-Policy'), 'Referrer-Policy present');
assert(headerKeys.includes('X-Frame-Options'), 'X-Frame-Options present');
assert(headerKeys.includes('Permissions-Policy'), 'Permissions-Policy present');
const hstsHeader = globalHeader.headers.find(h => h.key === 'Strict-Transport-Security');
assert(!hstsHeader || (!hstsHeader.value.includes('preload') && !hstsHeader.value.includes('includeSubDomains')), 'HSTS does not include risky preload or includeSubDomains');

console.log('\n--- TEST 5: Asset Inventory & Historical Preservation ---');
const publicDir = 'public';
const files = fs.readdirSync(publicDir, { recursive: true }).filter(f => {
  const p = path.join(publicDir, f);
  return fs.statSync(p).isFile();
});
assert(files.length >= 55, `Historical public assets preserved (count: ${files.length})`);

if (!allPassed) {
  process.exit(1);
}
console.log('\nALL PHASE 4B-3 SECURITY CLOSURE ASSERTIONS PASSED!');
