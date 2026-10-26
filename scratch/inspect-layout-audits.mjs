import fs from 'fs';

for (const name of ['blog.json', 'ja-blog.json', 'owasp.json', 'home.json']) {
  const data = JSON.parse(fs.readFileSync(`scratch/lighthouse/${name}`, 'utf8'));
  console.log(`\n=== Audits for ${name} ===`);
  for (const key of ['forced-reflow', 'dom-size', 'font-display', 'render-blocking-resources', 'critical-request-chains', 'duplicated-javascript', 'unused-css-rules']) {
    const audit = data.audits[key];
    if (audit) {
      console.log(`[${key}] score: ${audit.score}, displayValue: ${audit.displayValue}`);
      if (audit.details?.items?.length) {
        console.log(`   items:`, audit.details.items.slice(0, 3));
      }
    }
  }
}
