import type { TermsPageData } from './types';

export const koTerms: TermsPageData = {
  seo: {
    title: '이용약관 – 플랫폼 이용 규정 및 라이선스 | LadeStack',
    description: 'LadeStack 개발자 도구 이용약관, 지식재산권 귀속, 클라이언트 사이드 실행 한계 및 법적 면책 규정을 확인하세요.',
    ogTitle: 'LadeStack 이용약관',
    ogDescription: 'LadeStack 개발자 도구의 사용 조건, 산출물의 지식재산권 소유권 및 상업적 사용 권한.',
  },
  header: {
    badge: '법률 및 약관',
    title: '이용약관',
    lastUpdated: '최종 수정일: 2026년 10월',
    effectiveDate: '즉시 시행',
  },
  disclaimer: {
    title: '정본 언어 안내',
    text: '본 이용약관의 영문 원본이 LadeStack의 이용 조건을 규정하는 유일한 공식 정본입니다. 다른 언어로 제공되는 번역본은 정보 제공 및 편의를 위해 제공되며 독립적인 법률 인증을 받지 않았습니다.',
  },
  sections: [
    {
      title: '1. 약관의 동의',
      paragraphs: [
        'LadeStack 플랫폼(ladestack.in), 관련 서브도메인 또는 제공되는 웹 기반 도구에 접속하거나 이를 이용함으로써 귀하는 본 이용약관을 준수하기로 법적으로 동의하게 됩니다. 본 약관의 내용에 동의하지 않는 경우 즉시 서비스 이용을 중단해야 합니다.',
      ],
    },
    {
      title: '2. 허용된 이용 및 산출물 소유권',
      paragraphs: [
        '귀하는 개인, 교육, 연구 및 상업적 소프트웨어 개발 목적으로 LadeStack 웹 도구를 이용할 수 있는 비독점적이고 전 세계적인 무료 라이선스를 부여받습니다.',
        'LadeStack 도구를 사용하여 생성, 편집 또는 컴파일된 모든 소스 코드, 아키텍처, 문서, 이미지 및 결과물은 전적으로 귀하의 지식재산권으로 유지됩니다. LadeStack은 귀하가 처리한 파일이나 코드에 대해 어떠한 소유권이나 로열티도 주장하지 않습니다.',
      ],
    },
    {
      title: '3. 기술적 실행 및 환경 요구사항',
      paragraphs: [
        'LadeStack 개발자 도구는 WebAssembly, Web Worker 및 최신 브라우저 API를 사용하여 주로 클라이언트 기기 내에서 실행됩니다. 처리 성능과 안정성은 귀하의 하드웨어와 브라우저 환경에 직접적으로 의존합니다.',
        'GB Coder는 최신 에버그린 브라우저와 호환되는 Static Editor와 Chromium 계열 브라우저에 최적화된 Advanced WebContainer IDE를 제공합니다. 귀하는 실행 환경이 기술적 요구사항을 충족하는지 확인할 책임이 있습니다.',
      ],
    },
    {
      title: '4. 보증의 부인',
      paragraphs: [
        'LadeStack이 제공하는 서비스와 도구는 "있는 그대로(AS IS)" 및 "이용 가능한 상태(AS AVAILABLE)"로 제공되며, 명시적이거나 묵시적인 어떠한 보증도 제공하지 않습니다.',
        '도구가 중단 없이 작동하거나 오류가 발생하지 않음을 보증하지 않으며, 브라우저 업데이트로 인한 일시적인 호환성 변화에 대해 책임을 지지 않습니다.',
      ],
    },
    {
      title: '5. 책임의 제한',
      paragraphs: [
        '관련 법률이 허용하는 최대 범위 내에서, LadeStack, 창립자 또는 기여자는 본 도구의 사용 또는 사용 불능으로 인해 발생하는 직간접적, 부수적, 파생적 손해에 대해 어떠한 책임도 부담하지 않습니다.',
      ],
    },
    {
      title: '6. 약관의 변경',
      paragraphs: [
        'LadeStack은 재량에 따라 본 약관을 개정할 권리를 보유합니다. 수정된 내용은 본 문서 상단의 "최종 수정일"에 반영되며, 약관 변경 후에도 서비스를 계속 이용하는 것은 개정된 약관에 동의한 것으로 간주됩니다.',
      ],
    },
  ],
  contactNote: {
    title: '7. 법률 관련 문의',
    text: '본 이용약관 또는 라이선스 규정에 관한 문의 사항은 아래로 연락해 주시기 바랍니다:',
    email: 'admin@ladestack.in',
  },
};
