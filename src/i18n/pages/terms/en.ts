import type { TermsPageData } from './types';

export const enTerms: TermsPageData = {
  seo: {
    title: 'Terms of Service – Platform Usage & Licensing | LadeStack',
    description: 'Review the Terms of Service governing the use of LadeStack developer tools, licensing terms, client-side execution boundaries, and legal disclaimers.',
    ogTitle: 'LadeStack Terms of Service',
    ogDescription: 'Terms of Service, intellectual property ownership, and permitted commercial usage of LadeStack developer tools.',
  },
  header: {
    badge: 'Legal & Terms',
    title: 'Terms of Service',
    lastUpdated: 'Last Updated: October 2026',
    effectiveDate: 'Effective Immediately',
  },
  disclaimer: {
    title: 'Authoritative Version Notice',
    text: 'The English version of these Terms of Service represents the authoritative statement of LadeStack’s terms. Translations into other languages are provided for informational and convenience purposes only and have not been certified by independent legal counsel.',
  },
  sections: [
    {
      title: '1. Agreement to Terms',
      paragraphs: [
        'By accessing or utilizing the LadeStack platform (ladestack.in), its affiliated subdomains, or any browser-based utility provided herein, you enter into a legally binding agreement to comply with and be bound by these Terms of Service. If you do not accept these terms in their entirety, you must discontinue access and use immediately.',
      ],
    },
    {
      title: '2. Permitted Use and Ownership of Output',
      paragraphs: [
        'You are granted a non-exclusive, worldwide, royalty-free license to use LadeStack web applications for personal, educational, research, and commercial software development purposes.',
        'All code, software architectures, compiled bundles, documents, images, and data artifacts created or transformed using LadeStack tools remain your sole intellectual property. LadeStack claims no ownership, copyright interest, or royalty rights over files or code you process through our client-side software.',
      ],
    },
    {
      title: '3. Technical Execution and Environmental Requirements',
      paragraphs: [
        'LadeStack developer tools operate primarily client-side using WebAssembly, Web Workers, and modern browser APIs. Performance, processing capacity, and execution stability depend directly on your local device hardware, operating system, and browser capabilities.',
        'GB Coder provides a Static In-Browser Editor compatible with modern evergreen browsers, and an Advanced WebContainer IDE designed primarily for Chromium-based browsers. You are responsible for ensuring that your execution environment satisfies necessary runtime prerequisites.',
      ],
    },
    {
      title: '4. Disclaimers of Warranties',
      paragraphs: [
        'The services and tools provided by LadeStack are delivered on an "AS IS" and "AS AVAILABLE" basis, without express or implied warranties of any kind. To the fullest extent permissible under applicable law, LadeStack disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
        'We do not guarantee that our tools will operate uninterrupted, error-free, or without transient browser compatibility variations across third-party software updates.',
      ],
    },
    {
      title: '5. Limitation of Liability',
      paragraphs: [
        'Under no circumstances shall LadeStack, its founder, or contributors be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with your access, use, or inability to use our tools, code outputs, or documentation, even if advised of the possibility of such damages.',
      ],
    },
    {
      title: '6. Modifications to Terms',
      paragraphs: [
        'We reserve the right to revise or update these Terms of Service at our discretion. Any revisions will be reflected by the "Last Updated" date at the top of this document. Continued use of our tools following any posted modifications constitutes acceptance of the amended terms.',
      ],
    },
  ],
  contactNote: {
    title: '7. Legal and Governance Inquiries',
    text: 'For questions regarding these Terms of Service, licensing terms, or institutional inquiries, please contact:',
    email: 'admin@ladestack.in',
  },
};
