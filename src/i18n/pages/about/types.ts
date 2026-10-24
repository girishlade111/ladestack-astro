import type { Locale } from '../../config';

export interface AboutPageData {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
  };
  founder: {
    leadershipEyebrow: string;
    meetFounderTitle: string;
    name: string;
    role: string;
    badge: string;
    bio: string;
    skillsLabel: string;
    skills: string[];
    socialLabels: {
      github: string;
      linkedin: string;
      instagram: string;
      email: string;
    };
  };
  genesis: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
  };
  principles: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  transparency: {
    title: string;
    description: string;
    founderRoleTitle: string;
    founderRoleDesc: string;
    engineeringFocusTitle: string;
    engineeringFocusDesc: string;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    description: string;
    featureDetailsLabel: string;
    inBrowserAppLabel: string;
    launchLabel: string;
    items: Array<{
      name: string;
      category: string;
      description: string;
      badge: string;
      icon: string;
      url: string;
      internalUrl?: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    emailButton: string;
    githubButton: string;
    linkedinButton: string;
    footerTagline: string;
  };
}
