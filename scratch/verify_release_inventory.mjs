import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const blogDir = path.join(process.cwd(), 'src/content/blog');
const locales = fs.readdirSync(blogDir).filter(f => fs.statSync(path.join(blogDir, f)).isDirectory());
console.log('Locales found:', locales);

let totalMarkdown = 0;
let enMarkdown = 0;
let nonEnMarkdown = 0;
const topicMap = new Map();

for (const loc of locales) {
  const files = fs.readdirSync(path.join(blogDir, loc)).filter(f => f.endsWith('.md'));
  if (loc === 'en') {
    enMarkdown += files.length;
  } else {
    nonEnMarkdown += files.length;
  }
  totalMarkdown += files.length;
  for (const f of files) {
    const slug = f.replace('.md', '');
    if (!topicMap.has(slug)) topicMap.set(slug, []);
    topicMap.get(slug).push(loc);
  }
}

console.log('Total Markdown files:', totalMarkdown);
console.log('English Markdown files:', enMarkdown);
console.log('Non-English Markdown files:', nonEnMarkdown);

let fullyLocalizedCount = 0;
let englishOnlyCount = 0;
let otherTopicCount = 0;

for (const [slug, locs] of topicMap.entries()) {
  if (locs.length === 9) fullyLocalizedCount++;
  else if (locs.length === 1 && locs[0] === 'en') englishOnlyCount++;
  else {
    console.log('Partial topic:', slug, locs);
    otherTopicCount++;
  }
}

console.log('Fully localized topics (all 9 locales):', fullyLocalizedCount);
console.log('English-only topics:', englishOnlyCount);
console.log('Other topics:', otherTopicCount);

// Compare against git show 2528b3b:src/data/blogPosts.ts
const baselineTs = execSync('git show 2528b3b:src/data/blogPosts.ts', { encoding: 'utf-8' });
const baselineMatches = baselineTs.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
const baselineSlugs = baselineMatches.map(m => m.replace(/slug:\s*['"]/, '').replace(/['"]/, ''));
console.log('Historical baseline slugs in 2528b3b:', baselineSlugs.length);

const enFiles = new Set(fs.readdirSync(path.join(blogDir, 'en')).map(f => f.replace('.md', '')));
let missingInEn = 0;
for (const s of baselineSlugs) {
  if (!enFiles.has(s)) {
    console.error('Missing in English Markdown:', s);
    missingInEn++;
  }
}
console.log('Missing baseline slugs in English Markdown:', missingInEn);

// Check dist/blog/index.html
const distBlogIndex = fs.readFileSync(path.join(process.cwd(), 'dist/blog/index.html'), 'utf-8');
const cardMatches = distBlogIndex.match(/<article\b[^>]*class="[^"]*blog-card[^"]*"[^>]*>/g) || [];
console.log('Card count in dist/blog/index.html:', cardMatches.length);
const legacySectionPresent = distBlogIndex.includes('<section data-legacy-archive-section');
console.log('Legacy section present in dist/blog/index.html:', legacySectionPresent);

// Check 9 localized blog indexes
for (const loc of locales) {
  const p = loc === 'en' ? 'dist/blog/index.html' : `dist/${loc}/blog/index.html`;
  const exists = fs.existsSync(path.join(process.cwd(), p));
  console.log(`Localized blog index [${loc}] exists:`, exists);
}
