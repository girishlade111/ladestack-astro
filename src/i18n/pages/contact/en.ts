import type { ContactPageData } from './types';

export const en: ContactPageData = {
  seo: {
    title: 'Contact LadeStack – Direct Developer Support & Inquiries',
    description: 'Contact LadeStack for developer tool inquiries, bug reports, feature proposals, and technical support. Direct assistance at admin@ladestack.in and github.com/girishlade111.',
    ogTitle: 'Contact LadeStack – Developer Support & Community',
    ogDescription: 'Get in touch with the LadeStack team for technical support, bug reports, enterprise inquiries, and feedback regarding our client-side developer tools.',
  },
  hero: {
    badge: 'Direct Communication',
    title: 'Get in Touch',
    description: 'Have questions regarding GB Coder, LS PDF, MD2PDF, or our client-side architecture? Reach out directly via email, GitHub, or our direct inquiry form.',
  },
  cards: [
    { icon: 'mail', label: 'Direct Engineering Inbox', title: 'admin@ladestack.in', sub: 'Technical & platform support', href: 'mailto:admin@ladestack.in' },
    { icon: 'github', label: 'Open Source Community', title: 'github.com/girishlade111', sub: 'Bug reports & code issues', href: 'https://github.com/girishlade111' },
    { icon: 'code-2', label: 'GB Coder IDE Help', title: 'code.ladestack.in', sub: 'WebContainers & Monaco issues', href: 'mailto:admin@ladestack.in?subject=GB%20Coder%20Support' },
    { icon: 'file-text', label: 'Document Suites', title: 'PDF & MD2PDF Inquiries', sub: 'Wasm compilation & formatting', href: 'mailto:admin@ladestack.in?subject=PDF%20and%20MD2PDF%20Inquiry' },
  ],
  form: {
    title: 'Send a Message',
    description: 'Submit an inquiry regarding any tool in the LadeStack ecosystem. We review all messages and respond promptly.',
    fallbackPrefix: 'Direct email fallback: If you prefer writing directly from your email client, email',
    fallbackLinkText: 'admin@ladestack.in',
    nameLabel: 'Full Name',
    namePlaceholder: 'Jane Doe',
    emailLabel: 'Email Address',
    emailPlaceholder: 'jane@example.com',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'Inquiry regarding GB Coder, PDF tools, MD2PDF, or architecture',
    messageLabel: 'Message',
    messagePlaceholder: 'Please describe your inquiry, bug report, or feature request in detail...',
    submitButton: 'Send Message',
    successMessage: 'Thank you! Your message draft has been prepared. If your mail client did not open automatically, please send your email directly to admin@ladestack.in.',
  },
  faqs: {
    eyebrow: 'Frequent Inquiries',
    title: 'Frequently Asked Questions',
    description: 'Quick answers about contacting us, collaboration, open-source repositories, and platform availability.',
    items: [
      {
        q: 'How quickly can I expect a response to my inquiry?',
        a: 'Our engineering team reviews all incoming inquiries regularly and aims to respond within 24 to 48 hours during business days.',
      },
      {
        q: 'Where should I report a bug or suggest a new feature?',
        a: 'For technical bugs, code issues, or feature proposals, you can open an issue on our GitHub repository at https://github.com/girishlade111 or email admin@ladestack.in directly with reproducible steps.',
      },
      {
        q: 'Do you offer custom offline or enterprise deployments?',
        a: 'Yes. If your engineering organization, educational institution, or enterprise requires self-hosted, air-gapped, or customized instances of GB Coder, LS PDF, MD2PDF, or Bharat Land Converter, please email admin@ladestack.in with your specifications.',
      },
      {
        q: 'Are LadeStack tools free to use for commercial projects?',
        a: 'Yes, all our client-side web utilities are 100% free for personal, educational, research, and commercial software development. You retain 100% ownership over all output code and documents.',
      },
      {
        q: 'Are any files or documents uploaded to LadeStack servers when asking for support?',
        a: 'No. When you use our tools or contact us, we never access your local files. If you are reporting an issue with a specific file format, you may share an anonymized sample file voluntarily via email.',
      },
    ],
  },
};
