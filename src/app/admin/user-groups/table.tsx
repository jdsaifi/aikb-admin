'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../components/ui/table';
import { IUserGroup } from '../../../types';
import { LinkButton } from '../../../components/link-button';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { DeleteDialog } from '../../../components/delete-dialog';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function UserGroupTable({
    data,
    canEditUserGroup,
    canDeleteUserGroup,
    deleteUserGroup,
}: {
    data: IUserGroup[];
    canEditUserGroup: boolean;
    canDeleteUserGroup: boolean;
    deleteUserGroup: (
        id: string
    ) => Promise<{ data: any; error: string | null }>;
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [selectedUserGroup, setSelectedUserGroup] =
        useState<IUserGroup | null>(null);
    const router = useRouter();

    const handleDelete = (id: string) => {
        setSelectedUserGroup(data.find((group) => group._id === id) || null);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedUserGroup) {
            startTransition(async () => {
                const result = await deleteUserGroup(selectedUserGroup._id);
                if (result.error) {
                    toast.error(result.error);
                    return;
                } else {
                    console.log('user group deleted result: ', result);
                    setDialogOpen(false);
                    setSelectedUserGroup(null);
                    toast.success('User group deleted successfully');
                    router.refresh();
                }
            });
        }
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>...</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((group) => (
                        <TableRow key={group._id}>
                            <TableCell>
                                <LinkButton
                                    href={`/user-groups/${group._id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {group.name}
                                </LinkButton>
                            </TableCell>
                            <TableCell>{group.description}</TableCell>
                            <TableCell>
                                {new Date(group.createdAt).toLocaleString()}
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
                                            {canEditUserGroup && (
                                                <DropdownMenuItem>
                                                    <Link
                                                        href={`/admin/user-groups/${group._id}`}
                                                        className="cursor-pointer w-full"
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                            {canDeleteUserGroup && (
                                                <DropdownMenuItem
                                                    className="cursor-pointer w-full"
                                                    onClick={() =>
                                                        handleDelete(group._id)
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
