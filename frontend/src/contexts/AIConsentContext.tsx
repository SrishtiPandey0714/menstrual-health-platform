'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AIConsentContextType = {
  hasAIConsent: boolean;
  setAIConsent: (consent: boolean) => void;
};

const AIConsentContext = createContext<AIConsentContextType | undefined>(undefined);

export function AIConsentProvider({ children }: { children: ReactNode }) {
  const [hasAIConsent, setHasAIConsent] = useState<boolean>(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem('aiConsent');
    if (savedConsent !== null) {
      setHasAIConsent(savedConsent === 'true');
    }
  }, []);

  const setAIConsent = (consent: boolean) => {
    setHasAIConsent(consent);
    localStorage.setItem('aiConsent', String(consent));
  };

  return (
    <AIConsentContext.Provider value={{ hasAIConsent, setAIConsent }}>
      {children}
    </AIConsentContext.Provider>
  );
}

export function useAIConsent() {
  const context = useContext(AIConsentContext);
  if (context === undefined) {
    throw new Error('useAIConsent must be used within an AIConsentProvider');
  }
  return context;
}
