import fs from 'fs';
import path from 'path';

const contentDir = 'src/content/blog';
const locales = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];

console.log('=== BLOG CONTENT DIRECTORY AUDIT ===\n');

let totalMarkdownDocs = 0;
const docCounts = {};

for (const loc of locales) {
  const dir = path.join(contentDir, loc);
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    docCounts[loc] = files.length;
    totalMarkdownDocs += files.length;
  } else {
    docCounts[loc] = 0;
  }
}

console.log('Markdown Files per Locale:');
console.table(docCounts);
console.log(`Total Markdown Documents across all locales: ${totalMarkdownDocs}\n`);

console.log('=== DIST HTML BLOG CARD AUDIT ===\n');

for (const loc of locales) {
  const htmlPath = loc === 'en' 
    ? 'dist/blog/index.html' 
    : `dist/${loc}/blog/index.html`;

  if (!fs.existsSync(htmlPath)) {
    console.log(`❌ ${loc}: Missing ${htmlPath}`);
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');

  // Count post cards rendered with data-category
  const postCards = (html.match(/data-category=/g) || []).length;
  
  // Count article link hrefs
  const postLinks = [...html.matchAll(/href="([^"]*\/blog\/[^"]*)"/g)].map(m => m[1]);
  const uniquePostLinks = new Set(postLinks);

  // Check if legacy fallback section rendered
  const hasLegacySection = html.includes('data-legacy-archive-section');
  const legacyCards = (html.match(/data-legacy-card/g) || []).length;

  console.log(`Locale: ${loc.toUpperCase()}`);
  console.log(`  HTML file: ${htmlPath} (${html.length} bytes)`);
  console.log(`  Markdown docs: ${docCounts[loc]}`);
  console.log(`  Rendered article cards (data-category): ${postCards}`);
  console.log(`  Legacy fallback cards: ${legacyCards}`);
  console.log(`  Unique /blog/ links: ${uniquePostLinks.size}`);
  console.log('---');
}
