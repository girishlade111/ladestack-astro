import type { Locale } from '../../config';
import type { ContactPageData } from './types';
import { en } from './en';
import { ja } from './ja';
import { ko } from './ko';
import { zh } from './zh';
import { ru } from './ru';
import { tr } from './tr';
import { fr } from './fr';
import { pt } from './pt';
import { es } from './es';

export const contactTranslations: Record<Locale, ContactPageData> = {
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

export function getContactData(locale: Locale): ContactPageData {
  return contactTranslations[locale] ?? contactTranslations.en;
}

export * from './types';
