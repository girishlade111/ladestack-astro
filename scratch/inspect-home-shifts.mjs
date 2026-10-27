import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/lighthouse/baseline/run1/home.json', 'utf8'));
const items = data.audits['layout-shifts']?.details?.items || [];
console.log('Layout shift items in home.json:');
items.forEach(item => {
  console.log(`- score: ${item.score}`);
  console.log(`  node: ${item.node?.snippet || item.node?.selector}`);
  console.log(`  subItems:`, item.subItems);
});
