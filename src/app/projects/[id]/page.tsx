/**
 * 프로젝트 상세 페이지
 * /projects/[id]
 */

// 중요: Notion CMS의 동적 콘텐츠를 실시간으로 제공하기 위해 동적 렌더링 필수
// 이 설정이 없으면 Next.js가 빌드 시 페이지를 미리 렌더링하고 캐시하여
// 동적 라우트 파라미터가 undefined가 되어 404가 발생함
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { VFXPlaceholder } from '@/components/vfx-placeholder';
import { getProjectById } from '@/lib/notion/queries';
import { ErrorState } from '@/components/error-state';
import { ArrowLeft, Calendar } from 'lucide-react';

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;

  let project = null;
  let error: string | null = null;

  try {
    project = await getProjectById(id);
    if (!project) {
      notFound();
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load project';
    console.error('Error loading project:', error);
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <Link href="/projects">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                돌아가기
              </Button>
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <ErrorState
            title="프로젝트를 불러올 수 없습니다"
            description={error}
          />
        </main>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              돌아가기
            </Button>
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 제목 */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{project.title}</h1>

          {/* 배지 */}
          <div className="flex flex-wrap gap-2">
            {project.category && (
              <Badge variant="secondary" className="text-base">
                {project.category}
              </Badge>
            )}
            {project.tools.map((tool) => (
              <Badge key={tool} variant="outline" className="text-base">
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        {/* 썸네일 이미지 또는 플레이스홀더 */}
        <div className="mb-8 overflow-hidden rounded-lg">
          <div className="relative h-96 w-full aspect-video bg-muted">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                priority
                unoptimized={true}
              />
            ) : (
              <VFXPlaceholder project={project} />
            )}
          </div>
        </div>

        {/* 메타 정보 */}
        <div className="mb-12 rounded-lg border bg-card p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {project.category && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  분류
                </h3>
                <p className="mt-1 text-base font-semibold">{project.category}</p>
              </div>
            )}

            {project.tools.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  사용 도구
                </h3>
                <p className="mt-1 text-base font-semibold">
                  {project.tools.join(', ')}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                작성 날짜
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-base font-semibold">
                  {new Date(project.createdAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 설명 */}
        {project.description && (
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">설명</h2>
            <p className="whitespace-pre-wrap text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="border-t bg-muted/50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Game VFX Portfolio © 2025. 모든 권리 예약.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ProjectDetailPage;
