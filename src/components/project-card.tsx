/**
 * 프로젝트 카드 컴포넌트
 * 프로젝트 목록에 표시되는 개별 카드
 */

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { VFXPlaceholder } from '@/components/vfx-placeholder';
import { NotionProject } from '@/types/notion';

interface ProjectCardProps {
  project: NotionProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary">
        {/* 썸네일 이미지 또는 플레이스홀더 */}
        <div className="relative h-48 w-full overflow-hidden bg-muted aspect-video">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={true}
            />
          ) : (
            <VFXPlaceholder project={project} />
          )}
        </div>

        {/* 콘텐츠 */}
        <div className="p-4">
          {/* 제목 */}
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground">
            {project.title}
          </h3>

          {/* 설명 */}
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {project.description || '설명 없음'}
          </p>

          {/* 배지 영역 */}
          <div className="flex flex-wrap gap-2">
            {project.category && (
              <Badge variant="secondary" className="text-xs">
                {project.category}
              </Badge>
            )}
            {project.tools.slice(0, 2).map((tool) => (
              <Badge key={tool} variant="outline" className="text-xs">
                {tool}
              </Badge>
            ))}
            {project.tools.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{project.tools.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
