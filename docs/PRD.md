# Game VFX Portfolio CMS - PRD (Product Requirements Document)

## 📋 프로젝트 개요

**프로젝트명:** Game VFX Portfolio CMS
**목표:** 게임 VFX 아티스트가 Notion에서 작업물을 효율적으로 관리하고, 포트폴리오 웹사이트에 자동으로 반영하는 CMS 구축

### 핵심 가치
- **Notion 중심 관리**: 아티스트가 익숙한 Notion에서 모든 콘텐츠를 작성
- **자동 동기화**: 추가 배포 없이 Notion 변경사항이 웹사이트에 즉시 반영
- **전문적인 포트폴리오**: Notion 데이터를 기반으로 아름다운 포트폴리오 웹사이트 자동 생성

---

## 👥 대상 사용자

### Primary User
- **게임 VFX 아티스트**: Unreal Engine, Niagara, Houdini 등에서 작업
- **포트폴리오 구축 필요**: 직무 지원 또는 프리랜서 활동
- **기술 스택**: 비개발자, Notion 사용 경험 보유

### Secondary User
- **스튜디오 관리자**: 팀 멤버의 포트폴리오 일괄 관리
- **채용담당자**: 포트폴리오 검토 및 평가

---

## ✨ 주요 기능 요구사항

### 1. Notion 연동
- **Notion API 연동**: @notionhq/client를 사용한 데이터 동기화
- **Database 쿼리**: "Projects" 데이터베이스에서 실시간 데이터 조회
- **필터링**: Status가 "Published"인 프로젝트만 표시

### 2. 콘텐츠 관리
- **목록 조회**: Notion에서 프로젝트 목록 가져오기
- **상세 페이지**: 각 프로젝트의 상세 정보 표시
- **이미지/영상**: Thumbnail 파일 및 Content 페이지 본문 렌더링

### 3. 필터링 및 검색
- **분야별 필터링**: Category, Tools 기준 필터링
- **검색 기능**: 프로젝트 제목/설명 검색
- **정렬**: 최신순, Featured 우선 등

### 4. 사용자 경험
- **반응형 디자인**: 모바일, 태블릿, PC 모두 지원
- **성능 최적화**: 이미지 최적화, 캐싱 전략
- **접근성**: WCAG 기준 준수

### 5. 관리 기능
- **메타데이터**: SEO 최적화 (OG 태그, 구조화된 데이터)
- **에러 처리**: API 오류, 네트워크 실패 시 우아한 대응
- **로그**: 데이터 동기화 로그 (향후)

---

## 📊 Notion 데이터 구조

### Projects 데이터베이스 스키마

| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| **Name** | title | 프로젝트 제목 | "Fire Explosion VFX" |
| **Category** | select | 작업 분류 | Unreal Engine, Houdini, Niagara |
| **Tools** | multi_select | 사용 도구 | Niagara, Cascade, C++ |
| **Description** | rich_text | 간단한 설명 | "Unreal Niagara 폭발 효과" |
| **Thumbnail** | files | 썸네일 이미지 | image.png |
| **Status** | select | 공개 상태 | Draft / Published / Archived |
| **CreatedAt** | date | 작성 날짜 | 2025-10-09 |
| **Featured** | checkbox | 대표 프로젝트 | true / false |
| **Content** | page_content | 프로젝트 상세 페이지 본문 | (페이지 내용) |

### 추가 메타데이터 (향후)
- Demo URL: 실행 가능한 데모 링크
- Repository: 소스코드 저장소
- Tags: 추가 분류
- Duration: 작업 기간

---

## 🎨 화면 구성

### 1. Home 페이지 (`/`)
**목적**: 포트폴리오 소개 및 대표 작품 전시

**구성 요소**
- Header: 로고 + 네비게이션 + 테마 전환
- Hero Section: 아티스트 소개
- Featured Projects: Featured가 true인 프로젝트 슬라이드/그리드
- Call-to-Action: "전체 작품 보기" 버튼
- Footer: 연락처, SNS 링크

**데이터 출처**
- Featured Projects: `Featured: true` 필터링

---

### 2. Projects 페이지 (`/projects`)
**목적**: 모든 프로젝트 목록 전시 및 탐색

**구성 요소**
- Hero Section: 페이지 제목 및 설명
- 필터/검색 패널:
  - Category 필터 (multi-select)
  - Tools 필터 (multi-select)
  - 검색 입력창
- 프로젝트 그리드:
  - 카드 레이아웃 (3열 반응형)
  - 썸네일 이미지
  - 제목, 분류, 도구
  - "상세 보기" 링크

**데이터 출처**
- 모든 프로젝트: `Status: "Published"`
- 동적 필터링: 클라이언트 사이드 또는 쿼리 파라미터

---

### 3. Project Detail 페이지 (`/projects/[id]`)
**목적**: 각 프로젝트의 상세 정보 전시

**구성 요소**
- Header: 프로젝트 제목, 분류, 도구 배지
- 썸네일 이미지 또는 갤러리
- 메타정보:
  - 분류 (Category)
  - 사용 도구 (Tools)
  - 작성 날짜 (CreatedAt)
  - 상세 설명 (Description)
- 본문 콘텐츠: Notion 페이지 본문 렌더링
- Navigation:
  - 이전/다음 프로젝트
  - "전체 프로젝트" 링크

**데이터 출처**
- 프로젝트 정보: Notion Database
- Notion 페이지 본문: Notion Blocks API

---

### 4. About 페이지 (`/about`)
**목적**: 아티스트 소개 및 연락처

**구성 요소**
- 프로필 이미지
- 소개 텍스트
- 경력 정보
- 기술 스택
- SNS 링크
- 연락처 정보

**데이터 출처**
- 수동 작성 또는 별도 Notion 페이지 (향후 통합 가능)

---

### 5. Navigation & Layout
**공통 요소**
- Header: 로고, 메뉴 (Home, Projects, About), 테마 토글
- Footer: 저작권, 링크, SNS

---

## 🎯 MVP (Minimum Viable Product) 범위

### MVP Phase 1: Core Functionality

#### 구현 대상
1. **Home 페이지**
   - 기본 소개 섹션
   - Featured 프로젝트 3-4개 표시 (고정 레이아웃)

2. **Projects 페이지**
   - Notion에서 모든 Published 프로젝트 조회
   - 그리드 레이아웃 (반응형)
   - 기본 필터링 (Category 선택)
   - 검색 기능 (제목 기준)

3. **Project Detail 페이지**
   - 프로젝트 기본 정보 표시
   - 썸네일 이미지
   - Notion 페이지 본문 렌더링
   - 메타정보 (분류, 도구, 날짜)

4. **About 페이지**
   - 정적 아티스트 소개
   - 연락처 정보

5. **공통**
   - Navigation & Header
   - 반응형 디자인
   - 라이트/다크 테마
   - 에러 페이지

### MVP Phase 2: Polish (Post-MVP)
- 이미지 최적화 및 캐싱
- SEO 메타태그
- Analytics 통합
- 성능 모니터링

### Out of Scope (MVP)
- 서버 사이드 렌더링 최적화 (ISR)
- 다국어 지원
- CMS 관리자 페이지
- 댓글 기능
- 다운로드 기능

---

## 🏗️ 기술 아키텍처

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui, Radix UI
- **Icons**: lucide-react
- **Theme**: next-themes

### Backend & API
- **CMS**: Notion API (@notionhq/client)
- **API Routes**: Next.js API Routes (향후)
- **Caching**: Next.js Image Optimization, Vercel Edge Caching
- **Database**: Notion (External)

### Deployment
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network
- **CI/CD**: GitHub Actions (향후)

---

## 📋 구현 계획

### Phase 1: 준비 (Week 1)
- [ ] Notion Integration 설정
  - Notion API 인증 토큰 생성
  - Database ID 확인
  - 샘플 데이터 작성
- [ ] 환경 변수 설정
  - `.env.local` 에 NOTION_TOKEN, NOTION_DATABASE_ID 추가
- [ ] 프로젝트 구조 설계
  - lib/notion 폴더 생성
  - 타입 정의 (types/notion.ts)

### Phase 2: 핵심 기능 개발 (Week 2-3)
- [ ] Notion API 클라이언트 구성
  - Database 쿼리 함수
  - 페이지 콘텐츠 가져오기
- [ ] Home 페이지
  - Hero 섹션
  - Featured 프로젝트 표시
- [ ] Projects 페이지
  - 프로젝트 목록 그리드
  - 필터링 로직
  - 검색 기능
- [ ] Project Detail 페이지
  - 동적 라우팅
  - Notion 콘텐츠 렌더링

### Phase 3: 완성도 및 배포 (Week 4)
- [ ] 스타일링 및 UI 개선
  - 반응형 디자인 검증
  - 다크모드 테스트
- [ ] 에러 처리
  - API 오류 대응
  - 네트워크 실패 대응
- [ ] SEO 최적화
  - 메타 태그
  - Sitemap
- [ ] Vercel 배포
  - 빌드 및 배포 확인

### Phase 4: 모니터링 및 개선 (Week 5+)
- [ ] 성능 모니터링
- [ ] 사용자 피드백 수집
- [ ] 추가 기능 구현

---

## 📊 완료 기준 (Acceptance Criteria)

### Functional Requirements
- [x] Notion Database에서 Published 프로젝트 목록 조회 가능
- [x] 각 프로젝트 상세 정보 페이지 접근 가능
- [x] 프로젝트 검색 기능 동작
- [x] 카테고리별 필터링 동작
- [x] Notion 페이지 본문이 웹사이트에 올바르게 렌더링
- [x] 모든 이미지 올바르게 표시
- [x] 404 및 에러 페이지 표시

### Non-Functional Requirements
- [x] 반응형 디자인 (mobile, tablet, desktop)
- [x] 라이트/다크 테마 전환
- [x] 페이지 로드 시간 < 3초
- [x] Lighthouse 성능 점수 > 80
- [x] SEO 기본 점수 > 90
- [x] 접근성 WCAG 2.1 AA 준수

### Code Quality
- [x] TypeScript 타입 안정성 100%
- [x] ESLint 규칙 준수
- [x] 코드 주석 및 문서 작성
- [x] 환경 변수 관리 (민감한 정보 보호)

---

## 🚀 배포 전략

### Development
```bash
npm run dev  # localhost:3000
```

### Staging
- GitHub main 브랜치 푸시
- Vercel 자동 빌드 및 배포

### Production
```bash
npm run build
npm run start
# 또는 Vercel 자동 배포
```

---

## 📝 Notion 설정 가이드

### 1. Notion Database 생성
1. Notion Workspace에서 새 Database 생성
2. Database 이름: "Projects"
3. Properties 설정:
   - Name (title)
   - Category (select)
   - Tools (multi_select)
   - Description (rich_text)
   - Thumbnail (files)
   - Status (select: Draft, Published, Archived)
   - CreatedAt (date)
   - Featured (checkbox)
   - Content (페이지 본문 사용)

### 2. Notion Integration 설정
1. [Notion Developers](https://www.notion.com/my-integrations) 방문
2. "New Integration" 클릭
3. "Internal Integration" 선택
4. 이름 입력 후 생성
5. Secret 토큰 복사 → `.env.local`에 `NOTION_TOKEN` 추가

### 3. Database 연동
1. Notion Database 열기
2. "Share" → Integration 추가
3. Database ID 확인
4. `.env.local`에 `NOTION_DATABASE_ID` 추가

### 4. 샘플 데이터 작성
Notion에서 몇 가지 테스트 프로젝트 생성:
```
- Fire Explosion VFX (Status: Published, Featured: true)
- Water Simulation (Status: Published, Featured: false)
- Particle Effects (Status: Draft)
```

---

## 📚 참고 자료

### Notion API
- [Notion API Documentation](https://developers.notion.com)
- [Notion Client SDK](https://github.com/makenotion/notion-client-js)

### Next.js & Framework
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Frontend
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)
- [lucide-react](https://lucide.dev)

### Deployment
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app)

---

## 🔒 보안 고려사항

- [ ] Notion API 토큰은 `.env.local`에만 저장
- [ ] 환경 변수는 Vercel 대시보드에서 설정
- [ ] Public한 정보만 웹사이트에 표시
- [ ] API Rate Limiting 구현 (향후)
- [ ] CORS 정책 확인

---

## 📞 문의 및 피드백

- 이 PRD는 프로젝트 진행에 따라 업데이트될 수 있습니다.
- 기능 추가 또는 수정 사항은 이 문서를 업데이트하여 반영합니다.
- 구현 중 이슈 발생 시 docs/ISSUES.md에 기록합니다.

---

**Last Updated**: 2025-10-09
**Status**: In Development
**Version**: 1.0
