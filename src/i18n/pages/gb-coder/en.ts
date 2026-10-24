import type { GbCoderPageData } from './types';

export const en: GbCoderPageData = {
  seo: {
    title: 'GB Coder — In-Browser IDE & Development Studio | LadeStack',
    description: 'Build, run, and preview web code instantly with GB Coder. Monaco Editor, live DOM preview, WebContainer Node.js execution, and local-first privacy. Free to use.',
    ogTitle: 'GB Coder — In-Browser IDE & Development Studio | LadeStack',
    ogDescription: 'Build, run, and preview web code instantly with GB Coder. Monaco Editor, live DOM preview, WebContainer Node.js execution, and local-first privacy. Free to use.',
  },
  hero: {
    badge: 'Browser-First Web Development Studio',
    titleLine: 'Build, run, and ship code',
    titleHighlight: 'instantly in your browser.',
    description: 'GB Coder combines Monaco Editor with dual execution engines: instantaneous static web prototyping across all modern browsers, and full-stack in-memory Node.js environments via WebContainers.',
    ctaStudio: 'Launch GB Coder Studio',
    ctaProjects: 'Launch WebContainer IDE',
    trustBadges: [
      'Client-Side Privacy',
      'Sub-millisecond Compilation',
      'Free Forever · Zero Paywalls',
    ],
  },
  environments: {
    eyebrow: 'Dual Execution Architecture',
    title: 'Two Purpose-Built Coding Engines',
    description: 'Choose the ideal runtime for your workflow: ultra-fast static web prototyping or complete in-browser Node.js development.',
    staticCard: {
      badge: 'Universal Browser Support',
      engine: 'Instant Client Sandbox',
      title: 'Static & Multi-File Prototyping',
      description: 'Zero-setup coding for HTML5, CSS3, and JavaScript. Monaco editor with real-time DOM synchronization, syntax highlighting, format-on-save, and CDN script injection.',
      features: [
        'Sub-millisecond DOM synchronization as you type',
        'External CDN library injection (Tailwind, Lucide, Bootstrap)',
        'Supported across modern desktop and mobile browsers',
      ],
      status: 'Zero build delay',
      cta: 'Start Prototyping',
    },
    webContainerCard: {
      badge: 'Full-Stack Micro-OS',
      engine: 'Node.js In-Browser',
      title: 'Advanced WebContainer IDE',
      description: 'Full-stack Node.js environment running directly in browser memory. Run npm install, execute package scripts, boot Vite development servers, and work with full React and Vue starter architectures.',
      features: [
        'Execute Node.js runtimes and npm package installations',
        'React & Vue starter templates with hot module reloading',
        'SharedArrayBuffer & Web Worker isolated sandbox',
      ],
      status: 'Chromium & Firefox',
      cta: 'Launch WebContainer IDE',
    },
  },
  pillars: {
    eyebrow: 'Feature Pillars',
    title: 'Engineered for Precision, Speed, and Privacy',
    description: 'Every feature in GB Coder was built to deliver enterprise coding capabilities inside your browser.',
    items: [
      {
        icon: 'code-2',
        title: 'Monaco Code Editor',
        badge: 'VS Code Engine',
        description: 'The same industry-standard code editor behind VS Code. Features TypeScript syntax validation, autocomplete, multi-cursor editing, bracket matching, and code folding.',
      },
      {
        icon: 'eye',
        title: 'Instant Live Preview',
        badge: 'Synchronized DOM',
        description: 'Instant preview renders your HTML, CSS, and modern JavaScript as you type. Includes detached popout preview windows and mobile QR code inspection on local networks.',
      },
      {
        icon: 'cpu',
        title: 'WebContainer Micro-OS',
        badge: 'Node.js in Memory',
        description: 'Execute genuine Node.js processes, run npm package scripts, boot Vite development servers, and prototype with full React and Vue starter architectures directly in browser memory.',
      },
      {
        icon: 'shield-check',
        title: 'Local-First Persistence',
        badge: 'Client-Side Privacy',
        description: 'Workspaces are saved securely to IndexedDB on your device. Local development operates without mandatory account signups or background server telemetry uploads.',
      },
      {
        icon: 'layers',
        title: 'Multi-File Architecture',
        badge: 'Modular Structure',
        description: 'Organize complex web components across multiple files and directories with clean file explorer navigation and tab management.',
      },
      {
        icon: 'download',
        title: 'Tamper-Proof Backups',
        badge: 'ZIP Archives',
        description: 'Export workspaces into standard ZIP archives anytime with full directory structures preserved. Restore previous projects with single-click import.',
      },
    ],
  },
  guardrails: {
    eyebrow: 'Technical Guardrails & Boundaries',
    title: 'WebContainer Runtime & Browser Compatibility',
    desc1: 'GB Coder leverages WebContainers for running genuine Node.js processes inside modern browsers that support SharedArrayBuffer and cross-origin isolation (COOP/COEP).',
    desc2: 'For lightweight prototyping or environments where WebContainer isolation headers are restricted (including Apple Safari), our Static Editor provides an instant fallback with zero external dependencies, ensuring seamless coding across modern browsers.',
    supportedHeading: 'Supported Environments',
    environments: [
      { browser: 'Google Chrome', support: 'WebContainer + Static', highlight: true },
      { browser: 'Microsoft Edge', support: 'WebContainer + Static', highlight: true },
      { browser: 'Brave Browser', support: 'WebContainer + Static', highlight: true },
      { browser: 'Mozilla Firefox', support: 'WebContainer (COOP/COEP)', highlight: true },
      { browser: 'Apple Safari', support: 'Static Editor Mode', highlight: false },
    ],
  },
  faqs: {
    eyebrow: 'Technical Q&A',
    title: 'Frequently Asked Questions',
    description: "Clear, honest details regarding GB Coder's capabilities, architecture, and runtime boundaries.",
    items: [
      {
        q: 'How does GB Coder execute full-stack code without a remote server?',
        a: 'GB Coder uses WebContainer technology, which runs genuine Node.js processes and WebAssembly micro-environments directly inside your browser tab using SharedArrayBuffer and cross-origin isolation (COOP/COEP). Development servers and build steps run entirely on your local machine hardware.',
      },
      {
        q: 'What is the difference between the Static Editor and the WebContainer IDE?',
        a: 'The Static & Multi-File Editor provides instantaneous, zero-overhead DOM rendering for HTML, CSS, and vanilla/CDN JavaScript with universal browser support. The Advanced WebContainer IDE runs Node.js package managers, npm scripts, and modern frontend frameworks like React and Vue.',
      },
      {
        q: 'Are my source code and projects uploaded to LadeStack servers?',
        a: 'No. GB Coder operates on a strict local-first model. Your code, assets, and workspace states are saved directly to IndexedDB within your browser. LadeStack does not store or track your project code on remote servers.',
      },
      {
        q: 'What browsers support GB Coder?',
        a: 'The Static & Multi-File Editor works across all modern browsers including Apple Safari, Google Chrome, Microsoft Edge, and Mozilla Firefox. The Advanced WebContainer IDE runs in Chromium-based browsers (Chrome, Edge, Brave) and modern Firefox with SharedArrayBuffer and Cross-Origin Isolation (COOP/COEP) enabled. Due to current WebKit runtime constraints, Safari users can utilize the full-featured Static Editor for web development.',
      },
      {
        q: 'Is GB Coder completely free?',
        a: 'Yes, free to use. There are no subscription tiers, no credit card requirements, and no daily compile quotas. It is developed and maintained by Girish Lade as part of the open LadeStack developer ecosystem.',
      },
    ],
  },
  cta: {
    title: 'Ready to write, run, and ship code in your browser?',
    description: 'Launch GB Coder right now with zero installation. Experience Monaco Editor and in-browser Node.js workflows today.',
    launchStudioBtn: 'Launch GB Coder Studio',
    exploreAllBtn: 'Explore All Utilities',
    footerTagline: 'GB Coder by LadeStack · Browser-First Architecture · Free to Use',
  },
};
