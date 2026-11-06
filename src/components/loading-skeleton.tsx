/**
 * 로딩 상태 스켈레톤 컴포넌트
 */

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      {/* 이미지 스켈레톤 */}
      <div className="h-48 w-full bg-muted animate-pulse" />

      {/* 콘텐츠 스켈레톤 */}
      <div className="p-4 space-y-3">
        {/* 제목 */}
        <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />

        {/* 설명 */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
        </div>

        {/* 배지 */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}
