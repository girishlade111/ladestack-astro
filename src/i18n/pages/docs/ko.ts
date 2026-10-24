import type { DocsPageData } from './types';

export const koDocs: DocsPageData = {
  seo: {
    title: '기술 문서 – 아키텍처, 가이드 및 API 레퍼런스 | LadeStack',
    description: 'LadeStack 개발자 도구를 위한 상세 문서입니다. 아키텍처 가이드, 클라이언트 사이드 WebAssembly 워크플로, 플랫폼 변경 내역을 확인하세요.',
    ogTitle: 'LadeStack 개발자 기술 문서',
    ogDescription: 'GB Coder, LS PDF 및 LS Image 도구의 기술 사양, 아키텍처 가이드 및 튜토리얼을 제공합니다.',
  },
  hero: {
    badge: '기술 문서 및 가이드',
    title: '개발자 기술 문서',
    description: 'LadeStack 개발자 플랫폼의 기술 사양, 로컬 실행 아키텍처 가이드 및 상세 레퍼런스 자료입니다.',
    searchPlaceholder: '문서, 도구, 가이드 검색…',
    searchAriaLabel: '문서, 도구, 가이드 검색',
  },
  categoriesSection: {
    title: '핵심 아키텍처 가이드',
    description: '아래 카테고리를 선택하여 상세한 아키텍처 사양과 동작 원리를 확인하세요.',
    viewGuide: '가이드 보기',
    closeGuide: '가이드 닫기',
    categories: [
      {
        id: 'getting-started',
        icon: 'book-open',
        title: '시작 가이드',
        description: '핵심 설계 원칙, 브라우저 실행 모델 및 로컬 우선 워크플로',
        overview: 'LadeStack 도구는 원격 백엔드 서버를 거치지 않고 사용자 브라우저 내에서 직접 실행됩니다.',
        sections: [
          {
            title: '브라우저 즉시 실행',
            content: '설치 없이 브라우저에서 즉시 도구를 실행할 수 있습니다. WebAssembly 바이너리와 Web Worker가 로컬 브라우저 메모리에서 직접 초기화됩니다.',
          },
          {
            title: '로컬 스토리지 및 메모리 격리',
            content: '프로젝트 파일과 문서 데이터는 브라우저 RAM 및 IndexedDB에만 유지됩니다. 파일이 LadeStack 서버로 전송되지 않으며, 선택적 AI 기능은 명시적으로 설정된 경우에만 외부 API와 통신합니다.',
          },
          {
            title: '프로덕션 번들 내보내기',
            content: '컴파일된 정적 웹 에셋, 편집된 PDF 문서, 압축된 이미지 파일을 로컬 디스크로 즉시 내보낼 수 있습니다.',
          },
        ],
      },
      {
        id: 'code-studio',
        icon: 'code-2',
        title: 'GB Coder 엔진',
        description: '정적 에디터 컴파일, WebContainer Node.js 에뮬레이션, Monaco 통합',
        overview: '경량 정적 에디터와 고급 WebContainer IDE로 구성된 GB Coder의 듀얼 엔진 아키텍처 상세 분석입니다.',
        sections: [
          {
            title: '듀얼 엔진 아키텍처',
            content: 'Static Editor는 지연 시간 없이 브라우저에서 HTML, CSS, JavaScript를 파싱합니다. Advanced WebContainer IDE는 Chromium 계열 브라우저에서 로컬 Node.js 환경을 구동하여 개발 서버와 npm 패키지를 실행합니다.',
          },
          {
            title: 'Monaco Editor 통합',
            content: '구문 강조, 자동 완성, 진단 오버레이, 키보드 단축키를 갖춘 데스크톱급 코드 편집 환경을 제공합니다.',
          },
          {
            title: '로컬 지속성 및 내보내기',
            content: '브라우저 IndexedDB 자동 저장 및 로컬 배포를 위한 프레임워크 종속성 없는 ZIP 아카이브 내보내기를 지원합니다.',
          },
        ],
      },
      {
        id: 'pdf-wasm',
        icon: 'file-text',
        title: 'LS PDF Toolkit',
        description: '메모리 격리와 WebAssembly 기반 클라이언트 사이드 PDF 처리',
        overview: 'WebAssembly가 브라우저 메모리 내에서 바이너리 PDF 스트림을 직접 파싱하고 조작하는 방식입니다.',
        sections: [
          {
            title: '스트림 병합 및 분할',
            content: '서버 업로드 없이 원본 품질을 유지하며 여러 PDF 문서를 병합하거나 특정 페이지 범위를 추출할 수 있습니다.',
          },
          {
            title: '메모리 내 최적화 압축',
            content: '스트림 사전 객체와 임베디드 폰트를 로컬에서 최적화하여 최종 문서 용량을 최소화합니다.',
          },
          {
            title: '클라이언트 사이드 보안',
            content: '파일을 디스크로 내보내기 전 브라우저 RAM 내에서 직접 PDF 문서 암호화 및 비밀번호 설정을 수행합니다.',
          },
        ],
      },
      {
        id: 'image-engine',
        icon: 'image',
        title: 'LS Image Engine',
        description: 'Canvas 및 WebAssembly 기반 다중 포맷 이미지 처리와 실시간 비교',
        overview: 'Web Worker를 활용한 클라이언트 사이드 이미지 변환, 압축 및 시각적 차이 비교 기능입니다.',
        sections: [
          {
            title: '폭넓은 포맷 지원',
            content: 'AVIF, WebP, PNG, JPEG, SVG, TIFF 등 최신 웹 표준 이미지 포맷을 완벽하게 지원합니다.',
          },
          {
            title: '품질 캘리브레이션',
            content: '실시간 전후 비교를 통해 손실 압축 임계값과 크로마 서브샘플링을 정밀하게 조절할 수 있습니다.',
          },
        ],
      },
    ],
  },
  articlesSection: {
    title: '주요 기술 아티클',
    description: '보안, 프라이버시 경계 및 웹 에셋 최적화를 다루는 실무 가이드입니다.',
    readArticle: '전체 아티클 읽기',
    closeArticle: '아티클 닫기',
    stepsTitle: '실행 단계:',
    summaryLabel: '요약:',
    articles: [
      {
        id: 'client-side-privacy',
        title: '클라이언트 사이드 프라이버시 아키텍처의 이해',
        category: '보안',
        readTime: '읽는 시간 4분',
        intro: 'LadeStack이 WebAssembly 메모리 격리와 브라우저 샌드박스를 통해 민감한 사용자 문서를 안전하게 보호하는 방법입니다.',
        steps: [
          'Web Worker를 통한 브라우저 메모리 샌드박스 할당.',
          '원격 전송 없는 로컬 WebAssembly 바이트 처리.',
          '상태 보존을 위한 격리된 IndexedDB 스토리지 활용.',
          '브라우저 탭 종료 시 즉각적인 가비지 컬렉션.',
        ],
        summary: '데이터 처리를 사용자 기기 내부에서 완결함으로써, 서버 저장 위험을 근본적으로 제거하고 빠른 처리 속도를 보장합니다.',
      },
      {
        id: 'optimizing-assets',
        title: '웹 에셋 압축 최적화 모범 사례',
        category: '성능',
        readTime: '읽는 시간 6분',
        intro: '인지적 화질 저하 없이 이미지와 문서의 페이로드 용량을 대폭 줄이는 핵심 기법입니다.',
        steps: [
          '래스터 그래픽에 차세대 AVIF 또는 WebP 포맷 적용.',
          '시각적 차이를 확인하며 손실 양자화 파라미터 조절.',
          '불필요한 EXIF 카메라 메타데이터 및 컬러 프로필 제거.',
          '모바일 뷰포트에서 Largest Contentful Paint(LCP) 개선 효과 검증.',
        ],
        summary: '정밀한 클라이언트 사이드 압축은 네트워크 대역폭 소비를 줄이고 Core Web Vitals 점수를 효과적으로 향상시킵니다.',
      },
    ],
  },
  changelogSection: {
    title: '플랫폼 릴리스 내역',
    description: '최근 플랫폼 릴리스, 아키텍처 업데이트 및 기능 확장 내역입니다.',
    items: [
      {
        version: 'v1.0.0',
        date: '2026년 10월',
        type: '주요 릴리스',
        description: 'Obsidian 및 Precision Emerald 디자인 개편, 9개 언어 다국어화 완료, 접근성 강화 및 클라이언트 사이드 성능 개선.',
      },
      {
        version: 'v0.9.4',
        date: '2026년 8월',
        type: '개선 사항',
        description: 'LS PDF 제품군에 메모리 내 최적화 압축 기능 및 클라이언트 사이드 PDF 도구 추가.',
      },
      {
        version: 'v0.9.0',
        date: '2026년 6월',
        type: '기능 출시',
        description: 'GB Coder 브라우저 네이티브 듀얼 엔진 개발 환경 최초 공개 출시.',
      },
    ],
  },
};
