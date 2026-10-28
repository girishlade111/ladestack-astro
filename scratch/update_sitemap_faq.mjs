import fs from 'node:fs';

const items = {
  en: { title: 'FAQ & Knowledge Base', href: '/faq', desc: 'Frequently asked questions covering platform capabilities, privacy, GB Coder IDE, and developer tools' },
  es: { title: 'Preguntas Frecuentes (FAQ)', href: '/faq', desc: 'Preguntas frecuentes sobre capacidades de la plataforma, privacidad, GB Coder y herramientas para desarrolladores' },
  fr: { title: 'Foire Aux Questions (FAQ)', href: '/faq', desc: 'Questions fréquemment posées sur les fonctionnalités, la confidentialité, GB Coder et les outils de développement' },
  pt: { title: 'Perguntas Frequentes (FAQ)', href: '/faq', desc: 'Perguntas frequentes sobre capacidades da plataforma, privacidade, GB Coder e ferramentas de desenvolvedor' },
  ja: { title: 'よくある質問 (FAQ)', href: '/faq', desc: 'プラットフォームの機能、プライバシー、GB Coder IDE、開発者ツールに関するよくある質問' },
  ko: { title: '자주 묻는 질문 (FAQ)', href: '/faq', desc: '플랫폼 기능, 데이터 프라이버시, GB Coder IDE 및 개발자 도구에 관한 자주 묻는 질문' },
  zh: { title: '常见问题解答 (FAQ)', href: '/faq', desc: '涵盖平台功能、数据隐私、GB Coder IDE 和开发人员工具的常见问题解答' },
  ru: { title: 'Часто задаваемые вопросы (FAQ)', href: '/faq', desc: 'Ответы на частые вопросы о возможностях платформы, конфиденциальности, GB Coder IDE и инструментах' },
  tr: { title: 'Sıkça Sorulan Sorular (SSS)', href: '/faq', desc: 'Platform yetenekleri, gizlilik, GB Coder IDE ve geliştirici araçları hakkında sık sorulan sorular' },
};

for (const [lang, item] of Object.entries(items)) {
  const filePath = `src/i18n/pages/sitemap/${lang}.ts`;
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes("href: '/faq'")) {
    console.log(`${lang} already has FAQ in sitemap`);
    continue;
  }
  const itemStr = `        { title: '${item.title}', href: '${item.href}', desc: '${item.desc}' },\n`;
  content = content.replace(/(items:\s*\[[\s\S]*?)(],\s*\n\s*},\s*\n\s*tools:)/, `$1${itemStr}      $2`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated sitemap for ${lang}`);
}

