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
  const base = aboutTranslations.en;
  const current = aboutTranslations[locale] || base;
  return {
    ...base,
    ...current,
    stats: current.stats ?? base.stats,
    founder: { ...base.founder, ...current.founder },
    genesis: { ...base.genesis, ...current.genesis },
    timeline: current.timeline ?? base.timeline,
    pivot: current.pivot ?? base.pivot,
    missionVision: current.missionVision ?? base.missionVision,
    principles: current.principles ?? base.principles,
    transparency: { ...base.transparency, ...current.transparency },
    cta: { ...base.cta, ...current.cta },
  };
}

export * from './types';
