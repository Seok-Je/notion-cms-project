/**
 * 프로젝트 목록 페이지
 * /projects
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectCard } from '@/components/project-card';
import { ProjectGridSkeleton } from '@/components/loading-skeleton';
import { ErrorState, EmptyState } from '@/components/error-state';
import { NotionProject } from '@/types/notion';

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<NotionProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<NotionProject[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 프로젝트 데이터 로드
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');

        const data = await response.json();
        setAllProjects(data.projects);

        // 고유한 카테고리와 도구 추출
        const uniqueCategories = new Set<string>();
        const uniqueTools = new Set<string>();

        data.projects.forEach((project: NotionProject) => {
          if (project.category) uniqueCategories.add(project.category);
          project.tools.forEach((tool) => uniqueTools.add(tool));
        });

        setCategories(Array.from(uniqueCategories).sort());
        setTools(Array.from(uniqueTools).sort());
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load projects'
        );
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // 필터링 및 검색
  useEffect(() => {
    let filtered = allProjects;

    // 카테고리 필터
    if (selectedCategories.size > 0) {
      filtered = filtered.filter(
        (p) => p.category && selectedCategories.has(p.category)
      );
    }

    // 도구 필터
    if (selectedTools.size > 0) {
      filtered = filtered.filter((p) =>
        p.tools.some((t) => selectedTools.has(t))
      );
    }

    // 검색 필터 (제목 또는 설명)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    setFilteredProjects(filtered);
  }, [allProjects, selectedCategories, selectedTools, searchQuery]);

  const toggleCategory = (category: string) => {
    const newSet = new Set(selectedCategories);
    if (newSet.has(category)) {
      newSet.delete(category);
    } else {
      newSet.add(category);
    }
    setSelectedCategories(newSet);
  };

  const toggleTool = (tool: string) => {
    const newSet = new Set(selectedTools);
    if (newSet.has(tool)) {
      newSet.delete(tool);
    } else {
      newSet.add(tool);
    }
    setSelectedTools(newSet);
  };

  const resetFilters = () => {
    setSelectedCategories(new Set());
    setSelectedTools(new Set());
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-3xl font-bold hover:text-muted-foreground transition-colors">
                Game VFX Portfolio
              </h1>
            </Link>
            <Link href="/">
              <Button variant="outline">홈으로</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 페이지 제목 */}
        <div className="mb-8">
          <h2 className="mb-2 text-4xl font-bold">모든 작품</h2>
          <p className="text-lg text-muted-foreground">
            전체 {allProjects.length}개의 작품 중
            {selectedCategories.size + selectedTools.size + (searchQuery ? 1 : 0) >
            0
              ? ` ${filteredProjects.length}개 표시`
              : ` ${filteredProjects.length}개 모두 보기`}
          </p>
        </div>

        {error && (
          <div className="mb-8">
            <ErrorState
              title="프로젝트를 불러올 수 없습니다"
              description={error}
              onRetry={() => window.location.reload()}
            />
          </div>
        )}

        {!error && (
          <>
            {/* 필터 영역 */}
            <div className="mb-8 rounded-lg border bg-card p-6">
              {/* 검색창 */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium mb-2">
                  검색
                </label>
                <Input
                  id="search"
                  type="text"
                  placeholder="프로젝트 제목 또는 설명으로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* 카테고리 필터 */}
              {categories.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-medium">분류</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={
                          selectedCategories.has(category)
                            ? 'default'
                            : 'outline'
                        }
                        className="cursor-pointer"
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* 도구 필터 */}
              {tools.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-medium">사용 도구</h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant={
                          selectedTools.has(tool) ? 'default' : 'outline'
                        }
                        className="cursor-pointer"
                        onClick={() => toggleTool(tool)}
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* 초기화 버튼 */}
              {(selectedCategories.size > 0 ||
                selectedTools.size > 0 ||
                searchQuery) && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={resetFilters}
                  className="w-full sm:w-auto"
                >
                  필터 초기화
                </Button>
              )}
            </div>

            {/* 프로젝트 그리드 */}
            {loading ? (
              <ProjectGridSkeleton />
            ) : filteredProjects.length === 0 ? (
              <EmptyState
                title="프로젝트를 찾을 수 없습니다"
                description={
                  allProjects.length === 0
                    ? '아직 공개된 프로젝트가 없습니다.'
                    : '선택한 필터에 해당하는 프로젝트가 없습니다.'
                }
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </>
        )}
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
