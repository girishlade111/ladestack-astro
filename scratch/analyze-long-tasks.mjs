import fs from 'fs';

for (const name of ['blog.json', 'ja-blog.json', 'owasp.json']) {
  const data = JSON.parse(fs.readFileSync(`scratch/lighthouse/${name}`, 'utf8'));
  console.log(`\n=== Long Tasks Breakdown for ${name} ===`);
  const tasks = data.audits['long-tasks']?.details?.items || [];
  console.log(`Total tasks: ${tasks.length}`);
  tasks.forEach((t, i) => {
    console.log(`[Task ${i + 1}] duration: ${t.duration}ms, start: ${t.startTime.toFixed(1)}ms`);
  });
  
  console.log(`=== Main Thread Breakdown for ${name} ===`);
  const mt = data.audits['mainthread-work-breakdown']?.details?.items || [];
  mt.forEach(m => {
    console.log(`  - ${m.groupLabel} (${m.group}): ${m.duration.toFixed(1)}ms`);
  });
}
