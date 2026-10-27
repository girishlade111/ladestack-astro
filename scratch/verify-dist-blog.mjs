import fs from 'node:fs';
import { blogPosts } from '../src/data/blogPosts.ts';

const html = fs.readFileSync('dist/blog/index.html', 'utf8');
const hasLegacySection = html.includes('<section data-legacy-archive-section');
const legacyMatches = html.match(/<article[^>]*data-legacy-card/g) || [];
const modernMatches = html.match(/<article[^>]*data-post-card/g) || [];

console.log('--- Phase 3D-D Zero-Fallback Legacy Archive Validation ---');
console.log('Legacy Archive Section Present:', hasLegacySection);
console.log('Legacy Card Count in dist/blog/index.html:', legacyMatches.length);
console.log('Modern Card Count in dist/blog/index.html:', modernMatches.length);

const enFiles = new Set(fs.readdirSync('src/content/blog/en').map(f => f.replace('.md', '')));
const unmigrated = blogPosts.filter(p => !enFiles.has(p.slug));
const migrated = blogPosts.filter(p => enFiles.has(p.slug));

console.log('Total historical legacy baseline articles:', blogPosts.length);
console.log('Migrated legacy articles:', migrated.length);
console.log('Unmigrated legacy articles expected:', unmigrated.length);

// Assert all 27 original historical URLs are present on disk
let allOriginalUrlsPresent = true;
for (const p of blogPosts) {
  const pPath = `dist/blog/${p.slug}/index.html`;
  if (!fs.existsSync(pPath)) {
    console.error(`ERROR: Missing built page for original legacy slug: ${p.slug}`);
    allOriginalUrlsPresent = false;
  }
}
if (allOriginalUrlsPresent) {
  console.log('All 27 original legacy article URLs verified present in dist/blog/{slug}/index.html.');
}

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

const passed =
  !hasLegacySection &&
  legacyMatches.length === 0 &&
  unmigrated.length === 0 &&
  migrated.length === 27 &&
  modernMatches.length === 30 &&
  allOriginalUrlsPresent &&
  nonEnClean;

console.log('Legacy Archive Validation Result:', passed ? '✅ PASS' : '❌ FAIL');
if (!passed) process.exit(1);
