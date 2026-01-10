'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    User,
    getCurrentUser,
    logout as authLogout,
    saveAuthSession,
    createMockToken,
    generateUserId,
    isAuthenticated as checkAuth
} from '@/lib/auth';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password?: string) => Promise<boolean>;
    signup: (email: string, name: string, password?: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session on mount
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setLoading(false);
    }, []);

    const login = async (email: string, _password?: string): Promise<boolean> => {
        try {
            // In mock mode, we just check if user exists in localStorage
            // In production, this would call a real login API
            const existingUser = getCurrentUser();

            if (existingUser && existingUser.email === email) {
                setUser(existingUser);
                return true;
            }

            // User not found
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const signup = async (email: string, name: string, _password?: string): Promise<boolean> => {
        try {
            // Generate unique userId
            const userId = generateUserId();

            // Create mock token
            const token = createMockToken(userId, name);

            // Create user object
            const newUser: User = {
                userId,
                name,
                email,
            };

            // Save to localStorage
            saveAuthSession(newUser, token);

            // Update state
            setUser(newUser);

            return true;
        } catch (error) {
            console.error('Signup error:', error);
            return false;
        }
    };

    const logout = () => {
        authLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                login,
                signup,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
