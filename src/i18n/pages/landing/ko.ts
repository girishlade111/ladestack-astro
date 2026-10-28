import type { LandingPageData } from './types';

export const ko: LandingPageData = {
  missionVision: {
    eyebrow: 'LADESTACK 소개',
    title: '차세대를 여는',
    titleHighlight: 'AI 소프트웨어 개발',
    subtitle:
      '모든 개발자에게 스타트업의 속도로 엔터프라이즈급 도구를 제공하는 AI 기반 SaaS 생태계 — 완전 무료, 오픈형, 높은 신뢰성.',
    stats: [
      { value: '8K+', label: '엔지니어' },
      { value: '80+', label: '구축 프로젝트' },
      { value: '100+', label: '지원 국가' },
      { value: '99%', label: '가동률' },
    ],
    mission: {
      eyebrow: '우리의 사명',
      tagline: '우리가 존재하는 이유',
      headline: 'AI 개발 도구의 대중화',
      body: '예산이나 팀 규모에 구애받지 않고 모든 개발자에게 개발 시간을 획기적으로 줄여주는 엔터프라이즈급 AI 솔루션을 제공하여 개발 격차를 해소합니다.',
      context:
        '개인 개발자와 빅테크 팀 간의 차이가 도구의 부재에서 비롯되어서는 안 됩니다. 도구가 공평한 기반을 제공할 때 창의성과 실행력만이 진정한 가치가 됩니다.',
      timelineTitle: '플랫폼 발전 과정',
      timeline: [
        {
          year: '2024',
          label: '설립',
          desc: 'AI 개발 도구 대중화를 목표로 LadeStack 출범.',
          detail: '초기 AI 코드 에디터 프로토타입으로 시작하여 500명의 얼리어답터와 함께 제품 방향을 검증.',
        },
        {
          year: '2025',
          label: '플랫폼 출시',
          desc: '전 세계 10,000명 이상의 개발자에게 AI 코드 에디터 보급.',
          detail: '실시간 코드 컴파일, 지능형 추천, 다국어 지원을 갖춘 정식 에디터 출시.',
        },
        {
          year: '2026',
          label: '통합 생태계',
          desc: '5개 AI 제품군을 통합한 단일 개발 스위트 구축.',
          detail: 'API 테스팅, 웹 빌더, 파일 공유, Doc AI가 플랫폼에 합류하여 완벽한 스위트 완성.',
        },
      ],
    },
    vision: {
      eyebrow: '우리의 비전',
      tagline: '우리가 나아가는 방향',
      headline: '복잡성을 흡수하는 AI',
      body: '누구나 엔터프라이즈 품질의 소프트웨어를 배포할 수 있는 세상 — AI가 기술적 난제를 대신 처리하여 엔지니어는 창의성과 핵심 가치에 집중할 수 있습니다.',
      features: [
        { icon: 'code-2', text: 'AI 기반 코드 보조' },
        { icon: 'zap', text: '지능형 코드 최적화' },
        { icon: 'shield', text: '엔터프라이즈급 보안' },
        { icon: 'globe', text: '글로벌 개발자 협업 지원' },
        { icon: 'users', text: '커뮤니티 주도형 기능 개발' },
        { icon: 'layers', text: '통합 멀티 도구 생태계' },
      ],
    },
    approach: {
      title: '기본 원칙으로서의 개방성',
      body: '핵심 도구를 오픈소스로 공개하고 로드맵과 가격 정책을 투명하게 유지합니다. 신뢰야말로 지속 성장하는 유일한 자산입니다.',
      badges: ['12K+ 스타', '200+ 기여자', '공개 로드맵'],
    },
  },

  coreValues: {
    eyebrow: '가치와 핵심 원칙',
    title: '모든 제품 개발을 이끄는',
    titleHighlight: '4대 원칙',
    subtitle:
      '소프트웨어 아키텍처, 데이터 주권, 자유로운 접근성을 뒷받침하는 핵심 엔지니어링 원칙입니다.',
    values: [
      {
        id: '01',
        number: '01',
        title: 'AI 퍼스트 혁신',
        tagline: '모든 키 입력에 깃든 인텔리전스',
        badge: '컨텍스트 기반 AI',
        badgeIcon: 'zap',
        description:
          '개발 도구에 최첨단 AI를 유기적으로 결합하여 반복 작업을 자동화하고 코딩 의도를 미리 파악합니다.',
        bullets: [
          '문맥 맞춤형 코드 자동완성',
          '다국어 동시 합성 지원',
          '코드베이스 실시간 적응',
        ],
      },
      {
        id: '02',
        number: '02',
        title: '개발자 권한 강화',
        tagline: '제약 없는 엔터프라이즈 성능',
        badge: '100% 무료 티어',
        badgeIcon: 'shield-check',
        description:
          '1인 개발자부터 글로벌 기업 팀까지 누구나 자유롭게 활용할 수 있는 전문가급 개발 도구를 제공합니다.',
        bullets: [
          '핵심 기능 무제한 무료 제공',
          '신용카드 등록 불필요',
          '팀 협업 기능 기본 내장',
        ],
      },
      {
        id: '03',
        number: '03',
        title: '프로덕션 레벨 품질',
        tagline: '실전 워크로드 검증 완료',
        badge: '99.9% 가동률 SLA',
        badgeIcon: 'cpu',
        description:
          '실제 엔터프라이즈 워크로드에 기반한 장애 조치 이중화, 무중단 배포 및 엔드투엔드 암호화 보장.',
        bullets: [
          '99.9% 가동률 SLA 보증',
          'SOC 2 표준 준수 설계',
          '종단 간 전체 암호화 적용',
        ],
      },
      {
        id: '04',
        number: '04',
        title: '개방성과 투명성',
        tagline: '숨김없이 모든 것을 공유',
        badge: '오픈소스',
        badgeIcon: 'git-fork',
        description:
          '핵심 알고리즘을 오픈소스로 공개하고 공개 로드맵과 커뮤니티 투표를 통해 신뢰를 쌓아갑니다.',
        bullets: [
          '핵심 아키텍처 오픈소스화',
          '제품 공개 로드맵 운영',
          '커뮤니티 기능 투표 시스템',
        ],
      },
    ],
    principlesEyebrow: '운영 원칙',
    principles: [
      '오픈소스',
      'AI 네이티브',
      '개발자 우선',
      '종속 탈피',
      '평생 무료',
      '커뮤니티 주도',
      '투명한 정책',
      '기업용 준비 완료',
      'SOC 2 준수',
      '개인정보 최우선',
    ],
  },

  metricsImpact: {
    eyebrow: '성과와 영향력',
    title: '숫자가 증명하는',
    titleHighlight: '실제 성과',
    subtitle: '실제 개발 현장에서 측정된 정량적이고 검증 가능한 생산성 혁신.',
    heroStats: [
      {
        value: '10배',
        label: '개발 속도 향상',
        sub: '수동 코딩 대비',
        icon: 'zap',
      },
      {
        value: '8K+',
        label: '활성 개발자',
        sub: '전 세계 지속 증가 중',
        icon: 'users',
      },
      {
        value: '99.9%',
        label: '플랫폼 가동률',
        sub: '엔터프라이즈 SLA 기준',
        icon: 'trending-up',
      },
      {
        value: '98%',
        label: '개발자 만족도',
        sub: '사용자 평가 기준',
        icon: 'heart',
      },
    ],
    toolMetricsTitle: '워크플로 생산성 측정',
    toolMetricsSubtitle: '주요 개발 도구별 실측 가속 지표',
    toolMetrics: [
      {
        tool: 'AI 코드 에디터',
        icon: 'code-2',
        metrics: [
          { label: 'AI 생성 코드 비율', value: 73 },
          { label: '버그 발생률 감소', value: 61 },
          { label: '코드 리뷰 시간 절감', value: 55 },
        ],
      },
      {
        tool: 'API 테스터',
        icon: 'zap',
        metrics: [
          { label: '테스트 커버리지 향상', value: 88 },
          { label: '수동 작업 공수 절감', value: 79 },
          { label: '릴리스 주기 단축', value: 64 },
        ],
      },
      {
        tool: '문서 생성기',
        icon: 'trending-up',
        metrics: [
          { label: '문서 작성 시간 단축', value: 82 },
          { label: '기술 설명 정확도 개선', value: 91 },
          { label: '온보딩 소요 기간 단축', value: 68 },
        ],
      },
    ],
    benchmarksTitle: '속도 및 신뢰성 벤치마크',
    benchmarks: [
      { label: '처리 속도 가속', value: '92%', sub: '클라이언트 런타임 성능 향상' },
      { label: 'SLA 가동률', value: '99.9%', sub: '무중단 서비스 보증' },
      { label: '사용자 만족도', value: '98%', sub: '순수 추천 고객 점수' },
      { label: '글로벌 연결성', value: '85%', sub: '엣지 분산 저지연 라우팅' },
    ],
  },

  freeForever: {
    eyebrow: '평생 무료 보장 서약',
    title: '엔터프라이즈 AI 성능.',
    titleHighlight: '비용은 0원.',
    subtitle:
      '우수한 개발 도구가 결제 장벽 뒤에 갇혀 있어서는 안 됩니다. 모든 개발자에게 카드 등록 없이 프로페셔널 도구를 개방합니다.',
    commitments: [
      {
        number: '01',
        title: '핵심 AI 도구 무제한 제공',
        badge: '5+ 라이브 제품',
        badgeIcon: 'code-2',
        description:
          'AI 코드 에디터, 17가지 기능의 LS PDF, LS 이미지 압축, Swift Resume, Bharat Land 변환기를 제약 없이 사용하세요.',
        bullets: ['일일 이용 한도 없음', '모든 핵심 기능 포함', '무료 지속 업데이트'],
      },
      {
        number: '02',
        title: '결제 유도 및 체험 기간 없음',
        badge: '신용카드 불필요',
        badgeIcon: 'shield-check',
        description:
          '평생 무료란 말 그대로입니다. 14일 체험 카운트다운도, 기습 결제도, 금융 정보 입력도 요구하지 않습니다.',
        bullets: ['클릭 한 번으로 즉시 사용', '유료 전환 강제 없음', '상업적 프로젝트 활용 가능'],
      },
      {
        number: '03',
        title: '100% 브라우저 기반 데이터 프라이버시',
        badge: '로컬 브라우저 처리',
        badgeIcon: 'lock',
        description:
          'PDF 및 이미지 처리가 사용자의 브라우저 메모리 내에서 100% 클라이언트 사이드로 실행되어 파일이 외부 서버로 유출되지 않습니다.',
        bullets: ['외부 서버 파일 업로드 제로', 'SOC 2 기준 설계', '로컬 메모리 암호화'],
      },
      {
        number: '04',
        title: '커뮤니티 중심 오픈 철학',
        badge: '커뮤니티 주도',
        badgeIcon: 'heart-handshake',
        description:
          '공개 로드맵, 사용자 제안 기능 투표, 오픈소스 토대 위에서 전 세계 엔지니어들과 함께 성장합니다.',
        bullets: ['GitHub 공개 로드맵 운영', '커뮤니티 기능 개선 요청 반영', '8,000명 이상의 개발자 커뮤니티'],
      },
    ],
  },

  developerCommunity: {
    eyebrow: '개발자 커뮤니티',
    title: '개발자와 함께,',
    titleHighlight: '개발자를 위해',
    subtitle:
      '모든 도구가 사용자와의 긴밀한 대화를 통해 탄생하는 열린 생태계입니다. 함께 코드를 작성하고 배포하는 글로벌 커뮤니티에 참여하세요.',
    stats: [
      { value: '8K+', label: '참여 엔지니어', icon: 'users' },
      { value: '12K+', label: '구축 프로젝트', icon: 'layers' },
      { value: '100+', label: '소속 국가', icon: 'globe' },
      { value: '4.1 / 5', label: '평균 평점', icon: 'star' },
    ],
    channelsTitle: '커뮤니티 채널',
    channels: [
      {
        icon: 'code-2',
        label: '오픈소스',
        stat: '2.4K 스타',
        description: '포크와 기여를 통해 수천 명의 기여자와 함께 AI 도구의 미래를 직접 만들어가세요.',
        cta: 'GitHub 보기',
        url: 'https://github.com/girishlade111',
      },
      {
        icon: 'message-square',
        label: 'Discord 커뮤니티',
        stat: '8K 회원',
        description: '실시간 기술 지원, 프로젝트 쇼케이스, 글로벌 개발자들과의 활발한 네트워킹.',
        cta: 'Discord 참여하기',
        url: 'https://discord.gg/ladestack',
      },
      {
        icon: 'book-open',
        label: '기술 문서',
        stat: '200+ 가이드',
        description: '입문자부터 전문가까지 단계별로 안내하는 완벽한 가이드 및 API 레퍼런스.',
        cta: '문서 읽기',
        url: '/docs',
      },
      {
        icon: 'rocket',
        label: '스타터 템플릿',
        stat: '60+ 템플릿',
        description: '모범 사례를 기반으로 설계된 즉시 사용 가능한 프로덕션 템플릿.',
        cta: '템플릿 둘러보기',
        url: '/apps',
      },
      {
        icon: 'globe',
        label: '글로벌 이벤트',
        stat: '24개 예정',
        description: '전 세계에서 진행되는 해커톤, 웨비나, 기술 워크숍에 참여하세요.',
        cta: '이벤트 확인',
        url: '/blog',
      },
      {
        icon: 'zap',
        label: '주간 챌린지',
        stat: '매주 진행',
        description: '매주 열리는 AI 코딩 도전 과제. 뱃지를 획득하고 랭킹을 올려보세요.',
        cta: '도전하기',
        url: '/apps',
      },
    ],
  },
};
