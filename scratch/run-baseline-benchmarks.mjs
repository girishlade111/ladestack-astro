import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const routes = [
  { name: 'home', path: '/' },
  { name: 'apps', path: '/apps' },
  { name: 'blog', path: '/blog' },
  { name: 'ja-blog', path: '/ja/blog' },
  { name: 'owasp', path: '/blog/owasp-top-10-complete-mitigation-guide' }
];

const baseDir = 'scratch/lighthouse/baseline';

for (let run = 1; run <= 3; run++) {
  const runDir = path.join(baseDir, `run${run}`);
  fs.mkdirSync(runDir, { recursive: true });

  for (const route of routes) {
    const outPath = path.join(runDir, `${route.name}.json`);
    console.log(`[Run ${run}/3] Auditing ${route.name} (${route.path})...`);
    const cmd = `npx lighthouse http://localhost:4321${route.path} --chrome-flags="--headless=new --no-sandbox" --output=json --output-path="${outPath}" --only-categories=performance,accessibility,best-practices,seo`;
    try {
      execSync(cmd, { stdio: 'pipe' });
      console.log(`  -> Saved ${outPath}`);
    } catch (err) {
      console.error(`  -> Failed ${route.name}:`, err.message);
    }
  }
}

console.log('\nAll 3 runs completed. Summarizing statistics...');
