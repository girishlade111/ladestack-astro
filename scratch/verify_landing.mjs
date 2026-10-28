import fs from 'fs';

const html = fs.readFileSync('dist/index.html', 'utf8');

console.log('=== H1 CHECK ===');
const h1s = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
console.log('H1 count:', h1s.length);
h1s.forEach((h) => console.log('H1 content:', h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));

console.log('\n=== H2 CHECK ===');
const h2s = html.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || [];
console.log('H2 count:', h2s.length);
h2s.forEach((h, i) => console.log(`H2 #${i + 1}:`, h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));

console.log('\n=== SECTION IDS ===');
const sectionMatches = [...html.matchAll(/<section[^>]*id="([^"]+)"[^>]*>/gi)];
sectionMatches.forEach((m) => console.log('Section ID:', m[1]));

console.log('\n=== PROTECTED CONTENT CHECKS ===');
console.log('Has Hero Title (Build, Edit, and Optimize):', html.includes('Build, Edit, and Optimize'));
console.log('Has Features Bento Title (Engineered for speed, privacy, and sovereignty):', html.includes('Engineered for speed, privacy, and sovereignty'));
console.log('Has Immediate Access CTA:', html.includes('Immediate Access') && html.includes('Ready to accelerate your workflow?'));

console.log('\n=== EXCLUSIONS CHECK ===');
console.log('Has "What our users say":', html.includes('What our users say'));
console.log('Has "LadeStack vs Traditional Paid Tools":', html.includes('LadeStack vs Traditional Paid Tools'));

console.log('\n=== NEW CONTENT CHECKS ===');
console.log('Has Mission & Vision (Building the future of AI development):', html.includes('Building the future of') && html.includes('AI development'));
console.log('Has Core Values (What drives everything we build):', html.includes('What drives everything') && html.includes('we build'));
console.log('Has Impact Metrics (Numbers that speak for themselves):', html.includes('Numbers that speak') && html.includes('for themselves'));
console.log('Has Free Forever (Enterprise AI Power. Zero Price Tag.):', html.includes('Enterprise AI Power.') && html.includes('Zero Price Tag.'));
console.log('Has Developer Community (Built with developers, for developers):', html.includes('Built with developers,') && html.includes('for developers'));

console.log('\n=== LOCALIZATION CHECK (es/index.html & ja/index.html) ===');
if (fs.existsSync('dist/es/index.html')) {
  const esHtml = fs.readFileSync('dist/es/index.html', 'utf8');
  console.log('ES has Construyendo el futuro del desarrollo con IA:', esHtml.includes('Construyendo el futuro del') && esHtml.includes('desarrollo con IA'));
  console.log('ES has Lo que impulsa todo lo que construimos:', esHtml.includes('Lo que impulsa todo lo') && esHtml.includes('que construimos'));
}
if (fs.existsSync('dist/ja/index.html')) {
  const jaHtml = fs.readFileSync('dist/ja/index.html', 'utf8');
  console.log('JA has 次世代を築く AI開発の未来:', jaHtml.includes('次世代を築く') && jaHtml.includes('AI開発の未来'));
  console.log('JA has 私たちの開発を支える 4つの原則:', jaHtml.includes('私たちの開発を支える') && jaHtml.includes('4つの原則'));
}
