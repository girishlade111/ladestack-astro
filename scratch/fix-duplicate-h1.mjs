import fs from 'node:fs';
import path from 'node:path';

const files = [
  'src/content/blog/en/building-rag-applications-vector-databases.md',
  'src/content/blog/es/building-rag-applications-vector-databases.md',
  'src/content/blog/fr/building-rag-applications-vector-databases.md',
  'src/content/blog/ja/building-rag-applications-vector-databases.md',
  'src/content/blog/ko/building-rag-applications-vector-databases.md',
  'src/content/blog/pt/building-rag-applications-vector-databases.md',
  'src/content/blog/ru/building-rag-applications-vector-databases.md',
  'src/content/blog/tr/building-rag-applications-vector-databases.md',
  'src/content/blog/zh/building-rag-applications-vector-databases.md',

  'src/content/blog/es/machine-learning-pipelines-for-web-developers.md',
  'src/content/blog/fr/machine-learning-pipelines-for-web-developers.md',
  'src/content/blog/ja/machine-learning-pipelines-for-web-developers.md',
  'src/content/blog/ko/machine-learning-pipelines-for-web-developers.md',
  'src/content/blog/pt/machine-learning-pipelines-for-web-developers.md',
  'src/content/blog/ru/machine-learning-pipelines-for-web-developers.md',
  'src/content/blog/tr/machine-learning-pipelines-for-web-developers.md',
  'src/content/blog/zh/machine-learning-pipelines-for-web-developers.md',

  'src/content/blog/en/fine-tuning-llms-domain-specific-tasks.md',
  'src/content/blog/en/multi-tenant-saas-architecture-patterns.md',
];

console.log(`Remediating duplicate H1 in ${files.length} files...`);

for (const relPath of files) {
  const fullPath = path.resolve(relPath);
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Match frontmatter and body
  const match = content.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/);
  if (!match) {
    throw new Error(`Failed to match frontmatter for ${relPath}`);
  }

  const prefix = match[1];
  const body = match[2];

  // Regex to match leading empty lines, the `# Heading` line, and following newline
  const h1Regex = /^(\s*#\s+[^\r\n]+(?:\r?\n)+)/;
  if (!h1Regex.test(body)) {
    throw new Error(`Failed to find H1 at start of body in ${relPath}`);
  }

  const newBody = body.replace(h1Regex, '');
  const newContent = prefix + '\n' + newBody.replace(/^\r?\n+/, '');

  fs.writeFileSync(fullPath, newContent, 'utf8');
  console.log(`[FIXED] ${relPath}`);
}

console.log('All 19 files successfully updated.');
