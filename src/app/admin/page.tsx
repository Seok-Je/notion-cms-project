'use client';

import { useState, useEffect } from 'react';
import { NotionProjectRaw } from '@/types/notion';
import { Button } from '@/components/ui/button';

async function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState<NotionProjectRaw[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 쿠키 확인 및 대시보드 로드
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/admin/check');
        if (response.ok) {
          setIsAuthenticated(true);
          // 프로젝트 목록 조회
          const projectsResponse = await fetch('/api/admin/projects');
          if (projectsResponse.ok) {
            const data = await projectsResponse.json();
            setProjects(data);
          }
        }
      } catch (err) {
        console.error('Auth check failed');
      }
    }

    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError('비밀번호가 올바르지 않습니다.');
        return;
      }

      // 로그인 성공 후 페이지 새로고침
      window.location.reload();
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로그인 폼
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="rounded-lg border bg-card p-8">
            <h1 className="text-2xl font-bold mb-2">관리자 로그인</h1>
            <p className="text-muted-foreground mb-6">비밀번호를 입력하세요.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? '로그인 중...' : '로그인'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 대시보드
  const published = projects.filter((p) => p.properties?.Status?.select?.name === 'Published');
  const draft = projects.filter((p) => p.properties?.Status?.select?.name === 'Draft');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">관리자 대시보드</h1>
            <p className="mt-2 text-muted-foreground">프로젝트 현황</p>
          </div>
          <Button variant="outline" asChild>
            <a href="/api/admin/logout">로그아웃</a>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
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
      </main>
    </div>
  );
}

export default AdminDashboardPage;
