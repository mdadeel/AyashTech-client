/**
 * Application-wide constants.
 * Centralizes magic strings to prevent typos and make refactoring easier.
 * 
 * Why centralize constants?
 * - Prevents typos in cookie/key names across files
 * - Single source of truth for values used in multiple places
 * - Makes it easy to change values during deployment or testing
 */

// Cookie names used for authentication
// These must match between frontend auth.js and any server-side cookie reading
const COOKIES = {
    AUTH_TOKEN: 'auth_token',
    USER_EMAIL: 'user_email',
    USER_ROLE: 'user_role',
    USER_ID: 'user_id',
    USER_NAME: 'user_name',
};

// User roles for authorization checks
const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
};

// Cookie configuration - 7 days expiry, works across subdomains
const COOKIE_OPTIONS = {
    expires: 7,
    path: '/',
    sameSite: 'lax',
};

// API endpoints (relative paths)
// Useful if we need to change API structure later
const API_ENDPOINTS = {
    ITEMS: '/items',
    AUTH: '/auth',
};

module.exports = {
    COOKIES,
    ROLES,
    COOKIE_OPTIONS,
    API_ENDPOINTS,
};
