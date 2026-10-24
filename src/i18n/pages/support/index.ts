import type { Locale } from '../../config';
import type { SupportPageData } from './types';
import { enSupport } from './en';
import { jaSupport } from './ja';
import { koSupport } from './ko';
import { zhSupport } from './zh';
import { ruSupport } from './ru';
import { trSupport } from './tr';
import { frSupport } from './fr';
import { ptSupport } from './pt';
import { esSupport } from './es';

const supportTranslations: Record<Locale, SupportPageData> = {
  en: enSupport,
  ja: jaSupport,
  ko: koSupport,
  zh: zhSupport,
  ru: ruSupport,
  tr: trSupport,
  fr: frSupport,
  pt: ptSupport,
  es: esSupport,
};

export function getSupportData(locale: Locale): SupportPageData {
  return supportTranslations[locale] || supportTranslations.en;
}

export * from './types';
