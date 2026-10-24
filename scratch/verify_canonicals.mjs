import fs from 'node:fs';
import path from 'node:path';

const content = fs.readFileSync('src/data/blogPosts.ts', 'utf8');
const regex = /slug:\s*['"]([^'"]+)['"]/g;
const slugs = [];
let match;
while ((match = regex.exec(content)) !== null) {
  slugs.push(match[1]);
}

console.log(`Testing all ${slugs.length} original canonical legacy URLs in dist:`);
let missing = 0;
for (const slug of slugs) {
  const p = path.join('dist/blog', slug, 'index.html');
  if (!fs.existsSync(p)) {
    console.error(`❌ MISSING ROUTE: ${p}`);
    missing++;
  } else {
    const html = fs.readFileSync(p, 'utf8');
    const expectedCanonical = `https://ladestack.in/blog/${slug}`;
    if (!html.includes(`href="${expectedCanonical}"`)) {
      console.error(`❌ WRONG CANONICAL in ${slug}: expected ${expectedCanonical}`);
      missing++;
    }
  }
}

if (missing === 0) {
  console.log(`✅ ALL ${slugs.length} ORIGINAL CANONICAL LEGACY URLS VERIFIED IN DIST!`);
} else {
  console.error(`❌ ${missing} errors encountered.`);
  process.exit(1);
}
