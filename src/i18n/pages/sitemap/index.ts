import type { Locale } from '../../config';
import type { SitemapPageData } from './types';
import { enSitemap } from './en';
import { jaSitemap } from './ja';
import { koSitemap } from './ko';
import { zhSitemap } from './zh';
import { ruSitemap } from './ru';
import { trSitemap } from './tr';
import { frSitemap } from './fr';
import { ptSitemap } from './pt';
import { esSitemap } from './es';

const sitemapTranslations: Record<Locale, SitemapPageData> = {
  en: enSitemap,
  ja: jaSitemap,
  ko: koSitemap,
  zh: zhSitemap,
  ru: ruSitemap,
  tr: trSitemap,
  fr: frSitemap,
  pt: ptSitemap,
  es: esSitemap,
};

export function getSitemapData(locale: Locale): SitemapPageData {
  return sitemapTranslations[locale] || sitemapTranslations.en;
}

export * from './types';
