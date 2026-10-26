import type { Locale } from '../../config';
import type { BlogPageData } from './types';
import { enBlog } from './en';
import { jaBlog } from './ja';
import { koBlog } from './ko';
import { zhBlog } from './zh';
import { ruBlog } from './ru';
import { trBlog } from './tr';
import { frBlog } from './fr';
import { ptBlog } from './pt';
import { esBlog } from './es';

const blogTranslations: Record<Locale, BlogPageData> = {
  en: enBlog,
  ja: jaBlog,
  ko: koBlog,
  zh: zhBlog,
  ru: ruBlog,
  tr: trBlog,
  fr: frBlog,
  pt: ptBlog,
  es: esBlog,
};

export function getBlogData(locale: Locale): BlogPageData {
  return blogTranslations[locale] || blogTranslations.en;
}

export * from './types';
