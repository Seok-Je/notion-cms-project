# Game VFX Portfolio CMS - AI Agent 개발 규칙

**프로젝트명:** Game VFX Portfolio CMS
**작성일:** 2025-10-09
**목적:** AI Agent가 이 프로젝트를 안전하고 효율적으로 개발하기 위한 구체적 규칙 정의

---

## 1. Project Overview

### 1.1 프로젝트 목표
- Notion API를 활용하여 게임 VFX 아티스트의 포트폴리오 웹사이트 구축
- Notion 데이터베이스와 자동 동기화
- 전문적인 포트폴리오 웹사이트 자동 생성

### 1.2 기술 스택
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui, Radix UI
- **Icons:** lucide-react
- **CMS:** Notion API (@notionhq/client)
- **Deployment:** Vercel

### 1.3 핵심 특성
- **Notion 데이터 중심:** Published 프로젝트만 표시
- **5개 페이지:** Home, Projects, Project Detail, About, 404
- **반응형 디자인:** 모바일, 태블릿, 데스크톱 지원
- **다크/라이트 테마:** next-themes 사용

---

## 2. Directory Structure Requirements

### 2.1 필수 디렉토리 구조
```
project-root/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃 (Header, Footer 포함)
│   ├── page.tsx                 # Home 페이지
│   ├── about/
│   │   └── page.tsx             # About 페이지
│   ├── projects/
│   │   ├── page.tsx             # Projects 목록 페이지
│   │   └── [id]/
│   │       └── page.tsx         # Project Detail 페이지
│   ├── not-found.tsx            # 404 페이지
│   ├── error.tsx                # Error 페이지 (선택)
│   └── globals.css              # 전역 스타일
│
├── lib/
│   ├── notion/
│   │   ├── client.ts            # Notion 클라이언트 (서버 전용)
│   │   ├── queries.ts           # 데이터베이스 쿼리 함수
│   │   └── blocks.ts            # Notion 블록 렌더링
│   ├── utils.ts                 # 공통 유틸리티 함수
│   ├── date.ts                  # 날짜 포매팅 함수
│   └── image.ts                 # 이미지 처리 함수
│
├── components/
│   ├── common/
│   │   ├── ProjectCard.tsx      # 프로젝트 카드 컴포넌트
│   │   ├── Badge.tsx            # 배지 컴포넌트
│   │   ├── LoadingState.tsx     # 로딩 상태
│   │   ├── ErrorState.tsx       # 에러 상태
│   │   ├── EmptyState.tsx       # 비어있는 상태
│   │   ├── Header.tsx           # 헤더
│   │   └── Footer.tsx           # 푸터
│   └── sections/
│       ├── HeroSection.tsx      # 히어로 섹션
│       ├── FeaturedProjects.tsx # Featured 프로젝트
│       └── FilterPanel.tsx      # 필터 패널
│
├── types/
│   ├── notion.ts                # Notion 관련 타입
│   └── api.ts                   # API 응답 타입 (선택)
│
├── public/                       # 정적 파일
│   └── images/                   # 기본 이미지
│
├── docs/
│   ├── PRD.md                   # 수정 금지! 기능 요구사항 정의
│   └── ROADMAP.md               # 수정 금지! Phase별 개발 계획
│
├── .env.local                   # 환경 변수 (git 제외)
├── .env.local.example           # 환경 변수 템플릿
├── tsconfig.json                # TypeScript 설정
├── tailwind.config.ts           # Tailwind CSS 설정
├── next.config.ts               # Next.js 설정
└── package.json                 # 의존성
```

### 2.2 디렉토리 규칙
- **lib/notion/\*:** Notion API 관련 코드 (서버 전용, 클라이언트 import 금지)
- **components/common/:** 모든 페이지에서 재사용 가능한 컴포넌트
- **components/sections/:** 특정 페이지의 섹션 컴포넌트
- **types/:** TypeScript 인터페이스 및 타입 정의
- **docs/:** 프로젝트 문서 (PRD.md, ROADMAP.md) - 수정 금지

---

## 3. Phase Development Rules

### 3.1 Phase 순서 (절대 변경 금지)
```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
(건너뛰기, 역순 진행 금지)
```

### 3.2 Phase별 특성

| Phase | 기간 | 목표 | 시작 전 확인 |
|-------|------|------|-----------|
| **1** | 1~2일 | 프로젝트 골격, Notion 연동 | X (첫 Phase) |
| **2** | 2~3일 | Notion API 클라이언트, 공통 컴포넌트 | Phase 1 완료? |
| **3** | 3~4일 | Home, Projects, Detail, About 페이지 | Phase 1, 2 완료? |
| **4** | 2~3일 | 필터, 검색, SEO 최적화 | Phase 1, 2, 3 완료? |
| **5** | 1~2일 | 최적화, 배포, 보안 점검 | Phase 1~4 완료? |

### 3.3 Phase 시작 프로토콜
```
Phase N 작업 시작 시:
1. ROADMAP.md에서 해당 Phase 의존성 확인
2. 의존하는 모든 이전 Phase 완료 확인
3. ROADMAP.md의 "세부 작업 목록" 읽기
4. ROADMAP.md의 "완료 기준" 이해하기
5. 해당 Phase 작업만 구현 (범위 벗어난 작업 금지)
```

### 3.4 Phase 완료 프로토콜
```
Phase N 작업 완료 후:
1. ROADMAP.md의 "완료 기준" 모두 확인
2. 모든 체크리스트 항목 검증
3. npm run build 성공 확인
4. 다음 Phase 의존성 충족 확인
5. 커밋 메시지: "feat: complete phase N"
```

---

## 4. Code Standards

### 4.1 TypeScript 강제 사항
```typescript
// ✅ 필수: 모든 함수는 명시적 타입 정의
export async function getPublishedProjects(): Promise<Project[]> {
  // ...
}

// ✅ 필수: 인터페이스 정의 필수
interface Project {
  id: string;
  title: string;
  category: string;
  featured: boolean;
}

// ❌ 금지: any 타입 사용
const data: any = await fetch(...);
```

### 4.2 컴포넌트 패턴
```typescript
// ✅ 필수: React.FC<Props> 패턴
interface ProjectCardProps {
  id: string;
  title: string;
  thumbnail: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  thumbnail
}) => {
  return /* JSX */;
};
```

### 4.3 ESLint 준수
- `npm run build` 성공 필수
- TypeScript 오류 0개 필수

---

## 5. Notion API Integration Rules

### 5.1 API 토큰 보안
```
❌ 절대 금지:
- 클라이언트 컴포넌트에서 Notion 토큰 사용
- .env.local을 git에 커밋
- 토큰을 하드코딩

✅ 필수:
- lib/notion/* 에서만 토큰 사용 (서버)
- .env.local에 NOTION_TOKEN, NOTION_DATABASE_ID 저장
- .env.local.example에 템플릿만 제공
```

### 5.2 API 호출 위치
```typescript
// ✅ 올바른 위치: app/projects/page.tsx (서버 컴포넌트)
export default async function ProjectsPage() {
  const projects = await getPublishedProjects();
  return <ProjectGrid projects={projects} />;
}

// ❌ 절대 금지: 클라이언트에서 호출
'use client';
export const ProjectCard = () => {
  const [data] = useState(() => getPublishedProjects()); // ❌ 금지!
};
```

---

## 6. Prohibited Actions

### 6.1 절대 금지 사항
```
❌ Phase 순서 변경 또는 건너뛰기
❌ PRD의 Out of Scope 기능 구현
❌ 클라이언트에서 Notion API 토큰 사용
❌ ROADMAP.md를 무시하고 임의로 기능 추가
❌ .env.local을 git에 커밋
❌ any 타입 사용
❌ eslint-disable 주석 (규칙 위반 근본 해결 필수)
```

---

## 7. AI Decision Tree

### 7.1 기능 구현 여부 판단
```
1. PRD.md에 명시됨?
   └─ Yes: 2단계로

2. 현재 Phase에 포함됨?
   └─ Yes: 구현 진행
   └─ No: Phase 완료 후 검토
```

### 7.2 파일 생성 위치 판단
```
1. Notion API 관련? → lib/notion/
2. 재사용 컴포넌트? → components/common/
3. 페이지 섹션? → components/sections/
4. 타입 정의? → types/
5. 페이지? → app/
```

### 7.3 문서 참조 우선순위
```
1순위: PRD.md (무엇을 구현할 것인가?)
2순위: ROADMAP.md (어떤 순서로?)
3순위: CLAUDE.md (어떻게 구현?)
```

---

**Last Updated:** 2025-10-09
**Status:** Active
**Version:** 1.0
