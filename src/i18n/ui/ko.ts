/**
 * Korean (ko) — UI Strings
 * Natural technical Korean for developer workflows.
 * Preserves brand names: LadeStack, GB Coder, Astro.
 */
import type { UIStrings } from './en';

export const ko: UIStrings = {
  // Navigation
  'nav.platform': '플랫폼',
  'nav.apps': '앱',
  'nav.codeStudio': '코드 스튜디오',
  'nav.docs': '문서',
  'nav.blog': '블로그',
  'nav.about': '소개',
  'nav.support': '지원',
  'nav.contact': '문의하기',
  'nav.quickJump': '빠른 이동',
  'nav.themeToggle': '테마 전환',
  'nav.languageSelect': '언어 선택',
  'nav.openMenu': '메뉴 열기',
  'nav.closeMenu': '메뉴 닫기',
  'nav.faq': 'FAQ',

  // Footer
  'footer.tagline': '속도와 데이터 프라이버시를 위해 설계된 브라우저 기반 고성능 개발자 도구.',
  'footer.status': '브라우저 내 · 로컬 실행',
  'footer.tools': '도구',
  'footer.resources': '리소스',
  'footer.company': '회사',
  'footer.legal': '약관 및 정책',
  'footer.rights': 'All rights reserved.',
  'footer.emailPrompt': '엔지니어링 팀 직접 문의:',
  'footer.copyEmail': '이메일 주소 복사',
  'footer.copiedEmail': '클립보드에 복사되었습니다!',
  'footer.privacy': '개인정보 처리방침',
  'footer.terms': '이용약관',

  // Hero Section
  'hero.badge': '브라우저 내 실행 · 100% 클라이언트 사이드 프라이버시',
  'hero.titleLine1': '브라우저에서 직접',
  'hero.titleLine2': '제작하고, 편집하고, 최적화하세요.',
  'hero.description':
    '클라이언트 사이드에서 즉시 실행되는 고성능 개발자 유틸리티. 서버 업로드 없음, 유료 구독 없음, 모든 도구를 즉시 이용 가능합니다.',
  'hero.ctaPrimary': '17개 이상의 도구 탐색',
  'hero.ctaSecondary': 'Studio IDE 실행',
  'hero.ctaSecondaryAria': '새 탭에서 GB Coder IDE 실행',
  'hero.editorFileName': 'CodeStudio.tsx',
  'hero.editorTabName': 'PreviewSandbox.html',
  'hero.editorStatus': '브라우저 내 실행',
  'hero.editorPrivacy': '프라이버시: 로컬호스트',
  'hero.editorNotification': '구문 검증 및 샌드박스 미리보기: 로컬 브라우저 스레드',
  'hero.editorNotificationBadge': '배포 준비 완료',
  'hero.specTitle': '아키텍처 사양',
  'hero.specRuntime': '로컬 런타임',
  'hero.specExecutionModel': '실행 모델',
  'hero.specExecutionValue': '클라이언트 사이드 브라우저 런타임',
  'hero.specExecutionBadge': '로컬',
  'hero.specPrivacy': '데이터 보호',
  'hero.specPrivacyValue': '서버 저장 없음 · 클라이언트 전용 실행',
  'hero.specPrivacyBadge': '엄격',
  'hero.specDistribution': '배포 방식',
  'hero.specDistributionValue': '정적 사전 렌더링 아키텍처',
  'hero.specDistributionBadge': '정적',
  'hero.browserCompatibility': '모든 최신 모던 브라우저 지원',
  'hero.viewAppsLink': '검증된 모든 도구 보기 →',

  // Features Bento
  'features.eyebrow': '도구 생태계',
  'features.title': '속도, 프라이버시, 데이터 주권을 위한 설계',
  'features.subtitle':
    '모든 도구는 사용자의 브라우저 런타임 내에서 엄격하게 실행됩니다. 회원가입 절차 없음, 클라우드 원격 측정 없음, 지연 시간 제로.',
  'features.card1Title': 'GB Coder',
  'features.card1Desc':
    '실시간 컴파일, iframe 라이브 프리뷰, 웹 접근성 마크업 자동 정렬을 지원하는 인터랙티브 HTML/CSS/JS 에디터.',
  'features.card1Badge': '플래그십 IDE',
  'features.card2Title': 'LS PDF 툴킷',
  'features.card2Desc':
    '로컬 메모리에서 PDF 병합, 분할, 압축, 암호화, 회전, 변환을 수행하는 17가지 클라이언트 사이드 도구.',
  'features.card2Badge': '17-in-1 모음',
  'features.card3Title': 'LS 이미지 최적화 도구',
  'features.card3Desc':
    'WebP, AVIF, PNG, JPEG 등 9개 이상의 포맷을 지원하여 즉각적인 용량 절감을 제공하는 클라이언트 사이드 압축.',
  'features.card3Badge': '업로드 없음',
  'features.card4Title': '개발자 커리어 유틸리티',
  'features.card4Desc':
    '실제 엔지니어링 워크플로우에 최적화된 ATS 호환 이력서 작성기 및 정밀 계산 유틸리티.',
  'features.card4Badge': '생산성',

  // How It Works
  'howItWorks.eyebrow': '간결한 워크플로우',
  'howItWorks.title': 'GB Coder 동작 방식',
  'howItWorks.subtitle': '플랫폼의 모든 유틸리티는 3가지 명확한 원칙을 따릅니다.',
  'howItWorks.step1Num': '01',
  'howItWorks.step1Title': '즉시 브라우저 접속',
  'howItWorks.step1Desc': '도구를 열고 바로 작업을 시작하세요. 로그인, API 키, 신용카드 등록이 전혀 필요 없습니다.',
  'howItWorks.step2Num': '02',
  'howItWorks.step2Title': '로컬 클라이언트 실행',
  'howItWorks.step2Desc': '모든 파일, 코드 스니펫, 데이터는 사용자의 기기 메모리 내에서만 안전하게 처리됩니다.',
  'howItWorks.step3Num': '03',
  'howItWorks.step3Title': '즉시 다운로드 & 데이터 주권',
  'howItWorks.step3Desc': '처리된 결과물을 즉시 로컬로 저장하세요. 외부 서버로 데이터가 전송되지 않습니다.',

  // Use Cases
  'useCases.eyebrow': '대상 사용자',
  'useCases.title': '현대적인 엔지니어링 워크플로우를 위해',
  'useCases.subtitle': '인디 개발자부터 데이터 보안을 최우선으로 생각하는 엔터프라이즈 엔지니어까지.',
  'useCases.case1Title': '프론트엔드 개발자',
  'useCases.case1Desc': 'UI 레이아웃 프로토타이핑, HTML/CSS/JS 검사, 최신 웹 패턴을 즉각적인 피드백으로 검증.',
  'useCases.case2Title': '기술 개발 팀',
  'useCases.case2Desc': '사내 보안 규정을 위반하지 않고 독점 PDF 문서 및 설계 다이어그램을 안전하게 압축 및 정리.',
  'useCases.case3Title': '프라이버시를 중시하는 빌더',
  'useCases.case3Desc': '데이터가 작업 기기를 벗어나지 않는다는 완전한 확신 속에서 민감한 정보를 로컬에서 안전하게 처리.',

  // Product Showcase
  'showcase.eyebrow': '검증된 카탈로그',
  'showcase.title': '운영 중인 프로덕션 도구 살펴보기',
  'showcase.subtitle': '높은 신뢰성을 자랑하는 완전 무료 클라이언트 사이드 애플리케이션.',
  'showcase.launchApp': '앱 열기',
  'showcase.learnMore': '자세히 보기',
  'showcase.inBrowser': '브라우저 내 실행',
  'showcase.viewAllCatalog': '전체 애플리케이션 보기 →',

  // FAQ
  'faq.eyebrow': '자주 묻는 질문',
  'faq.title': '자주 묻는 질문 (FAQ)',
  'faq.subtitle': 'LadeStack의 도구, 프라이버시 정책, 아키텍처에 관한 주요 안내.',
  'faq.q1': 'LadeStack 유틸리티는 완전히 무료인가요?',
  'faq.a1':
    '네. GB Coder, LS PDF 툴킷, LS 이미지 최적화 도구를 포함한 모든 개발자 도구는 개인 및 상업적 프로젝트 모두 영구히 무료입니다.',
  'faq.q2': '사용자 데이터와 파일 보안은 어떻게 보장되나요?',
  'faq.a2':
    '모든 문서와 코드 처리는 브라우저 내부의 로컬 샌드박스 메모리 내에서만 이루어집니다. 파일이 원격 서버로 업로드되지 않습니다.',
  'faq.q3': '지원되는 웹 브라우저는 무엇인가요?',
  'faq.a3':
    'Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, Brave 등 표준 HTML5 및 Canvas API를 지원하는 모든 최신 브라우저를 지원합니다.',
  'faq.q4': 'LadeStack을 개발하고 운영하는 주체는 누구인가요?',
  'faq.a4':
    'LadeStack은 설립자 Girish Lade가 직접 설계 및 개발하며, 전 세계 개발자를 위한 프라이버시 중심의 도구 생태계를 구축하고 있습니다.',
  'faq.q5': 'LadeStack으로 무엇을 할 수 있나요?',
  'faq.a5':
    'LadeStack은 개발자 도구, 코딩 유틸리티, 문서 처리 도구, 이미지 유틸리티 및 생산성 애플리케이션을 하나로 모았습니다. 앱 목록 페이지에서 다양한 도구를 탐색하고 작업 흐름에 맞는 도구를 선택해 보세요.',
  'faq.q6': 'LadeStack 도구를 사용하려면 계정을 생성해야 하나요?',
  'faq.a6':
    '많은 LadeStack 도구를 계정 생성 없이 바로 사용할 수 있습니다. 개별 애플리케이션에 따라 요구 사항이 다를 수 있으므로 자세한 내용은 해당 도구 페이지에서 확인해 주시기 바랍니다.',
  'faq.q7': '시작하려면 별도의 소프트웨어를 설치해야 하나요?',
  'faq.a7':
    'LadeStack은 지원되는 웹 브라우저에서 직접 실행할 수 있는 도구를 제공합니다. 앱 목록 페이지에서 원하는 도구를 선택하면 별도의 데스크톱 애플리케이션을 설치하지 않고도 브라우저에서 바로 시작할 수 있습니다.',
  'faq.q8': '스마트폰이나 태블릿에서도 LadeStack을 이용할 수 있나요?',
  'faq.a8':
    'LadeStack 웹사이트는 데스크톱, 태블릿, 모바일 기기에 맞게 반응형으로 설계되었습니다. 다만 일부 고급 개발 도구는 큰 화면에서 사용하기에 더 적합하거나 모바일 브라우저 환경에 따른 제약이 있을 수 있습니다.',
  'faq.q9': 'GB Coder는 어떻게 시작하나요?',
  'faq.a9':
    '내비게이션 메뉴나 앱 디렉터리에서 GB Coder 페이지를 열고 실행 링크를 클릭하여 에디터에 접속할 수 있습니다. GB Coder는 브라우저 환경에서 코드를 작성하고 작업할 수 있는 개발 환경을 제공합니다.',
  'faq.q10': 'LadeStack 웹사이트는 어떤 언어를 지원하나요?',
  'faq.a10':
    'LadeStack 웹사이트는 영어, 일본어, 한국어, 중국어, 러시아어, 튀르키예어, 프랑스어, 포르투갈어, 스페인어를 지원합니다. 상단 내비게이션이나 하단 푸터의 언어 선택기를 통해 언어를 변경할 수 있습니다. 일부 개별 게시글이나 도구는 지원 언어가 다를 수 있습니다.',
  'faq.q11': '다크 모드와 라이트 모드를 지원하나요?',
  'faq.a11':
    '네. LadeStack은 선호하는 시각 테마를 선택할 수 있도록 다크 모드와 라이트 모드를 지원합니다. 웹사이트 상단의 테마 토글 버튼으로 간편하게 전환할 수 있으며, 동일한 브라우저 내에서는 페이지를 이동해도 테마 설정이 유지됩니다.',
  'faq.q12': 'LadeStack 도구에서 생성된 결과를 복사하거나 다운로드할 수 있나요?',
  'faq.a12':
    '복사 및 다운로드 옵션은 사용 중인 도구에 따라 다릅니다. 지원되는 도구에서는 복사, 내보내기, 다운로드 컨트롤을 사용하여 결과물을 저장할 수 있습니다. 각 도구 화면의 출력 옵션을 확인해 보세요.',
  'faq.q13': '새로운 도구 출시 및 업데이트 소식은 어디서 확인하나요?',
  'faq.a13':
    '앱 페이지에서 현재 제공되는 LadeStack 도구 목록을 둘러보실 수 있습니다. 또한 웹사이트 블로그를 통해 제품 출시 소식, 기술 아티클 및 업데이트 내용을 확인하실 수 있습니다. 새로운 도구와 기능은 지속적으로 추가될 예정입니다.',
  'faq.q14': '버그를 제보하거나 새로운 기능을 제안하려면 어떻게 해야 하나요?',
  'faq.a14':
    'LadeStack 문의(Contact) 페이지를 통해 피드백, 문제 신고 또는 개선 사항을 전달하실 수 있습니다. 버그를 제보하실 때는 문제 해결을 돕기 위해 해당 도구명, 사용 중인 브라우저, 재현 단계를 함께 작성해 주시면 더욱 빠른 조사가 가능합니다.',

  // CTA Banner
  'cta.title': '작업 속도를 한 단계 높일 준비가 되셨나요?',
  'cta.subtitle': '지금 바로 LadeStack의 브라우저 기반 개발 도구를 무료로 사용해보세요. 계정 생성이 필요 없습니다.',
  'cta.button': '모든 도구 살펴보기',

  // SEO Metadata
  'seo.homeTitle': 'LadeStack – 브라우저 기반 개발자 플랫폼 & 생산성 유틸리티',
  'seo.homeDescription':
    '고성능 브라우저 기반 개발 도구: 코드 에디터, 프라이빗 17-in-1 PDF 툴킷, 이미지 압축, 커리어 유틸리티. 클라이언트 실행, 평생 무료.',
  'seo.ogTitle': 'LadeStack – 개발자 도구 및 클라이언트 사이드 유틸리티',
  'seo.ogDescription':
    '브라우저 내 코드 스튜디오, 프라이빗 PDF 스위트, 이미지 최적화 도구. 100% 클라이언트 프라이버시, 평생 무료.',
};
