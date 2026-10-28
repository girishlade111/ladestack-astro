import type { GbCoderPageData } from './types';

export const ko: GbCoderPageData = {
  seo: {
    title: 'GB Coder — 브라우저 기반 IDE 및 개발 스튜디오 | LadeStack',
    description: 'GB Coder로 웹 코드를 즉시 작성, 실행 및 미리보기하세요. Monaco Editor, 실시간 DOM 미리보기, WebContainer Node.js 런타임, 로컬 우선 프라이버시. 완전 무료.',
    ogTitle: 'GB Coder — 브라우저 기반 IDE 및 개발 스튜디오 | LadeStack',
    ogDescription: 'GB Coder로 웹 코드를 즉시 작성, 실행 및 미리보기하세요. Monaco Editor, 실시간 DOM 미리보기, WebContainer Node.js 런타임, 로컬 우선 프라이버시. 완전 무료.',
  },
  hero: {
    badge: '브라우저 중심 웹 개발 스튜디오',
    titleLine: '브라우저에서 즉시 코드를',
    titleHighlight: '작성, 실행 및 배포하세요.',
    description: 'GB Coder는 Monaco Editor와 듀얼 실행 엔진을 결합했습니다: 모든 모던 브라우저에서 즉시 구동되는 정적 웹 프로토타이핑과 WebContainer 기반의 인메모리 풀스택 Node.js 환경을 제공합니다.',
    ctaStudio: 'GB Coder Studio 실행',
    ctaProjects: 'WebContainer IDE 실행',
    trustBadges: [
      '클라이언트 사이드 프라이버시',
      '밀리초 단위 빠른 컴파일',
      '평생 무료 · 결제 장벽 제로',
    ],
  },
  environments: {
    eyebrow: '듀얼 실행 아키텍처',
    title: '목적에 특화된 두 가지 코딩 엔진',
    description: '워크플로에 가장 적합한 런타임을 선택하세요: 초고속 정적 웹 프로토타이핑 또는 브라우저 내 풀스택 Node.js 개발 환경.',
    staticCard: {
      badge: '범용 브라우저 지원',
      engine: '즉각적인 클라이언트 샌드박스',
      title: '정적 & 멀티 파일 프로토타이핑',
      description: 'HTML5, CSS3, JavaScript를 설정 없이 즉시 코딩. 실시간 DOM 동기화, 구문 강조, 저장 시 서식 지정, CDN 스크립트 주입을 갖춘 Monaco 에디터.',
      features: [
        '입력과 동시에 밀리초 단위로 DOM 동기화',
        '외부 CDN 라이브러리 주입 (Tailwind, Lucide, Bootstrap 등)',
        '최신 데스크톱 및 모바일 브라우저 전반 지원',
      ],
      status: '빌드 지연 시간 제로',
      cta: '프로토타이핑 시작',
    },
    webContainerCard: {
      badge: '풀스택 마이크로 OS',
      engine: '브라우저 내 Node.js',
      title: '고급 WebContainer IDE',
      description: '브라우저 메모리에서 직접 구동되는 풀스택 Node.js 환경. npm install 실행, 패키지 스크립트 처리, Vite 개발 서버 구동, React 및 Vue 스타터 지원.',
      features: [
        'Node.js 런타임 실행 및 npm 패키지 설치',
        '핫 모듈 리로딩을 지원하는 React & Vue 템플릿',
        'SharedArrayBuffer 및 Web Worker 기반 격리 샌드박스',
      ],
      status: 'Chromium 및 Firefox 지원',
      cta: 'WebContainer IDE 실행',
    },
  },
  pillars: {
    eyebrow: '핵심 기능',
    title: '정밀함, 속도, 프라이버시를 위한 설계',
    description: 'GB Coder의 모든 기능은 브라우저 내에서 엔터프라이즈급 코딩 역량을 발휘할 수 있도록 제작되었습니다.',
    items: [
      {
        icon: 'code-2',
        title: 'Monaco Code Editor',
        badge: 'VS Code 엔진',
        description: 'VS Code에 사용되는 업계 표준 코드 에디터. TypeScript 구문 검증, 자동 완성, 다중 커서 편집, 괄호 매칭, 코드 접기를 완벽 지원합니다.',
      },
      {
        icon: 'eye',
        title: '즉각적인 실시간 미리보기',
        badge: '동기화된 DOM',
        description: '입력하는 즉시 HTML, CSS, 모던 JavaScript를 렌더링합니다. 별도 팝아웃 미리보기 창과 로컬 네트워크 기기 테스트용 모바일 QR 코드가 포함됩니다.',
      },
      {
        icon: 'cpu',
        title: 'WebContainer 마이크로 OS',
        badge: '인메모리 Node.js',
        description: '실제 Node.js 프로세스를 구동하고, npm 스크립트를 실행하며, Vite 서버를 부팅하여 React 및 Vue 프로젝트를 브라우저 메모리 안에서 완전히 개발합니다.',
      },
      {
        icon: 'shield-check',
        title: '로컬 우선 데이터 영속성',
        badge: '클라이언트 프라이버시',
        description: '작업 공간은 사용자 기기의 IndexedDB에 안전하게 저장됩니다. 회원가입 강제나 백그라운드 원격 텔레메트리 전송이 일절 없습니다.',
      },
      {
        icon: 'layers',
        title: '멀티 파일 아키텍처',
        badge: '모듈형 구조',
        description: '직관적인 파일 탐색기와 탭 관리를 통해 여러 파일과 디렉터리에 걸친 복잡한 웹 컴포넌트를 깔끔하게 구성할 수 있습니다.',
      },
      {
        icon: 'download',
        title: '안전한 프로젝트 백업',
        badge: 'ZIP 아카이브',
        description: '언제든지 전체 디렉터리 구조를 보존한 채 표준 ZIP 아카이브로 내보낼 수 있습니다. 클릭 한 번으로 과거 프로젝트를 즉시 복원하세요.',
      },
    ],
  },
  guardrails: {
    eyebrow: '기술 가드레일 및 지원 범위',
    title: 'WebContainer 런타임 및 브라우저 호환성',
    desc1: 'GB Coder는 SharedArrayBuffer 및 크로스 오리진 격리(COOP/COEP)를 지원하는 모던 브라우저에서 WebContainer를 통해 정품 Node.js 프로세스를 실행합니다.',
    desc2: '간단한 프로토타이핑을 원하거나 격리 헤더가 제한적인 환경(Apple Safari 포함)에서는 외부 의존성이 전혀 없는 정적 에디터가 즉각적인 대체재 역할을 수행합니다.',
    supportedHeading: '지원 환경',
    environments: [
      { browser: 'Google Chrome', support: 'WebContainer + 정적 에디터', highlight: true },
      { browser: 'Microsoft Edge', support: 'WebContainer + 정적 에디터', highlight: true },
      { browser: 'Brave Browser', support: 'WebContainer + 정적 에디터', highlight: true },
      { browser: 'Mozilla Firefox', support: 'WebContainer (COOP/COEP)', highlight: true },
      { browser: 'Apple Safari', support: '정적 에디터 모드', highlight: false },
    ],
  },
  faqs: {
    eyebrow: '기술 Q&A',
    title: '자주 묻는 질문',
    description: 'GB Coder의 기능, 아키텍처 및 런타임 경계에 대한 투명하고 솔직한 안내입니다.',
    items: [
      {
        q: 'GB Coder는 원격 서버 없이 어떻게 풀스택 코드를 실행하나요?',
        a: 'GB Coder는 SharedArrayBuffer와 크로스 오리진 격리(COOP/COEP)를 사용하는 WebContainer 기술을 통해 브라우저 탭 내에서 실제 Node.js 프로세스와 WebAssembly 환경을 실행합니다. 개발 서버와 빌드 단계가 전적으로 사용자 PC 하드웨어에서 직접 구동됩니다.',
      },
      {
        q: '정적 에디터와 WebContainer IDE의 차이점은 무엇인가요?',
        a: '정적 멀티 파일 에디터는 모든 모던 브라우저에서 HTML, CSS, 바닐라 JS를 지연 시간 없이 즉시 DOM 렌더링합니다. 고급 WebContainer IDE는 Node.js 패키지 관리자, npm 스크립트, React 및 Vue 같은 프론트엔드 프레임워크를 실행합니다.',
      },
      {
        q: '작성한 소스 코드나 프로젝트가 LadeStack 서버로 업로드되나요?',
        a: '아닙니다. GB Coder는 엄격한 로컬 우선 모델로 운영됩니다. 코드, 에셋 및 워크스페이스 상태는 브라우저 내부의 IndexedDB에만 저장됩니다. LadeStack은 사용자의 프로젝트 코드를 원격 서버에 저장하거나 추적하지 않습니다.',
      },
      {
        q: '어떤 브라우저에서 GB Coder를 지원하나요?',
        a: '정적 멀티 파일 에디터는 Apple Safari, Google Chrome, Microsoft Edge, Mozilla Firefox를 포함한 모든 최신 브라우저에서 작동합니다. 고급 WebContainer IDE는 Chromium 기반 브라우저(Chrome, Edge, Brave)와 COOP/COEP가 활성화된 최신 Firefox에서 지원됩니다. 현재 WebKit 제약으로 인해 Safari 환경에서는 정적 에디터를 완벽히 활용하실 수 있습니다.',
      },
      {
        q: 'GB Coder는 완전 무료인가요?',
        a: '네, 완전 무료입니다. 유료 구독 등급, 신용카드 등록, 일일 컴파일 제한이 없습니다. LadeStack 오픈 개발자 생태계의 일환으로 Girish Lade가 직접 개발 및 유지 관리하고 있습니다.',
      },
      {
        q: "GB Coder에서 새 프로젝트를 어떻게 생성하나요?",
        a: "GB Coder를 열고 원하는 작업 환경을 선택하세요. HTML, CSS, JavaScript를 사용한 빠른 클라이언트 측 프로토타이핑을 원하시면 Static Editor를 실행하세요. npm 패키지와 프론트엔드 프레임워크를 활용하는 풀스택 Node.js 프로젝트의 경우, WebContainer IDE에서 워크스페이스를 시작하고 스타터 템플릿을 선택하거나 새 파일을 생성할 수 있습니다.",
      },
      {
        q: "GB Coder에서는 어떤 프로그래밍 언어를 작성하고 편집할 수 있나요?",
        a: "GB Coder는 Microsoft의 Monaco Editor 엔진을 탑재하여 JavaScript, TypeScript, HTML, CSS, JSON, Markdown을 포함한 다양한 언어에 대해 구문 강조, 자동 완성, 괄호 매칭, 코드 접기 기능을 제공합니다. 다양한 언어 편집을 지원하지만 브라우저 내 직접 실행은 웹 기술 및 Node.js 런타임에 집중되어 있습니다.",
      },
      {
        q: "코드를 작성하는 동안 웹사이트를 실시간으로 미리 볼 수 있나요?",
        a: "네, 가능합니다. GB Coder는 실시간 라이브 미리보기를 제공합니다. Static Editor에서는 코드를 입력하는 즉시 격리된 iframe 샌드박스 내부의 DOM 변경 사항이 1밀리초 미만의 지연 시간으로 동기화됩니다. WebContainer IDE에서는 로컬 개발 서버와 핫 모듈 리로딩(HMR)을 통해 미리보기가 제공되며, 독립 팝업 창 및 로컬 네트워크 QR 코드 테스트도 지원합니다.",
      },
      {
        q: "GB Coder 내에서 npm 패키지를 설치하고 터미널 명령어를 실행할 수 있나요?",
        a: "네, WebContainer IDE 환경에서 가능합니다. WebContainer 엔진은 브라우저 메모리 내에서 실제 Node.js 프로세스를 직접 실행하므로 원격 서버나 데스크톱 런타임 없이도 터미널 명령어 입력, 호환 패키지에 대한 npm install, 빌드 스크립트 실행이 가능합니다.",
      },
      {
        q: "GB Coder에서 최신 JavaScript 프레임워크를 사용한 프로젝트를 개발할 수 있나요?",
        a: "네, 가능합니다. WebContainer IDE는 React 및 Vue와 같은 최신 프론트엔드 프레임워크를 사전 구성된 스타터 템플릿과 Vite 개발 서버를 통해 지원합니다. 정적 프레임워크 빌드나 CDN 기반 컴포넌트는 Static Editor에서도 즉시 프로토타이핑할 수 있습니다.",
      },
      {
        q: "코딩할 때 GB Assist AI 어시스턴트는 어떤 도움을 줄 수 있나요?",
        a: "GB Assist는 지능형 코딩 도우미로서 복잡한 코드 설명, 아키텍처 개선 제안, 기능적 보일러플레이트 코드 생성, 런타임 버그 조사를 지원합니다. 제안된 코드는 인라인으로 표시되므로 프로젝트에 적용하기 전에 변경 사항을 직접 검토하고 승인할 수 있습니다.",
      },
      {
        q: "GB Coder의 AI 기능을 사용하려면 자체 API 키가 필요한가요?",
        a: "네. GB Coder는 AI 기능에 대해 Bring-Your-Own-Key(BYOK) 방식을 적용합니다. OpenAI, Anthropic, Google Gemini 등 지원되는 공급자에서 발급받은 개인 API 키를 직접 설정합니다. 모든 요청은 브라우저에서 공급자로 HTTPS를 통해 직접 전송되며, LadeStack은 사용자의 API 키나 코드 프롬프트를 중계, 검사 또는 저장하지 않습니다.",
      },
      {
        q: "GB Coder에서 프로젝트와 코드 변경 사항은 어떻게 저장되나요?",
        a: "GB Coder는 프로젝트 파일, 디렉터리 구조, 워크스페이스 상태를 IndexedDB를 사용하여 사용자 브라우저 내에 로컬로 저장합니다. 소스 코드는 LadeStack 서버로 전송되거나 보관되지 않습니다. 브라우저 로컬 저장소에 저장되므로 인터넷 사용 기록 삭제, 시크릿 모드 사용, 사이트 데이터 초기화 시 데이터가 삭제될 수 있습니다. 중요한 작업물은 항상 ZIP 파일로 정기 백업해 두세요.",
      },
      {
        q: "GB Coder 프로젝트 파일을 다운로드하거나 내보낼 수 있나요?",
        a: "네. 작업 중인 워크스페이스 전체를 표준 ZIP 압축 파일 형태로 언제든지 내보낼 수 있습니다. 다운로드된 아카이브는 완전한 폴더 구조, 소스 코드, 설정 파일을 그대로 보존하므로 데스크톱의 VS Code에서 작업을 이어가거나 호스팅 서비스 및 Git 저장소에 바로 배포할 수 있습니다.",
      },
      {
        q: "편집기, 터미널 또는 라이브 미리보기가 작동하지 않을 때는 어떻게 해야 하나요?",
        a: "먼저 사용하는 브라우저가 선택한 개발 환경을 지원하는지 확인하세요. WebContainer IDE는 SharedArrayBuffer 및 크로스 오리진 격리가 활성화된 Chromium 기반 브라우저(Chrome, Edge, Brave) 또는 Firefox가 필요합니다. Safari와 같이 미지원 환경인 경우 Static Editor로 전환하세요. 문제가 지속되면 작업 파일을 백업 내보내기한 후 페이지를 새로고침하세요. 해결되지 않을 경우 LadeStack Contact 페이지로 문의해 주세요.",
      },
    ],
  },
  cta: {
    title: '브라우저에서 코드를 작성하고 실행할 준비가 되셨나요?',
    description: '설치 없이 지금 바로 GB Coder를 실행하세요. Monaco Editor와 브라우저 내 Node.js 워크플로를 경험해 보세요.',
    launchStudioBtn: 'GB Coder Studio 실행',
    exploreAllBtn: '모든 유틸리티 둘러보기',
    footerTagline: 'GB Coder by LadeStack · 브라우저 중심 아키텍처 · 완전 무료',
  },
};
