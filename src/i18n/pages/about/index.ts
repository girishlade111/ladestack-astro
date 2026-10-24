import type { Locale } from '../../config';
import type { AboutPageData } from './types';
import { en } from './en';
import { ja } from './ja';
import { ko } from './ko';
import { zh } from './zh';
import { ru } from './ru';
import { tr } from './tr';
import { fr } from './fr';
import { pt } from './pt';
import { es } from './es';

export const aboutTranslations: Record<Locale, AboutPageData> = {
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

export function getAboutData(locale: Locale): AboutPageData {
  return aboutTranslations[locale] ?? aboutTranslations.en;
}

export * from './types';
