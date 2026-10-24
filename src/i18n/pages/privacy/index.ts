import type { Locale } from '../../config';
import type { PrivacyPageData } from './types';
import { enPrivacy } from './en';
import { jaPrivacy } from './ja';
import { koPrivacy } from './ko';
import { zhPrivacy } from './zh';
import { ruPrivacy } from './ru';
import { trPrivacy } from './tr';
import { frPrivacy } from './fr';
import { ptPrivacy } from './pt';
import { esPrivacy } from './es';

const privacyTranslations: Record<Locale, PrivacyPageData> = {
  en: enPrivacy,
  ja: jaPrivacy,
  ko: koPrivacy,
  zh: zhPrivacy,
  ru: ruPrivacy,
  tr: trPrivacy,
  fr: frPrivacy,
  pt: ptPrivacy,
  es: esPrivacy,
};

export function getPrivacyData(locale: Locale): PrivacyPageData {
  return privacyTranslations[locale] || privacyTranslations.en;
}

export * from './types';
