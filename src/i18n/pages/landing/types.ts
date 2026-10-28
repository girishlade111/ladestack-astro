import type { Locale } from '../../config';

export interface LandingMissionVisionData {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  mission: {
    eyebrow: string;
    tagline: string;
    headline: string;
    body: string;
    context: string;
    timelineTitle: string;
    timeline: Array<{
      year: string;
      label: string;
      desc: string;
      detail: string;
    }>;
  };
  vision: {
    eyebrow: string;
    tagline: string;
    headline: string;
    body: string;
    features: Array<{
      icon: string;
      text: string;
    }>;
  };
  approach: {
    title: string;
    body: string;
    badges: string[];
  };
}

export interface LandingCoreValuesData {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  values: Array<{
    id: string;
    number: string;
    title: string;
    tagline: string;
    badge: string;
    badgeIcon: string;
    description: string;
    bullets: string[];
  }>;
  principlesEyebrow: string;
  principles: string[];
}

export interface LandingMetricsImpactData {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  heroStats: Array<{
    value: string;
    label: string;
    sub: string;
    icon: string;
  }>;
  toolMetricsTitle: string;
  toolMetricsSubtitle: string;
  toolMetrics: Array<{
    tool: string;
    icon: string;
    metrics: Array<{
      label: string;
      value: number;
    }>;
  }>;
  benchmarksTitle: string;
  benchmarks: Array<{
    label: string;
    value: string;
    sub: string;
  }>;
}

export interface LandingFreeForeverData {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  commitments: Array<{
    number: string;
    title: string;
    badge: string;
    badgeIcon: string;
    description: string;
    bullets: string[];
  }>;
}

export interface LandingDeveloperCommunityData {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  stats: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  channelsTitle: string;
  channels: Array<{
    icon: string;
    label: string;
    stat: string;
    description: string;
    cta: string;
    url: string;
  }>;
}

export interface LandingPageData {
  missionVision: LandingMissionVisionData;
  coreValues: LandingCoreValuesData;
  metricsImpact: LandingMetricsImpactData;
  freeForever: LandingFreeForeverData;
  developerCommunity: LandingDeveloperCommunityData;
}
