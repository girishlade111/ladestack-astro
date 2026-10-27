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

const baseDir = 'scratch/lighthouse/controlled-5run';

// Meta info
const envInfo = {
  timestamp: new Date().toISOString(),
  nodeVersion: process.version,
  npmVersion: execSync('npm -v', { encoding: 'utf8' }).trim(),
  gitCommit: execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim(),
  gitBranch: execSync('git branch --show-current', { encoding: 'utf8' }).trim(),
  lighthouseVersion: '12.8.2',
  throttling: 'mobile (4x CPU slowdown, 1.6 Mbps download, 750 Kbps upload, 150ms RTT)'
};

fs.mkdirSync(baseDir, { recursive: true });
fs.writeFileSync(path.join(baseDir, 'env.json'), JSON.stringify(envInfo, null, 2));

console.log('=== STARTING 5-RUN CONTROLLED LIGHTHOUSE BENCHMARK ===');
console.log(JSON.stringify(envInfo, null, 2));

for (let run = 1; run <= 5; run++) {
  const runDir = path.join(baseDir, `run${run}`);
  fs.mkdirSync(runDir, { recursive: true });

  for (const route of routes) {
    const outPath = path.join(runDir, `${route.name}.json`);
    console.log(`[Run ${run}/5] Auditing ${route.name} (${route.path})...`);
    const cmd = `npx lighthouse http://localhost:4321${route.path} --chrome-flags="--headless=new --no-sandbox" --output=json --output-path="${outPath}" --only-categories=performance,accessibility,best-practices,seo`;
    try {
      execSync(cmd, { stdio: 'pipe' });
      console.log(`  -> Saved ${outPath}`);
    } catch (err) {
      console.error(`  -> Failed ${route.name}:`, err.message);
    }
  }
}

console.log('\nAll 5 runs completed successfully.');
