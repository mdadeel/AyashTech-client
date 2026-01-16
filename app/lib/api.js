// API Configuration and Client
const getBaseUrl = () => {
    // If we are on the client, use relative path to leverage Next.js rewrites
    if (typeof window !== 'undefined') {
        return '/api';
    }
    // If we are on the server (SSR/SSG), we need an absolute URL
    return process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

class ApiClient {
    constructor() {
        // Base URL is dynamic based on environment
    }

    async request(endpoint, options = {}) {
        const baseUrl = getBaseUrl();
        // Remove leading slash from endpoint if present to avoid double slashes with base url that might end in slash
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const url = `${baseUrl}${cleanEndpoint}`; // baseUrl now includes /api or is just /api

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers,
                cache: options.cache || 'no-store',
            });

            if (!response.ok) {
                // Try to parse error message from server
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP Error ${response.status}`);
            }

            // Return null for 204 No Content
            if (response.status === 204) return null;

            return await response.json();
        } catch (error) {
            console.error(`[API] Request failed for ${endpoint}:`, error);
            return { success: false, error: error.message };
        }
    }

    get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url);
    }

    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE',
        });
    }

    put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }
}

const client = new ApiClient();

// Public API Methods

export async function getItems(filters = {}) {
    // Clean up filters to remove null/undefined
    const validFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null && v !== '')
    );
    return client.get('/items', validFilters);
}

export async function getItem(id) {
    return client.get(`/items/${id}`);
}

export async function createItem(itemData) {
    return client.post('/items', itemData);
}

export async function updateItem(id, itemData) {
    return client.put(`/items/${id}`, itemData);
}

export async function deleteItem(id) {
    return client.delete(`/items/${id}`);
}
