export interface AppsPageData {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  flagship: {
    eyebrow: string;
    title: string;
    sub: string;
    description: string;
    bullets: Array<{
      title: string;
      desc: string;
    }>;
    ctaStudio: string;
    ctaFeatures: string;
    statusLabels: {
      statusKey: string;
      statusValue: string;
      licenseKey: string;
      licenseValue: string;
      privacyKey: string;
      privacyValue: string;
      telemetryKey: string;
      telemetryValue: string;
    };
  };
  utilities: {
    eyebrow: string;
    title: string;
    description: string;
    countLabel: string;
    liveBadge: string;
    launchTool: string;
    items: Array<{
      slug: string;
      title: string;
      description: string;
      url: string;
      domain: string;
      icon: string;
      iconAlt: string;
    }>;
  };
  policy: {
    title: string;
    description: string;
  };
}
