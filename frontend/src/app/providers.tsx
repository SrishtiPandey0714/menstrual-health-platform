// src/app/providers.tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure we're only rendering the theme provider on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}