import type { SitemapPageData } from './types';

export const zhSitemap: SitemapPageData = {
  seo: {
    title: '网站地图与全站索引 | LadeStack',
    description: '浏览 LadeStack 的全站目录索引：涵盖开发者工具、架构文档、工程实践与平台核心资源。',
    ogTitle: 'LadeStack 网站地图与全站索引',
    ogDescription: 'LadeStack 平台的完整页面、在线工具、技术文档与工程博客目录。',
  },
  hero: {
    badge: '导航与全站索引',
    title: '网站索引与目录',
    description: '涵盖 LadeStack 平台所有页面、开发者工具、技术文档和工程文章的完整导览目录。',
  },
  sections: {
    corePlatform: {
      title: '核心平台路由',
      items: [
        { title: '首页', href: '/', desc: '展示核心工具亮点与交互式在线代码演示的平台主页' },
        { title: '关于 LadeStack', href: '/about', desc: '创始人经历、工程开发理念以及经实测验证的产品矩阵' },
        { title: 'GB Coder', href: '/gb-coder', desc: '搭载 Monaco 编辑器、静态编辑器与 WebContainer 运行时的浏览器原生 IDE' },
        { title: '产品与工具库', href: '/apps', desc: '经实测验证的纯客户端前端在线工具目录' },
        { title: '技术文档', href: '/docs', desc: '技术规范、执行架构剖析与平台版本发布历史' },
        { title: '支持中心', href: '/support', desc: '技术支持渠道、浏览器兼容性说明与常见问题答疑' },
        { title: '联系我们', href: '/contact', desc: '直通创始人的电子邮箱、工程探讨与需求建议反馈' },
      ],
    },
    tools: {
      title: '开发者工具与应用',
      openTool: '打开工具',
      comingSoon: '即将推出',
      live: '运行中',
    },
    blogArchive: {
      title: '工程技术博客归档（共 27 篇文章）',
      notice: '注：工程博客文章目前仅提供英文版本。全站文章的多语言本地化已排期于 Phase 3 推进。',
      visitBlog: '访问博客总览 →',
    },
    legal: {
      title: '法律合规与隐私治理',
      items: [
        { title: '隐私权政策', href: '/privacy', desc: '客户端运算架构、数据边界及本地存储使用规则' },
        { title: '服务条款', href: '/terms', desc: '商业开发权益、知识产权归属与免责范围说明' },
      ],
    },
  },
};
