import fs from 'fs';
import path from 'path';

const routes = ['home', 'apps', 'blog', 'ja-blog', 'owasp'];
const baseDir = 'scratch/lighthouse/controlled-5run';

function median(arr) {
  if (!arr.length) return 0;
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
  const sis = [];
  let lcpElementSnippet = '';

  for (let run = 1; run <= 5; run++) {
    const filePath = path.join(baseDir, `run${run}`, `${route}.json`);
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    perfScores.push(Math.round(data.categories.performance.score * 100));
    a11yScores.push(Math.round(data.categories.accessibility.score * 100));
    fcps.push(data.audits['first-contentful-paint'].numericValue);
    lcps.push(data.audits['largest-contentful-paint'].numericValue);
    tbts.push(data.audits['total-blocking-time'].numericValue);
    clss.push(data.audits['cumulative-layout-shift'].numericValue);
    sis.push(data.audits['speed-index']?.numericValue || 0);

    const lcpInsight = data.audits['lcp-breakdown-insight'];
    if (lcpInsight?.details?.items) {
      const nodeItem = lcpInsight.details.items.find(it => it.type === 'node');
      if (nodeItem?.snippet) lcpElementSnippet = nodeItem.snippet;
    }
  }

  summary.push({
    route,
    runs: perfScores.length,
    perfMedian: median(perfScores),
    perfMinMax: `${Math.min(...perfScores)} - ${Math.max(...perfScores)}`,
    a11yMedian: median(a11yScores),
    fcpMedianSec: (median(fcps) / 1000).toFixed(2) + 's',
    lcpMedianSec: (median(lcps) / 1000).toFixed(2) + 's',
    lcpMinMaxSec: `${(Math.min(...lcps)/1000).toFixed(2)}s - ${(Math.max(...lcps)/1000).toFixed(2)}s`,
    tbtMedianMs: Math.round(median(tbts)) + 'ms',
    tbtMinMaxMs: `${Math.round(Math.min(...tbts))} - ${Math.round(Math.max(...tbts))}ms`,
    clsMedian: median(clss).toFixed(3),
    clsMinMax: `${Math.min(...clss).toFixed(3)} - ${Math.max(...clss).toFixed(3)}`,
    speedIndexSec: (median(sis) / 1000).toFixed(2) + 's',
    lcpElement: lcpElementSnippet ? lcpElementSnippet.slice(0, 45) + '...' : 'Text / Container'
  });
}

console.log('=== CONTROLLED 5-RUN LIGHTHOUSE BENCHMARK RESULTS ===');
console.table(summary);
