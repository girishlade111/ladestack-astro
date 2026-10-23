/**
 * scripts/check-all-links.mjs
 * Traverses all HTML files in dist/ and checks that every internal link resolves
 * to an existing file in dist/ or a configured redirect.
 */

import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

function getAllHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getAllHtmlFiles(DIST_DIR);
console.log(`Auditing internal links across ${htmlFiles.length} generated HTML files...`);

const linkRegex = /href=["']([^"']+)["']/gi;
let brokenLinks = 0;
const checkedLinks = new Set();

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];

    // Skip external links, mailto, tel, anchors, js
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      href.startsWith('javascript:')
    ) {
      continue;
    }

    // Clean anchor / query
    const cleanHref = href.split('#')[0].split('?')[0];
    if (!cleanHref || cleanHref === '') continue;

    checkedLinks.add(cleanHref);

    // Resolve target in dist
    let target = cleanHref.startsWith('/') ? cleanHref.slice(1) : cleanHref;
    if (target === '') target = 'index.html';

    const directPath = path.join(DIST_DIR, target);
    const indexPath = path.join(DIST_DIR, target, 'index.html');
    const htmlPath = path.join(DIST_DIR, `${target}.html`);

    const exists =
      fs.existsSync(directPath) ||
      fs.existsSync(indexPath) ||
      fs.existsSync(htmlPath);

    if (!exists) {
      console.error(`❌ Broken link in ${path.relative(DIST_DIR, file)}: "${href}"`);
      brokenLinks++;
    }
  }
}

console.log(`Checked ${checkedLinks.size} unique internal link targets.`);

if (brokenLinks > 0) {
  console.error(`❌ Found ${brokenLinks} broken internal links.`);
  process.exit(1);
} else {
  console.log('✅ PASS: All internal links resolve to valid generated static targets!');
  process.exit(0);
}
