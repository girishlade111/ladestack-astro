import fs from 'fs';
import path from 'path';

const dir = 'scratch/lighthouse';
const files = [
  { name: 'Home', file: 'home.json' },
  { name: 'Apps', file: 'apps.json' },
  { name: 'Blog EN', file: 'blog.json' },
  { name: 'Blog JA', file: 'ja-blog.json' },
  { name: 'OWASP Guide', file: 'owasp.json' }
];

const results = [];

for (const { name, file } of files) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Missing ${file}`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const env = data.environment || {};
  const config = data.configSettings || {};
  const audits = data.audits || {};
  const cats = data.categories || {};

  const lcpElem = audits['largest-contentful-paint-element']?.details?.items?.[0]?.node?.snippet || audits['largest-contentful-paint-element']?.displayValue || 'N/A';
  const clsItems = audits['layout-shifts']?.details?.items || [];
  const shiftNodes = clsItems.map(i => `${i.node?.snippet || i.node?.nodeLabel || 'node'} (score: ${i.score?.toFixed(3)})`).slice(0, 3).join('; ');
  
  const longTasks = audits['long-tasks']?.details?.items || [];
  const totalLongTaskTime = longTasks.reduce((acc, t) => acc + (t.duration || 0), 0);
  
  const renderBlocking = audits['render-blocking-resources']?.details?.items?.map(r => `${path.basename(r.url)} (${r.wastedMs}ms)`).join(', ') || 'None';
  
  const failedA11y = Object.entries(audits)
    .filter(([k, v]) => cats.accessibility?.auditRefs?.some(r => r.id === k) && v.score === 0)
    .map(([k, v]) => `${k} (${v.title}): ${v.explanation || v.description}`)
    .slice(0, 5);

  results.push({
    route: name,
    url: data.requestedUrl,
    lhVersion: data.lighthouseVersion,
    chromeVersion: env.hostUserAgent,
    device: config.formFactor,
    throttling: JSON.stringify(config.throttlingMethod),
    perf: Math.round((cats.performance?.score || 0) * 100),
    a11y: Math.round((cats.accessibility?.score || 0) * 100),
    bp: Math.round((cats['best-practices']?.score || 0) * 100),
    seo: Math.round((cats.seo?.score || 0) * 100),
    fcp: audits['first-contentful-paint']?.displayValue,
    lcp: audits['largest-contentful-paint']?.displayValue,
    tbt: audits['total-blocking-time']?.displayValue,
    cls: audits['cumulative-layout-shift']?.displayValue,
    speedIndex: audits['speed-index']?.displayValue,
    lcpElement: lcpElem,
    shifts: shiftNodes || 'None',
    longTasksCount: longTasks.length,
    longTasksTotalMs: totalLongTaskTime,
    renderBlocking,
    failedA11yCount: failedA11y.length,
    failedA11y: failedA11y.join(' | ')
  });
}

console.log(JSON.stringify(results, null, 2));
