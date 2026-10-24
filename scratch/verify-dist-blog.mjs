import fs from 'node:fs';
import { blogPosts } from '../src/data/blogPosts.ts';

const html = fs.readFileSync('dist/blog/index.html', 'utf8');
const hasLegacySection = html.includes('data-legacy-archive-section');
const legacyMatches = html.match(/<article[^>]*data-legacy-card/g) || [];

console.log('--- Dist Legacy Archive Validation ---');
console.log('Legacy Archive Section Present:', hasLegacySection);
console.log('Legacy Card Count in dist/blog/index.html:', legacyMatches.length);

const enFiles = new Set(fs.readdirSync('src/content/blog/en').map(f => f.replace('.md', '')));
const unmigrated = blogPosts.filter(p => !enFiles.has(p.slug));

console.log('Unmigrated legacy articles expected:', unmigrated.length);

const missing = unmigrated.filter(p => !html.includes(`/blog/${p.slug}`));
console.log('Missing legacy slugs in dist/blog/index.html:', missing.map(p => p.slug));

// Check that non-English blog indexes do NOT have the legacy archive
const nonEn = ['ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];
let nonEnClean = true;
for (const loc of nonEn) {
  const locHtml = fs.readFileSync(`dist/${loc}/blog/index.html`, 'utf8');
  const locCards = locHtml.match(/<article[^>]*data-legacy-card/g) || [];
  if (locCards.length > 0) {
    console.error(`ERROR: Non-English index has ${locCards.length} legacy cards: ${loc}`);
    nonEnClean = false;
  }
}
if (nonEnClean) {
  console.log('All 8 non-English indexes verified clean (0 legacy cards).');
}

const passed = hasLegacySection && legacyMatches.length === unmigrated.length && unmigrated.length === 12 && missing.length === 0 && nonEnClean;
console.log('Legacy Archive Validation Result:', passed ? '✅ PASS' : '❌ FAIL');
if (!passed) process.exit(1);
