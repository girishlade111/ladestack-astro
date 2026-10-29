import type { PrivacyPageData } from './types';

export const koPrivacy: PrivacyPageData = {
  seo: {
    title: '개인정보 처리방침 – 데이터 보호 및 아키텍처 | LadeStack',
    description: 'LadeStack이 클라이언트 사이드 WebAssembly 실행, 로컬 IndexedDB 보관, 투명한 운영을 통해 데이터를 보호하는 방식을 안내합니다.',
    ogTitle: 'LadeStack 개인정보 처리방침',
    ogDescription: '클라이언트 사이드 데이터 처리 아키텍처, 데이터 수집 범위 및 사용자 개인정보 보호 원칙.',
  },
  header: {
    badge: '개인정보 및 데이터 보호',
    title: '개인정보 처리방침',
    lastUpdated: '최종 수정일: 2026년 10월',
    effectiveDate: '즉시 시행',
  },
  disclaimer: {
    title: '정본 언어 안내',
    text: '본 개인정보 처리방침의 영문 원본이 LadeStack의 개인정보 처리 방침을 규정하는 유일한 공식 정본입니다. 다른 언어로 제공되는 번역본은 정보 제공 및 편의를 위해 제공되며 독립적인 법률 인증을 받지 않았습니다.',
  },
  highlights: [
    { icon: 'shield-check', text: '프라이버시 우선 분석 (동의 기반)' },
    { icon: 'shield-check', text: '클라이언트 사이드 실행' },
    { icon: 'lock', text: '서버 내 파일 저장 없음' },
    { icon: 'check-circle', text: '로컬 우선 아키텍처' },
  ],
  sections: [
    {
      title: '1. 클라이언트 사이드 처리 아키텍처',
      paragraphs: [
        'LadeStack은 로컬 우선 아키텍처 원칙에 따라 개발자 도구를 설계합니다. LS PDF Toolkit, LS Image Compressor, GB Coder Static Editor 등 핵심 유틸리티는 WebAssembly, Web Worker, HTML5 Canvas API를 활용하여 브라우저 내부에서 직접 실행됩니다.',
        '사용자가 조작하는 파일(PDF 문서, 이미지, 소스 코드 등)은 브라우저의 임시 메모리에서만 처리되며, 작업 도중 LadeStack의 백엔드 서버로 전송되거나 저장되지 않습니다.',
      ],
    },
    {
      title: '2. 수집하는 정보 및 네트워크 통신',
      paragraphs: [
        '본 웹사이트의 공개 도구를 이용하기 위해 계정 가입, 로그인 정보, 결제 카드를 등록할 필요가 없습니다. 네트워크 통신은 다음과 같이 제한됩니다:',
      ],
      listItems: [
        '선택적 텔레메트리 및 이용 분석 (사전 동의 시에만 활성화): 광고용 추적기나 타겟팅 마케팅 픽셀은 일절 사용하지 않습니다. 기본적으로 모든 타사 추적기는 차단되어 있습니다. 프라이버시 설정 대화상자를 통해 명시적으로 동의한 경우에만 (a) Google 애널리틱스 4 (측정 ID: G-C6GRNN3J11, 광고 스토리지 완전 비활성화의 Consent Mode v2 적용) 및 (b) Microsoft Clarity (프로젝트 ID: z5fy1scjjr, 모든 입력 필드가 data-clarity-mask로 마스킹된 Consent API v2 적용)가 로드됩니다. 언제든지 "쿠키 설정"을 통해 동의를 변경하거나 철회할 수 있습니다.',
        '기본 웹 서버 접속 로그: 인프라 안정성 유지 및 비정상 트래픽 완화를 위해 브라우저 사용자 에이전트, 참조 URL, 요청 리소스 경로 등 표준 진단 정보만을 기록합니다.',
        '선택적 타사 AI 연동: GB Coder에서 사용자가 외부 AI 제공업체의 API 키를 직접 설정한 경우, API 통신은 사용자의 브라우저와 해당 외부 엔드포인트 간에 직접 수행됩니다.',
        '자발적 문의 접수: admin@ladestack.in 이메일을 통해 접수된 문의는 해당 문의에 답변하기 위한 목적으로만 처리됩니다.',
      ],
    },
    {
      title: '3. 로컬 스토리지 및 쿠키',
      paragraphs: [
        'LadeStack은 브라우저의 로컬 스토리지(localStorage 및 IndexedDB)를 필수 운영 목적(테마 설정 유지, GB Coder 프로젝트 복원, 동의 상태 저장 "ladestack-consent")으로만 사용합니다.',
        '사용자가 명시적으로 동의한 경우에 한하여 분석용 쿠키(_ga, _clck 등)가 생성되며, 상업적 광고 목적의 쿠키는 사용되지 않습니다. 동의를 철회할 경우 관련 쿠키는 기기에서 즉시 삭제됩니다.',
      ],
    },
    {
      title: '4. 데이터 보존 및 삭제',
      paragraphs: [
        'LS PDF Toolkit과 LS Image Compressor에서 처리되는 파일은 메모리 내에만 머무르므로, 브라우저 탭을 닫거나 새로고침하면 임시 데이터가 시스템 RAM에서 즉시 소멸합니다.',
        'IndexedDB에 저장된 GB Coder 프로젝트의 경우, 사용자가 언제든지 브라우저 사이트 데이터를 초기화하여 로컬 기기에서 완전히 삭제할 수 있습니다.',
      ],
    },
  ],
  contactNote: {
    title: '5. 개인정보 관련 문의',
    text: '본 개인정보 처리방침 또는 데이터 아키텍처에 관한 문의 사항은 엔지니어링 팀으로 연락해 주시기 바랍니다:',
    email: 'admin@ladestack.in',
  },
};
