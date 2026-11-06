# Vercel 배포 준비 가이드

## Game VFX Portfolio CMS - MVP 배포

**프로젝트:** Game VFX Portfolio CMS
**상태:** MVP 완성, Vercel 배포 준비 완료
**배포 날짜:** 2026-11-06

---

## 📋 배포 전 확인 사항

### ✅ 완료된 항목
- [x] Next.js 16.4.5 (최신 보안 패치)
- [x] TypeScript strict mode
- [x] Tailwind CSS v4
- [x] Notion API 통합
- [x] 모든 페이지 구현
- [x] Build 테스트 통과
- [x] 환경변수 보안 (.gitignore)
- [x] Git 커밋 완료

### 📄 필수 파일
```
✓ next.config.js
✓ tsconfig.json
✓ package.json
✓ package-lock.json
✓ .gitignore
```

---

## 🔑 Vercel 환경변수 설정

배포 시 Vercel Dashboard에서 다음 환경변수를 설정하세요:

### 필수 환경변수

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `NOTION_TOKEN` | `ntn_...` | Notion Integration 토큰 |
| `NOTION_DATABASE_ID` | `adfa87ad-baa9-820f-a7be-81992b82d10d` | Projects Database ID |
| `NOTION_DATA_SOURCE_ID` | `957a87ad-baa9-839e-a039-076d563612cc` | Data Source ID |

### 설정 방법

1. **Vercel 대시보드 로그인**
2. **프로젝트 설정 → Environment Variables**
3. **위의 3개 변수 추가**
4. **Production 환경에 적용**

---

## 🚀 배포 절차

### 1단계: GitHub 저장소 연결
```bash
# 현재 상태 확인
git remote -v

# 저장소: https://github.com/[사용자]/[저장소명]
```

### 2단계: Vercel 프로젝트 생성
1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. **"Add New..." → "Project"**
3. GitHub 저장소 선택
4. 프로젝트명: `game-vfx-portfolio` (또는 원하는 이름)

### 3단계: 빌드 설정
- **Framework Preset:** Next.js (자동 감지)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 4단계: 환경변수 설정
1. **프로젝트 설정 → Environment Variables**
2. 위의 3개 변수 추가
3. **Environment:** Production 선택

### 5단계: 배포
1. **Deploy 버튼 클릭**
2. 배포 진행 중... (약 2-3분)
3. 배포 완료 후 URL 제공

---

## ✅ 배포 후 확인 사항

### 1. 기본 페이지 접근 확인
```
✓ https://[project-url].vercel.app/          (홈)
✓ https://[project-url].vercel.app/projects  (프로젝트 목록)
✓ https://[project-url].vercel.app/about     (소개)
✓ https://[project-url].vercel.app/api/projects  (API)
```

### 2. Notion API 연동 확인
- 홈 페이지에서 최신 프로젝트 표시 확인
- /projects 페이지에서 필터링/검색 동작 확인
- 프로젝트 상세 페이지 접근 확인

### 3. 기능 테스트
- [x] 필터링: 카테고리, 도구 선택 동작
- [x] 검색: 제목/설명 검색 동작
- [x] 테마: 라이트/다크 모드 전환
- [x] 반응형: 모바일, 태블릿, PC에서 정상 표시

### 4. 성능 확인
```bash
# Lighthouse 체크 (Vercel Analytics에서 확인 가능)
- Performance: > 80
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90
```

---

## 🔧 배포 후 트러블슈팅

### 문제: 프로젝트가 표시되지 않음
**원인:** Notion API 연동 실패
**해결:**
1. 환경변수가 모두 설정되었는지 확인
2. Notion Integration 토큰 유효성 확인
3. Vercel 로그 확인: `Deployments → Logs`

### 문제: API 오류 (401 Unauthorized)
**원인:** 잘못된 토큰
**해결:**
1. Notion Developers에서 토큰 재확인
2. Vercel 환경변수 갱신
3. 배포 다시 실행

### 문제: 빌드 실패
**원인:** TypeScript 오류 또는 의존성 문제
**해결:**
1. 로컬에서 `npm run build` 테스트
2. 오류 수정 후 git push
3. Vercel에서 자동 재배포

---

## 📊 배포 현황

| 항목 | 상태 |
|------|------|
| **MVP 기능** | ✅ 완성 |
| **Next.js** | ✅ 16.4.5 |
| **Notion API** | ✅ 연동 |
| **TypeScript** | ✅ 컴파일 성공 |
| **Build 테스트** | ✅ 성공 |
| **Git 준비** | ✅ 완료 |
| **환경변수 보안** | ✅ 안전 |
| **Vercel 배포** | ⏳ 준비됨 |

---

## 🎯 MVP 기능 목록

### 구현됨 (7개)
1. ✅ Home 페이지 (최신 프로젝트)
2. ✅ Projects 페이지 (목록, 필터링, 검색)
3. ✅ Project Detail 페이지 (상세 정보)
4. ✅ About 페이지 (아티스트 소개)
5. ✅ API 엔드포인트 (/api/projects)
6. ✅ Notion API 통합
7. ✅ 반응형 디자인 & 테마

### 향후 추가 예정 (Post-MVP)
- [ ] SEO 메타데이터 개선
- [ ] 페이지 캐싱 (ISR)
- [ ] Analytics 통합
- [ ] 댓글 기능
- [ ] 관리자 대시보드

---

## 📝 관련 문서

- [PRD (Product Requirements Document)](./docs/PRD.md)
- [ROADMAP (개발 로드맵)](./docs/ROADMAP.md)
- [CLAUDE.md (개발 가이드)](./CLAUDE.md)

---

**배포 준비 완료!** 🎉

Vercel 대시보드에서 GitHub 저장소를 연결하면 자동으로 배포가 시작됩니다.

**배포 시간:** 약 2-3분
**배포 후 성능:** Lighthouse 점수 80+ 예상
