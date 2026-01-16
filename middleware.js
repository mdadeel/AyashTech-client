import { NextResponse } from 'next/server';

// Route protection configuration
const adminRoutes = ['/admin/dashboard', '/admin/add-item', '/admin/products', '/admin/products/edit', '/admin/requests', '/admin/users', '/admin/orders', '/admin/analytics', '/admin/settings'];
const userRoutes = ['/dashboard'];

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Check admin routes
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    if (isAdminRoute) {
        const adminToken = request.cookies.get('admin_token')?.value;
        const userRole = request.cookies.get('user_role')?.value;

        // Allow if admin_token exists OR user_role is admin
        if (!adminToken && userRole !== 'admin') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Check user dashboard routes
    const isUserRoute = userRoutes.some(route => pathname.startsWith(route));
    if (isUserRoute) {
        const authToken = request.cookies.get('auth_token')?.value;

        if (!authToken) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/dashboard/:path*'
    ]
};
