import type { TermsPageData } from './types';

export const enTerms: TermsPageData = {
  seo: {
    title: 'Terms of Service – Platform Usage & Licensing | LadeStack',
    description: 'Review the comprehensive Terms of Service governing LadeStack developer tools, licensing rights, 100% user IP ownership, client-side execution boundaries, and legal disclaimers.',
    ogTitle: 'LadeStack Terms of Service – Platform Usage & Rights',
    ogDescription: 'Terms of Service, intellectual property ownership, client-side computing terms, and permitted commercial usage across all LadeStack developer tools.',
  },
  header: {
    badge: 'Legal & Governance',
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
      title: '1. Agreement to Terms & Platform Scope',
      paragraphs: [
        'By accessing, browsing, linking to, or utilizing the LadeStack platform (ladestack.in), its affiliated subdomains, client-side web applications, or open-source repositories, you enter into a legally binding agreement to comply with and be bound by these Terms of Service. If you do not agree to these terms in their entirety, you must discontinue access and use immediately.',
        'These Terms govern all web applications, utilities, and developer services provided under the LadeStack brand, including but not limited to:',
      ],
      listItems: [
        'LadeStack Portal (https://ladestack.in/): Platform hub, technical documentation, architectural guides, and engineering articles.',
        'GB Coder (https://code.ladestack.in/): In-browser IDE and development workspace supporting the Monaco Editor, Static Execution Engine, and Advanced WebContainer Node.js virtualized environments.',
        'LS PDF Toolkit (https://pdf.ladestack.in/): Suite of 17 in-browser WebAssembly PDF manipulation tools, including document merging, splitting, in-memory compression, rotation, and encryption.',
        'MD2PDF Converter (https://md2pdf.ladestack.in/): In-browser Markdown to PDF compiler supporting KaTeX mathematical typesetting, syntax highlighting, and custom print layouts.',
        'Swift Resume (https://resume.ladestack.in/): In-browser ATS-optimized resume builder with live vector preview and instant PDF compilation.',
        'Bharat Land Converter (https://land.ladestack.in/): In-browser regional land measurement metrology and unit conversion engine.',
        'Open-Source Codebases (https://github.com/girishlade111): Public source repositories, issue trackers, and community documentation hosted on GitHub.',
      ],
    },
    {
      title: '2. License Grant & Permitted Usage',
      paragraphs: [
        'Subject to these Terms, LadeStack grants you a revocable, non-exclusive, non-transferable, worldwide, royalty-free license to access and use our web applications for personal, educational, research, non-profit, commercial, and enterprise software engineering workflows.',
        'You are permitted to integrate output files, compiled code bundles, and processed documents generated through our tools into your proprietary commercial products, client deliverables, and open-source projects without paying licensing fees or royalties to LadeStack.',
      ],
    },
    {
      title: '3. 100% User Ownership of Intellectual Property & Outputs',
      paragraphs: [
        'LadeStack affirms that you retain complete, exclusive, and unencumbered ownership of all intellectual property, data, and code created, manipulated, edited, or compiled using our software tools.',
      ],
      listItems: [
        'Source Code & Projects: All source code authored, imported, or compiled within GB Coder remains your exclusive intellectual property. LadeStack claims no copyright interest, patent claims, or licensing rights over your code.',
        'Documents & Media: All PDF files manipulated in LS PDF Toolkit, Markdown documents rendered in MD2PDF, images compressed in LS Image Compressor, and resumes created in Swift Resume remain 100% owned by you.',
        'Zero Data Harvesting: Because our tools execute client-side, LadeStack never takes custody of your files, never uses your work to train machine learning models, and asserts zero claim over your commercial output.',
      ],
    },
    {
      title: '4. Client-Side Execution, Runtime Prerequisites & Local Data Responsibilities',
      paragraphs: [
        'LadeStack applications operate fundamentally as client-side software running directly within your local browser runtime. As a consequence of this architectural design:',
      ],
      listItems: [
        'Hardware & System Dependencies: Tool performance, compilation velocity, and memory ceiling depend directly on your local device CPU, GPU, available RAM, and browser version. Features such as WebContainers require modern evergreen browsers (such as Chromium-based browsers or modern Firefox) with SharedArrayBuffer and WebAssembly support.',
        'Local Data Retention & Backup Duty: Because LadeStack does not store your code or documents on central servers, you are solely responsible for exporting and backing up your work. Clearing browser site data, clearing cookies/cache, or using private/incognito browsing will wipe locally saved IndexedDB and localStorage workspaces.',
        'Zero Cloud Recovery: LadeStack cannot recover lost projects, forgotten code, or deleted files that were stored strictly on your local device.',
      ],
    },
    {
      title: '5. Acceptable Use Policy & Platform Safeguards',
      paragraphs: [
        'You agree to use LadeStack applications in compliance with all applicable local, national, and international laws. Specifically, you agree that you will not:',
      ],
      listItems: [
        'Utilize our tools to compile, distribute, or execute malicious software, ransomware, trojans, worms, keyloggers, or spyware.',
        'Launch denial-of-service (DoS/DDoS) attacks, automated scraping assaults, or network saturation attacks against LadeStack edge delivery infrastructure.',
        'Misrepresent affiliation with LadeStack or use LadeStack trademarks, logos, or brand marks without prior express written authorization.',
        'Attempt to circumvent or defeat security headers, Content Security Policies, or access control boundaries implemented on the platform.',
      ],
    },
    {
      title: '6. Third-Party Integrations & Bring-Your-Own-Key (BYOK) Model',
      paragraphs: [
        'GB Coder provides optional integration capabilities allowing developers to connect external Artificial Intelligence code generation APIs (including OpenAI, Anthropic, and Google Gemini).',
        'When utilizing these integrations, you supply your own API credentials. You acknowledge and agree that:',
      ],
      listItems: [
        'You are solely responsible for all usage costs, rate limits, and billing incurred with your external AI provider.',
        'Your interactions with third-party APIs are governed strictly by the respective third-party provider’s terms of service and privacy agreements.',
        'LadeStack does not guarantee the availability, uptime, accuracy, or quality of completions provided by external third-party AI models.',
      ],
    },
    {
      title: '7. Open-Source Software Licensing & GitHub Collaboration',
      paragraphs: [
        'Portions of the LadeStack ecosystem and related utilities are made publicly accessible on GitHub (https://github.com/girishlade111). Open-source components are distributed under permissive open-source licenses (such as MIT or Apache 2.0) as documented within their respective repositories.',
        'Nothing in these Terms limits your statutory or contractual rights under applicable open-source licenses. When submitting code contributions, bug reports, or pull requests to LadeStack repositories, you grant LadeStack the right to incorporate and distribute your contributions in accordance with the repository’s declared open-source license.',
      ],
    },
    {
      title: '8. Disclaimers of Warranties',
      paragraphs: [
        'LadeStack applications, documentation, APIs, and associated content are provided on an "AS IS" and "AS AVAILABLE" basis, without warranties of any kind, whether express, statutory, or implied. To the maximum extent permitted under applicable law, LadeStack explicitly disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, quiet enjoyment, and non-infringement.',
        'We make no warranty that our client-side software will meet your specific technical requirements, will be uninterrupted, error-free, completely bug-free, or compatible with every hardware device or browser extension.',
      ],
    },
    {
      title: '9. Limitation of Liability & Indemnification',
      paragraphs: [
        'To the fullest extent permitted by applicable law, in no event shall LadeStack, its founder, contributors, or infrastructure providers be liable for any indirect, incidental, special, exemplary, consequential, or punitive damages — including but not limited to loss of profits, loss of data, business interruption, or corruption of code — arising out of or in connection with your access, use, or inability to use our tools or documentation.',
        'You agree to indemnify, defend, and hold harmless LadeStack, its maintainers, and contributors from and against any third-party claims, liabilities, damages, and expenses (including reasonable attorneys’ fees) arising from your breach of these Terms or your violation of any law or third-party intellectual property rights.',
      ],
    },
    {
      title: '10. Platform Evolution, Updates & Service Modifications',
      paragraphs: [
        'We reserve the continuous right to enhance, iterate, refine, or temporarily suspend any portion of our web applications, documentation, or developer utilities without prior mandatory notice.',
        'We also reserve the right to revise these Terms of Service. Changes will be posted to this page with an updated "Last Updated" timestamp. Continued use of our tools following any revisions constitutes your binding acceptance of the updated Terms.',
      ],
    },
    {
      title: '11. Governing Law, Jurisdiction & Dispute Resolution',
      paragraphs: [
        'These Terms of Service and any dispute or controversy arising out of your use of the LadeStack platform shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.',
        'In the event of any claim, dispute, or difference of opinion, you agree to first attempt informal, good-faith resolution by contacting our team at admin@ladestack.in. If informal resolution is unsuccessful within thirty (30) days, the competent courts in Mumbai, Maharashtra, India shall have exclusive jurisdiction.',
      ],
    },
  ],
  contactNote: {
    title: '12. Legal Inquiries & Governance Notice',
    text: 'For questions regarding these Terms of Service, licensing queries, or institutional deployment agreements, please contact:',
    email: 'admin@ladestack.in',
  },
};
