# Game VFX Portfolio CMS - Claude Development Guide

이 파일은 Claude Code에서 프로젝트 개발 시 참고해야 할 설정과 지침을 정의합니다.

---

## Project Context

### 프로젝트 개요
- **프로젝트명:** Game VFX Portfolio CMS
- **목표:** Notion API를 활용하여 게임 VFX 아티스트의 포트폴리오 웹사이트 구축
- **기술 스택:** Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, Notion API

### 핵심 문서
- **PRD 문서:** @docs/PRD.md
  - 프로젝트의 전체 요구사항, 기능 정의, 화면 구성
  - 개발 전에 반드시 확인
- **개발 로드맵:** @docs/ROADMAP.md
  - 5개 Phase로 구성된 개발 순서와 세부 작업
  - 각 Phase의 완료 기준과 의존 관계 정의
  - 진행 상황 추적용 체크리스트 포함

---

## Development Guidelines

### 1. 개발 순서 준수
반드시 다음 순서를 따릅니다. 단계를 건너뛰거나 역순으로 진행하지 않습니다:

1. **Phase 1:** 프로젝트 초기 설정 및 골격 구축 (1~2일)
2. **Phase 2:** 공통 모듈 및 컴포넌트 개발 (2~3일)
3. **Phase 3:** 핵심 기능 개발 (3~4일)
4. **Phase 4:** 추가 기능 개발 (2~3일)
5. **Phase 5:** 최적화 및 배포 (1~2일)

### 2. PRD 준수 원칙
- **PRD에 명시된 기능만 구현**
  - Notion 연동, 프로젝트 목록, 상세 페이지, 필터, 검색, SEO
  - 관리자 페이지, 댓글 기능, 다운로드 기능 등은 Out of Scope
- **화면 구성과 데이터 흐름을 PRD에 따름**
  - Home, Projects, Project Detail, About 페이지만 구현
  - Notion Database 스키마는 PRD에 정의된 필드 사용

### 3. Phase 완료 기준 확인
각 Phase 진행 전에 다음을 확인합니다:

**Phase 시작 전:**
- 이전 Phase의 모든 체크리스트 항목이 완료되었는가?
- 의존하는 모듈/컴포넌트가 준비되었는가?

**Phase 진행 중:**
- ROADMAP.md의 "세부 작업 목록"을 따라 구현
- 체크리스트 항목을 하나씩 검증

**Phase 완료 시:**
- ROADMAP.md의 "완료 기준 (Acceptance Criteria)"을 모두 만족하는가?
- 다음 Phase의 의존성이 충족되었는가?

### 4. 기술 스택 기준
다음 기술과 라이브러리를 사용합니다:

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (100% 타입 안정성)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui, Radix UI
- **Icons:** lucide-react
- **Theme:** next-themes
- **CMS:** Notion API (@notionhq/client)
- **Deployment:** Vercel

다른 라이브러리나 프레임워크를 추가하기 전에 PRD와 기존 설정 확인.

### 5. 코드 품질 기준
- **TypeScript:** 모든 함수에 명시적 타입 정의 필수
- **ESLint:** 모든 코드가 ESLint 규칙 준수
- **Performance:** Lighthouse 성능 점수 > 80 (Phase 5)
- **Accessibility:** WCAG 2.1 AA 준수
- **Documentation:** 복잡한 로직에만 JSDoc 주석 추가 (과다한 주석 금지)

### 6. PRD와의 차이 명시
개발 중 PRD에 없는 기능을 추가하거나 변경이 필요한 경우:
- 변경 사항을 명시적으로 기록
- 이유와 영향을 설명
- 사용자 승인 후 진행

### 7. 각 Phase의 핵심 포인트

#### Phase 1: 기반 구축
- Next.js 디렉토리 구조 설계
- Notion API 환경 변수 설정
- Header/Footer/기본 레이아웃
- 5개 페이지의 라우트와 기본 틀

#### Phase 2: 재사용 요소
- Notion API 클라이언트 (3개 주요 함수)
- TypeScript 타입 정의
- ProjectCard, Badge, 상태 컴포넌트
- 유틸리티 함수 모음

#### Phase 3: 핵심 페이지
- Home: Featured 프로젝트 표시
- Projects: 목록, 필터, 검색
- Project Detail: 상세 정보, Notion 콘텐츠 렌더링
- About: 정적 소개 페이지

#### Phase 4: 사용자 경험 향상
- 필터/검색 최적화
- SEO 메타데이터 (동적, OG, Schema.org)
- 성능 최적화 (Lighthouse 90점)

#### Phase 5: 배포 준비
- 반응형 디자인 검증
- 보안 점검 (환경 변수, API 토큰)
- 에러 처리 및 엣지 케이스 테스트
- Vercel 배포 및 도메인 설정

---

## Workflow

### 새 작업 시작 시
1. ROADMAP.md에서 현재 Phase와 다음 작업 확인
2. 작업의 세부 항목 체크리스트 검토
3. 필요한 파일 읽기 및 이해
4. 작업 시작 전에 목표 명확히 하기

### 개발 중
1. ROADMAP.md의 지침을 따라 구현
2. TypeScript 타입 오류 없이 진행
3. 주요 변경사항은 커밋 메시지에 명시
4. Phase 완료 기준 의식하며 개발

### Phase 완료 후
1. ROADMAP.md의 "완료 기준" 모두 확인
2. 다음 Phase의 의존성 검증
3. 필요 시 진행 상황 추적 체크리스트 업데이트

---

## Important Notes

- **PRD 우선:** 개발 중 의문이 생기면 먼저 PRD 확인
- **ROADMAP 따르기:** 임의로 기능을 추가하거나 순서를 변경하지 말 것
- **타입 안정성:** TypeScript strict 모드 유지
- **성능:** 이미지 최적화, 캐싱 전략 등 Phase 5에서 확인
- **보안:** Notion API 토큰은 `.env.local`에만 저장, 클라이언트 코드에 노출 금지

---

**Last Updated:** 2025-10-09
**Status:** 개발 가이드 준비 완료
