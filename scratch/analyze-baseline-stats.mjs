import fs from 'fs';
import path from 'path';

const routes = ['home', 'apps', 'blog', 'ja-blog', 'owasp'];
const baseDir = 'scratch/lighthouse/baseline';

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

const summary = [];

for (const route of routes) {
  const perfScores = [];
  const a11yScores = [];
  const fcps = [];
  const lcps = [];
  const tbts = [];
  const clss = [];

  for (let run = 1; run <= 3; run++) {
    const filePath = path.join(baseDir, `run${run}`, `${route}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    perfScores.push(Math.round(data.categories.performance.score * 100));
    a11yScores.push(Math.round(data.categories.accessibility.score * 100));
    fcps.push(data.audits['first-contentful-paint'].numericValue);
    lcps.push(data.audits['largest-contentful-paint'].numericValue);
    tbts.push(data.audits['total-blocking-time'].numericValue);
    clss.push(data.audits['cumulative-layout-shift'].numericValue);
  }

  summary.push({
    route,
    runs: perfScores.length,
    perfMedian: median(perfScores),
    perfMin: Math.min(...perfScores),
    perfMax: Math.max(...perfScores),
    a11yMedian: median(a11yScores),
    fcpMedianSec: (median(fcps) / 1000).toFixed(2),
    lcpMedianSec: (median(lcps) / 1000).toFixed(2),
    tbtMedianMs: Math.round(median(tbts)),
    tbtMinMs: Math.min(...tbts),
    tbtMaxMs: Math.max(...tbts),
    clsMedian: median(clss).toFixed(3),
    clsMin: Math.min(...clss).toFixed(3),
    clsMax: Math.max(...clss).toFixed(3)
  });
}

console.log('=== STATISTICAL BASELINE SUMMARY (3 RUNS) ===');
console.table(summary);
