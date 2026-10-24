import type { DocsPageData } from './types';

export const zhDocs: DocsPageData = {
  seo: {
    title: '技术文档 – 系统架构、使用指南与 API 参考 | LadeStack',
    description: 'LadeStack 开发者工具技术文档库。架构说明指南、客户端 WebAssembly 工作流与平台版本发布历史。',
    ogTitle: 'LadeStack 开发者技术文档',
    ogDescription: 'GB Coder、LS PDF 与 LS Image 核心工具的系统规范、执行架构指南与实战教程。',
  },
  hero: {
    badge: '技术文档与参考',
    title: '开发者技术文档',
    description: 'LadeStack 开发者平台的系统规范、本地执行架构指南以及权威参考资料。',
    searchPlaceholder: '搜索技术文档、工具、指南…',
    searchAriaLabel: '搜索技术文档、工具、指南',
  },
  categoriesSection: {
    title: '核心架构指南',
    description: '选择下方架构类别以查阅详细的运行规范与技术剖析。',
    viewGuide: '查看指南',
    closeGuide: '关闭指南',
    categories: [
      {
        id: 'getting-started',
        icon: 'book-open',
        title: '快速入门',
        description: '核心设计哲学、浏览器执行模型与本地优先工作流',
        overview: 'LadeStack 工具直接在用户浏览器中运行，无需将机密数据传输至远程后端处理服务器。',
        sections: [
          {
            title: '浏览器即开即用',
            content: '无需繁琐安装即可启动。WebAssembly 二进制程序与 Web Worker 直接在浏览器本地内存中初始化并执行。',
          },
          {
            title: '本地存储与内存隔离',
            content: '项目文件与上传文档严格保留在浏览器内存与 IndexedDB 中，不会上传至 LadeStack 服务器。可选的第三方 AI 功能仅在您主动配置后才会发起外部网络请求。',
          },
          {
            title: '导出生产级产物',
            content: '直接将编译后的静态 Web 资源、编辑完成的 PDF 文档或压缩图像文件保存至本地磁盘。',
          },
        ],
      },
      {
        id: 'code-studio',
        icon: 'code-2',
        title: 'GB Coder 引擎',
        description: '静态编辑器编译解析、WebContainer Node.js 仿真与 Monaco 深度集成',
        overview: 'GB Coder 双引擎架构深度解析：轻量级静态编辑器与高级 WebContainer IDE。',
        sections: [
          {
            title: '双引擎技术架构',
            content: 'Static Editor 无延迟在浏览器中实时解析 HTML、CSS 与 JavaScript。Advanced WebContainer IDE 在 Chromium 内核浏览器中构建本地 Node.js 容器，支持启动本地开发服务器与运行 npm 依赖。',
          },
          {
            title: 'Monaco 编辑器集成',
            content: '具备桌面级代码编辑体验，提供精确语法高亮、代码智能补全、诊断提示与完备键盘快捷键。',
          },
          {
            title: '本地持久化与导出',
            content: '代码实时自动保存至浏览器 IndexedDB，并支持一键导出无框架依赖的干净 ZIP 归档包。',
          },
        ],
      },
      {
        id: 'pdf-wasm',
        icon: 'file-text',
        title: 'LS PDF Toolkit',
        description: '基于 WebAssembly 的内存级客户端 PDF 处理引擎',
        overview: '解析 WebAssembly 如何在客户端浏览器内存中直接完成二进制 PDF 数据流的解析与处理。',
        sections: [
          {
            title: '合并与分割数据流',
            content: '在本地无损合并多份 PDF 文档或提取自定义页面范围，无需经过任何服务器中转。',
          },
          {
            title: '内存级文件压缩',
            content: '在本地优化流字典对象并压缩嵌入式字体，显著缩减最终文件体积。',
          },
          {
            title: '客户端安全防护',
            content: '在数据写入磁盘前，直接在浏览器内存中对 PDF 文档进行高强度加密与密码保护。',
          },
        ],
      },
      {
        id: 'image-engine',
        icon: 'image',
        title: 'LS Image Engine',
        description: '基于 Canvas 与 WebAssembly 的多格式图像处理与实时预览',
        overview: '利用 Web Worker 实现的客户端图像转换、高压缩比算法与实时双视图对比。',
        sections: [
          {
            title: '广泛的格式支持',
            content: '全面支持现代 Web 图像标准，涵盖 AVIF、WebP、PNG、JPEG、SVG 与 TIFF 等。',
          },
          {
            title: '精细画质调校',
            content: '支持实时调节有损量化参数与色度抽样阈值，并提供双向侧边实时画质对比。',
          },
        ],
      },
    ],
  },
  articlesSection: {
    title: '精选技术专栏',
    description: '涵盖安全防护、隐私边界与前端资源性能优化的实践指南。',
    readArticle: '阅读全文',
    closeArticle: '关闭文章',
    stepsTitle: '执行步骤：',
    summaryLabel: '总结：',
    articles: [
      {
        id: 'client-side-privacy',
        title: '深入理解客户端隐私架构',
        category: '安全防护',
        readTime: '预计阅读 4 分钟',
        intro: '解析 LadeStack 如何依托 WebAssembly 内存隔离与浏览器原生沙箱机制保障用户数据安全。',
        steps: [
          '通过 Web Worker 分配浏览器专属内存沙箱。',
          '在本地内存中完成 WebAssembly 字节处理，杜绝网络外传。',
          '利用隔离的 IndexedDB 存储保留项目状态。',
          '浏览器标签页关闭时立即触发系统垃圾回收。',
        ],
        summary: '通过将运算完整保留在用户设备端，LadeStack 从根本上消除了服务端存储泄漏风险，同时保障极致的处理响应速度。',
      },
      {
        id: 'optimizing-assets',
        title: 'Web 静态资源压缩的最佳实践',
        category: '性能优化',
        readTime: '预计阅读 6 分钟',
        intro: '在保证无明显肉眼感知画质差异的前提下，大幅削减图像与文档体积的工程方法。',
        steps: [
          '优先选择新一代现代格式 AVIF 或 WebP。',
          '通过对比调校有损量化参数，获取最佳画质体积比。',
          '移除冗余的相机 EXIF 元数据与多余颜色描述档。',
          '在移动设备视口中监测 Largest Contentful Paint (LCP) 的优化提升。',
        ],
        summary: '合理的客户端压缩可显著节约带宽消耗，并为站点带来立竿见影的 Core Web Vitals 性能跃升。',
      },
    ],
  },
  changelogSection: {
    title: '平台版本更新历史',
    description: '记录 LadeStack 近期的重大版本发布、架构演进与功能迭代。',
    items: [
      {
        version: 'v1.0.0',
        date: '2026年10月',
        type: '重大发布',
        description: 'Obsidian 与 Precision Emerald 设计系统全面上线，完成 9 种语言本土化，提升无障碍兼容性与客户端运行时性能。',
      },
      {
        version: 'v0.9.4',
        date: '2026年8月',
        type: '体验改进',
        description: '在 LS PDF 套件中新增多款客户端 PDF 文档处理工具，并深度优化内存压缩算法。',
      },
      {
        version: 'v0.9.0',
        date: '2026年6月',
        type: '新功能发布',
        description: 'GB Coder 浏览器原生双引擎在线开发环境首次正式公开发布。',
      },
    ],
  },
};
