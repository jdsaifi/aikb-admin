# Permission-Based Middleware System

This application uses a comprehensive permission-based middleware system to protect routes and control access to different parts of the application.

## How It Works

### 1. Permission Structure

Permissions are structured as `module.action` format:

-   `users.view` - View users
-   `users.add` - Add new users
-   `users.edit` - Edit existing users
-   `projects.view` - View projects
-   `projects.add` - Add new projects
-   `projects.edit` - Edit existing projects
-   `calls.view` - View calls
-   `calls.add` - Add new calls
-   `calls.edit` - Edit existing calls
-   `user-groups.view` - View user groups
-   `user-groups.add` - Add new user groups
-   `user-groups.edit` - Edit existing user groups
-   `dashboard.view` - Access dashboard

### 2. Middleware Configuration

The middleware (`src/middleware.ts`) automatically checks permissions for all routes based on the `PERMISSIONS_MAP`:

```typescript
const PERMISSIONS_MAP: { [key: string]: string[] } = {
    '/users': ['users.view'],
    '/users/add': ['users.add'],
    '/users/[userId]': ['users.view', 'users.edit'],
    '/projects': ['projects.view'],
    '/projects/add': ['projects.add'],
    '/projects/[id]': ['projects.view'],
    '/projects/[id]/calls': ['projects.view', 'calls.view'],
    '/projects/[id]/calls/add': ['projects.view', 'calls.add'],
    '/projects/[id]/calls/[callId]': ['projects.view', 'calls.view'],
    '/projects/[id]/calls/[callId]/edit': ['projects.view', 'calls.edit'],
    '/projects/[id]/calls/[callId]/start-call': ['projects.view', 'calls.view'],
    '/user-groups': ['user-groups.view'],
    '/user-groups/add': ['user-groups.add'],
    '/user-groups/[userGroupId]': ['user-groups.view', 'user-groups.edit'],
    '/dashboard': ['dashboard.view'],
};
```

### 3. How Permissions Are Loaded

Permissions are loaded from the user's session via NextAuth. The session callback in `auth.config.ts` processes the user's user group permissions and formats them into the `module.action` format.

## Usage Examples

### 1. Server-Side Permission Checking

Use the `canUserAccess` function in server components or server actions:

```typescript
import { canUserAccess } from '@/lib/actions';

// In a server component
export default async function MyPage() {
    const canAddProjects = await canUserAccess('projects.add');

    return <div>{canAddProjects && <Button>Add New Project</Button>}</div>;
}
```

### 2. Using the hasPermission Utility

For more complex permission checks, use the utility functions:

```typescript
import {
    hasPermission,
    hasAnyPermission,
    getUserPermissions,
} from '@/lib/hasPermission';

// Check if user has all required permissions
const canEditProject = await hasPermission(['projects.view', 'projects.edit']);

// Check if user has any of the required permissions
const canViewOrEdit = await hasAnyPermission([
    'projects.view',
    'projects.edit',
]);

// Get all user permissions
const permissions = await getUserPermissions();
```

### 3. Client-Side Permission Checking

For client components, use the client-side functions:

```typescript
import { checkPermission, checkAnyPermission } from '@/lib/hasPermission';

// In a client component
function MyComponent({ userPermissions }: { userPermissions: string[] }) {
    const canEdit = checkPermission(['projects.edit'], userPermissions);
    const canViewOrEdit = checkAnyPermission(
        ['projects.view', 'projects.edit'],
        userPermissions
    );

    return (
        <div>
            {canEdit && <EditButton />}
            {canViewOrEdit && <ViewButton />}
        </div>
    );
}
```

### 4. Adding New Protected Routes

To add a new protected route, simply add it to the `PERMISSIONS_MAP` in `src/middleware.ts`:

```typescript
const PERMISSIONS_MAP: { [key: string]: string[] } = {
    // ... existing routes
    '/new-feature': ['new-feature.view'],
    '/new-feature/add': ['new-feature.add'],
    '/new-feature/[id]': ['new-feature.view', 'new-feature.edit'],
};
```

### 5. Dynamic Route Protection

The middleware automatically handles dynamic routes using regex pattern matching:

```typescript
// This pattern will match /projects/123, /projects/abc, etc.
'/projects/[id]': ['projects.view']

// This pattern will match /projects/123/calls/456, etc.
'/projects/[id]/calls/[callId]': ['projects.view', 'calls.view']
```

## Error Handling

### 403 Forbidden Page

When a user doesn't have the required permissions, they are redirected to `/403` which shows a user-friendly error page with options to:

-   Go to Dashboard
-   Go Home
-   Contact administrator

### Logging

The middleware logs permission checks for debugging:

-   Access granted: Shows the route and required permissions
-   Access denied: Shows the route, required permissions, and user's actual permissions

## Best Practices

1. **Always check permissions server-side** for sensitive operations
2. **Use client-side checks** for UI elements (buttons, links) to improve UX
3. **Be specific** with permissions - use granular permissions rather than broad ones
4. **Test thoroughly** - ensure all routes are properly protected
5. **Monitor logs** - check middleware logs to ensure permissions are working correctly

## Troubleshooting

### Common Issues

1. **Permission not working**: Check that the permission is correctly formatted as `module.action`
2. **Route not protected**: Ensure the route is added to `PERMISSIONS_MAP`
3. **Session not loading**: Verify NextAuth configuration and session callbacks
4. **Dynamic routes not matching**: Check the regex pattern in the middleware

### Debug Mode

Enable debug logging by checking the console for middleware logs:

```
Access granted: /projects/123 - User has required permissions: projects.view
Access denied: /users/add requires users.add but user has users.view, projects.view
```

## Security Notes

-   The middleware runs on every request to protected routes
-   Permissions are checked server-side to prevent client-side bypassing
-   Session data is validated on each request
-   Unauthorized access attempts are logged for security monitoring
