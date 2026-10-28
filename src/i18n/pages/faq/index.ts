import type { Locale } from '../../config';
import type { FaqPageData } from './types';
import { en } from './en';
import { ja } from './ja';
import { ko } from './ko';
import { zh } from './zh';
import { ru } from './ru';
import { tr } from './tr';
import { fr } from './fr';
import { pt } from './pt';
import { es } from './es';

export const faqTranslations: Record<Locale, FaqPageData> = {
  en,
  ja,
  ko,
  zh,
  ru,
  tr,
  fr,
  pt,
  es,
};

export function getFaqPageData(locale: Locale): FaqPageData {
  return faqTranslations[locale] ?? faqTranslations.en;
}

export * from './types';

