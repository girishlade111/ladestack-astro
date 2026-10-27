import fs from 'fs';

function inspectAudits(jsonPath) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`\n=================== ${jsonPath} ===================`);
  
  // 1. Accessibility failures
  console.log('--- A11y Failing Items ---');
  for (const [id, audit] of Object.entries(data.audits)) {
    if (audit.score === 0 && data.categories.accessibility?.auditRefs?.some(r => r.id === id)) {
      console.log(`Audit: ${id} (${audit.title})`);
      if (audit.details?.items) {
        for (const item of audit.details.items) {
          console.log(`  - Node: ${item.node?.snippet || item.node?.selector}`);
          console.log(`    Explanation: ${item.node?.explanation || item.subItems?.items?.[0]?.value || ''}`);
        }
      }
    }
  }

  // 2. Layout shift elements
  console.log('--- Layout Shift Culprits ---');
  const shiftAudit = data.audits['layout-shifts'] || data.audits['layout-shift-elements'];
  if (shiftAudit?.details?.items) {
    for (const item of shiftAudit.details.items) {
      console.log(`  - Score: ${item.score} | Node: ${item.node?.snippet || item.node?.selector}`);
    }
  }

  // 3. LCP Element
  console.log('--- LCP Element ---');
  const lcpAudit = data.audits['largest-contentful-paint-element'];
  if (lcpAudit?.details?.items) {
    for (const item of lcpAudit.details.items) {
      console.log(`  - LCP Node: ${item.node?.snippet || item.node?.selector}`);
    }
  }

  // 4. Long tasks
  console.log('--- Long Tasks (top 5) ---');
  const tasks = data.audits['long-tasks']?.details?.items || [];
  for (const t of tasks.slice(0, 5)) {
    console.log(`  - Duration: ${t.duration}ms | StartTime: ${t.startTime}`);
  }

  // 5. Bootup time (JavaScript execution time)
  console.log('--- Bootup Time (JS execution by script) ---');
  const bootup = data.audits['bootup-time']?.details?.items || [];
  for (const b of bootup.slice(0, 5)) {
    console.log(`  - Script: ${b.url} | Total CPU: ${b.total}ms | Script Eval: ${b.scripting}ms`);
  }
}

inspectAudits('scratch/lighthouse/home.json');
inspectAudits('scratch/lighthouse/owasp.json');
inspectAudits('scratch/lighthouse/blog.json');
inspectAudits('scratch/lighthouse/ja-blog.json');
