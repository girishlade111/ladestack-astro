import type { ContactPageData } from './types';

export const en: ContactPageData = {
  seo: {
    title: 'Contact LadeStack – Direct Developer Support',
    description: 'Contact LadeStack for developer tool inquiries, feedback, and technical support. Direct assistance at admin@ladestack.in.',
    ogTitle: 'Contact LadeStack – Direct Developer Support',
    ogDescription: 'Contact LadeStack for developer tool inquiries, feedback, and technical support. Direct assistance at admin@ladestack.in.',
  },
  hero: {
    badge: 'Direct Communication',
    title: 'Get in Touch',
    description: 'Questions about our client-side tools, feature proposals, or enterprise needs? Drop us a note.',
  },
  cards: [
    { icon: 'mail', label: 'Direct Email', title: 'admin@ladestack.in', sub: 'Direct founder inbox', href: 'mailto:admin@ladestack.in' },
    { icon: 'message-square', label: 'Developer Support', title: 'Technical Help', sub: 'Architecture & bug reports', href: 'mailto:admin@ladestack.in' },
    { icon: 'map-pin', label: 'Headquarters', title: 'Mumbai, India', sub: 'Global remote operations', href: null },
    { icon: 'globe', label: 'Architecture', title: 'Client-Side Tools', sub: 'Runs locally in browser', href: null },
  ],
  form: {
    title: 'Send a Message',
    description: 'We review messages regularly and respond promptly.',
    fallbackPrefix: 'Direct email fallback: If you prefer writing directly from your email client, email',
    fallbackLinkText: 'admin@ladestack.in',
    nameLabel: 'Full Name',
    namePlaceholder: 'Jane Doe',
    emailLabel: 'Email Address',
    emailPlaceholder: 'jane@example.com',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'Inquiry regarding GB Coder or client-side utilities',
    messageLabel: 'Message',
    messagePlaceholder: 'Please describe your question, bug report, or feature request in detail...',
    submitButton: 'Send Message',
    successMessage: 'Thank you! Your message has been prepared. If your mail client did not open, please write to admin@ladestack.in directly.',
  },
  faqs: {
    eyebrow: 'Frequent Inquiries',
    title: 'Frequently Asked Questions',
    description: 'Quick answers about contacting us, collaboration, and platform availability.',
    items: [
      {
        q: 'How quickly can I expect a response?',
        a: 'We review messages regularly and aim to respond promptly, typically within 1–2 business days.',
      },
      {
        q: 'Can I report a bug or request a feature?',
        a: 'Yes! Please email admin@ladestack.in or open an issue on our GitHub repository at github.com/girishlade111.',
      },
      {
        q: 'Do you offer custom integrations for engineering teams?',
        a: 'Yes. If your team needs self-hosted deployments of our client-side tools or specialized offline workflows, reach out directly.',
      },
      {
        q: 'Is LadeStack available globally without restrictions?',
        a: 'Yes, our platform is accessible in modern browsers globally without regional geo-blocking or subscription barriers.',
      },
    ],
  },
};
