import fs from 'fs';
import path from 'path';

console.log('=== RUNNING PHASE 4C-1 REGRESSION TEST ===\n');

let failed = false;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failed = true;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Check BaseLayout.astro display=optional
const baseLayout = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');
assert(baseLayout.includes('&display=optional'), 'BaseLayout.astro specifies &display=optional for Google Fonts');
assert(!baseLayout.includes('&display=swap'), 'BaseLayout.astro does not contain &display=swap');

// 2. Check global.css Shiki comment contrast rule
const globalCss = fs.readFileSync('src/styles/global.css', 'utf8');
assert(globalCss.includes('pre.astro-code code span[style*="color:#6A737D"]'), 'global.css has Shiki comment selector #6A737D');
assert(globalCss.includes('#9CA3AF !important'), 'global.css applies #9CA3AF !important (WCAG AA 5.6:1 contrast)');

// 3. Check LanguageSwitcher components accessible name
const langSwitcher = fs.readFileSync('src/components/LanguageSwitcher.astro', 'utf8');
assert(langSwitcher.includes('${currentLocale.toUpperCase()} - ${t(\'nav.languageSelect\')}'), 'LanguageSwitcher.astro accessible name includes visible uppercase locale');

const uiLangSwitcher = fs.readFileSync('src/components/ui/LanguageSwitcher.astro', 'utf8');
assert(uiLangSwitcher.includes('${current.code.toUpperCase()} - Select language:'), 'ui/LanguageSwitcher.astro accessible name includes visible uppercase code');

// 4. Check BlogPostLayout.astro fixes
const blogLayout = fs.readFileSync('src/components/blog/BlogPostLayout.astro', 'utf8');
assert(blogLayout.includes('aria-label="Share Link - Copy link to article"'), 'BlogPostLayout.astro share button includes visible label Share Link');
assert(blogLayout.includes('aspect-[16/9] w-full'), 'BlogPostLayout.astro cover image wrapper specifies aspect-[16/9]');
assert(blogLayout.includes('input.setAttribute(\'aria-label\', label || \'Checklist item\');'), 'BlogPostLayout.astro sets accessible aria-label on markdown checkboxes');
assert(!blogLayout.includes('input.setAttribute(\'role\', \'presentation\');'), 'BlogPostLayout.astro does not set conflicting role=presentation on checkboxes');

// 5. Check built HTML artifacts in dist/
const owaspHtml = fs.readFileSync('dist/blog/owasp-top-10-complete-mitigation-guide/index.html', 'utf8');
assert(owaspHtml.includes('aspect-[16/9]'), 'Built OWASP HTML includes aspect-[16/9] cover container');
assert(owaspHtml.includes('Share Link - Copy link to article'), 'Built OWASP HTML includes accessible share link button');

const homeHtml = fs.readFileSync('dist/index.html', 'utf8');
assert(homeHtml.includes('&display=optional'), 'Built homepage HTML includes &display=optional font link');

if (failed) {
  console.error('\nPhase 4C-1 regression test failed.');
  process.exit(1);
} else {
  console.log('\nAll Phase 4C-1 regression checks PASSED.');
}
