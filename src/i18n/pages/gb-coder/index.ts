import type { Locale } from '../../config';
import type { GbCoderPageData } from './types';
import { en } from './en';
import { ja } from './ja';
import { ko } from './ko';
import { zh } from './zh';
import { ru } from './ru';
import { tr } from './tr';
import { fr } from './fr';
import { pt } from './pt';
import { es } from './es';

export const gbCoderTranslations: Record<Locale, GbCoderPageData> = {
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

export function getGbCoderData(locale: Locale): GbCoderPageData {
  return gbCoderTranslations[locale] ?? gbCoderTranslations.en;
}

export * from './types';
