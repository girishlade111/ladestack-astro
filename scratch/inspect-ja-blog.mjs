import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/lighthouse/baseline/run1/ja-blog.json', 'utf8'));

console.log('=== DOM Stats for ja-blog ===');
console.log('DOM elements:', data.audits['dom-size']?.numericValue);

console.log('=== JS Execution Bootup ===');
const bootup = data.audits['bootup-time']?.details?.items || [];
bootup.forEach(b => {
  console.log(`URL: ${b.url}`);
  console.log(`  Total CPU: ${b.total.toFixed(1)}ms | Scripting: ${b.scripting.toFixed(1)}ms`);
});

console.log('=== Layout Shift Details ===');
const shifts = data.audits['layout-shifts']?.details?.items || [];
shifts.forEach(s => {
  console.log(`Score: ${s.score} | Node: ${s.node?.snippet || s.node?.selector}`);
});
