// src/components/providers/ClientLayout.tsx
'use client';

import { Toaster } from 'sonner';
import { ThemeProvider } from '@/app/providers';
import { AIConsentProvider } from '@/contexts/AIConsentContext';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AIConsentProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors />
        </div>
      </AIConsentProvider>
    </ThemeProvider>
  );
}