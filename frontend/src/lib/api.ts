/**
 * API Client for Luniva Backend
 * Handles all API communication with the Express backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Utility function for API calls with authentication
 */
export async function apiCall(endpoint: string, options: RequestInit = {}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Create mock token for development - IMPORTANT: userId must match database!
    const mockToken = btoa(JSON.stringify({ header: { alg: 'none' } })) + '.' +
        btoa(JSON.stringify({ sub: 'test2', name: 'Test User' })) + // Changed to match actual userId in database
        '.mock_signature';

    const headers = {
        'Authorization': `Bearer ${mockToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
    };

    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include',
    });
}

/**
 * Base fetch wrapper with error handling
 */
async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    // Merge headers
    const headers = {
        ...defaultHeaders,
        ...options.headers,
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include', // Include cookies for auth
        });

        // Handle non-200 responses
        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: `HTTP Error ${response.status}: ${response.statusText}`,
            }));
            throw new Error(error.message || 'API request failed');
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
}

/**
 * API Methods
 */
export const api = {
    // Health Check
    health: async () => {
        return apiFetch('/health');
    },

    // Profile Management
    profile: {
        get: async () => {
            return apiFetch('/profile');
        },
        save: async (profileData: any) => {
            return apiFetch('/profile', {
                method: 'POST',
                body: JSON.stringify(profileData),
            });
        },
    },

    // Cycle Tracking
    cycle: {
        getAll: async () => {
            return apiFetch('/cycle');
        },
        add: async (cycleData: any) => {
            return apiFetch('/cycle', {
                method: 'POST',
                body: JSON.stringify(cycleData),
            });
        },
    },

    // AI Assistant
    ai: {
        ask: async (question: string) => {
            return apiFetch('/ai/ask', {
                method: 'POST',
                body: JSON.stringify({ question }),
            });
        },
    },

    // Food & Nutrition
    food: {
        get: async () => {
            return apiFetch('/food');
        },
    },

    // Beverages
    beverages: {
        get: async () => {
            return apiFetch('/beverages');
        },
    },

    // Translation
    translate: {
        text: async (text: string, targetLanguage: string) => {
            return apiFetch('/translate', {
                method: 'POST',
                body: JSON.stringify({ text, targetLanguage }),
            });
        },
    },
};

/**
 * Auth token helper (for future authentication)
 */
export function setAuthToken(token: string | null) {
    if (typeof window !== 'undefined') {
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    }
}

export function getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
}

export default api;
