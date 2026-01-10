'use client';

import { useState, useEffect } from 'react';
import { apiCall, getCurrentUser } from '@/lib/auth';

export interface UserProfile {
    userId: string;
    ageGroup: string;
    country: string;
    language: string;
    gender: string;
    diet: string;
    dietaryRestrictions?: string;
    accessibility: string;
    aiConsent: boolean;
}

export function usePersonalization() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            const user = getCurrentUser();
            if (!user) {
                setLoading(false);
                return;
            }

            const response = await apiCall('/api/auth/profile');

            if (response.ok) {
                const data = await response.json();
                const profileData = data.profile || data; // Handle both {profile: {...}} and direct response
                setProfile(profileData);
            } else {
                setError('Failed to load profile');
            }
        } catch (err) {
            console.error('Error loading profile:', err);
            setError('Error loading profile');
        } finally {
            setLoading(false);
        }
    };

    const refreshProfile = () => {
        setLoading(true);
        loadUserProfile();
    };

    return { profile, loading, error, refreshProfile };
}

// Hook for AI-powered food recommendations
export function usePersonalizedFood(phase: string = 'menstrual') {
    const { profile } = usePersonalization();
    const [food, setFood] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile) {
            loadFood();
        }
    }, [profile, phase]);

    const loadFood = async () => {
        try {
            // Add timestamp to bypass cache
            const timestamp = Date.now();
            const cacheVersion = 'v2'; // Increment when backend filtering changes
            const response = await apiCall(`/api/food?phase=${phase}&_t=${timestamp}&_v=${cacheVersion}`);

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ Food loaded for ${phase}:`, data);
                setFood(data);
            } else {
                console.error('Failed to load food');
            }
        } catch (err) {
            console.error('Error loading food:', err);
        } finally {
            setLoading(false);
        }
    };

    return { food, loading };
}

// Hook for AI-powered beverage recommendations
export function usePersonalizedBeverages(phase: string = 'menstrual') {
    const { profile } = usePersonalization();
    const [beverages, setBeverages] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile) {
            loadBeverages();
        }
    }, [profile, phase]);

    const loadBeverages = async () => {
        try {
            // Add timestamp to bypass cache
            const timestamp = Date.now();
            const cacheVersion = 'v2'; // Increment when backend filtering changes
            const response = await apiCall(`/api/beverages?phase=${phase}&_t=${timestamp}&_v=${cacheVersion}`);

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ Beverages loaded for ${phase}:`, data);
                setBeverages(data);
            } else {
                console.error('Failed to load beverages');
            }
        } catch (err) {
            console.error('Error loading beverages:', err);
        } finally {
            setLoading(false);
        }
    };

    return { beverages, loading };
}
