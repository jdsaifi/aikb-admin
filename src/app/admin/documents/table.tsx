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
import { ICall, IDocument } from '../../../types';
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
import { Badge } from '../../../components/ui/badge';

export function DocumentTable({
    documents,
    canEditDocument,
    canDeleteDocument,
    deleteDocument,
}: {
    documents: IDocument[];
    canEditDocument: boolean;
    canDeleteDocument: boolean;
    deleteDocument: (projectId: string, documentId: string) => Promise<void>;
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [document, setDocument] = useState<IDocument | null>(null);

    const handleDelete = (document: IDocument) => {
        setDocument(document);
        setOpen(true);
    };

    const handleConfirmDelete = () => {
        if (document) {
            startTransition(async () => {
                try {
                    // await deleteDocument(document.id);
                    toast.success('Document deleted successfully');
                    setOpen(false);
                    setDocument(null);
                    router.refresh();
                } catch (error: any) {
                    toast.error(error.message || 'Error deleting document');
                }
            });
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                <strong>{documents.length} documents found</strong>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        {/* <TableHead>Description</TableHead> */}
                        {/* <TableHead>Company</TableHead> */}
                        {/* <TableHead>Created By</TableHead> */}
                        <TableHead>Policy</TableHead>
                        <TableHead>Chunked</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead>...</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.map((document) => (
                        <TableRow key={document.id}>
                            <TableCell
                                style={{
                                    maxWidth: '350px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {/* <LinkButton
                                    href={`/projects/${call.project._id}/calls/${call.id}`}
                                > */}
                                {document.heading}
                                {/* </LinkButton> */}
                            </TableCell>
                            {/* <TableCell>
                                {document.description &&
                                document.description?.length > 100
                                    ? document.description?.slice(0, 100) +
                                      '...'
                                    : document.description}
                            </TableCell> */}
                            {/* <TableCell>{document.createdBy.name}</TableCell> */}
                            <TableCell>
                                {document.policy.allow_any_of_string.map(
                                    (tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="mr-1 mb-1"
                                        >
                                            {tag}
                                        </Badge>
                                    )
                                )}
                            </TableCell>
                            <TableCell>
                                {document.isChunked ? 'Yes' : 'No'}
                            </TableCell>
                            <TableCell>
                                <DisplayDate date={document.updatedAt} />
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
                                            {canEditDocument && (
                                                <DropdownMenuItem>
                                                    <Link
                                                        href={`/admin/documents/${document.id}/edit`}
                                                        className="cursor-pointer w-full"
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                            {canDeleteDocument && (
                                                <DropdownMenuItem
                                                    className="cursor-pointer w-full"
                                                    onClick={() =>
                                                        handleDelete(document)
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
