'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICall, IDocument } from '../../../../../types';
import {
    DOCUMENT_TYPES,
    EditCallFormInput,
    EditCallFormSchema,
} from '../../../../../types/schema';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
} from '../../../../../components/ui/form';
import {
    FormDescription,
    FormControl,
    FormMessage,
} from '../../../../../components/ui/form';
import { Input } from '../../../../../components/ui/input';
import { Textarea } from '../../../../../components/ui/textarea';
import { cn } from '../../../../../lib/utils';
import { Button } from '../../../../../components/ui/button';
import { FileText, Loader2, Trash2 } from 'lucide-react';
import { Switch } from '../../../../../components/ui/switch';
import { SaveIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '../../../../../components/ui/dialog';

export default function EditCallForm({
    call,
    className,
    editCall,
    ...props
}: {
    call: ICall;
    className?: string;
    editCall: (callId: string, data: FormData) => Promise<ICall>;
    props?: React.ComponentProps<'form'>;
}) {
    const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(
        null
    );
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
    const [documents, setDocuments] = useState<File[]>([]);
    const [isPending, startTransition] = useTransition();
    const form = useForm<EditCallFormInput>({
        resolver: zodResolver(EditCallFormSchema),
        defaultValues: {
            name: call.name,
            description: call.description,
            negativeQuestions: call.negativeQuestions || '',
            positiveQuestions: call.positiveQuestions || '',
            AIPersona: call.AIPersona || '',
            isActive: call.isActive,
            documents: undefined,
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setDocuments(Array.from(e.target.files));
        }
    };

    const onSubmit = (data: EditCallFormInput) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('positiveQuestions', data.positiveQuestions || '');
        formData.append('negativeQuestions', data.negativeQuestions || '');
        formData.append('AIPersona', data.AIPersona || '');
        formData.append('isActive', data.isActive.toString());

        if (documents.length > 0) {
            documents.forEach((file) => {
                const allowedTypes = DOCUMENT_TYPES.map(
                    (type) => type.mimetype
                );
                if (!allowedTypes.includes(file.type)) {
                    toast.error(
                        'Invalid file type. Please upload a PDF or DOC file.'
                    );
                    return;
                }
                const maxSize = 1 * 1024 * 1024; // 5MB in bytes
                if (file.size > maxSize) {
                    toast.error('File size too large. Maximum size is 5MB.');
                    return;
                }
                formData.append('documents', file);
            });
        }

        startTransition(() => {
            editCall(call.id, formData)
                .then(() => {
                    toast.success('Call updated successfully');
                    // console.log('res: ', res);
                    form.reset();
                })
                .catch((err) => {
                    console.log('err: ', err);
                    toast.error((err as Error).message);
                });
        });
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn('flex flex-col gap-6', className)}
                {...props}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Name{' '}
                                <span className="text-red-500">(required)</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Call name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* name end */}

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Description{' '}
                                <span className="text-red-500">(required)</span>
                            </FormLabel>
                            <FormDescription>
                                A detailed description of the call. It will help
                                AI to understand the call better and generate
                                questions.
                            </FormDescription>
                            <FormControl>
                                <Textarea
                                    placeholder="Call description"
                                    className="resize-none"
                                    style={{
                                        minHeight: '200px',
                                        maxHeight: '200px',
                                        overflow: 'auto',
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* description end */}

                <FormField
                    control={form.control}
                    name="positiveQuestions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Questions{' '}
                                <span className="text-blue-500">
                                    (comma separated)
                                </span>
                            </FormLabel>
                            <FormDescription>
                                Define the questions for the call.
                            </FormDescription>
                            <FormControl>
                                <Textarea
                                    placeholder="Questions"
                                    className="resize-none"
                                    style={{
                                        minHeight: '200px',
                                        maxHeight: '200px',
                                        overflow: 'auto',
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* positiveQuestions end */}

                <FormField
                    control={form.control}
                    name="negativeQuestions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Negative Questions{' '}
                                <span className="text-blue-500">
                                    (comma separated)
                                </span>
                            </FormLabel>
                            <FormDescription>
                                Define the negative questions for the call.
                            </FormDescription>
                            <FormControl>
                                <Textarea
                                    placeholder="Call description"
                                    className="resize-none"
                                    style={{
                                        minHeight: '200px',
                                        maxHeight: '200px',
                                        overflow: 'auto',
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* negativeQuestions end */}

                <FormField
                    control={form.control}
                    name="AIPersona"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>AI Persona</FormLabel>
                            <FormDescription>
                                Define the AI persona for the call.
                            </FormDescription>
                            <FormControl>
                                <Textarea
                                    placeholder="AI persona"
                                    className="resize-none"
                                    style={{
                                        minHeight: '200px',
                                        maxHeight: '200px',
                                        overflow: 'auto',
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* AIPersona end */}

                <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5 w-full">
                                <FormLabel>Active?</FormLabel>
                                <FormDescription>
                                    Is the call active?
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {/* isActive end */}

                <FormField
                    control={form.control}
                    name="documents"
                    render={({ field: { onChange } }) => (
                        <FormItem>
                            <FormLabel>Documents (PDF, Doc)</FormLabel>
                            <FormControl>
                                <Input
                                    multiple
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}

                                    //     (e) =>
                                    //     // onChange(e.target.files?.[0] || null)
                                    //     handleFileChange
                                    // }
                                    // disabled={updateInterviewMutation.isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* documents end */}

                {/* Documents List */}
                {call.documents && call.documents.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                            Uploaded Documents
                        </h3>
                        <div className="space-y-2">
                            {call.documents.map((doc: IDocument) => (
                                <div
                                    key={doc.id}
                                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-slate-500" />
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedDocument(doc);
                                                    setIsDocumentModalOpen(
                                                        true
                                                    );
                                                }}
                                                className="text-sm font-medium text-slate-900 dark:text-white hover:underline cursor-pointer"
                                                // disabled={
                                                //     updateInterviewMutation.isPending
                                                // }
                                            >
                                                {doc.originalname}
                                            </button>
                                            <p className="text-xs text-slate-500">
                                                {
                                                    DOCUMENT_TYPES.find(
                                                        (type) =>
                                                            type.mimetype ===
                                                            doc.mimetype
                                                    )?.label
                                                }{' '}
                                                • {(doc.size / 1024).toFixed(1)}{' '}
                                                KB
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        // onClick={() =>
                                        //     deleteDocumentMutation.mutate(
                                        //         doc._id
                                        //     )
                                        // }
                                        className="text-slate-500 hover:text-red-500"
                                        disabled={
                                            false
                                            // updateInterviewMutation.isPending ||
                                            // deleteDocumentMutation.isPending
                                        }
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Dialog
                    open={isDocumentModalOpen}
                    onOpenChange={setIsDocumentModalOpen}
                >
                    <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
                        <DialogHeader>
                            <DialogTitle>
                                {selectedDocument?.originalname}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                            <pre className="whitespace-pre-wrap text-sm">
                                {selectedDocument?.content}
                            </pre>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* end documents list */}

                <Button
                    type="submit"
                    className="cursor-pointer mt-5"
                    disabled={isPending}
                >
                    {isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <SaveIcon className="mr-2 h-4 w-4" />
                    )}
                    Update Call
                </Button>
            </form>
        </Form>
    );
}
