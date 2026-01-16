import Cookies from 'js-cookie';

// Demo accounts - for testing purposes only
export const MOCK_USERS = [
    {
        id: '1',
        email: 'admin@ayashtech.com',
        password: 'admin2026!',
        name: 'Ayash Rahman',
        role: 'admin',
        avatar: null
    },
    {
        id: '2',
        email: 'demo@ayashtech.com',
        password: 'demo1234',
        name: 'Rafiq Ahmed',
        role: 'user',
        avatar: null
    }
];

// Cookie configuration
const COOKIE_OPTIONS = {
    expires: 7,
    path: '/',
    sameSite: 'lax'
};

// Authenticate user with credentials - returns role info
export function authenticate(email, password) {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (user) {
        const token = btoa(`${user.role}:${email}:${Date.now()}`);
        Cookies.set('auth_token', token, COOKIE_OPTIONS);
        Cookies.set('user_email', email, COOKIE_OPTIONS);
        Cookies.set('user_role', user.role, COOKIE_OPTIONS);
        Cookies.set('user_id', user.id, COOKIE_OPTIONS);
        Cookies.set('user_name', user.name, COOKIE_OPTIONS);

        // If user is admin, also set the admin_token to satisfy middleware checks
        // This ensures the main login page works seamlessy for admins
        if (user.role === 'admin') {
            Cookies.set('admin_token', token, COOKIE_OPTIONS);
        }

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        };
    }

    return { success: false, error: 'Invalid email or password' };
}

// Check if user is authenticated
export function isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return !!Cookies.get('auth_token');
}

// Check if user is admin
export function isAdmin() {
    if (typeof window === 'undefined') return false;
    return Cookies.get('user_role') === 'admin';
}

// Get current user with full info
export function getCurrentUser() {
    if (typeof window === 'undefined') return null;
    const email = Cookies.get('user_email');
    const role = Cookies.get('user_role');
    const id = Cookies.get('user_id');
    const name = Cookies.get('user_name');

    return email ? { id, email, name, role } : null;
}

// Logout user - clears all auth cookies
export function logout() {
    Cookies.remove('auth_token');
    Cookies.remove('user_email');
    Cookies.remove('user_role');
    Cookies.remove('user_id');
    Cookies.remove('user_name');
}

// Get user role from cookie string (for middleware)
export function getRoleFromCookies(cookieString) {
    if (!cookieString) return null;

    const cookies = cookieString.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {});

    return cookies['user_role'] || null;
}

// Legacy export for demo login button
export const MOCK_CREDENTIALS = {
    email: 'demo@ayashtech.com',
    password: 'demo1234'
};
