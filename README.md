# Game VFX Portfolio CMS

Notion API를 활용한 게임 VFX 포트폴리오 콘텐츠 관리 시스템(CMS)입니다. Notion에서 관리하는 VFX 작업물들이 자동으로 포트폴리오 웹사이트에 반영됩니다.

## 📖 프로젝트 개요

**Game VFX Portfolio CMS**는 게임 VFX 아티스트를 위한 포트폴리오 웹사이트입니다. 아티스트가 Notion에서 작업물을 관리하면, 웹사이트가 자동으로 최신 콘텐츠를 표시합니다.

### 핵심 특징
- **Notion 중심 관리**: 아티스트가 익숙한 Notion에서 모든 콘텐츠 작성
- **자동 동기화**: Notion 변경사항이 실시간으로 웹사이트에 반영
- **전문적인 디자인**: shadcn/ui 기반의 모던 포트폴리오 웹사이트
- **완전 반응형**: 모바일, 태블릿, PC 모든 기기 지원
- **라이트/다크 모드**: 사용자 선호도에 맞는 테마 지원

## 🚀 기술 스택

### Frontend
- **Next.js 16** - React 기반 풀스택 프레임워크
- **React 19** - 최신 React 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS v4** - 유틸리티 기반 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 컴포넌트 라이브러리
- **Radix UI** - 헤드리스 UI 프리미티브
- **lucide-react** - 아름다운 SVG 아이콘 세트
- **next-themes** - 라이트/다크 테마 지원

### Backend & CMS
- **Notion API** (@notionhq/client) - 콘텐츠 데이터 소스
- **Next.js API Routes** - 서버 사이드 로직

### Deployment
- **Vercel** - 호스팅 및 배포

## 📁 프로젝트 구조

```
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root Layout
│   │   ├── page.tsx                # 홈 페이지
│   │   ├── globals.css             # 글로벌 스타일
│   │   ├── projects/
│   │   │   ├── page.tsx            # 프로젝트 목록 페이지
│   │   │   └── [id]/
│   │   │       └── page.tsx        # 프로젝트 상세 페이지
│   │   └── about/
│   │       └── page.tsx            # 아티스트 소개 페이지
│   ├── components/
│   │   ├── ui/                     # shadcn/ui 컴포넌트
│   │   ├── theme-provider.tsx
│   │   └── mode-toggle.tsx
│   ├── lib/
│   │   ├── notion.ts               # Notion API 클라이언트
│   │   └── utils.ts                # 유틸리티 함수
│   └── types/
│       └── notion.ts               # Notion 타입 정의
├── docs/
│   └── PRD.md                      # 프로젝트 요구사항 문서
├── public/                         # 정적 파일
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── .env.example                    # 환경변수 예시
└── README.md                       # 이 파일
```

## ✨ 주요 기능

### 1. Notion 연동
- Notion API를 통한 프로젝트 데이터 실시간 조회
- Published 상태의 프로젝트만 자동으로 표시
- 프로젝트 메타데이터 (분류, 도구, 날짜) 동기화

### 2. 포트폴리오 페이지
- **홈 페이지**: 대표 프로젝트 및 아티스트 소개
- **프로젝트 목록**: 전체 작업물 조회 (그리드 레이아웃)
- **프로젝트 상세**: 각 작업의 상세 정보 및 Notion 페이지 본문
- **소개 페이지**: 아티스트 정보 및 연락처

### 3. 검색 및 필터링
- 프로젝트 제목/설명 검색
- 카테고리별 필터링 (Unreal Engine, Houdini, Niagara 등)
- 사용 도구별 필터링

### 4. 사용자 경험
- 완전한 반응형 디자인
- 라이트/다크 테마 지원
- 빠른 로딩 속도 및 최적화
- 접근성 준수 (WCAG 2.1)

## 🛠️ 시작하기

### 1. 의존성 설치

```bash
npm install
# 또는
yarn install
# 또는
bun install
```

### 2. Notion 설정

#### 2.1 Notion Integration 생성
1. [Notion Developers](https://www.notion.com/my-integrations) 방문
2. "New Integration" 클릭
3. 이름 입력 후 생성
4. Secret 토큰 복사

#### 2.2 Database 생성 및 연동
1. Notion Workspace에서 "Projects" Database 생성
2. 다음 Properties 추가:
   - Name (title)
   - Category (select)
   - Tools (multi_select)
   - Description (rich_text)
   - Thumbnail (files)
   - Status (select: Draft, Published)
   - CreatedAt (date)
   - Featured (checkbox)
   - Content (페이지 본문)

3. Database를 Integration과 공유

#### 2.3 환경 변수 설정
`.env.local` 파일 생성:

```bash
# Notion API
NEXT_PUBLIC_NOTION_TOKEN=your_integration_secret
NEXT_PUBLIC_NOTION_DATABASE_ID=your_database_id
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 4. 빌드 및 배포

```bash
npm run build
npm run start
```

## 📝 사용 가능한 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (포트 3000) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 검사 |
| `npm run lint:fix` | ESLint 자동 수정 |

## 🎨 테마 커스터마이징

### 색상 변경

`src/app/globals.css`에서 CSS 변수를 수정하여 색상을 커스터마이징할 수 있습니다:

```css
:root {
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 100%;
  /* ... 나머지 색상 변수 ... */
}
```

### Tailwind 설정

`tailwind.config.ts`에서 Tailwind CSS를 커스터마이징할 수 있습니다:

```typescript
const config: Config = {
  theme: {
    extend: {
      colors: { /* ... */ },
      fontFamily: { /* ... */ },
    },
  },
};
```

## 📦 주요 파일 설명

### `src/app/layout.tsx`
- ThemeProvider 래핑
- 메타데이터 설정
- Root HTML 구조

### `src/app/page.tsx`
- 홈 페이지 (대표 프로젝트 전시)

### `src/app/projects/page.tsx`
- 프로젝트 목록 페이지
- 필터링 및 검색 기능

### `src/app/projects/[id]/page.tsx`
- 프로젝트 상세 페이지
- Notion 콘텐츠 렌더링

### `src/app/about/page.tsx`
- 아티스트 소개 페이지

### `src/components/ui/*`
- shadcn/ui 기반 재사용 가능한 컴포넌트
- Radix UI 프리미티브 활용

### `src/lib/notion.ts`
- Notion API 클라이언트
- Database 쿼리 함수

### `src/lib/utils.ts`
- `cn()` 함수 (className 병합)
- 유틸리티 함수 저장소

### `src/types/notion.ts`
- Notion 관련 TypeScript 타입 정의

## 🔧 설정 파일

### `next.config.js`
- Next.js 기본 설정
- React Strict Mode 활성화

### `tsconfig.json`
- TypeScript 컴파일러 옵션
- `@/*` 경로 별칭 설정

### `tailwind.config.ts`
- Tailwind CSS 테마 확장
- 다크모드 설정
- 커스텀 색상/폰트 정의

### `postcss.config.js`
- PostCSS 플러그인 설정 (Tailwind, Autoprefixer)

### `.eslintrc.json`
- Next.js ESLint 규칙

## 🚀 배포

### Vercel (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

또는 GitHub을 연결하고 자동 배포 설정

### 환경 변수 설정 (Vercel)

Vercel 대시보드에서 다음 환경 변수 추가:
- `NEXT_PUBLIC_NOTION_TOKEN`: Notion Integration Secret
- `NEXT_PUBLIC_NOTION_DATABASE_ID`: Projects Database ID

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 추가 리소스

## 📚 추가 리소스

### 프로젝트 문서
- [docs/PRD.md](docs/PRD.md) - 프로젝트 요구사항 및 구현 계획

### 기술 문서
- [Next.js 16 문서](https://nextjs.org/docs)
- [Notion API 문서](https://developers.notion.com)
- [Tailwind CSS v4 문서](https://tailwindcss.com)
- [shadcn/ui 문서](https://ui.shadcn.com)
- [Radix UI 문서](https://www.radix-ui.com)

## 💡 개발 가이드

### Notion API 클라이언트 작성

\`src/lib/notion.ts\`에서 다음을 구현합니다:
\`\`\`typescript
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_TOKEN,
});

export async function getPublishedProjects() {
  // Database 쿼리 로직
}

export async function getProjectById(id: string) {
  // 프로젝트 상세 조회 로직
}
\`\`\`

### 타입 정의

\`src/types/notion.ts\`에서 프로젝트 타입 정의:
\`\`\`typescript
export interface Project {
  id: string;
  name: string;
  category: string;
  tools: string[];
  description: string;
  thumbnail?: string;
  status: "Draft" | "Published";
  createdAt: Date;
  featured: boolean;
}
\`\`\`

### 페이지 구현

\`src/app/projects/page.tsx\`에서 프로젝트 목록 표시:
\`\`\`typescript
import { getPublishedProjects } from "@/lib/notion";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();
  
  return (
    <div>
      {/* 프로젝트 목록 렌더링 */}
    </div>
  );
}
\`\`\`

## 📖 다음 단계

1. **docs/PRD.md** 검토 - 전체 프로젝트 요구사항 확인
2. **Notion Integration** 설정 - 위의 "Notion 설정" 가이드 참고
3. **Notion API 클라이언트** 구현 - \`src/lib/notion.ts\` 작성
4. **페이지 개발** - 홈, 프로젝트 목록, 상세 페이지 순서로 구현
5. **스타일링 및 테스트** - shadcn/ui 컴포넌트 활용
6. **Vercel 배포** - 최종 배포

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여

버그 리포트, 기능 제안, PR은 환영합니다!

---

**Happy Coding! 🎉**

프로젝트 관련 질문이나 문제가 있으시면 [GitHub Issues](https://github.com)에서 보고해주세요.
