'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Users,
    FolderOpen,
    Phone,
    UserCheck,
    Plus,
    Edit,
    Eye,
    Shield,
    Crown,
} from 'lucide-react';
import Link from 'next/link';
import { checkPermission, checkAnyPermission } from '@/lib/hasPermission';

interface PermissionExampleProps {
    userPermissions: string[];
    userRole?: string;
}

export function PermissionExample({
    userPermissions,
    userRole,
}: PermissionExampleProps) {
    // Check various permissions
    const canViewUsers = checkPermission(
        ['users.view'],
        userPermissions,
        userRole
    );
    const canAddUsers = checkPermission(
        ['users.create'],
        userPermissions,
        userRole
    );
    const canEditUsers = checkPermission(
        ['users.edit'],
        userPermissions,
        userRole
    );

    const canViewProjects = checkPermission(
        ['projects.view'],
        userPermissions,
        userRole
    );
    const canAddProjects = checkPermission(
        ['projects.create'],
        userPermissions,
        userRole
    );
    const canEditProjects = checkPermission(
        ['projects.edit'],
        userPermissions,
        userRole
    );

    const canViewCalls = checkPermission(
        ['calls.view'],
        userPermissions,
        userRole
    );
    const canAddCalls = checkPermission(
        ['calls.create'],
        userPermissions,
        userRole
    );
    const canEditCalls = checkPermission(
        ['calls.edit'],
        userPermissions,
        userRole
    );

    const canViewUserGroups = checkPermission(
        ['user-groups.view'],
        userPermissions,
        userRole
    );
    const canAddUserGroups = checkPermission(
        ['user-groups.create'],
        userPermissions,
        userRole
    );
    const canEditUserGroups = checkPermission(
        ['user-groups.edit'],
        userPermissions,
        userRole
    );

    const canAccessDashboard = checkPermission(
        ['dashboard.view'],
        userPermissions,
        userRole
    );

    const isAdmin = userRole === 'admin';

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        User Permission Dashboard
                    </CardTitle>
                    <CardDescription>
                        This component demonstrates how the permission system
                        works. Your current permissions and role are shown
                        below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-2">
                                Your Role & Permissions:
                            </h4>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {isAdmin ? (
                                    <Badge
                                        variant="default"
                                        className="bg-purple-600 hover:bg-purple-700"
                                    >
                                        <Crown className="mr-1 h-3 w-3" />
                                        Admin
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary">
                                        {userRole || 'No Role'}
                                    </Badge>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {userPermissions.length > 0 ? (
                                    userPermissions.map((permission) => (
                                        <Badge
                                            key={permission}
                                            variant="secondary"
                                        >
                                            {permission}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">
                                        No permissions assigned
                                    </p>
                                )}
                            </div>
                            {isAdmin && (
                                <p className="text-sm text-muted-foreground mt-2">
                                    <Crown className="inline mr-1 h-3 w-3" />
                                    Admin users have access to all features
                                    regardless of specific permissions.
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Users Section */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Users className="h-4 w-4" />
                                        Users
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {canViewUsers ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="w-full"
                                        >
                                            <Link href="/users">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Users
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled
                                            className="w-full"
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Users
                                        </Button>
                                    )}

                                    {canAddUsers ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="w-full"
                                        >
                                            <Link href="/users/add">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add User
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled
                                            className="w-full"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add User
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Projects Section */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <FolderOpen className="h-4 w-4" />
                                        Projects
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {canViewProjects ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="w-full"
                                        >
                                            <Link href="/projects">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Projects
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled
                                            className="w-full"
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Projects
                                        </Button>
                                    )}

                                    {canAddProjects ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="w-full"
                                        >
                                            <Link href="/projects/add">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Project
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled
                                            className="w-full"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Project
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Calls Section */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Phone className="h-4 w-4" />
                                        Calls
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {canViewCalls ? (
                                        <div className="text-sm text-muted-foreground">
                                            Can view calls within projects
                                        </div>
                                    ) : (
                                        <div className="text-sm text-muted-foreground">
                                            No call access
                                        </div>
                                    )}

                                    {canAddCalls && (
                                        <div className="text-sm text-muted-foreground">
                                            Can add new calls
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* User Groups Section */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <UserCheck className="h-4 w-4" />
                                        User Groups
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {canViewUserGroups ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="w-full"
                                        >
                                            <Link href="/user-groups">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Groups
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled
                                            className="w-full"
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Groups
                                        </Button>
                                    )}

                                    {canAddUserGroups ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="w-full"
                                        >
                                            <Link href="/user-groups/add">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Group
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled
                                            className="w-full"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Group
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Dashboard Access */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">
                                    Reviews
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {canAccessDashboard ? (
                                    <></>
                                ) : (
                                    // <Button asChild>
                                    //     <Link href="/dashboard">
                                    //         Access Dashboard
                                    //     </Link>
                                    // </Button>
                                    <div className="text-center text-muted-foreground">
                                        No dashboard access
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
