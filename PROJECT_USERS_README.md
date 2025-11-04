# Project Users Management

This feature allows administrators and project managers to assign users to specific projects, giving them access to project features and resources.

## Overview

The project users management system provides:

-   **User Assignment**: Add users to projects to grant them access
-   **User Removal**: Remove users from projects to revoke access
-   **User Management Interface**: Clean, intuitive UI for managing project access
-   **Permission Integration**: Works with the existing permission system

## How It Works

### 1. Access Control

The project users page is protected by the middleware and requires:

-   `projects.view` permission to view the project
-   `users.view` permission to view users

### 2. User Assignment Process

1. Navigate to a project's page
2. Click "Manage User's Access" in the project actions dropdown
3. Use the "Add User" button to assign users to the project
4. Select from available users (users not already assigned)
5. Confirm the assignment

### 3. User Removal Process

1. Navigate to the project users page
2. Find the user you want to remove
3. Click the "Remove" button next to their name
4. Confirm the removal

## API Endpoints

The feature uses the following API endpoints:

-   `GET /users/projects/{projectId}/users` - Get all users assigned to a project
-   `POST /users/projects/{projectId}/users` - Add a user to a project
-   `DELETE /users/projects/{projectId}/users/{userId}` - Remove a user from a project

## Components

### ProjectUsersTable

The main component for managing project users. Features:

-   **User List**: Displays all users currently assigned to the project
-   **Add User Dialog**: Modal for selecting and adding new users
-   **Remove User**: Button to remove users from the project
-   **User Information**: Shows name, email, user group, and status
-   **Empty State**: Helpful message when no users are assigned

### Key Features

-   **Real-time Updates**: Page refreshes after adding/removing users
-   **Error Handling**: Graceful error handling with user-friendly messages
-   **Loading States**: Visual feedback during operations
-   **Permission Checks**: Only shows actions the user has permission for
-   **Responsive Design**: Works on desktop and mobile devices

## Usage Examples

### Adding a User to a Project

```typescript
import { addUserToProjectAction } from '@/lib/actions';

const result = await addUserToProjectAction(projectId, userId);
if (result.success) {
    // User added successfully
} else {
    // Handle error
}
```

### Removing a User from a Project

```typescript
import { removeUserFromProjectAction } from '@/lib/actions';

const result = await removeUserFromProjectAction(projectId, userId);
if (result.success) {
    // User removed successfully
} else {
    // Handle error
}
```

## Security Considerations

1. **Permission Checks**: All operations are protected by middleware
2. **Session Validation**: Requires valid user session
3. **Input Validation**: Server-side validation of all inputs
4. **Error Handling**: Secure error messages that don't expose sensitive information

## Future Enhancements

Potential improvements for the project users feature:

1. **Bulk Operations**: Add/remove multiple users at once
2. **Role-based Access**: Different access levels within projects
3. **Access History**: Track when users were added/removed
4. **Email Notifications**: Notify users when they're added to projects
5. **Temporary Access**: Time-limited project access
6. **Audit Logging**: Detailed logs of all user assignment changes

## Troubleshooting

### Common Issues

1. **API Endpoint Not Found**: The backend API endpoints may not be implemented yet
2. **Permission Denied**: User doesn't have required permissions
3. **User Already Assigned**: Cannot add a user who is already in the project
4. **Network Errors**: Check API connectivity and authentication

### Debug Mode

Enable console logging to debug issues:

```typescript
// Check if user has required permissions
const canManageUsers = await canUserAccess(['projects.view', 'users.view']);

// Check API responses
console.log('Project users:', projectUsers);
console.log('All users:', allUsers);
```

## Integration with Existing Systems

The project users feature integrates with:

-   **Authentication System**: Uses NextAuth for session management
-   **Permission System**: Leverages existing permission middleware
-   **User Management**: Works with existing user and user group systems
-   **Project Management**: Extends existing project functionality
