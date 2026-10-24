export interface ContactPageData {
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
  cards: Array<{
    icon: string;
    label: string;
    title: string;
    sub: string;
    href: string | null;
  }>;
  form: {
    title: string;
    description: string;
    fallbackPrefix: string;
    fallbackLinkText: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    successMessage: string;
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
}
