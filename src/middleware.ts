import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

// Define permissions map for different routes
const PERMISSIONS_MAP: { [key: string]: string[] } = {
    '/users': ['users.view'],
    '/users/add': ['users.create', 'user-groups.view'],
    '/users/[userId]': ['users.view', 'users.edit', 'user-groups.view'],
    '/projects': ['projects.view'],
    '/projects/add': ['projects.create'],
    '/projects/[id]': ['projects.view'],
    '/projects/[id]/calls': ['projects.view', 'calls.view'],
    '/projects/[id]/calls/add': ['projects.view', 'calls.create'],
    '/projects/[id]/calls/[callId]': ['projects.view', 'calls.view'],
    '/projects/[id]/calls/[callId]/edit': ['projects.view', 'calls.edit'],
    '/projects/[id]/calls/[callId]/start-call': ['projects.view', 'calls.view'],
    '/projects/[id]/users': [
        'projects.view',
        'users.view',
        'projects.users.view',
    ],
    '/user-groups': ['user-groups.view'],
    '/user-groups/add': ['user-groups.create'],
    '/user-groups/[userGroupId]': ['user-groups.view', 'user-groups.edit'],
    // '/dashboard': ['dashboard.view'], // Commented out as requested
};

// Helper function to check if user has required permissions
function hasPermission(
    userPermissions: string[],
    requiredPermissions: string[]
): boolean {
    return requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
    );
}

// Helper function to match route pattern
function matchRoute(pathname: string, routePattern: string): boolean {
    // Convert Next.js dynamic route pattern to regex
    const regexPattern = routePattern
        .replace(/\[([^\]]+)\]/g, '[^/]+') // Replace [param] with regex
        .replace(/\//g, '\\/'); // Escape forward slashes

    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(pathname);
}

// Helper function to find required permissions for a pathname
function getRequiredPermissions(pathname: string): string[] {
    for (const [routePattern, permissions] of Object.entries(PERMISSIONS_MAP)) {
        if (matchRoute(pathname, routePattern)) {
            return permissions;
        }
    }
    return [];
}

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Skip permission check for public routes
    const publicRoutes = ['/login', '/api', '/_next', '/favicon.ico', '/'];
    const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Get the session using NextAuth v5 auth function
    const session = await auth();
    console.log('\n\n\n=============>session:', session);

    // If no session, redirect to login
    if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check if user is admin - admins have access to everything
    const userRole = session.user?.role;
    if (userRole === 'admin') {
        console.log(
            `Admin access granted: ${pathname} - Admin role bypasses permission checks`
        );
        return NextResponse.next();
    }

    const userPermissions = session.permissions || [];

    // Get required permissions for the current route
    const requiredPermissions = getRequiredPermissions(pathname);

    // If no specific permissions are required, allow access
    if (requiredPermissions.length === 0) {
        return NextResponse.next();
    }

    // Check if user has required permissions
    if (!hasPermission(userPermissions, requiredPermissions)) {
        console.log(
            `Access denied: ${pathname} requires ${requiredPermissions.join(
                ', '
            )} but user has ${userPermissions.join(', ')}`
        );
        return NextResponse.redirect(new URL('/403', req.url));
    }

    console.log(
        `Access granted: ${pathname} - User has required permissions: ${requiredPermissions.join(
            ', '
        )}`
    );
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
