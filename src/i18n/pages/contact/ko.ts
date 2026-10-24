import type { ContactPageData } from './types';

export const ko: ContactPageData = {
  seo: {
    title: '문의하기 – LadeStack 개발자 지원',
    description: 'LadeStack 개발자 도구에 대한 문의, 피드백, 기술 지원을 요청하세요. admin@ladestack.in을 통해 직접 지원해 드립니다.',
    ogTitle: '문의하기 – LadeStack 개발자 지원',
    ogDescription: 'LadeStack 개발자 도구에 대한 문의, 피드백, 기술 지원을 요청하세요. admin@ladestack.in을 통해 직접 지원해 드립니다.',
  },
  hero: {
    badge: '직접 소통',
    title: '문의하기',
    description: '클라이언트 사이드 도구, 기능 제안 또는 기업 맞춤형 도입에 관해 궁금한 점이 있으신가요? 언제든 편하게 메시지를 남겨주세요.',
  },
  cards: [
    { icon: 'mail', label: '공식 이메일', title: 'admin@ladestack.in', sub: '창립자 직통 수신함', href: 'mailto:admin@ladestack.in' },
    { icon: 'message-square', label: '기술 지원', title: '엔지니어링 헬프', sub: '아키텍처 & 버그 제보', href: 'mailto:admin@ladestack.in' },
    { icon: 'map-pin', label: '본사 위치', title: '인도 뭄바이', sub: '글로벌 원격 운영 체계', href: null },
    { icon: 'globe', label: '아키텍처', title: '클라이언트 전용', sub: '브라우저 로컬 실행', href: null },
  ],
  form: {
    title: '메시지 보내기',
    description: '접수된 메시지를 꼼꼼히 확인하고 신속하게 답변해 드립니다.',
    fallbackPrefix: '이메일 앱에서 직접 작성을 원하실 경우 다음 주소로 보내주세요:',
    fallbackLinkText: 'admin@ladestack.in',
    nameLabel: '성명',
    namePlaceholder: '홍길동',
    emailLabel: '이메일 주소',
    emailPlaceholder: 'hong@example.com',
    subjectLabel: '제목',
    subjectPlaceholder: 'GB Coder 또는 클라이언트 사이드 도구 관련 문의',
    messageLabel: '메시지 내용',
    messagePlaceholder: '궁금하신 점, 버그 보고, 기능 제안 등을 자세히 적어주세요...',
    submitButton: '메시지 발송',
    successMessage: '감사합니다! 메시지가 준비되었습니다. 메일 앱이 열리지 않는 경우 admin@ladestack.in으로 직접 메일을 보내주시기 바랍니다.',
  },
  faqs: {
    eyebrow: '자주 묻는 질문',
    title: '문의 및 지원 FAQ',
    description: '연락 방법, 협업 가능 여부 및 플랫폼 가용성에 대한 안내입니다.',
    items: [
      {
        q: '답변을 받기까지 얼마나 걸리나요?',
        a: '메시지를 정기적으로 확인하고 있으며, 통상 영업일 기준 1~2일 이내에 신속히 답변드립니다.',
      },
      {
        q: '버그 제보나 기능 추가를 요청할 수 있나요?',
        a: '네, 가능합니다. admin@ladestack.in으로 메일을 보내주시거나 GitHub 저장소(github.com/girishlade111)에 이슈를 남겨주세요.',
      },
      {
        q: '기업 및 엔지니어링 팀을 위한 맞춤형 지원도 제공되나요?',
        a: '네, 팀 내부 환경을 위한 자체 호스팅 구축이나 오프라인 전용 워크플로가 필요하시다면 언제든 문의해 주세요.',
      },
      {
        q: 'LadeStack은 지역 제한 없이 전 세계에서 이용 가능한가요?',
        a: '네, 최신 브라우저가 설치된 환경이라면 전 세계 어디서나 지역 차단이나 유료 결제 없이 자유롭게 이용하실 수 있습니다.',
      },
    ],
  },
};
