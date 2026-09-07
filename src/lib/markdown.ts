/**
 * markdown.ts — server-side port of BlogPost.tsx's processInline +
 * renderContent. Same splitting rules, same Tailwind classes; returns an
 * HTML string for Astro's set:html (rendered at build time, zero client JS).
 */

export function processInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-muted/80 border border-border px-1.5 py-0.5 rounded-md text-sm font-mono text-[#6E8F6A]">$1</code>',
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-[#6E8F6A] underline underline-offset-2 hover:text-[#5a7856] transition-colors" target="_blank" rel="noopener noreferrer">$1</a>',
    );
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function renderArticle(contentStr: string): string {
  const blocks: string[] = [];
  let currentBlock: string[] = [];
  let inCodeBlock = false;

  for (const line of contentStr.split('\n')) {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        currentBlock.push(line);
        blocks.push(currentBlock.join('\n'));
        currentBlock = [];
        inCodeBlock = false;
      } else {
        if (currentBlock.length > 0) {
          blocks.push(currentBlock.join('\n').trim());
          currentBlock = [];
        }
        inCodeBlock = true;
        currentBlock.push(line);
      }
    } else {
      currentBlock.push(line);
      if (!inCodeBlock && line.trim() === '') {
        blocks.push(currentBlock.join('\n').trim());
        currentBlock = [];
      }
    }
  }
  if (currentBlock.length > 0) blocks.push(currentBlock.join('\n').trim());

  return blocks
    .filter((b) => b.trim() !== '')
    .map((block) => {
      if (block.startsWith('```')) {
        const parts = block.split('\n');
        const lang = parts[0].replace('```', '').trim();
        const code = escapeHtml(parts.slice(1, -1).join('\n'));
        return (
          `<div class="my-7 rounded-2xl overflow-hidden border border-border shadow-sm">` +
          (lang
            ? `<div class="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-border">` +
              `<span class="text-xs font-mono text-muted-foreground">${escapeHtml(lang)}</span>` +
              `<span class="w-2 h-2 rounded-full bg-[#6E8F6A]/60"></span></div>`
            : '') +
          `<pre class="bg-muted/40 overflow-x-auto p-5"><code class="text-sm font-mono text-foreground/80 leading-relaxed">${code}</code></pre></div>`
        );
      }

      if (block.startsWith('> ')) {
        const text = block
          .split('\n')
          .map((l) => l.replace(/^>\s*/, ''))
          .join(' ');
        return `<blockquote class="my-7 pl-5 border-l-4 border-[#6E8F6A] bg-[#6E8F6A]/5 rounded-r-xl py-4 pr-5 italic text-muted-foreground text-base sm:text-lg leading-relaxed">${escapeHtml(text)}</blockquote>`;
      }

      if (block.startsWith('- ')) {
        const items = block
          .split('\n')
          .filter((l) => l.startsWith('- '))
          .map((l) => l.replace('- ', ''));
        return (
          `<ul class="my-5 space-y-2.5 ml-1">` +
          items
            .map(
              (item) =>
                `<li class="flex items-start gap-2.5 text-base sm:text-lg text-muted-foreground leading-relaxed">` +
                `<span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#6E8F6A] flex-shrink-0"></span>` +
                `<span>${processInline(item)}</span></li>`,
            )
            .join('') +
          `</ul>`
        );
      }

      if (/^\d+\. /.test(block)) {
        const items = block
          .split('\n')
          .filter((l) => /^\d+\. /.test(l))
          .map((l) => l.replace(/^\d+\.\s*/, ''));
        return (
          `<ol class="my-5 space-y-2.5 ml-1 counter-reset-list">` +
          items
            .map(
              (item, i) =>
                `<li class="flex items-start gap-3 text-base sm:text-lg text-muted-foreground leading-relaxed">` +
                `<span class="flex-shrink-0 w-6 h-6 rounded-full bg-[#6E8F6A]/15 text-[#6E8F6A] text-xs font-bold flex items-center justify-center mt-0.5">${i + 1}</span>` +
                `<span>${processInline(item)}</span></li>`,
            )
            .join('') +
          `</ol>`
        );
      }

      if (block.startsWith('# '))
        return `<h1 class="text-3xl sm:text-4xl font-bold mt-12 mb-5 text-foreground leading-tight tracking-tight">${processInline(block.replace('# ', ''))}</h1>`;
      if (block.startsWith('## '))
        return `<h2 class="text-2xl sm:text-3xl font-bold mt-10 mb-4 text-foreground leading-snug tracking-tight">${processInline(block.replace('## ', ''))}</h2>`;
      if (block.startsWith('### '))
        return `<h3 class="text-xl sm:text-2xl font-bold mt-8 mb-3 text-foreground">${processInline(block.replace('### ', ''))}</h3>`;
      if (block.startsWith('#### '))
        return `<h4 class="text-lg font-semibold mt-6 mb-2 text-foreground">${processInline(block.replace('#### ', ''))}</h4>`;

      return `<p class="text-base sm:text-lg text-muted-foreground leading-[1.85] my-5">${processInline(block)}</p>`;
    })
    .join('\n');
}
