import fs from 'node:fs';
import path from 'node:path';

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
let found = 0;

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') walk(full);
    } else if (f.endsWith('.astro') || f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        if (emojiRegex.test(line)) {
          console.log(`Emoji found in ${full}:${i+1}: ${line.trim()}`);
          found++;
        }
      });
    }
  }
}

walk('src');
console.log(`Total emoji occurrences in src: ${found}`);
if (found > 0) process.exit(1);
