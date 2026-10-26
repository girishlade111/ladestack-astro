import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/lighthouse/owasp.json', 'utf8'));

console.log('=== COLOR CONTRAST FAILURES ===');
const cc = data.audits['color-contrast'];
if (cc?.details?.items) {
  for (const item of cc.details.items) {
    console.log('Node:', item.node?.snippet);
    console.log('Selector:', item.node?.selector);
    console.log('Explanation:', item.node?.explanation);
  }
}

console.log('=== FORM ELEMENT LABEL FAILURES ===');
const lbl = data.audits['label'];
if (lbl?.details?.items) {
  for (const item of lbl.details.items) {
    console.log('Node:', item.node?.snippet);
    console.log('Selector:', item.node?.selector);
    console.log('Explanation:', item.node?.explanation);
  }
}
