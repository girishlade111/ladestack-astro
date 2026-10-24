import type { CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from '../i18n/config';

export type BlogEntry = CollectionEntry<'blog'>;

/**
 * Calculates estimated reading time from markdown body content.
 * Standard benchmark: 200 words per minute for Latin/Cyrillic scripts,
 * ~500 characters per minute for CJK scripts.
 */
export function estimateReadingTime(content: string, locale: Locale = 'en'): string {
  if (!content) return '1 min read';

  if (locale === 'ja' || locale === 'zh') {
    // Character count for CJK
    const charCount = content.replace(/\s+/g, '').length;
    const minutes = Math.max(1, Math.ceil(charCount / 500));
    return locale === 'ja' ? `約 ${minutes} 分` : `约 ${minutes} 分钟`;
  }

  if (locale === 'ko') {
    const charCount = content.replace(/\s+/g, '').length;
    const minutes = Math.max(1, Math.ceil(charCount / 400));
    return `약 ${minutes}분 소요`;
  }

  // Word count for Latin / Cyrillic
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  const labels: Record<string, string> = {
    en: `${minutes} min read`,
    ru: `${minutes} мин чтения`,
    tr: `${minutes} dk okuma`,
    fr: `${minutes} min de lecture`,
    pt: `${minutes} min de leitura`,
    es: `${minutes} min de lectura`,
  };

  return labels[locale] ?? `${minutes} min read`;
}

/**
 * Formats a date string or Date object according to locale conventions.
 */
export function formatBlogDate(
  dateVal: string | Date,
  locale: Locale = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  const date = typeof dateVal === 'string' ? new Date(`${dateVal}T00:00:00`) : dateVal;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const localeMap: Record<Locale, string> = {
    en: 'en-US',
    ja: 'ja-JP',
    ko: 'ko-KR',
    zh: 'zh-CN',
    ru: 'ru-RU',
    tr: 'tr-TR',
    fr: 'fr-FR',
    pt: 'pt-PT',
    es: 'es-ES',
  };

  try {
    return date.toLocaleDateString(localeMap[locale] ?? 'en-US', options ?? defaultOptions);
  } catch {
    return date.toLocaleDateString('en-US', options ?? defaultOptions);
  }
}

/**
 * Returns the canonical URL for a blog post based on its locale and slug.
 */
export function getPostUrl(slug: string, locale: Locale = 'en', siteUrl: string = 'https://ladestack.in'): string {
  if (locale === DEFAULT_LOCALE) {
    return `${siteUrl}/blog/${slug}`;
  }
  return `${siteUrl}/${locale}/blog/${slug}`;
}

/**
 * Returns the localized path (relative) for a blog post.
 */
export function getPostPath(slug: string, locale: Locale = 'en'): string {
  if (locale === DEFAULT_LOCALE) {
    return `/blog/${slug}`;
  }
  return `/${locale}/blog/${slug}`;
}
