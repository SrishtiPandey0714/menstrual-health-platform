// Authentication utilities for mock authentication
// This works with the backend's USE_MOCK_AUTH=true mode

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface User {
    userId: string;
    name?: string;
    email?: string;
}

// Generate a unique user ID
export function generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Create a mock JWT token that the backend will accept
export function createMockToken(userId: string, name: string = 'User'): string {
    const header = btoa(JSON.stringify({ alg: 'none' }));
    const payload = btoa(JSON.stringify({ sub: userId, name }));
    return `${header}.${payload}.mock_signature`;
}

// Decode mock token to get user info
export function decodeMockToken(token: string): User | null {
    try {
        const parts = token.split('.');
        if (parts.length < 2) return null;

        const payload = JSON.parse(atob(parts[1]));
        return {
            userId: payload.sub,
            name: payload.name,
        };
    } catch {
        return null;
    }
}

// LocalStorage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Save auth session to localStorage
export function saveAuthSession(user: User, token: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token);
    }
}

// Get current user from localStorage
export function getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}

// Get current auth token
export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    return getCurrentUser() !== null && getAuthToken() !== null;
}

// Logout (clear session)
export function logout(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
    }
}

// API call helper with auth header
export async function apiCall(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = getAuthToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (options.headers) {
        Object.assign(headers, options.headers);
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include',
    });
}
