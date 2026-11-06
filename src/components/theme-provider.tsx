'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: unknown;
}) {
  return (
    <NextThemesProvider {...(props as Record<string, unknown>)}>
      {children}
    </NextThemesProvider>
  );
}
