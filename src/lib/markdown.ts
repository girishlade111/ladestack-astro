/**
 * markdown.ts — server-side article renderer.
 * Formats Markdown blocks into semantic HTML with token styling,
 * slugified heading IDs for TOC generation, and copy-ready code blocks.
 */

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-');
}

export function processInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-surface-muted border border-border px-1.5 py-0.5 rounded text-xs font-mono text-brand">$1</code>',
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-brand underline underline-offset-4 hover:text-brand-hover transition-colors" target="_blank" rel="noopener noreferrer">$1</a>',
    );
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function extractHeadings(contentStr: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  for (const line of contentStr.split('\n')) {
    if (line.startsWith('## ')) {
      const raw = line.replace('## ', '').trim();
      headings.push({ id: slugify(raw), text: raw, level: 2 });
    } else if (line.startsWith('### ')) {
      const raw = line.replace('### ', '').trim();
      headings.push({ id: slugify(raw), text: raw, level: 3 });
    }
  }
  return headings;
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
        const lang = parts[0].replace('```', '').trim() || 'code';
        const code = escapeHtml(parts.slice(1, -1).join('\n'));
        return (
          `<div class="my-7 rounded-xl overflow-hidden border border-border bg-surface shadow-soft">` +
          `<div class="flex items-center justify-between px-4 py-2 bg-surface-muted border-b border-border text-xs font-mono text-muted-foreground select-none">` +
          `<span>${escapeHtml(lang)}</span>` +
          `<span class="w-2 h-2 rounded-full bg-brand"></span>` +
          `</div>` +
          `<pre class="bg-background overflow-x-auto p-4 sm:p-5 text-xs sm:text-sm font-mono text-foreground leading-relaxed"><code>${code}</code></pre>` +
          `</div>`
        );
      }

      if (block.startsWith('> ')) {
        const text = block
          .split('\n')
          .map((l) => l.replace(/^>\s*/, ''))
          .join(' ');
        return `<blockquote class="my-6 p-4 sm:p-5 border border-border bg-surface-muted/50 rounded-xl text-muted-foreground text-sm sm:text-base leading-relaxed italic">${escapeHtml(text)}</blockquote>`;
      }

      if (block.startsWith('- ')) {
        const items = block
          .split('\n')
          .filter((l) => l.startsWith('- '))
          .map((l) => l.replace('- ', ''));
        return (
          `<ul class="my-5 space-y-2">` +
          items
            .map(
              (item) =>
                `<li class="flex items-start gap-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">` +
                `<span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span>` +
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
          `<ol class="my-5 space-y-2.5">` +
          items
            .map(
              (item, i) =>
                `<li class="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed">` +
                `<span class="flex-shrink-0 w-5 h-5 rounded-md bg-brand/10 text-brand text-xs font-mono font-bold flex items-center justify-center mt-0.5">${i + 1}</span>` +
                `<span>${processInline(item)}</span></li>`,
            )
            .join('') +
          `</ol>`
        );
      }

      if (block.startsWith('# ')) {
        const text = block.replace('# ', '');
        return `<h1 id="${slugify(text)}" class="text-2xl sm:text-3xl font-bold mt-10 mb-4 text-foreground leading-tight tracking-tight">${processInline(text)}</h1>`;
      }
      if (block.startsWith('## ')) {
        const text = block.replace('## ', '');
        return `<h2 id="${slugify(text)}" class="text-xl sm:text-2xl font-semibold mt-9 mb-3.5 text-foreground leading-snug tracking-tight">${processInline(text)}</h2>`;
      }
      if (block.startsWith('### ')) {
        const text = block.replace('### ', '');
        return `<h3 id="${slugify(text)}" class="text-lg sm:text-xl font-semibold mt-7 mb-2.5 text-foreground leading-snug">${processInline(text)}</h3>`;
      }
      if (block.startsWith('#### ')) {
        const text = block.replace('#### ', '');
        return `<h4 class="text-base font-semibold mt-5 mb-2 text-foreground">${processInline(text)}</h4>`;
      }

      return `<p class="text-sm sm:text-base text-muted-foreground leading-[1.8] my-4 text-pretty">${processInline(block)}</p>`;
    })
    .join('\n');
}
