import type { SitemapPageData } from './types';

export const koSitemap: SitemapPageData = {
  seo: {
    title: '사이트맵 및 디렉터리 | LadeStack',
    description: 'LadeStack의 전체 공개 페이지, 개발자 도구, 기술 문서 및 블로그 목록을 한눈에 확인할 수 있는 디렉터리입니다.',
    ogTitle: 'LadeStack 사이트맵 및 디렉터리',
    ogDescription: 'LadeStack 플랫폼의 모든 페이지, 도구, 아키텍처 가이드 및 기술 출판물 안내.',
  },
  hero: {
    badge: '내비게이션 및 색인',
    title: '사이트 목차 및 디렉터리',
    description: 'LadeStack 플랫폼의 모든 페이지, 도구, 기술 문서 및 엔지니어링 출판물을 탐색할 수 있는 통합 디렉터리입니다.',
  },
  sections: {
    corePlatform: {
      title: '핵심 플랫폼 경로',
      items: [
        { title: '홈', href: '/', desc: '라이브 도구 쇼케이스와 인터랙티브 코드 데모가 포함된 플랫폼 메인 페이지' },
        { title: 'LadeStack 소개', href: '/about', desc: '창립자 소개, 엔지니어링 철학 및 검증된 제품 포트폴리오' },
        { title: 'GB Coder', href: '/gb-coder', desc: 'Monaco 에디터, 정적 에디터 및 WebContainer 환경을 갖춘 브라우저 네이티브 IDE' },
        { title: '제품 및 유틸리티', href: '/apps', desc: '브라우저 로컬 실행 클라이언트 사이드 개발자 도구 카탈로그' },
        { title: '기술 문서', href: '/docs', desc: '기술 사양, 아키텍처 가이드 및 플랫폼 릴리스 내역' },
        { title: '지원 센터', href: '/support', desc: '기술 지원 채널, 브라우저 호환성 안내 및 자주 묻는 질문' },
        { title: '문의하기', href: '/contact', desc: '창립자 직접 메일, 엔지니어링 문의 및 피드백 접수' },
      ],
    },
    tools: {
      title: '개발자 도구 및 애플리케이션',
      openTool: '도구 열기',
      comingSoon: '출시 예정',
      live: '운영 중',
    },
    blogArchive: {
      title: '엔지니어링 블로그 아카이브 (27개 글)',
      notice: '참고: 엔지니어링 블로그 글은 현재 영어로만 제공됩니다. 블로그 글의 전체 다국어 지원은 Phase 3에서 진행될 예정입니다.',
      visitBlog: '블로그 목록 방문하기 →',
    },
    legal: {
      title: '법률 및 개인정보 보호',
      items: [
        { title: '개인정보 처리방침', href: '/privacy', desc: '클라이언트 사이드 처리 아키텍처, 데이터 보호 한계 및 로컬 스토리지 원칙' },
        { title: '이용약관', href: '/terms', desc: '상업적 이용 권리, 지식재산권 라이선스 및 책임 한계 규정' },
      ],
    },
  },
};
