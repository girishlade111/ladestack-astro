import type { GbCoderPageData } from './types';

export const zh: GbCoderPageData = {
  seo: {
    title: 'GB Coder — 浏览器内全栈 IDE 与开发工作室 | LadeStack',
    description: '使用 GB Coder 在浏览器中即刻构建、运行和预览 Web 代码。Monaco Editor、实时 DOM 预览、WebContainer Node.js 运行时、本地优先隐私保护。完全免费。',
    ogTitle: 'GB Coder — 浏览器内全栈 IDE 与开发工作室 | LadeStack',
    ogDescription: '使用 GB Coder 在浏览器中即刻构建、运行和预览 Web 代码。Monaco Editor、实时 DOM 预览、WebContainer Node.js 运行时、本地优先隐私保护。完全免费。',
  },
  hero: {
    badge: '浏览器端优先的 Web 开发工作室',
    titleLine: '在您的浏览器中，即刻',
    titleHighlight: '构建、运行与交付代码。',
    description: 'GB Coder 将 Monaco Editor 与双执行引擎深度融合：提供跨所有现代浏览器的极速静态原型开发，以及基于 WebContainer 的内存级全栈 Node.js 运行环境。',
    ctaStudio: '启动 GB Coder Studio',
    ctaProjects: '启动 WebContainer IDE',
    trustBadges: [
      '客户端隐私隔离',
      '亚毫秒级编译速度',
      '永久免费 · 零付费门槛',
    ],
  },
  environments: {
    eyebrow: '双引擎执行架构',
    title: '两大专用编程执行引擎',
    description: '根据工作流按需选择：超极速纯静态网页原型开发，或浏览器内完整的 Node.js 开发环境。',
    staticCard: {
      badge: '全浏览器通用支持',
      engine: '即时客户端沙箱',
      title: '静态与多文件快速原型',
      description: '零配置编写 HTML5、CSS3 与 JavaScript。Monaco 编辑器带来实时 DOM 同步、语法高亮、保存时自动格式化以及 CDN 脚本一键注入。',
      features: [
        '按键即渲染：亚毫秒级 DOM 同步',
        '注入外部 CDN 库（Tailwind、Lucide、Bootstrap 等）',
        '兼容主流桌面与移动端现代浏览器',
      ],
      status: '零构建等待',
      cta: '开始原型设计',
    },
    webContainerCard: {
      badge: '全栈微型操作系统',
      engine: '浏览器内 Node.js',
      title: '高级 WebContainer IDE',
      description: '直接在浏览器内存中运行全栈 Node.js。支持运行 npm install 安装依赖、执行 package 脚本、启动 Vite 开发服务器并支持 React 和 Vue 启动模版。',
      features: [
        '执行真实 Node.js 运行时并安装 npm 依赖包',
        '支持热模块重载（HMR）的 React & Vue 模板',
        '基于 SharedArrayBuffer 与 Web Worker 的隔离沙箱',
      ],
      status: '支持 Chromium 与 Firefox',
      cta: '启动 WebContainer IDE',
    },
  },
  pillars: {
    eyebrow: '核心支柱',
    title: '专为高精度、极致速度与隐私设计',
    description: 'GB Coder 的每一项功能都旨在直接在浏览器内提供企业级代码编写体验。',
    items: [
      {
        icon: 'code-2',
        title: 'Monaco 代码编辑器',
        badge: 'VS Code 核心',
        description: '采用与 VS Code 同款的业界标杆级编辑器。具备 TypeScript 语法验证、智能补全、多光标编辑、括号着色匹配与代码折叠。',
      },
      {
        icon: 'eye',
        title: '即时实时预览',
        badge: '同步 DOM',
        description: '边输入边渲染 HTML、CSS 和现代 JavaScript。包含独立的弹出式独立窗口预览，以及用于局域网真机调试的移动端二维码。',
      },
      {
        icon: 'cpu',
        title: 'WebContainer 微系统',
        badge: '内存 Node.js',
        description: '在浏览器内存中执行真实的 Node.js 进程、运行 npm 脚本、启动 Vite 并在完全本地环境中调试 React 和 Vue 完整架构。',
      },
      {
        icon: 'shield-check',
        title: '本地优先数据持久化',
        badge: '客户端数据保护',
        description: '工作区项目安全存储在您本机的 IndexedDB 中。绝无强制登录要求，无任何后台远程遥测数据上传。',
      },
      {
        icon: 'layers',
        title: '多文件目录架构',
        badge: '模块化组织',
        description: '通过清晰的文件资源管理器和标签页导航，井然有序地组织跨多个文件与目录的复杂 Web 组件。',
      },
      {
        icon: 'download',
        title: '项目一键备份与导出',
        badge: 'ZIP 归档',
        description: '随时以完整目录结构将工作区导出为标准 ZIP 归档。通过一键导入功能随时还原过往工程。',
      },
    ],
  },
  guardrails: {
    eyebrow: '技术规范与支持边界',
    title: 'WebContainer 运行时与浏览器兼容性',
    desc1: 'GB Coder 在支持 SharedArrayBuffer 和跨域隔离（COOP/COEP）的现代浏览器中利用 WebContainers 运行纯正的 Node.js 进程。',
    desc2: '对于轻量级原型开发或隔离头受限的环境（包括 Apple Safari），我们的静态多文件编辑器提供无需外部依赖的即时回退方案，保障顺畅编程。',
    supportedHeading: '支持的运行环境',
    environments: [
      { browser: 'Google Chrome', support: 'WebContainer + 静态编辑器', highlight: true },
      { browser: 'Microsoft Edge', support: 'WebContainer + 静态编辑器', highlight: true },
      { browser: 'Brave Browser', support: 'WebContainer + 静态编辑器', highlight: true },
      { browser: 'Mozilla Firefox', support: 'WebContainer (COOP/COEP)', highlight: true },
      { browser: 'Apple Safari', support: '静态多文件模式', highlight: false },
    ],
  },
  faqs: {
    eyebrow: '技术解答',
    title: '常见技术问题',
    description: '关于 GB Coder 能力边界、系统架构及运行机制的客观说明。',
    items: [
      {
        q: 'GB Coder 如何在无需远程服务器的情况下运行全栈代码？',
        a: 'GB Coder 借助 WebContainer 技术，利用 SharedArrayBuffer 与跨源隔离（COOP/COEP），在您的浏览器标签页内直接执行原生 Node.js 进程与 WebAssembly 微系统。所有构建步骤和本地服务器完全运行在您本机的硬件上。',
      },
      {
        q: '静态多文件编辑器与 WebContainer IDE 有何区别？',
        a: '静态多文件编辑器为 HTML、CSS 和原生/CDN JavaScript 提供零等待的 DOM 实时渲染，跨浏览器通用支持。高级 WebContainer IDE 则支持运行 Node.js 包管理器、npm 构建脚本以及 React 和 Vue 等现代前端框架。',
      },
      {
        q: '我的源代码和项目会上传到 LadeStack 的服务器吗？',
        a: '绝不会。GB Coder 遵循严格的本地优先模型。您的代码、静态资源和工作区状态完全保存在浏览器的 IndexedDB 数据库中。LadeStack 不会在远程服务器上存储或分析您的项目代码。',
      },
      {
        q: '哪些浏览器可以运行 GB Coder？',
        a: '静态多文件编辑器可在 Apple Safari、Google Chrome、Microsoft Edge 和 Mozilla Firefox 等所有现代浏览器上无缝运行。高级 WebContainer IDE 支持 Chromium 内核浏览器（Chrome、Edge、Brave）以及开启了 COOP/COEP 的现代 Firefox。由于目前 WebKit 的底层环境约束，Safari 用户推荐使用全功能静态编辑器进行前端开发。',
      },
      {
        q: 'GB Coder 是否完全免费？',
        a: '是的，完全免费。没有付费订阅层级，无需绑定信用卡，也没有每日编译次数配额。由 Girish Lade 作为 LadeStack 开放生态的重要一环进行长期开发与维护。',
      },
    ],
  },
  cta: {
    title: '准备好在浏览器中编写、运行并交付代码了吗？',
    description: '无需任何安装，即刻启动 GB Coder。现在就体验 Monaco 编辑器与浏览器端 Node.js 带来的开发快感。',
    launchStudioBtn: '启动 GB Coder Studio',
    exploreAllBtn: '探索全部实用工具',
    footerTagline: 'GB Coder by LadeStack · 浏览器优先架构 · 永久免费',
  },
};
