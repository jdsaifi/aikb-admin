'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { IUser } from '../types';
import {
    addUserToProjectAction,
    removeUserFromProjectAction,
} from '../lib/actions';
import { toast } from 'sonner';
import { UserPlus, UserMinus, Users, Folder } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import Link from 'next/link';

interface ProjectUsersTableProps {
    projectUsers: IUser[];
    allUsers: IUser[];
    projectId: string;
}

export function ProjectUsersTable({
    projectUsers,
    allUsers,
    projectId,
}: ProjectUsersTableProps) {
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [isRemovingUser, setIsRemovingUser] = useState<string | null>(null);

    // Filter out users that are already assigned to the project
    const availableUsers = allUsers.filter(
        (user) =>
            !projectUsers.some((projectUser) => projectUser._id === user._id)
    );

    const handleAddUser = async () => {
        if (!selectedUserId) {
            toast.error('Please select a user');
            return;
        }

        setIsAddingUser(true);
        try {
            const result = await addUserToProjectAction(
                projectId,
                selectedUserId
            );
            if (result.success) {
                toast.success('User added to project successfully');
                setSelectedUserId('');
                // Refresh the page to show updated data
                window.location.reload();
            } else {
                toast.error(result.error || 'Failed to add user to project');
            }
        } catch (error) {
            toast.error('An error occurred while adding user to project');
        } finally {
            setIsAddingUser(false);
        }
    };

    const handleRemoveUser = async (userId: string) => {
        setIsRemovingUser(userId);
        try {
            const result = await removeUserFromProjectAction(projectId, userId);
            if (result.success) {
                toast.success('User removed from project successfully');
                // Refresh the page to show updated data
                window.location.reload();
            } else {
                toast.error(
                    result.error || 'Failed to remove user from project'
                );
            }
        } catch (error) {
            toast.error('An error occurred while removing user from project');
        } finally {
            setIsRemovingUser(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <h3 className="text-lg font-medium">Project Users</h3>
                    <Badge variant="secondary">
                        {projectUsers.length} users
                    </Badge>
                </div>

                <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" asChild>
                        <Link href="/admin/projects">
                            <Folder className="mr-2 h-4 w-4" />
                            All Projects
                        </Link>
                    </Button>
                    {availableUsers.length > 0 && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Add User
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Add User to Project
                                    </DialogTitle>
                                    <DialogDescription>
                                        Select a user to add to this project.
                                        They will be able to access all project
                                        features.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="user-select">
                                            Select User
                                        </Label>
                                        <Select
                                            value={selectedUserId}
                                            onValueChange={setSelectedUserId}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a user to add" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableUsers.map((user) => (
                                                    <SelectItem
                                                        key={user._id}
                                                        value={user._id}
                                                    >
                                                        {user.name} (
                                                        {user.email})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            onClick={handleAddUser}
                                            disabled={
                                                !selectedUserId || isAddingUser
                                            }
                                        >
                                            {isAddingUser
                                                ? 'Adding...'
                                                : 'Add User'}
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>

            {projectUsers.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>User Group</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projectUsers.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell className="font-medium">
                                    {user.name}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.userGroup ? (
                                        <Badge variant="outline">
                                            {user.userGroup.name}
                                        </Badge>
                                    ) : (
                                        <span className="text-muted-foreground">
                                            No group
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            user.isActive
                                                ? 'default'
                                                : 'secondary'
                                        }
                                    >
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleRemoveUser(user._id)
                                        }
                                        disabled={isRemovingUser === user._id}
                                    >
                                        <UserMinus className="mr-2 h-4 w-4" />
                                        {isRemovingUser === user._id
                                            ? 'Removing...'
                                            : 'Remove'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    <Users className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>No users assigned to this project yet.</p>
                    {availableUsers.length > 0 && (
                        <p className="text-sm mt-2">
                            Click &quot;Add User&quot; to assign users to this
                            project.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
