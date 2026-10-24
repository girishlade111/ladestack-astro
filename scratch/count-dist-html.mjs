import fs from 'node:fs';
import path from 'node:path';

function findHtml(dir, list = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      findHtml(full, list);
    } else if (f.endsWith('.html')) {
      list.push(full.replace(/\\/g, '/'));
    }
  }
  return list;
}

const all = findHtml('dist');
console.log('TOTAL HTML FILES IN DIST:', all.length);

const redirects = all.filter(f => {
  const h = fs.readFileSync(f, 'utf8');
  return h.includes('http-equiv="refresh"');
});

console.log('TOTAL REDIRECT STUBS:', redirects.length);
console.log('TOTAL CONTENT PAGES:', all.length - redirects.length);
