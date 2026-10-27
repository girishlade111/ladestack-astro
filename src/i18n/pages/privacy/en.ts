import type { PrivacyPageData } from './types';

export const enPrivacy: PrivacyPageData = {
  seo: {
    title: 'Privacy Policy – Data Protection & Architecture | LadeStack',
    description: 'Learn how LadeStack protects your data through client-side WebAssembly execution, local IndexedDB persistence, zero-upload document pipelines, and transparent data practices.',
    ogTitle: 'LadeStack Privacy Policy – Client-Side Data Architecture',
    ogDescription: 'Client-side processing architecture, data handling practices, and user privacy boundaries across all LadeStack developer tools and web applications.',
  },
  header: {
    badge: 'Privacy & Data Protection',
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: October 2026',
    effectiveDate: 'Effective Immediately',
  },
  disclaimer: {
    title: 'Authoritative Version Notice',
    text: 'The English version of this Privacy Policy represents the authoritative statement of LadeStack’s privacy practices. Translations into other languages are provided for informational and convenience purposes only and have not been certified by independent legal counsel.',
  },
  highlights: [
    { icon: 'shield-check', text: '100% Client-Side Execution' },
    { icon: 'lock', text: 'Zero Server File Storage' },
    { icon: 'check-circle', text: 'Local-First Architecture' },
    { icon: 'eye-off', text: 'Zero Tracking Pixels' },
  ],
  sections: [
    {
      title: '1. Platform Scope & Architectural Philosophy (Local-First Guarantee)',
      paragraphs: [
        'LadeStack (ladestack.in) and its affiliated web application suites are engineered from the ground up around a fundamental architectural commitment: client-side computing and absolute data sovereignty. Unlike conventional cloud utilities that stream sensitive user files to remote servers for processing, LadeStack executes all core transformations directly within the sandbox of your local browser environment.',
        'This architectural model leverages modern web standards — including WebAssembly (Wasm), Web Workers, the HTML5 Canvas API, and browser-native IndexedDB engines. Whether you are writing and running code in GB Coder, merging sensitive PDF files, compiling confidential markdown documentation, drafting your personal resume, or converting land measurement units, your files and intellectual assets reside solely in your device’s volatile system memory (RAM) and local browser storage. At no point during file manipulation or execution are your files transmitted to, inspected by, or stored on LadeStack backend servers.',
      ],
    },
    {
      title: '2. Product-by-Product Privacy Breakdown',
      paragraphs: [
        'To ensure complete transparency, the following technical breakdown delineates data handling practices across each specific tool within the LadeStack ecosystem:',
      ],
      listItems: [
        'GB Coder (https://code.ladestack.in/): In the browser-native IDE, code compilation in the Static Editor executes in a secure, sandboxed iframe. In the Advanced WebContainer environment, a virtualized Node.js runtime runs locally inside your browser via WebAssembly. All workspaces, file trees, and draft code are saved strictly in your local browser’s IndexedDB. We do not inspect, log, or telemetry-track your source code.',
        'LS PDF Toolkit (https://pdf.ladestack.in/): All 17 PDF utilities — including document merging, splitting, in-memory compression, password protection, and page extraction — are computed entirely in browser memory using WebAssembly binaries. Your PDF files are converted into local ArrayBuffer byte streams and never traverse the network. When you complete an operation, downloads are initiated via local blob URLs (blob:), leaving zero trace on remote infrastructure.',
        'MD2PDF Converter (https://md2pdf.ladestack.in/): The Markdown to PDF compiler parses GitHub-Flavored Markdown (GFM), evaluates KaTeX mathematical typesetting, applies syntax highlighting, and constructs vector print layouts entirely on the client side. No markdown drafts, equations, or generated PDF documents are transmitted over the wire.',
        'Swift Resume (https://resume.ladestack.in/): Personal contact details, employment history, educational credentials, and skill profiles entered into the resume builder remain stored exclusively in your browser’s localStorage. Resumes are compiled directly to vector PDF in-browser without sending candidate profiles to recruitment databases or marketing aggregators.',
        'Bharat Land Converter (https://land.ladestack.in/): Regional land measurement conversions (such as Bigha, Guntha, Ground, Cent, Biswa, Acre, and Hectare) execute through client-side mathematical algorithms. We do not request, process, or record GPS geolocation data, property identifiers, or land ownership records.',
        'LS Image Compressor (https://img.ladestack.in/): Raster image manipulation (AVIF, WebP, PNG, JPEG, SVG) uses the HTML5 Canvas API and WebAssembly codecs entirely on your local CPU/GPU. Source images and output files never touch a remote server.',
        'Open-Source Code & GitHub (https://github.com/girishlade111): Platform source code, public discussions, and issue trackers are hosted transparently on GitHub in accordance with GitHub’s privacy and service policies.',
      ],
    },
    {
      title: '3. Information We Collect, Diagnostic Telemetry & Server Logs',
      paragraphs: [
        'Because LadeStack utilities do not require account registration, passwords, payment processing, or profile creation, we do not maintain a user account database. Network interactions are confined to standard web delivery infrastructure:',
      ],
      listItems: [
        'Edge Server Access Logs: When your browser requests static HTML, JavaScript, CSS, or WebAssembly bundles, our edge CDN automatically records transient server access logs. These logs capture standard HTTP request metadata, including IP address, user-agent string, operating system version, requesting URL, and HTTP response code. These logs are used strictly for edge caching optimization, DDoS mitigation, and network security diagnostics.',
        'Zero Behavioral Tracking: We do not deploy third-party advertising cookies, cross-site trackers, biometric fingerprints, or session replay technologies (such as Hotjar or FullStory).',
        'Voluntary Inquiries: If you send an email to admin@ladestack.in, we retain your email address and message thread solely to answer your technical questions or respond to feedback. We never sell, rent, or monetize inquiry correspondence.',
      ],
    },
    {
      title: '4. Local Storage Technologies, Cookies & Session State',
      paragraphs: [
        'LadeStack utilizes modern browser storage mechanisms exclusively for necessary client-side functional utilities. We do not use commercial marketing or advertising cookies. Storage technologies utilized include:',
      ],
      listItems: [
        'localStorage: Stores user interface preferences such as dark/light theme state (key: "theme"), active language preferences, and autosaved draft entries in Swift Resume.',
        'IndexedDB: Powers project persistence within GB Coder, preserving user code files, package dependencies, and folder hierarchies across browser reloads so developers do not lose their work.',
        'Session Storage & Volatile RAM: Temporary state variables and large document ArrayBuffers remain in volatile tab memory and are immediately cleared when the tab is closed.',
        'User Control & Erasure: You have complete sovereignty over locally stored data. You can inspect, modify, or erase all LadeStack storage at any moment through your browser developer tools (Application / Storage tab) or by clearing your browser cache.',
      ],
    },
    {
      title: '5. Third-Party Integrations & External API Key Handling (BYOK)',
      paragraphs: [
        'In GB Coder, developers have the optional ability to connect external Artificial Intelligence code assistants by bringing their own API keys (e.g., OpenAI, Anthropic, or Google Gemini).',
        'LadeStack enforces a strict direct-connect model: all outbound API calls for AI completions are transmitted directly from your browser runtime to the respective third-party provider endpoint over HTTPS. LadeStack does not operate an intermediate logging proxy, does not inspect your code snippets or prompts, and does not retain your external API keys on our infrastructure.',
      ],
    },
    {
      title: '6. Data Retention, Ephemeral Memory Lifecycle & Deletion Rights',
      paragraphs: [
        'Because LadeStack operates on zero-retention principles for user payload files, our memory lifecycle is predictable and deterministic:',
        'Working data residing in volatile memory is purged automatically upon tab closure or browser navigation. IndexedDB project data remains stored on your local disk until you explicitly delete it within the application or wipe site storage.',
        'Because LadeStack does not possess, store, or warehouse your code, documents, or personal data on remote servers, we have no capability to monetize, share, or disclose your intellectual property to advertisers, government entities, or commercial data brokers.',
      ],
    },
    {
      title: '7. Security Engineering & Browser Sandboxing',
      paragraphs: [
        'We enforce state-of-the-art web application security standards to protect your local execution environment:',
      ],
      listItems: [
        'Strict HTTPS Transport: All web traffic is enforced over TLS 1.3 with HTTP Strict Transport Security (HSTS) headers, preventing man-in-the-middle attacks.',
        'Content Security Policy (CSP): Rigid CSP rules restrict unauthorized third-party script injection, cross-site scripting (XSS), and unapproved network calls.',
        'Cross-Origin Isolation: GB Coder and WebAssembly modules implement Cross-Origin-Opener-Policy (COOP) and Cross-Origin-Embedder-Policy (COEP) to enable SharedArrayBuffer safely in hardware-isolated threads.',
        'Iframe Sandboxing: Code evaluated in the GB Coder static preview runs inside sandboxed iframes restricted from accessing parent session state.',
      ],
    },
    {
      title: '8. International Regulatory Compliance (GDPR, CCPA/CPRA, India DPDP Act)',
      paragraphs: [
        'LadeStack’s privacy posture satisfies global data protection benchmarks, including the European Union General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), and the Indian Digital Personal Data Protection Act (DPDP Act 2023).',
        'Under these frameworks, our platform embodies "Privacy by Design" and "Privacy by Default." Because we do not collect, process, or sell personal identifiable information (PII), your statutory rights to access, rectification, portability, and erasure are realized inherently: you maintain uninterrupted physical and cryptographic custody of your data on your own hardware.',
      ],
    },
    {
      title: '9. Children’s Online Privacy Protection',
      paragraphs: [
        'LadeStack’s developer utilities, documentation, and technical articles are designed for professional software engineers, researchers, students, and general audiences. We do not knowingly solicit or collect personal information from individuals under the age of 16. In the event that standard web server logs inadvertently record diagnostic network data from a minor, such logs are purged routinely in accordance with standard infrastructure maintenance cycles.',
      ],
    },
    {
      title: '10. Policy Amendments & Continuous Governance',
      paragraphs: [
        'We may occasionally update this Privacy Policy to reflect architectural improvements, newly released browser developer utilities, or changing regulatory mandates. Any updates will be published on this page with a revised "Last Updated" timestamp.',
        'Continued access to LadeStack applications following any published revisions constitutes an acknowledgment of our updated data protection practices.',
      ],
    },
  ],
  contactNote: {
    title: '11. Contact & Privacy Governance',
    text: 'If you have technical questions regarding our client-side architecture, data isolation guarantees, or privacy practices, please contact our engineering team directly at:',
    email: 'admin@ladestack.in',
  },
};
