# Game VFX Portfolio CMS - 개발 로드맵

**프로젝트명:** Game VFX Portfolio CMS
**최종 목표:** Notion API를 활용하여 게임 VFX 포트폴리오 웹사이트 구축
**예상 전체 개발 기간:** 9~12일
**작성일:** 2025-10-09

---

## 📊 전체 로드맵 요약

```
Phase 1: 프로젝트 초기 설정 및 골격 구축 (1~2일)
    ↓
Phase 2: 공통 모듈 및 컴포넌트 개발 (2~3일)
    ↓
Phase 3: 핵심 기능 개발 (3~4일)
    ↓
Phase 4: 추가 기능 개발 (2~3일)
    ↓
Phase 5: 최적화 및 배포 (1~2일)
```

---

## Phase 1: 프로젝트 초기 설정 및 골격 구축

**예상 소요 시간:** 1~2일
**의존 관계:** 없음 (프로젝트 시작 단계)

### 1.1 단계 목표

- 기존 Next.js Starter Kit 구조 확인 및 검증
- TypeScript, Tailwind CSS, shadcn/ui 설정 확인
- Notion API 환경 변수 설정 및 연결 테스트
- App Router 디렉토리 구조 설계
- 기본 레이아웃 및 네비게이션 구축

### 1.2 세부 작업 목록

#### 프로젝트 구조 확인 및 설정
- [ ] 기존 Next.js Starter Kit 구조 검토
  - `app/` 디렉토리 구조 확인
  - `public/`, `lib/`, `components/` 등 기본 폴더 존재 확인
- [ ] TypeScript 설정 확인
  - `tsconfig.json` 검토
  - 필요 시 설정 수정
- [ ] Tailwind CSS v4 설정 확인
  - `tailwind.config.ts` 검토
  - `globals.css` 확인
- [ ] shadcn/ui 설치 확인
  - 필수 컴포넌트 라이브러리 확인

#### Notion API 연동 준비
- [ ] 환경 변수 파일 생성
  - `.env.local` 파일 생성
  - `NOTION_TOKEN`, `NOTION_DATABASE_ID` 추가
- [ ] Notion Integration 토큰 획득
  - Notion Developers 페이지에서 Integration 생성
  - Secret 토큰 복사
- [ ] Notion Database ID 확인
  - Projects Database URL에서 ID 추출
  - 환경 변수에 등록
- [ ] Notion API 연결 테스트
  - @notionhq/client 설치 확인
  - 간단한 테스트 쿼리 실행

#### 디렉토리 구조 설계
- [ ] `lib/notion/` 폴더 생성
  - Notion API 관련 유틸리티 모음
- [ ] `types/` 폴더 생성
  - TypeScript 타입 정의 파일 위치
- [ ] `components/` 폴더 구조 정의
  - `common/` - 공통 컴포넌트
  - `sections/` - 페이지별 섹션 컴포넌트
- [ ] `app/` 라우트 구조 설계
  - `/` (Home)
  - `/projects` (Projects List)
  - `/projects/[id]` (Project Detail)
  - `/about` (About)
  - `/404` (Not Found)

#### 기본 레이아웃 구축
- [ ] Header 컴포넌트 구현
  - 로고 영역
  - 네비게이션 메뉴 (Home, Projects, About)
  - 테마 토글 (라이트/다크)
- [ ] Footer 컴포넌트 구현
  - 저작권 정보
  - 링크 영역
  - SNS 링크 (향후 확장)
- [ ] 기본 레이아웃 페이지 생성
  - `app/layout.tsx` - 루트 레이아웃
  - Header, Footer 포함
- [ ] next-themes 설정
  - 테마 제공자 설정
  - 다크/라이트 모드 전환 기능

#### 기본 페이지 틀 구성
- [ ] Home 페이지 기본 틀 (`app/page.tsx`)
  - 임시 컨텐츠
- [ ] Projects 페이지 기본 틀 (`app/projects/page.tsx`)
  - 임시 컨텐츠
- [ ] Project Detail 페이지 기본 틀 (`app/projects/[id]/page.tsx`)
  - 동적 라우트 설정
- [ ] About 페이지 기본 틀 (`app/about/page.tsx`)
  - 임시 컨텐츠
- [ ] 404 페이지 (`app/not-found.tsx`)
  - 에러 처리

### 1.3 왜 이 순서로 개발해야 하는가

Phase 1을 먼저 진행하는 이유:
1. **기반 구축**: 모든 후속 작업의 기초가 되는 프로젝트 구조 확립
2. **환경 설정**: Notion API 연결이 없으면 나머지 모든 기능 개발 불가능
3. **타입 안정성**: TypeScript 설정이 완료되어야 이후 개발이 수월함
4. **UI 골격**: 기본 레이아웃이 있어야 페이지별 컴포넌트 개발 가능
5. **병렬 작업 준비**: Phase 2 이후 팀 작업이 가능하도록 기반 마련

### 1.4 완료 기준 (Acceptance Criteria)

**기능 요구사항**
- [x] Next.js App Router 디렉토리 구조 완성
- [x] TypeScript, Tailwind CSS, shadcn/ui 설정 완료
- [x] Notion API 토큰 획득 및 환경 변수 설정 완료
- [x] Notion Database ID 확인 및 연결 테스트 성공
- [x] Header, Footer, 기본 레이아웃 구현 완료
- [x] 기본 페이지 틀 (Home, Projects, Detail, About, 404) 생성 완료
- [x] 테마 전환 기능 동작 확인

**기술 요구사항**
- [x] `npm run dev`에서 모든 페이지 접근 가능
- [x] 렌더링 에러 없음
- [x] 환경 변수 올바르게 설정됨
- [x] Git 커밋 완료 (커밋 메시지: "feat: initialize project structure")

**문서화**
- [x] 프로젝트 구조 문서화
- [x] 환경 변수 설정 가이드 작성

---

## Phase 2: 공통 모듈 및 컴포넌트 개발

**예상 소요 시간:** 2~3일
**의존 관계:** Phase 1 완료 필수

### 2.1 단계 목표

- Notion API 공통 클라이언트 구현
- 프로젝트 데이터 조회 함수 개발
- TypeScript 타입 정의 완성
- 재사용 가능한 공통 컴포넌트 구현
- 공통 스타일 및 유틸리티 함수 정의

### 2.2 세부 작업 목록

#### Notion API 클라이언트 구현
- [ ] Notion 클라이언트 초기화
  - `lib/notion/client.ts` 생성
  - @notionhq/client 인스턴스 생성
  - 토큰 및 Database ID 사용
- [ ] 데이터베이스 쿼리 함수
  - `lib/notion/queries.ts` 생성
  - `getPublishedProjects()` - 모든 Published 프로젝트 조회
  - `getFeaturedProjects()` - Featured 프로젝트만 조회
  - `getProjectById(id)` - 특정 프로젝트 상세 정보 조회
  - 필터링: `Status: "Published"`
- [ ] 페이지 본문 렌더링 함수
  - `lib/notion/blocks.ts` 생성
  - `getPageBlocks(pageId)` - 페이지의 모든 블록 조회
  - `renderBlocksToHtml()` - Notion 블록을 HTML로 변환 (기본 구현)
- [ ] 에러 처리
  - API 요청 실패 시 로깅
  - 재시도 로직 (선택)

#### TypeScript 타입 정의
- [ ] `types/notion.ts` 생성
  - `Project` 인터페이스
    - id, title, category, tools, description, thumbnail, status, createdAt, featured, content
  - `NotionBlock` 인터페이스
    - Notion Blocks API 응답 타입
  - `NotionError` 인터페이스
- [ ] `types/api.ts` 생성 (선택)
  - API 응답 타입 정의

#### 공통 컴포넌트 개발
- [ ] ProjectCard 컴포넌트
  - 프로젝트 썸네일 이미지
  - 프로젝트 제목
  - 카테고리 배지
  - "상세보기" 링크
  - Hover 효과
- [ ] Badge 컴포넌트
  - 카테고리/도구 표시
  - 스타일링 (다양한 색상)
- [ ] LoadingState 컴포넌트
  - 데이터 로딩 중 표시
  - Skeleton UI (선택)
- [ ] ErrorState 컴포넌트
  - 에러 발생 시 사용자 친화적 메시지
  - 재시도 버튼 (선택)
- [ ] EmptyState 컴포넌트
  - 데이터 없을 때 표시

#### 공통 유틸리티 및 스타일
- [ ] 유틸리티 함수 모음
  - `lib/utils.ts` (기존)
  - `lib/date.ts` - 날짜 포매팅 함수
  - `lib/string.ts` - 텍스트 처리 함수
- [ ] 공통 스타일 정의
  - `globals.css` 확인 및 필요 시 추가
  - Tailwind CSS 커스텀 변수 정의
  - 색상, 폰트, 간격 정의

#### 이미지 최적화 준비
- [ ] Next.js Image 컴포넌트 설정
  - 원격 이미지 소스 설정
  - Notion 이미지 도메인 허용
- [ ] 이미지 처리 유틸리티
  - `lib/image.ts` 생성
  - Notion 파일 URL 처리 함수

### 2.3 왜 이 순서로 개발해야 하는가

Phase 2를 Phase 1 이후에 진행하는 이유:
1. **API 기반 구현**: Phase 1의 환경 설정 없이는 API 클라이언트 구현 불가능
2. **타입 안정성**: 타입 정의가 완료되어야 이후 컴포넌트 개발이 효율적
3. **재사용성**: 공통 컴포넌트와 유틸리티가 Phase 3의 모든 페이지에서 사용됨
4. **독립적 개발**: Phase 2 완료 후 팀원이 각 페이지 개발을 병렬로 진행 가능

### 2.4 완료 기준 (Acceptance Criteria)

**기능 요구사항**
- [x] Notion API 클라이언트 구현 완료
- [x] `getPublishedProjects()` 함수 테스트 완료 (실제 데이터 조회 확인)
- [x] `getProjectById(id)` 함수 테스트 완료
- [x] `getPageBlocks(pageId)` 함수 테스트 완료
- [x] TypeScript 타입 정의 완성
- [x] ProjectCard, Badge, LoadingState, ErrorState, EmptyState 컴포넌트 구현 완료
- [x] 유틸리티 함수 구현 완료

**코드 품질**
- [x] TypeScript 타입 오류 없음 (`npm run build` 성공)
- [x] ESLint 검사 통과
- [x] 모든 함수에 JSDoc 주석 추가

**문서화**
- [x] Notion 타입 정의 문서화
- [x] 주요 함수 사용 예제 작성

---

## Phase 3: 핵심 기능 개발

**예상 소요 시간:** 3~4일
**의존 관계:** Phase 1, Phase 2 완료 필수

### 3.1 단계 목표

- Home 페이지 구현 (Featured 프로젝트)
- Projects 페이지 구현 (목록, 필터, 검색)
- Project Detail 페이지 구현 (상세 정보, Notion 콘텐츠 렌더링)
- About 페이지 구현 (정적 소개)
- 모든 핵심 기능이 예정대로 동작하는지 검증

### 3.2 세부 작업 목록

#### Home 페이지 (`/`)
- [ ] Hero 섹션 구현
  - 아티스트 소개 텍스트
  - 배경 이미지/색상
- [ ] Featured 프로젝트 표시
  - `getFeaturedProjects()` 함수 사용
  - 그리드 또는 슬라이드 레이아웃
  - ProjectCard 컴포넌트 재사용
  - 최대 3~4개 프로젝트 표시
- [ ] Call-to-Action 섹션
  - "전체 작품 보기" 버튼 → `/projects`로 이동
- [ ] 페이지 메타데이터
  - 제목, 설명, Open Graph 태그 (Phase 4에서 SEO 최적화)

#### Projects 페이지 (`/projects`)
- [ ] Hero 섹션
  - 페이지 제목: "Projects"
  - 설명 텍스트
- [ ] 필터/검색 패널
  - 카테고리 필터 (multi-select)
    - 동적으로 Notion 데이터에서 카테고리 추출
    - 선택/해제 토글
  - 도구 필터 (multi-select)
    - 동적으로 Notion 데이터에서 도구 추출
    - 선택/해제 토글
  - 검색 입력창
    - 제목/설명 기반 검색
  - "초기화" 버튼
- [ ] 프로젝트 그리드
  - 반응형 레이아웃 (모바일: 1열, 태블릿: 2열, 데스크톱: 3열)
  - ProjectCard 컴포넌트 재사용
  - 필터 결과에 따른 동적 렌더링
- [ ] 상태 처리
  - 로딩 중: LoadingState 컴포넌트
  - 에러: ErrorState 컴포넌트
  - 데이터 없음: EmptyState 컴포넌트
- [ ] 페이지 메타데이터

#### Project Detail 페이지 (`/projects/[id]`)
- [ ] 동적 라우팅
  - `[id]` 파라미터에서 프로젝트 ID 추출
  - `getProjectById(id)` 함수 사용
- [ ] 프로젝트 헤더
  - 프로젝트 제목 (큰 텍스트)
  - 카테고리 배지
  - 도구 배지들
- [ ] 썸네일 이미지
  - Notion에서 가져온 Thumbnail 파일 표시
  - Next.js Image 컴포넌트 사용
  - 반응형 크기
- [ ] 메타 정보 섹션
  - 분류 (Category)
  - 사용 도구 (Tools)
  - 작성 날짜 (CreatedAt)
  - 간단 설명 (Description)
- [ ] Notion 페이지 본문 렌더링
  - `getPageBlocks(id)` 함수 사용
  - 기본 블록 타입 지원:
    - 제목 (heading_1, heading_2, heading_3)
    - 문단 (paragraph)
    - 이미지 (image)
    - 목록 (bulleted_list_item, numbered_list_item)
    - 인용문 (quote)
    - 코드 (code)
  - 복잡한 블록은 기본 렌더링으로 처리
- [ ] 네비게이션
  - "이전 프로젝트" / "다음 프로젝트" 버튼 (선택)
  - "전체 프로젝트" 링크 → `/projects`
- [ ] 404 처리
  - 프로젝트를 찾을 수 없는 경우 처리
- [ ] 페이지 메타데이터
  - 동적 메타데이터 (제목, 설명, 이미지)

#### About 페이지 (`/about`)
- [ ] 프로필 이미지
  - 정적 이미지 또는 임시 플레이스홀더
- [ ] 아티스트 소개 텍스트
  - 경력, 기술, 스타일 등
  - Markdown 또는 하드코딩 텍스트
- [ ] 기술 스택 섹션 (선택)
  - 주요 도구/엔진 나열
- [ ] 연락처 정보
  - 이메일
  - SNS 링크
- [ ] 페이지 메타데이터

#### 전체 에러 처리
- [ ] 404 페이지
  - 존재하지 않는 프로젝트 접근 시
  - 존재하지 않는 페이지 접근 시
- [ ] 500 에러 페이지 (선택)
  - API 오류 시 사용자 친화적 메시지
- [ ] 네트워크 실패 시 처리

### 3.3 왜 이 순서로 개발해야 하는가

Phase 3을 Phase 1, 2 이후에 진행하는 이유:
1. **의존성 충족**: API 클라이언트, 타입, 공통 컴포넌트 필수
2. **핵심 기능 구현**: 사용자 입장에서 가장 중요한 기능 먼저 구현
3. **동작 검증**: 실제 데이터로 동작하는지 확인
4. **기반 완성**: 이후 추가 기능(필터, 검색, SEO)의 기반 제공

### 3.4 완료 기준 (Acceptance Criteria)

**기능 요구사항**
- [x] Home 페이지에서 Featured 프로젝트 3~4개 표시 확인
- [x] Projects 페이지에서 모든 Published 프로젝트 목록 조회 확인
- [x] 카테고리 필터 동작 확인
- [x] 검색 기능 동작 확인
- [x] Project Detail 페이지에서 프로젝트 정보 올바르게 표시
- [x] Notion 페이지 본문이 웹사이트에 렌더링됨
- [x] 이미지가 올바르게 표시됨
- [x] 404 페이지 동작 확인
- [x] About 페이지 표시 확인

**성능 요구사항**
- [x] Projects 페이지 로드 시간 < 3초
- [x] Project Detail 페이지 로드 시간 < 3초
- [x] 이미지 최적화 (Next.js Image 사용)

**UI/UX 요구사항**
- [x] 모든 페이지가 반응형 (모바일, 태블릿, 데스크톱)
- [x] 다크/라이트 테마에서 모두 표시 가능
- [x] 사용자 경험이 부드러움 (로딩, 에러 상태 처리)

**코드 품질**
- [x] TypeScript 타입 오류 없음
- [x] ESLint 검사 통과
- [x] `npm run build` 성공

**문서화**
- [x] 페이지별 구성 요소 문서화

---

## Phase 4: 추가 기능 개발

**예상 소요 시간:** 2~3일
**의존 관계:** Phase 3 완료 필수

### 4.1 단계 목표

- Projects 페이지의 필터링 및 검색 성능 최적화
- 도구별 필터링 기능 추가
- 정렬 기능 추가 (최신순, Featured 우선)
- 메타데이터 및 SEO 최적화
- 페이지별 구조화된 데이터 추가

### 4.2 세부 작업 목록

#### 필터링 및 검색 고도화
- [ ] 클라이언트 사이드 필터링 최적화
  - 필터 상태 관리 (React hooks 또는 상태 관리 라이브러리)
  - 여러 필터 조합 지원
  - 쿼리 파라미터로 필터 상태 저장 (선택)
    - 예: `/projects?category=Unreal&tools=Niagara`
- [ ] 검색 기능 고도화
  - 제목 검색
  - 설명 검색
  - 최소 입력 길이 설정 (예: 2글자 이상)
  - 검색 결과 하이라이트 (선택)
- [ ] 정렬 기능
  - 최신순 (CreatedAt 기준)
  - Featured 우선
  - 이름순 (A-Z)

#### SEO 최적화
- [ ] 동적 메타데이터
  - `app/` 디렉토리에서 메타데이터 생성
  - `generateMetadata()` 함수 사용
- [ ] 페이지별 메타데이터
  - Home: 사이트 제목, 설명
  - Projects: 프로젝트 목록 설명
  - Project Detail: 프로젝트 제목, 설명, 썸네일
  - About: 아티스트 소개
- [ ] Open Graph (OG) 태그
  - og:title, og:description, og:image, og:url
- [ ] 구조화된 데이터 (Schema.org)
  - JSON-LD 형식
  - Project 스키마 (프로젝트 상세 페이지)
  - Person 또는 Organization 스키마 (About 페이지)

#### 성능 최적화
- [ ] 이미지 최적화 (확인 및 개선)
  - Next.js Image 컴포넌트 사용 확인
  - 이미지 크기 최적화
  - WebP 포맷 지원
- [ ] 스크립트 최적화
  - 동기/비동기 로딩 확인
- [ ] 캐싱 전략 (선택)
  - Next.js ISR (Incremental Static Regeneration)
  - Revalidate 주기 설정

#### 추가 UI 개선 (선택)
- [ ] 검색/필터 결과 개수 표시
- [ ] "결과 없음" 상태 메시지 개선
- [ ] 페이지네이션 (선택)
  - 필터 결과가 많을 경우

#### 추가 페이지 (PRD 범위 내)
- [ ] 없음 (PRD에서 명시된 페이지는 Phase 3에서 완성)

### 4.3 왜 이 순서로 개발해야 하는가

Phase 4를 Phase 3 이후에 진행하는 이유:
1. **핵심 기능 우선**: 기본 기능이 동작해야 고도화 기능 추가 가능
2. **사용자 경험 향상**: 기본 기능 완성 후 검색/필터 성능 개선
3. **SEO 중요성**: 기본 페이지 구성 완료 후 메타데이터 추가
4. **선택사항**: 이 Phase의 일부 기능은 선택 사항이므로 우선순위에 따라 조정 가능

### 4.4 완료 기준 (Acceptance Criteria)

**기능 요구사항**
- [x] 카테고리 필터 정확하게 동작
- [x] 도구 필터 정확하게 동작
- [x] 검색 기능 정확하게 동작
- [x] 여러 필터 조합 동작
- [x] 정렬 기능 (최신순, Featured 우선) 동작

**SEO 요구사항**
- [x] 모든 페이지에 메타데이터 설정
- [x] OG 태그 설정 확인
- [x] Project Detail 페이지에 구조화된 데이터 (Schema.org) 추가
- [x] Google Search Console에서 메타데이터 확인 (선택)

**성능 요구사항**
- [x] Lighthouse 성능 점수 > 80
- [x] Lighthouse SEO 점수 > 90
- [x] 페이지 로드 시간 < 3초

**코드 품질**
- [x] TypeScript 타입 오류 없음
- [x] ESLint 검사 통과
- [x] `npm run build` 성공

---

## Phase 5: 최적화 및 배포

**예상 소요 시간:** 1~2일
**의존 관계:** Phase 1~4 완료 필수

### 5.1 단계 목표

- 반응형 디자인 최종 검증
- 성능 및 이미지 최적화 확인
- 오류 처리 및 엣지 케이스 테스트
- 보안 점검 (환경 변수 등)
- Vercel 배포

### 5.2 세부 작업 목록

#### 반응형 디자인 검증
- [ ] 모바일 (375px, 414px)
  - 모든 페이지에서 텍스트 가독성 확인
  - 이미지 표시 확인
  - 터치 인터페이스 확인
- [ ] 태블릿 (768px, 1024px)
  - 레이아웃 적절성 확인
- [ ] 데스크톱 (1200px 이상)
  - 전체 레이아웃 검증
- [ ] 브라우저 호환성
  - Chrome, Firefox, Safari, Edge 최신 버전 테스트
- [ ] 다크/라이트 테마
  - 모든 페이지에서 다크/라이트 모드 테스트

#### 성능 최적화 확인
- [ ] Lighthouse 검사
  - Performance > 80점
  - Accessibility > 90점
  - Best Practices > 90점
  - SEO > 90점
- [ ] 이미지 최적화
  - WebP 포맷 지원 확인
  - 이미지 크기 최적화 확인
  - CDN 캐싱 확인
- [ ] 스크립트 최적화
  - 번들 크기 확인
  - 동적 import 확인 (필요한 경우)
- [ ] 캐싱 전략 (선택)
  - HTTP 캐시 헤더 설정
  - Next.js ISR 설정 (선택)

#### 오류 처리 및 테스트
- [ ] API 오류 처리
  - Notion API 요청 실패 시
  - 네트워크 타임아웃 시
  - 응답 데이터 부재 시
- [ ] 엣지 케이스 테스트
  - 빈 Project 목록
  - 매우 긴 프로젝트 제목
  - 이미지 없는 프로젝트
  - 깨진 Notion 링크
  - 매우 많은 필터 결과
- [ ] 404/500 에러 페이지
  - 디자인 일관성 확인
  - 사용자 친화적 메시지 확인

#### 보안 점검
- [ ] 환경 변수 보안
  - `.env.local`에 민감 정보 저장 확인
  - 공개 환경 변수는 `.env.local.example` 작성
  - 빌드 시 환경 변수 보호 확인
- [ ] Notion API 토큰 보안
  - 토큰이 클라이언트 코드에 노출되지 않음 확인
  - 서버 사이드에서만 토큰 사용 확인
- [ ] CORS 정책
  - Notion API CORS 설정 확인
- [ ] XSS 방지
  - 사용자 입력 (검색어 등) sanitization 확인
  - Notion 콘텐츠 렌더링 보안 확인

#### 문서화 및 가이드
- [ ] README.md 작성
  - 프로젝트 소개
  - 설치 및 실행 방법
  - Notion 설정 가이드
  - 환경 변수 설정 방법
- [ ] 배포 가이드 작성
  - Vercel 배포 절차
  - 환경 변수 설정 방법
  - 도메인 연결 방법

#### Vercel 배포
- [ ] GitHub 저장소 연결
  - 저장소가 공개 또는 private 설정
- [ ] Vercel 프로젝트 생성
  - 프로젝트 이름 설정
  - Build 명령어 확인: `npm run build`
  - Start 명령어 확인: `npm start`
- [ ] 환경 변수 설정
  - Vercel 대시보드에서 `NOTION_TOKEN`, `NOTION_DATABASE_ID` 설정
- [ ] 배포 실행
  - 첫 번째 배포 실행
  - 배포 로그 확인 및 오류 처리
- [ ] 배포 후 검증
  - 실시간 환경에서 모든 페이지 접근 가능 확인
  - Notion 데이터 동기화 확인
  - 성능 검사 (Lighthouse 등)
- [ ] 도메인 설정 (선택)
  - 커스텀 도메인 연결

### 5.3 왜 이 순서로 개발해야 하는가

Phase 5를 마지막에 진행하는 이유:
1. **최종 검증**: 모든 기능이 구현된 후 총체적으로 검증
2. **사용자 경험**: 배포 전 최종 사용자 경험 확인
3. **문제 식별**: 개발 과정에서 발견하지 못한 이슈 발견
4. **안정성**: 배포 전 모든 오류 처리 및 보안 점검
5. **신뢰성**: 실제 운영 환경에서 정상 동작 보장

### 5.4 완료 기준 (Acceptance Criteria)

**성능 요구사항**
- [x] Lighthouse 성능 점수 > 80
- [x] Lighthouse 접근성 점수 > 90
- [x] Lighthouse SEO 점수 > 90
- [x] 모든 페이지 로드 시간 < 3초

**기능 요구사항**
- [x] 모든 페이지에서 Notion 데이터 정확하게 표시
- [x] 필터, 검색 기능 정상 동작
- [x] 다크/라이트 테마 전환 정상 동작
- [x] 404/500 에러 페이지 정상 표시

**반응형 디자인**
- [x] 모바일 (375px): 모든 페이지 정상 표시
- [x] 태블릿 (768px): 모든 페이지 정상 표시
- [x] 데스크톱 (1200px+): 모든 페이지 정상 표시

**보안 요구사항**
- [x] 환경 변수 보안 확인
- [x] Notion API 토큰 클라이언트 코드에 노출되지 않음
- [x] 민감 정보 보호

**배포 요구사항**
- [x] GitHub 저장소 연결 완료
- [x] Vercel 배포 성공
- [x] 실시간 환경에서 모든 페이지 접근 가능
- [x] 배포 후 Notion 데이터 동기화 확인

**문서화**
- [x] README.md 작성 완료
- [x] 배포 가이드 작성 완료
- [x] 환경 변수 설정 가이드 작성 완료

---

## 📅 개발 일정 및 마일스톤

| Phase | 작업 | 예상 기간 | 시작일 | 완료일 |
|-------|------|---------|--------|--------|
| **Phase 1** | 프로젝트 초기 설정 및 골격 구축 | 1~2일 | - | - |
| **Phase 2** | 공통 모듈 및 컴포넌트 개발 | 2~3일 | - | - |
| **Phase 3** | 핵심 기능 개발 | 3~4일 | - | - |
| **Phase 4** | 추가 기능 개발 | 2~3일 | - | - |
| **Phase 5** | 최적화 및 배포 | 1~2일 | - | - |
| **총합** | | **9~12일** | - | - |

---

## 🔗 의존 관계도

```
Phase 1 (기반 구축)
    ├─ Next.js, TypeScript, Tailwind 설정
    ├─ Notion API 환경 설정
    └─ 기본 레이아웃 및 라우트
         │
         ↓
Phase 2 (재사용 가능한 요소)
    ├─ Notion API 클라이언트
    ├─ TypeScript 타입 정의
    └─ 공통 컴포넌트
         │
         ├─────┬─────┬─────┬─────┐
         ↓     ↓     ↓     ↓     ↓
Phase 3 (핵심 페이지)
    ├─ Home 페이지
    ├─ Projects 페이지
    ├─ Project Detail 페이지
    └─ About 페이지
         │
         ↓
Phase 4 (고도화)
    ├─ 필터/검색 최적화
    ├─ SEO 메타데이터
    └─ 성능 최적화
         │
         ↓
Phase 5 (배포)
    ├─ 최종 검증
    ├─ 보안 점검
    └─ Vercel 배포
```

---

## 📋 PRD와 ROADMAP의 관계

### PRD에서 제시한 Phase (Week 1~5)와의 매핑

| PRD Phase | ROADMAP Phase | 설명 |
|-----------|---------------|------|
| Week 1: 준비 | Phase 1 (1~2일) | Notion 연동, 환경 변수, 프로젝트 구조 |
| Week 2~3: 핵심 기능 | Phase 2 + Phase 3 (5~7일) | API 클라이언트, 공통 컴포넌트, 핵심 페이지 |
| Week 4: 완성도 및 배포 | Phase 4 + Phase 5 (3~5일) | 스타일링, 에러 처리, SEO, 배포 |

**변경사항**: PRD의 "Week" 단위를 "Phase" 단위로 세분화하여 더 명확한 의존성과 완료 기준을 정의.

---

## 🎯 주요 성공 지표

### 기능 성공 지표
- [x] Notion Database에서 Published 프로젝트 100% 조회 가능
- [x] 모든 페이지에서 오류 없이 렌더링
- [x] 필터/검색 정확도 100%

### 성능 성공 지표
- [x] 페이지 로드 시간 < 3초
- [x] Lighthouse 성능 점수 > 80
- [x] Lighthouse SEO 점수 > 90

### 사용자 경험 성공 지표
- [x] 모든 기기에서 반응형 디자인 정상 동작
- [x] 다크/라이트 테마 전환 부드러운 작동
- [x] 에러 상황에서 사용자 친화적 메시지 표시

---

## 📝 진행 상황 추적

프로젝트 진행 중 다음 체크리스트를 활용하여 진도를 관리할 수 있습니다:

### Phase 1 진행 상황
- [ ] 프로젝트 구조 확인
- [ ] Notion API 연동 설정
- [ ] 기본 레이아웃 구축
- [ ] **Phase 1 완료**

### Phase 2 진행 상황
- [ ] Notion API 클라이언트 구현
- [ ] TypeScript 타입 정의
- [ ] 공통 컴포넌트 개발
- [ ] **Phase 2 완료**

### Phase 3 진행 상황
- [ ] Home 페이지 구현
- [ ] Projects 페이지 구현
- [ ] Project Detail 페이지 구현
- [ ] About 페이지 구현
- [ ] **Phase 3 완료**

### Phase 4 진행 상황
- [ ] 필터/검색 고도화
- [ ] SEO 최적화
- [ ] 성능 최적화
- [ ] **Phase 4 완료**

### Phase 5 진행 상황
- [ ] 반응형 디자인 검증
- [ ] 성능 최적화 확인
- [ ] 보안 점검
- [ ] Vercel 배포
- [ ] **Phase 5 완료**

---

## 🚀 배포 후 계획 (Post-MVP)

로드맵 완료 후 고려할 사항:

1. **Analytics 통합**
   - Google Analytics 또는 유사 서비스
   - 사용자 행동 분석

2. **캐싱 전략 고도화**
   - Next.js ISR (Incremental Static Regeneration) 적용
   - Notion 데이터 자동 갱신 주기 설정

3. **추가 페이지**
   - 프로젝트 아카이브 페이지
   - 블로그 또는 뉴스레터

4. **관리 기능**
   - 관리자 대시보드 (향후)
   - 데이터 동기화 로그

5. **다국어 지원**
   - i18n 라이브러리 통합
   - 다국어 콘텐츠 관리

---

**ROADMAP 작성일:** 2025-10-09
**마지막 업데이트:** 2025-10-09
**상태:** 개발 준비 완료
