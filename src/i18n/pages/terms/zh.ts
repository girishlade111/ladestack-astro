import type { TermsPageData } from './types';

export const zhTerms: TermsPageData = {
  seo: {
    title: '服务条款 – 平台使用与知识产权授权 | LadeStack',
    description: '审阅规范使用 LadeStack 开发者工具的服务条款、知识产权归属、客户端执行免责声明与商业授权范围。',
    ogTitle: 'LadeStack 服务条款',
    ogDescription: 'LadeStack 开发者工具的使用条款、产物所有权与商业使用许可说明。',
  },
  header: {
    badge: '法律与条款',
    title: '服务条款',
    lastUpdated: '最后更新日期：2026年10月',
    effectiveDate: '即时生效',
  },
  disclaimer: {
    title: '权威版本声明',
    text: '本服务条款的英文版本为界定 LadeStack 使用条件的唯一权威法律文本。其他语言的翻译版本仅为便于阅读与参考而提供，未经独立法律顾问认证。',
  },
  sections: [
    {
      title: '1. 条款之接受与约束',
      paragraphs: [
        '访问或使用 LadeStack 平台（ladestack.in）、其关联子域名或在此提供的任何基于浏览器的工具，即表明您同意受本服务条款的法律约束。如果您不同意本条款的任何部分，请立即停止访问并终止使用本平台。',
      ],
    },
    {
      title: '2. 许可使用范围与产物所有权',
      paragraphs: [
        '您被授予一项全球性、非独占、免版税的许可，可将 LadeStack Web 工具用于个人学习、学术研究、开源贡献及商业软件交付。',
        '通过 LadeStack 工具编写、编译或生成的全部代码、软件架构、文档、图像和数据产物，均无条件归属于您本人的独立知识产权。LadeStack 绝不对您在本地客户端工具中处理的任何文件或代码主张任何所有权或版税。',
      ],
    },
    {
      title: '3. 技术执行与运行环境要求',
      paragraphs: [
        'LadeStack 开发者工具主要依托 WebAssembly、Web Worker 及现代浏览器 API 在客户端本地运行。工具的运算吞吐量与稳定性直接取决于您本地设备的硬件配置与浏览器环境。',
        'GB Coder 提供了适配现代常青浏览器的静态编辑器，以及面向 Chromium 内核浏览器优化的 WebContainer 高级 IDE。您有责任确保本地环境符合相应的技术运行先决条件。',
      ],
    },
    {
      title: '4. 免责声明与保证之排除',
      paragraphs: [
        'LadeStack 提供的所有服务与工具均按“现状”（AS IS）及“现有”（AS AVAILABLE）的基础提供，不包含任何明示或暗示的担保。',
        '我们不保证工具的运行绝无中断、毫无瑕疵，亦无法担保不受第三方浏览器版本迭代所带来的瞬态兼容性波动影响。',
      ],
    },
    {
      title: '5. 责任限制',
      paragraphs: [
        '在适用法律允许的最大限度内，LadeStack、其创始人或代码贡献者概不对因访问、使用或无法使用本工具、产出代码或技术文档所引发的任何直接、间接、附带或衍生性损失承担赔偿责任。',
      ],
    },
    {
      title: '6. 条款之修订',
      paragraphs: [
        '我们保留自行决定随时修订本服务条款的权利。任何修订均将体现在本文档顶部的“最后更新日期”中。在条款修改发布后继续使用本平台工具，即视为您接受修改后的条款。',
      ],
    },
  ],
  contactNote: {
    title: '7. 法律与合规咨询',
    text: '如对本服务条款或授权许可范围有任何疑问，请联系我们：',
    email: 'admin@ladestack.in',
  },
};
