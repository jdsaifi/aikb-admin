'use client';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICall, IDocument, IProject } from '../../../../../../types';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../../../../components/ui/form';
import { Input } from '../../../../../../components/ui/input';
import { Button } from '../../../../../../components/ui/button';
import { Loader2, SaveIcon } from 'lucide-react';
import { Switch } from '../../../../../../components/ui/switch';
import { Textarea } from '../../../../../../components/ui/textarea';
import { toast } from 'sonner';
import {
    AddCallFormInput,
    AddCallFormSchema,
    DOCUMENT_TYPES,
} from '../../../../../../types/schema';
import { useState, useTransition } from 'react';

export default function AddCallForm({
    project,
    className,
    addCall,
    ...props
}: {
    project: IProject;
    className?: string;
    addCall: (projectId: string, data: FormData) => Promise<ICall>;
    props?: React.ComponentProps<'form'>;
}) {
    const [documents, setDocuments] = useState<File[]>([]);
    const [isPending, startTransition] = useTransition();
    const form = useForm<AddCallFormInput>({
        resolver: zodResolver(AddCallFormSchema),
        defaultValues: {
            name: '',
            description: '',
            negativeQuestions: '',
            positiveQuestions: '',
            AIPersona: '',
            isActive: true,
            documents: undefined,
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setDocuments(Array.from(e.target.files));
        }
    };

    const onSubmit = (data: AddCallFormInput) => {
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

        console.log(
            '\n\n\n\n-------->formData: ',
            formData.entries().toArray()
        );

        startTransition(() => {
            addCall(project.id, formData)
                .then(() => {
                    toast.success('Call added successfully');
                    // console.log('res: ', res);
                    form.reset();
                    setDocuments([]);
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
                    Add Call
                </Button>
            </form>
        </Form>
    );
}
