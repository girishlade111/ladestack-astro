import type { Locale } from '../../config';
import type { TermsPageData } from './types';
import { enTerms } from './en';
import { jaTerms } from './ja';
import { koTerms } from './ko';
import { zhTerms } from './zh';
import { ruTerms } from './ru';
import { trTerms } from './tr';
import { frTerms } from './fr';
import { ptTerms } from './pt';
import { esTerms } from './es';

const termsTranslations: Record<Locale, TermsPageData> = {
  en: enTerms,
  ja: jaTerms,
  ko: koTerms,
  zh: zhTerms,
  ru: ruTerms,
  tr: trTerms,
  fr: frTerms,
  pt: ptTerms,
  es: esTerms,
};

export function getTermsData(locale: Locale): TermsPageData {
  return termsTranslations[locale] || termsTranslations.en;
}

export * from './types';
