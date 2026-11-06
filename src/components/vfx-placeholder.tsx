/**
 * VFX 스타일 플레이스홀더 컴포넌트
 * Notion에 썸네일이 없을 때 표시
 */

import { NotionProject } from '@/types/notion';

interface VFXPlaceholderProps {
  project: NotionProject;
  className?: string;
}

export function VFXPlaceholder({ project, className = '' }: VFXPlaceholderProps) {
  // 프로젝트 카테고리에 따라 색상 결정
  const getPlaceholderStyle = (): { bg: string; accent: string; icon: string } => {
    const category = project.category?.toLowerCase() || '';
    const tools = project.tools.map((t) => t.toLowerCase()).join(' ');

    // 전기 계열: 보라색, 파란색
    if (
      category.includes('magic') ||
      tools.includes('electric') ||
      project.title.toLowerCase().includes('electric')
    ) {
      return {
        bg: 'from-purple-900 to-blue-900',
        accent: 'via-purple-600',
        icon: '⚡',
      };
    }

    // 물 계열: 청록색, 파란색
    if (
      category.includes('water') ||
      tools.includes('water') ||
      project.title.toLowerCase().includes('water')
    ) {
      return {
        bg: 'from-teal-900 to-blue-900',
        accent: 'via-cyan-600',
        icon: '💧',
      };
    }

    // 기본: 어두운 배경
    return {
      bg: 'from-slate-900 to-slate-800',
      accent: 'via-slate-700',
      icon: '✨',
    };
  };

  const { bg, accent, icon } = getPlaceholderStyle();

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${bg} ${className}`}
    >
      {/* 애니메이션 배경 그라디언트 */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-30`}
      />

      {/* 중앙 아이콘 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-5xl mb-3 drop-shadow-lg">{icon}</div>
        <p className="text-sm font-medium text-white/80 px-4 text-center drop-shadow-md">
          {project.category || 'VFX Project'}
        </p>
      </div>

      {/* 코너 장식 */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20" />

      {/* 스캔라인 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30 pointer-events-none" />
    </div>
  );
}
