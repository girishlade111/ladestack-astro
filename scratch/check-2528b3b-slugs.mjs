import { execSync } from 'child_process';
import fs from 'fs';

const content = execSync('git show 2528b3b:src/data/blogPosts.ts', { encoding: 'utf-8' });
const slugs = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);
console.log('Total historical slugs in 2528b3b:', slugs.length);
slugs.forEach((s, idx) => {
  console.log(`${idx + 1}. ${s}`);
});

console.log('\nDoes it contain client-side-pdf-manipulation-webassembly?', slugs.includes('client-side-pdf-manipulation-webassembly'));
console.log('Does it contain api-rate-limiting-throttling-strategies?', slugs.includes('api-rate-limiting-throttling-strategies'));
