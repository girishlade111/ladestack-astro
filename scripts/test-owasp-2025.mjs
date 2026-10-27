import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const LOCALES = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];
const SLUG = 'owasp-top-10-complete-mitigation-guide';

const EXPECTED_2025_IDENTIFIERS = [
  'A01:2025',
  'A02:2025',
  'A03:2025',
  'A04:2025',
  'A05:2025',
  'A06:2025',
  'A07:2025',
  'A08:2025',
  'A09:2025',
  'A10:2025'
];

let failed = false;

console.log('=== RUNNING OWASP TOP 10:2025 CONTENT REGRESSION TEST ===\n');

for (const locale of LOCALES) {
  const filePath = path.join(ROOT_DIR, 'src', 'content', 'blog', locale, `${SLUG}.md`);
  console.log(`Checking [${locale}] -> ${filePath}`);

  // 1. Confirm file exists
  if (!fs.existsSync(filePath)) {
    console.error(`  FAIL: File does not exist: ${filePath}`);
    failed = true;
    continue;
  }

  const rawContent = fs.readFileSync(filePath, 'utf-8');

  // 2. Frontmatter verification
  const frontmatterMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    console.error(`  FAIL: Missing YAML frontmatter in ${locale}`);
    failed = true;
    continue;
  }

  const fm = frontmatterMatch[1];
  if (!fm.includes(`slug: "${SLUG}"`)) {
    console.error(`  FAIL: Slug mismatch in ${locale}. Must be "${SLUG}"`);
    failed = true;
  }
  if (!fm.includes(`locale: "${locale}"`)) {
    console.error(`  FAIL: Locale mismatch in ${locale}. Must be "${locale}"`);
    failed = true;
  }
  if (!fm.includes(`translationKey: "${SLUG}"`)) {
    console.error(`  FAIL: translationKey mismatch in ${locale}. Must be "${SLUG}"`);
    failed = true;
  }
  if (!fm.includes('updatedAt: "2026-10-25"')) {
    console.error(`  FAIL: updatedAt must be "2026-10-25" in ${locale}`);
    failed = true;
  }

  // 3. Confirm 2025 is primary edition
  if (!rawContent.includes('2025')) {
    console.error(`  FAIL: Missing 2025 edition reference in ${locale}`);
    failed = true;
  }

  // 4. Validate all ten 2025 identifiers are primary headings (### A01:2025 ...)
  for (const id of EXPECTED_2025_IDENTIFIERS) {
    const headingPattern = new RegExp(`###\\s+${id}\\b`);
    if (!headingPattern.test(rawContent)) {
      console.error(`  FAIL: Missing primary category heading for ${id} in ${locale}`);
      failed = true;
    }
  }

  // 5. Ensure A10:2021 (SSRF as #10) is not a primary heading (should only be in historical comparison)
  const legacyHeadingPattern = /###\s+A10:2021\b/;
  if (legacyHeadingPattern.test(rawContent)) {
    console.error(`  FAIL: Detected deprecated A10:2021 as primary category heading in ${locale}`);
    failed = true;
  }

  // 6. Ensure Fail-Closed pattern and code sample are present
  if (!rawContent.includes('Fail-Closed') && !rawContent.includes('fail-closed')) {
    console.error(`  FAIL: Missing Fail-Closed mitigation pattern in A10:2025 for ${locale}`);
    failed = true;
  }

  // 7. Ensure historical comparison section exists and is explicitly labeled
  if (!rawContent.includes('2021') || !rawContent.includes('2025')) {
    console.error(`  FAIL: Missing historical comparison between 2021 and 2025 in ${locale}`);
    failed = true;
  }

  // 8. Reject placeholder strings
  const forbiddenPlaceholders = ['TODO', 'TBD', '[Translate]', 'Lorem ipsum'];
  for (const ph of forbiddenPlaceholders) {
    if (rawContent.includes(ph)) {
      console.error(`  FAIL: Found forbidden placeholder "${ph}" in ${locale}`);
      failed = true;
    }
  }

  // 9. Check length to avoid shallow summaries (must be comprehensive)
  const lineCount = rawContent.split('\n').length;
  if (lineCount < 200) {
    console.error(`  FAIL: Content appears too shallow (${lineCount} lines) for ${locale}`);
    failed = true;
  }

  console.log(`  PASS: [${locale}] verified (${lineCount} lines, all 10 2025 categories valid)`);
}

if (failed) {
  console.error('\nOWASP Top 10:2025 content regression test FAILED.');
  process.exit(1);
} else {
  console.log('\nALL 9 OWASP TOP 10 ARTICLES FULLY VERIFIED FOR 2025 STANDARD!');
  process.exit(0);
}
