import fs from 'fs';
import path from 'path';

const routes = ['home', 'apps', 'blog', 'ja-blog', 'owasp'];

function median(arr) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function getStats(baseDir) {
  const map = {};
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

    map[route] = {
      perf: median(perfScores),
      a11y: median(a11yScores),
      fcp: (median(fcps) / 1000).toFixed(2),
      lcp: (median(lcps) / 1000).toFixed(2),
      tbt: Math.round(median(tbts)),
      cls: median(clss).toFixed(3)
    };
  }
  return map;
}

const baseline = getStats('scratch/lighthouse/baseline');
const remediation = getStats('scratch/lighthouse/remediation');

const comparison = routes.map((r) => {
  const b = baseline[r] || {};
  const post = remediation[r] || {};
  return {
    Route: r,
    'Perf (Pre->Post)': `${b.perf} -> ${post.perf}`,
    'A11y (Pre->Post)': `${b.a11y} -> ${post.a11y}`,
    'FCPs (Pre->Post)': `${b.fcp}s -> ${post.fcp}s`,
    'LCPs (Pre->Post)': `${b.lcp}s -> ${post.lcp}s`,
    'TBTms (Pre->Post)': `${b.tbt}ms -> ${post.tbt}ms`,
    'CLS (Pre->Post)': `${b.cls} -> ${post.cls}`
  };
});

console.log('=== BEFORE (BASELINE) vs AFTER (REMEDIATION) COMPARISON ===');
console.table(comparison);
