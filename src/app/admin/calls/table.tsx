'use client';
import { Button } from '../../../components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../components/ui/table';
import { ICall } from '../../../types';
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
import { useState } from 'react';
import { DisplayDate } from '../../../components/display-date';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export function CallTable({
    calls,
    canEditCall,
    canDeleteCall,
    deleteCall,
}: {
    calls: ICall[];
    canEditCall: boolean;
    canDeleteCall: boolean;
    deleteCall: (projectId: string, callId: string) => Promise<void>;
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [call, setCall] = useState<ICall | null>(null);

    const handleDelete = (call: ICall) => {
        setCall(call);
        setOpen(true);
    };

    const handleConfirmDelete = () => {
        if (call) {
            startTransition(async () => {
                try {
                    await deleteCall(call.project._id, call._id);
                    toast.success('Call deleted successfully');
                    setOpen(false);
                    setCall(null);
                    router.refresh();
                } catch (error: any) {
                    toast.error(error.message || 'Error deleting call');
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
                        {/* <TableHead>Company</TableHead> */}
                        <TableHead>Created By</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>...</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {calls.map((call) => (
                        <TableRow key={call.id}>
                            <TableCell>
                                {/* <LinkButton
                                    href={`/projects/${call.project._id}/calls/${call.id}`}
                                > */}
                                {call.name}
                                {/* </LinkButton> */}
                            </TableCell>
                            <TableCell>
                                {call.description &&
                                call.description?.length > 100
                                    ? call.description?.slice(0, 100) + '...'
                                    : call.description}
                            </TableCell>
                            <TableCell>{call.createdBy.name}</TableCell>
                            <TableCell>
                                <DisplayDate date={call.createdAt} />
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
                                            {canEditCall && (
                                                <DropdownMenuItem>
                                                    <Link
                                                        href={`/admin/calls/${call.id}/edit`}
                                                        className="cursor-pointer w-full"
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                            {canDeleteCall && (
                                                <DropdownMenuItem
                                                    className="cursor-pointer w-full"
                                                    onClick={() =>
                                                        handleDelete(call)
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
                onConfirm={handleConfirmDelete}
                open={open}
                onOpenChange={setOpen}
                loading={isPending}
            />
        </div>
    );
}
