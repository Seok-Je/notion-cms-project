/**
 * 메인 페이지 (홈)
 * Game VFX Portfolio의 홈페이지
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getMostRecentProjects } from '@/lib/notion/queries';
import { ProjectCard } from '@/components/project-card';
import { ErrorState, EmptyState } from '@/components/error-state';
import { Button } from '@/components/ui/button';
import { NotionProject } from '@/types/notion';

export const metadata: Metadata = {
  title: 'Game VFX Portfolio - 게임 VFX 아티스트 포트폴리오',
  description:
    'Unreal Engine, Niagara, Houdini를 활용한 게임 VFX 포트폴리오. 매직 VFX, 파티클 시스템, 환경 효과 등 다양한 작품을 확인하세요.',
  keywords: ['VFX', 'Game VFX', 'Unreal Engine', 'Niagara', 'Houdini', '포트폴리오'],
  openGraph: {
    title: 'Game VFX Portfolio',
    description: '게임 VFX 아티스트의 포트폴리오',
    type: 'website',
  },
};

async function HomePage() {
  let projects: NotionProject[] = [];
  let error: string | null = null;

  try {
    projects = await getMostRecentProjects(6);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load projects';
    console.error('Error loading projects:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Game VFX Portfolio</h1>
            <Link href="/projects">
              <Button variant="outline">전체 작품 보기</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 소개 섹션 */}
        <section className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">작품 포트폴리오</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            게임 VFX 아티스트의 다양한 프로젝트를 만나보세요.
          </p>
        </section>

        {/* 프로젝트 그리드 */}
        <section>
          <h3 className="mb-8 text-2xl font-bold">최신 작품</h3>

          {error ? (
            <ErrorState
              title="프로젝트를 불러올 수 없습니다"
              description={error}
            />
          ) : projects.length === 0 ? (
            <EmptyState
              title="프로젝트가 없습니다"
              description="아직 공개된 프로젝트가 없습니다."
            />
          ) : (
            <>
              <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {projects.length > 0 && (
                <div className="flex justify-center">
                  <Link href="/projects">
                    <Button size="lg">전체 작품 보기 →</Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* 푸터 */}
      <footer className="border-t bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Game VFX Portfolio © 2025. 모든 권리 예약.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
