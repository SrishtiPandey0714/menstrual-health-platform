'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultTranslations, flattenTranslations, getAllTranslationStrings } from '@/lib/translations';
import { getCurrentUser } from '@/lib/auth';

interface TranslationContextType {
    language: string;
    translations: Record<string, string>;
    t: (key: string, vars?: Record<string, string | number>) => string;
    isLoading: boolean;
    setLanguage: (lang: string) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function TranslationProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState('en');
    const [translations, setTranslations] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);

    // Flatten default translations
    const flatDefaults = flattenTranslations(defaultTranslations);

    // Auto-load user's language preference from profile
    useEffect(() => {
        const loadUserLanguage = async () => {
            try {
                const user = getCurrentUser();
                if (!user) {
                    setIsLoading(false);
                    return;
                }

                // Fetch user's profile to get language preference
                const { apiCall } = await import('@/lib/auth');
                const response = await apiCall('/api/auth/profile');

                if (response.ok) {
                    const data = await response.json();
                    const profile = data.profile || data; // Handle both {profile: {...}} and direct response
                    if (profile.language && profile.language !== 'en') {
                        setLanguage(profile.language);
                    } else {
                        setIsLoading(false);
                    }
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error loading user language:', error);
                setIsLoading(false);
            }
        };

        loadUserLanguage();
    }, []);

    useEffect(() => {
        loadTranslations();
    }, [language]);

    const loadTranslations = async () => {
        try {
            // If English, just use defaults
            if (language === 'en') {
                setTranslations(flatDefaults);
                setIsLoading(false);
                return;
            }

            // Check cache first
            const cacheKey = `translations_${language}_v4`; // v4: Added beverage section keys
            const cached = localStorage.getItem(cacheKey);

            if (cached) {
                try {
                    const parsed = JSON.parse(cached);
                    setTranslations(parsed);
                    setIsLoading(false);
                    return;
                } catch {
                    // Invalid cache, continue to fetch
                }
            }

            // Fetch translations from backend
            setIsLoading(true);

            const allStrings = getAllTranslationStrings();
            const response = await fetch(`${API_URL}/api/translate/batch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    texts: allStrings,
                    targetLang: language,
                }),
            });

            if (!response.ok) {
                console.error('Translation fetch failed, using defaults');
                setTranslations(flatDefaults);
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            const translatedStrings = data.translations || allStrings;

            // Map translations back to keys
            const keys = Object.keys(flatDefaults);
            const translatedMap: Record<string, string> = {};

            keys.forEach((key, index) => {
                translatedMap[key] = translatedStrings[index] || flatDefaults[key];
            });

            setTranslations(translatedMap);

            // Cache the translations
            try {
                localStorage.setItem(cacheKey, JSON.stringify(translatedMap));
            } catch {
                // Ignore cache errors
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Translation error:', error);
            setTranslations(flatDefaults);
            setIsLoading(false);
        }
    };

    // Translation function
    const t = (key: string, vars?: Record<string, string | number>): string => {
        let text = translations[key] || flatDefaults[key] || key;

        // Replace variables like {name}, {count}, etc.
        if (vars) {
            Object.keys(vars).forEach(varKey => {
                text = text.replace(new RegExp(`\\{${varKey}\\}`, 'g'), String(vars[varKey]));
            });
        }

        return text;
    };

    return (
        <TranslationContext.Provider
            value={{
                language,
                translations,
                t,
                isLoading,
                setLanguage,
            }}
        >
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
}

// Hook to load user's language preference
export function useUserLanguage() {
    const { setLanguage } = useTranslation();

    useEffect(() => {
        const loadUserLanguage = async () => {
            try {
                const user = getCurrentUser();
                if (!user) return;

                // Fetch user's profile to get language preference
                const { apiCall } = await import('@/lib/auth');
                const response = await apiCall('/api/auth/profile');

                if (response.ok) {
                    const data = await response.json();
                    const profile = data.profile || data; // Handle both {profile: {...}} and direct response
                    if (profile.language && profile.language !== 'en') {
                        setLanguage(profile.language);
                    }
                }
            } catch (error) {
                console.error('Error loading user language:', error);
            }
        };

        loadUserLanguage();
    }, [setLanguage]);
}
