'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../components/ui/table';
import { IUser } from '../../../types';
import { LinkButton } from '../../../components/link-button';
import { Button } from '../../../components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { DisplayDate } from '../../../components/display-date';
import { toast } from 'sonner';
import { DeleteDialog } from '../../../components/delete-dialog';
import { useRouter } from 'next/navigation';
import { Badge } from '../../../components/ui/badge';

export function UserTable({
    data,
    deleteUser,
    canDeleteUser,
    canEditUser,
}: {
    data: IUser[];
    deleteUser: (
        userId: string
    ) => Promise<{ data: any; error: string | null }>;
    canDeleteUser: boolean;
    canEditUser: boolean;
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const handleDelete = (userId: string) => {
        setDialogOpen(true);
        setSelectedUserId(userId);
    };

    const handleConfirmDelete = () => {
        startTransition(async () => {
            const result = await deleteUser(selectedUserId as string);
            if (result.error) {
                toast.error(result.error);
                return;
            }
            setDialogOpen(false);
            setSelectedUserId(null);
            toast.success('User deleted successfully');
            router.refresh();
        });
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Group</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>...</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>
                                {canEditUser && (
                                    <LinkButton
                                        href={`/admin/users/${user._id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {user.name}
                                    </LinkButton>
                                )}
                                {!canEditUser && <span>{user.name}</span>}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.userGroup?.name}</TableCell>
                            <TableCell>
                                {/* {user.userGroup?.permissions.map(
                                    (permission) => {
                                        return (
                                            <div
                                                key={permission.module._id}
                                                className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset mr-1"
                                            >
                                                {permission.module.displayName}
                                            </div>
                                        );
                                    }
                                )} */}
                                {user.tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="mr-1 mb-1"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </TableCell>
                            <TableCell>
                                <DisplayDate date={user.createdAt} />
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">
                                            Action
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-56"
                                        align="start"
                                    >
                                        <DropdownMenuLabel>
                                            Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuGroup>
                                            {canEditUser && (
                                                <DropdownMenuItem>
                                                    <Link
                                                        href={`/admin/users/${user._id}`}
                                                        className="w-full"
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                            {canDeleteUser && (
                                                // <DeleteDialog
                                                //     onClick={() =>
                                                //         handleDelete(user._id)
                                                //     }
                                                // />
                                                <DropdownMenuItem
                                                    className="cursor-pointer w-full"
                                                    onClick={() =>
                                                        handleDelete(user._id)
                                                    }
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <DeleteDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onConfirm={handleConfirmDelete}
                loading={isPending}
            />
        </div>
    );
}
