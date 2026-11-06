/**
 * 공통 Header 컴포넌트
 */

import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <h1 className="text-2xl font-bold hover:text-muted-foreground transition-colors">
                Game VFX Portfolio
              </h1>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                홈
              </Link>
              <Link
                href="/projects"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                작품
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                소개
              </Link>
            </nav>
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
