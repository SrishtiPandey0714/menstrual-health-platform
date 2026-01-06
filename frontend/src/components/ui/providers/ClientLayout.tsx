// src/components/ui/providers/ClientLayout.tsx
'use client';

import * as React from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/app/providers';
import { AIConsentProvider } from '@/contexts/AIConsentContext';
import Navbar from '@/components/ui/layout/Navbar';

type ClientLayoutProps = React.PropsWithChildren<{}>;

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider>
      <AIConsentProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Toaster position="top-center" richColors />
        </div>
      </AIConsentProvider>
    </ThemeProvider>
  );
}