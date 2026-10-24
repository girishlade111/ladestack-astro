export interface GbCoderPageData {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    badge: string;
    titleLine: string;
    titleHighlight: string;
    description: string;
    ctaStudio: string;
    ctaProjects: string;
    trustBadges: string[];
  };
  environments: {
    eyebrow: string;
    title: string;
    description: string;
    staticCard: {
      badge: string;
      engine: string;
      title: string;
      description: string;
      features: string[];
      status: string;
      cta: string;
    };
    webContainerCard: {
      badge: string;
      engine: string;
      title: string;
      description: string;
      features: string[];
      status: string;
      cta: string;
    };
  };
  pillars: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      icon: string;
      title: string;
      badge: string;
      description: string;
    }>;
  };
  guardrails: {
    eyebrow: string;
    title: string;
    desc1: string;
    desc2: string;
    supportedHeading: string;
    environments: Array<{
      browser: string;
      support: string;
      highlight?: boolean;
    }>;
  };
  faqs: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    launchStudioBtn: string;
    exploreAllBtn: string;
    footerTagline: string;
  };
}
