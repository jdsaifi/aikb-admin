'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IProject } from '../types';
import { Button } from './ui/button';
import Link from 'next/link';
import { LinkButton } from './link-button';

import { checkPermission } from '../lib/hasPermission';
import { DisplayDate } from './display-date';
import { DeleteDialog } from './delete-dialog';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function ProjectTable({
    projects,
    userPermissions,
    userRole,
    deleteProject,
}: {
    projects: IProject[];
    userPermissions: string[];
    userRole: string;
    deleteProject: (projectId: string) => Promise<void>;
}) {
    // console.log('userPermissions: ', userPermissions);
    // console.log('userRole: ', userRole);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
        null
    );

    const canEditProject = checkPermission(
        ['projects.edit'],
        userPermissions,
        userRole
    );
    const canDeleteProject = checkPermission(
        ['projects.delete'],
        userPermissions,
        userRole
    );
    const canViewProject = checkPermission(
        ['projects.view'],
        userPermissions,
        userRole
    );
    // console.log('canViewProject: ', canViewProject);
    const canViewProjectUsers = checkPermission(
        ['projects.users.view'],
        userPermissions,
        userRole
    );
    const canViewProjectCalls = checkPermission(
        ['projects.calls.view'],
        userPermissions,
        userRole
    );

    const handleDelete = (projectId: string) => {
        setDialogOpen(true);
        setSelectedProjectId(projectId);
    };

    const handleConfirmDelete = () => {
        startTransition(async () => {
            const result = await deleteProject(selectedProjectId as string);
            console.log('result: ', result);
            setDialogOpen(false);
            setSelectedProjectId(null);
            toast.success('Project deleted successfully');
            router.refresh();
        });
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>...</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>
                                {/* <Link
                                    href={`/projects/${project.id}/calls`}
                                    className="hover:underline hover:text-blue-500 hover:cursor-pointer text-blue-600"
                                >
                                    {project.name}
                                </Link> */}

                                <LinkButton
                                    href={`/admin/projects/${project.id}/edit`}
                                >
                                    {project.name}
                                </LinkButton>
                            </TableCell>
                            <TableCell>{project.description}</TableCell>
                            <TableCell>
                                {project.company && project.company.name}
                            </TableCell>
                            <TableCell>
                                {project.createdBy && project.createdBy.name}
                            </TableCell>
                            <TableCell>
                                {/* {new Date(project.createdAt).toLocaleString()} */}
                                <DisplayDate date={project.createdAt} />
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
                                            {canEditProject && (
                                                <DropdownMenuItem>
                                                    <Link
                                                        href={`/admin/projects/${project.id}/edit`}
                                                        className="cursor-pointer w-full"
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                            {canDeleteProject && (
                                                <DropdownMenuItem
                                                    className="cursor-pointer w-full"
                                                    onClick={() =>
                                                        handleDelete(project.id)
                                                    }
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuGroup>

                                        {canViewProjectUsers && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Link
                                                        href={`/admin/projects/${project.id}/users`}
                                                    >
                                                        Manage Users
                                                    </Link>
                                                </DropdownMenuItem>
                                            </>
                                        )}

                                        {canViewProject && (
                                            <DropdownMenuItem>
                                                <Link
                                                    href={`/admin/projects/${project.id}/calls`}
                                                    className="cursor-pointer w-full"
                                                >
                                                    Manage Calls
                                                </Link>
                                            </DropdownMenuItem>
                                        )}
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
