import { auth } from '@/auth';

/**
 * Check if the current user has the required permissions
 * @param requiredPermissions - Array of permissions required
 * @param userPermissions - Array of user's permissions (optional, will fetch from session if not provided)
 * @param userRole - User's role (optional, will fetch from session if not provided)
 * @returns Promise<boolean> - True if user has all required permissions
 */
export async function hasPermission(
    requiredPermissions: string[],
    userPermissions?: string[],
    userRole?: string
): Promise<boolean> {
    if (!userPermissions || !userRole) {
        const session = await auth();
        userPermissions = session?.permissions || [];
        userRole = session?.user?.role;
    }

    // Admin users have access to everything
    if (userRole === 'admin') {
        return true;
    }

    return requiredPermissions.every((permission) =>
        userPermissions!.includes(permission)
    );
}

/**
 * Check if the current user has any of the required permissions
 * @param requiredPermissions - Array of permissions required
 * @param userPermissions - Array of user's permissions (optional, will fetch from session if not provided)
 * @param userRole - User's role (optional, will fetch from session if not provided)
 * @returns Promise<boolean> - True if user has at least one required permission
 */
export async function hasAnyPermission(
    requiredPermissions: string[],
    userPermissions?: string[],
    userRole?: string
): Promise<boolean> {
    if (!userPermissions || !userRole) {
        const session = await auth();
        userPermissions = session?.permissions || [];
        userRole = session?.user?.role;
    }

    // Admin users have access to everything
    if (userRole === 'admin') {
        return true;
    }

    return requiredPermissions.some((permission) =>
        userPermissions!.includes(permission)
    );
}

/**
 * Get all permissions for the current user
 * @returns Promise<string[]> - Array of user's permissions
 */
export async function getUserPermissions(): Promise<string[]> {
    const session = await auth();
    const userRole = session?.user?.role;

    // Admin users have all permissions
    if (userRole === 'admin') {
        return ['admin.*']; // Special permission for admin
    }

    return session?.permissions || [];
}

/**
 * Client-side permission check (for use in components)
 * @param requiredPermissions - Array of permissions required
 * @param userPermissions - Array of user's permissions
 * @param userRole - User's role
 * @returns boolean - True if user has all required permissions
 */
export function checkPermission(
    requiredPermissions: string[],
    userPermissions: string[],
    userRole?: string
): boolean {
    // Admin users have access to everything
    if (userRole === 'admin') {
        return true;
    }

    return requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
    );
}

/**
 * Client-side permission check for any permission (for use in components)
 * @param requiredPermissions - Array of permissions required
 * @param userPermissions - Array of user's permissions
 * @param userRole - User's role
 * @returns boolean - True if user has at least one required permission
 */
export function checkAnyPermission(
    requiredPermissions: string[],
    userPermissions: string[],
    userRole?: string
): boolean {
    // Admin users have access to everything
    if (userRole === 'admin') {
        return true;
    }

    return requiredPermissions.some((permission) =>
        userPermissions.includes(permission)
    );
}
