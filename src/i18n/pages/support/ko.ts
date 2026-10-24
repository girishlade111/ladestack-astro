import type { SupportPageData } from './types';

export const koSupport: SupportPageData = {
  seo: {
    title: '고객 지원 센터 – 도움말, 문서 및 자주 묻는 질문 | LadeStack',
    description: 'LadeStack 개발자 도구에 대한 지원을 받으세요. 기술 문서, 문제 해결 가이드 및 엔지니어링 팀 직접 문의 채널을 제공합니다.',
    ogTitle: 'LadeStack 고객 지원 센터 – 도움말 및 FAQ',
    ogDescription: '아키텍처, 데이터 처리 원칙, 브라우저 호환성에 대한 명확한 답변과 직접 지원 채널을 확인하세요.',
  },
  hero: {
    badge: '지원 및 문의',
    title: '무엇을 도와드릴까요?',
    description: '워크플로 문제 해결, 기술 문서 탐색, 데이터 보안 가이드 확인, 또는 엔지니어링 팀에 직접 문의하세요.',
  },
  channelsSection: {
    heading: '지원 채널',
    channels: [
      {
        icon: 'mail',
        title: '직접 이메일 지원',
        description: '아키텍처 질문, 버그 보고, 협업 문의에 대해 창립자 및 엔지니어링 팀으로 직접 연결되는 창구입니다.',
        responseTime: '영업일 기준 1~2일 이내',
        action: 'admin@ladestack.in',
        href: 'mailto:admin@ladestack.in',
      },
      {
        icon: 'book-open',
        title: '기술 문서',
        description: 'GB Coder 아키텍처, 클라이언트 사이드 WebAssembly 도구, 로컬 실행 환경 요구사항을 설명하는 안내서입니다.',
        responseTime: '즉시 이용 가능',
        action: '문서 둘러보기',
        href: '/docs',
      },
      {
        icon: 'message-square',
        title: 'GitHub 커뮤니티',
        description: '공식 GitHub 저장소에서 오픈 소스 이슈 등록, 기능 제안 및 커뮤니티 토론에 참여하세요.',
        responseTime: '공개 이슈',
        action: 'GitHub 저장소 방문',
        href: 'https://github.com/girishlade111',
      },
    ],
  },
  faqSection: {
    badge: '도움말 및 FAQ',
    title: '자주 묻는 질문',
    description: '도구 라이선스, 문서 처리 방식, 브라우저 호환성 및 기술 지원에 관한 명확한 안내입니다.',
    faqs: [
      {
        question: 'LadeStack 도구는 상업적 프로젝트에서 무료로 사용할 수 있나요?',
        answer: '네. GB Coder에서 생성한 코드와 LS PDF Toolkit, LS Image Compressor로 처리한 결과물은 별도의 로열티 없이 개인 및 상업적 고객 프로젝트에 자유롭게 사용할 수 있습니다.',
      },
      {
        question: '문서 및 코드를 처리할 때 데이터는 어떻게 다루어지나요?',
        answer: 'LS PDF Toolkit 및 LS Image Compressor와 같은 클라이언트 사이드 유틸리티는 WebAssembly와 Canvas API를 사용하여 브라우저 로컬 메모리에서 직접 처리됩니다. 파일은 LadeStack 서버로 업로드되지 않습니다. GB Coder의 프로젝트 파일은 선택적 타사 AI API를 명시적으로 설정하지 않는 한 브라우저 IndexedDB에 로컬로 보관됩니다.',
      },
      {
        question: 'LadeStack 도구와 호환되는 브라우저는 무엇인가요?',
        answer: 'LS PDF Toolkit, LS Image Compressor, GB Coder Static Editor는 최신 에버그린 브라우저(Chrome, Firefox, Safari, Edge)에서 완벽히 실행됩니다. GB Coder Advanced IDE의 WebContainer 환경은 Chromium 기반 브라우저(Chrome, Edge, Brave 등)에서 가장 완전하게 지원됩니다. Firefox는 부분 지원되며, Safari에는 WebContainer 샌드박스 관련 알려진 제약이 있습니다.',
      },
      {
        question: '버그를 제보하거나 새로운 기능을 제안하려면 어떻게 하나요?',
        answer: 'github.com/girishlade111 저장소에서 이슈를 생성하거나 재현 단계를 작성하여 admin@ladestack.in으로 이메일을 보내주시면 검토 후 답변드립니다.',
      },
      {
        question: '클라이언트 사이드 도구를 오프라인에서도 사용할 수 있나요?',
        answer: '브라우저 캐시에 한 번 로드된 후, LS PDF Toolkit 및 LS Image Compressor와 같은 정적 도구는 로컬 CPU에서 처리되므로 지속적인 네트워크 연결 없이도 작동할 수 있습니다.',
      },
    ],
    ctaText: '지원팀에 직접 문의하기',
  },
};
