/**
 * 관리자 대시보드 페이지
 * /admin
 *
 * 프로젝트 현황 조회 전용
 * 서버 측 환경변수 기반 인증
 */

import { searchDatabasePages } from '@/lib/notion/queries';
import { NotionProjectRaw } from '@/types/notion';

interface AdminDashboardPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

async function AdminDashboardPage({ searchParams }: AdminDashboardPageProps) {
  const { token } = await searchParams;
  const adminToken = process.env.ADMIN_TOKEN;

  // 인증 확인 (환경변수 기반)
  if (!adminToken || token !== adminToken) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">접근 불가</h1>
          <p className="text-muted-foreground">관리자 인증이 필요합니다.</p>
        </div>
      </div>
    );
  }

  // 프로젝트 현황 조회
  let projects: NotionProjectRaw[] = [];
  let error: string | null = null;

  try {
    projects = await searchDatabasePages();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch projects';
    console.error('Error fetching projects for admin:', error);
  }

  // 프로젝트 분류
  const published = projects.filter((p) => p.properties?.Status?.select?.name === 'Published');
  const draft = projects.filter((p) => p.properties?.Status?.select?.name === 'Draft');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">관리자 대시보드</h1>
          <p className="mt-2 text-muted-foreground">프로젝트 현황</p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {error ? (
          <div className="rounded-lg border border-red-500/50 bg-red-50/50 dark:bg-red-950/20 p-4">
            <p className="text-red-700 dark:text-red-400">오류: {error}</p>
          </div>
        ) : (
          <>
            {/* 통계 영역 */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-sm font-medium text-muted-foreground">전체 프로젝트</h3>
                <p className="mt-2 text-3xl font-bold">{projects.length}</p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-sm font-medium text-muted-foreground">공개 (Published)</h3>
                <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">{published.length}</p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-sm font-medium text-muted-foreground">임시저장 (Draft)</h3>
                <p className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">{draft.length}</p>
              </div>
            </div>

            {/* 프로젝트 목록 */}
            <div className="rounded-lg border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">프로젝트 목록</h2>
              </div>

              <div className="divide-y">
                {projects.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    프로젝트가 없습니다.
                  </div>
                ) : (
                  projects.map((project) => {
                    const title = project.properties?.Name?.title?.[0]?.plain_text || 'Untitled';
                    const status = project.properties?.Status?.select?.name || 'Draft';
                    const statusColor = status === 'Published'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';

                    return (
                      <div key={project.id} className="p-6 flex items-center justify-between hover:bg-muted/50">
                        <div className="flex-1">
                          <h3 className="font-semibold">{title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{project.id}</p>
                        </div>
                        <div className={`px-3 py-1 rounded text-sm font-medium ${statusColor}`}>
                          {status}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboardPage;
