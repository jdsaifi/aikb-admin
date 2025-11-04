'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';

interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    loading?: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
}

export function DeleteDialog({
    open,
    onOpenChange,
    onConfirm,
    title = 'Are you absolutely sure?',
    description = ' This action cannot be undone. This will permanently remove the data from our servers.',
    loading,
    confirmLabel = 'Delete',
    cancelLabel = 'Cancel',
}: DeleteDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={loading}
                        className="cursor-pointer"
                    >
                        {cancelLabel}
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
