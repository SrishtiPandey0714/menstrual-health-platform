// src/app/providers.tsx
'use client';

import { AIConsentProvider } from '@/contexts/AIConsentContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { TranslationProvider } from '@/contexts/TranslationContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TranslationProvider>
        <AIConsentProvider>
          {children}
        </AIConsentProvider>
      </TranslationProvider>
    </AuthProvider>
  );
}
