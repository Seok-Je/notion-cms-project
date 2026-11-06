/**
 * About 페이지
 * /about
 * 아티스트 소개 및 정보
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin } from 'lucide-react';

export const metadata = {
  title: 'About - Game VFX Portfolio',
  description: '게임 VFX 아티스트의 프로필 및 경력 정보',
};

export default function AboutPage() {
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
            <Link href="/projects">
              <Button variant="outline">작품 보기</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 소개 섹션 */}
        <div className="mb-16">
          <h1 className="mb-4 text-4xl font-bold">Game VFX Artist</h1>
          <p className="text-lg text-muted-foreground">
            Unreal Engine, Niagara, Houdini를 활용하여 고품질의 게임 VFX를
            제작합니다.
          </p>
        </div>

        {/* 전문 분야 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">전문 분야</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">Magic & Spell Effects</h3>
              <p className="text-muted-foreground">
                마법, 마법 효과, 주문 등 판타지 VFX 제작
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">Particle Systems</h3>
              <p className="text-muted-foreground">
                Niagara를 활용한 고급 파티클 시스템 구현
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">Environmental Effects</h3>
              <p className="text-muted-foreground">
                환경 요소 VFX (불, 물, 연기, 먼지 등)
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">Combat Effects</h3>
              <p className="text-muted-foreground">
                전투 액션 효과 및 임팩트 VFX
              </p>
            </div>
          </div>
        </section>

        {/* 기술 스택 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">기술 스택</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">엔진 & 도구</h3>
              <div className="flex flex-wrap gap-2">
                {['Unreal Engine 5', 'Niagara', 'Cascade', 'Houdini', 'Maya'].map(
                  (tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-muted px-3 py-1 text-sm font-medium"
                    >
                      {tool}
                    </span>
                  )
                )}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">프로그래밍</h3>
              <div className="flex flex-wrap gap-2">
                {['C++', 'Blueprint', 'HLSL/GLSL', 'Python'].map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full bg-muted px-3 py-1 text-sm font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 경력 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">경력</h2>
          <div className="space-y-6">
            <div className="border-l-2 border-primary pl-4">
              <h3 className="font-semibold">Senior VFX Artist</h3>
              <p className="text-sm text-muted-foreground">2023 - 현재</p>
              <p className="mt-2 text-muted-foreground">
                AAA 게임 프로젝트의 VFX 팀 리드
              </p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <h3 className="font-semibold">VFX Artist</h3>
              <p className="text-sm text-muted-foreground">2020 - 2023</p>
              <p className="mt-2 text-muted-foreground">
                모바일 및 PC 게임 VFX 제작
              </p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <h3 className="font-semibold">Junior VFX Artist</h3>
              <p className="text-sm text-muted-foreground">2018 - 2020</p>
              <p className="mt-2 text-muted-foreground">
                VFX 기초 및 파이프라인 학습
              </p>
            </div>
          </div>
        </section>

        {/* 연락처 */}
        <section className="mb-12 rounded-lg border bg-card p-8">
          <h2 className="mb-6 text-2xl font-bold">연락처</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              프리랜서 작업, 컨설팅, 또는 직무 제안에 대해 연락주세요.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:contact@example.com">
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  이메일
                </Button>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
              </a>
            </div>
          </div>
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
