import type { Locale } from '../../config';
import type { DocsPageData } from './types';
import { enDocs } from './en';
import { jaDocs } from './ja';
import { koDocs } from './ko';
import { zhDocs } from './zh';
import { ruDocs } from './ru';
import { trDocs } from './tr';
import { frDocs } from './fr';
import { ptDocs } from './pt';
import { esDocs } from './es';

const docsTranslations: Record<Locale, DocsPageData> = {
  en: enDocs,
  ja: jaDocs,
  ko: koDocs,
  zh: zhDocs,
  ru: ruDocs,
  tr: trDocs,
  fr: frDocs,
  pt: ptDocs,
  es: esDocs,
};

export function getDocsData(locale: Locale): DocsPageData {
  return docsTranslations[locale] || docsTranslations.en;
}

export * from './types';
