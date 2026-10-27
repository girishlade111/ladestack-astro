import fs from 'fs';
import path from 'path';

const dir = 'scratch/lighthouse';
const files = ['home.json', 'apps.json', 'blog.json', 'ja-blog.json', 'owasp.json'];

console.log('| Route | Perf | A11y | BestPractices | SEO | FCP | LCP | TBT | CLS |');
console.log('|---|---|---|---|---|---|---|---|---|');

for (const file of files) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`| ${file} | PENDING | - | - | - | - | - | - | - |`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const cats = data.categories;
  const perf = Math.round(cats.performance.score * 100);
  const a11y = Math.round(cats.accessibility.score * 100);
  const bp = Math.round(cats['best-practices'].score * 100);
  const seo = Math.round(cats.seo.score * 100);

  const audits = data.audits;
  const fcp = audits['first-contentful-paint']?.displayValue || '-';
  const lcp = audits['largest-contentful-paint']?.displayValue || '-';
  const tbt = audits['total-blocking-time']?.displayValue || '-';
  const cls = audits['cumulative-layout-shift']?.displayValue || '-';

  console.log(`| ${data.requestedUrl} | ${perf} | ${a11y} | ${bp} | ${seo} | ${fcp} | ${lcp} | ${tbt} | ${cls} |`);
}
