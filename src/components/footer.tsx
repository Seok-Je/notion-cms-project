/**
 * 공통 Footer 컴포넌트
 */

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Game VFX Portfolio</h3>
            <p className="text-sm text-muted-foreground">
              게임 VFX 아티스트의 포트폴리오 웹사이트
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">링크</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  홈
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  className="hover:text-primary transition-colors"
                >
                  작품
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary transition-colors">
                  소개
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">기술</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Unreal Engine 5</li>
              <li>Niagara VFX System</li>
              <li>Next.js & React</li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Game VFX Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
