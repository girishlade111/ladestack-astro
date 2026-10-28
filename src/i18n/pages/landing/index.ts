import type { Locale } from '../../config';
import type { LandingPageData } from './types';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { pt } from './pt';
import { ja } from './ja';
import { ko } from './ko';
import { zh } from './zh';
import { ru } from './ru';
import { tr } from './tr';

export const landingTranslations: Record<Locale, LandingPageData> = {
  en,
  es,
  fr,
  pt,
  ja,
  ko,
  zh,
  ru,
  tr,
};

export function getLandingData(locale: Locale = 'en'): LandingPageData {
  const base = landingTranslations.en;
  const current = landingTranslations[locale] || base;

  return {
    missionVision: {
      ...base.missionVision,
      ...current.missionVision,
      stats: current.missionVision?.stats ?? base.missionVision.stats,
      mission: {
        ...base.missionVision.mission,
        ...(current.missionVision?.mission ?? {}),
        timeline: current.missionVision?.mission?.timeline ?? base.missionVision.mission.timeline,
      },
      vision: {
        ...base.missionVision.vision,
        ...(current.missionVision?.vision ?? {}),
        features: current.missionVision?.vision?.features ?? base.missionVision.vision.features,
      },
      approach: {
        ...base.missionVision.approach,
        ...(current.missionVision?.approach ?? {}),
        badges: current.missionVision?.approach?.badges ?? base.missionVision.approach.badges,
      },
    },
    coreValues: {
      ...base.coreValues,
      ...current.coreValues,
      values: current.coreValues?.values ?? base.coreValues.values,
      principles: current.coreValues?.principles ?? base.coreValues.principles,
    },
    metricsImpact: {
      ...base.metricsImpact,
      ...current.metricsImpact,
      heroStats: current.metricsImpact?.heroStats ?? base.metricsImpact.heroStats,
      toolMetrics: current.metricsImpact?.toolMetrics ?? base.metricsImpact.toolMetrics,
      benchmarks: current.metricsImpact?.benchmarks ?? base.metricsImpact.benchmarks,
    },
    freeForever: {
      ...base.freeForever,
      ...current.freeForever,
      commitments: current.freeForever?.commitments ?? base.freeForever.commitments,
    },
    developerCommunity: {
      ...base.developerCommunity,
      ...current.developerCommunity,
      stats: current.developerCommunity?.stats ?? base.developerCommunity.stats,
      channels: current.developerCommunity?.channels ?? base.developerCommunity.channels,
    },
  };
}

export * from './types';
