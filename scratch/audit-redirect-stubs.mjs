import fs from 'node:fs';
import path from 'node:path';

function findHtmlFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(full, list);
    } else if (entry.name.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const allHtml = findHtmlFiles('dist');
console.log('Total HTML files in dist:', allHtml.length);

const redirects = [];
for (const file of allHtml) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('http-equiv="refresh"') || content.includes('http-equiv=\'refresh\'')) {
    const rel = path.relative('dist', file).replace(/\\/g, '/');
    // Extract destination URL from content="0;url=..."
    const match = content.match(/content=["']\d+;\s*url=([^"']+)["']/i);
    const dest = match ? match[1] : 'unknown';
    redirects.push({ file: rel, dest });
  }
}

console.log(`Total redirect HTML stubs found: ${redirects.length}`);
redirects.sort((a, b) => a.file.localeCompare(b.file));
redirects.forEach((r, idx) => console.log(`${idx + 1}. /${r.file} -> ${r.dest}`));

const contentPages = allHtml.length - redirects.length;
console.log(`Content pages: ${contentPages}`);
console.log(`Redirect stubs: ${redirects.length}`);
console.log(`Total HTML files: ${allHtml.length}`);
