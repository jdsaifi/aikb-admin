'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { IDocument, ITagMaster } from '../../../../../types';
import {
    // DOCUMENT_TYPES,
    EditDocumentFormInput,
    // EditCallFormSchema,
    EditDocumentFormSchema,
} from '../../../../../types/schema';
import {
    // useState,
    useTransition,
} from 'react';
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
import { Loader2, X } from 'lucide-react';
// import { Switch } from '../../../../../components/ui/switch';
import { SaveIcon } from 'lucide-react';
import { toast } from 'sonner';
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
// } from '../../../../../components/ui/dialog';
import { Badge } from '../../../../../components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../../../components/ui/select';

export default function EditDocumentForm({
    document,
    tagMasters,
    className,
    editDocument,
    ...props
}: {
    document: IDocument;
    tagMasters: ITagMaster[];
    className?: string;
    editDocument: (documentId: string, data: FormData) => Promise<IDocument>;
    props?: React.ComponentProps<'form'>;
}) {
    // const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(
    //     null
    // );
    // const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
    // const [documents, setDocuments] = useState<File[]>([]);
    const [isPending, startTransition] = useTransition();
    const form = useForm<EditDocumentFormInput>({
        resolver: zodResolver(EditDocumentFormSchema),
        defaultValues: {
            heading: document.heading,
            description: document.description,
            // isActive: document.isActive,
            // isChunked: document.isChunked,
            policy: {
                allow_any_of_string: document.policy?.allow_any_of_string || [],
            },
            // parsed_at: document.parsed_at
            //     ? new Date(document.parsed_at)
            //     : undefined,
        },
    });

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         setDocuments(Array.from(e.target.files));
    //     }
    // };

    const onSubmit = (data: EditDocumentFormInput) => {
        // console.log('\n\ndata: ', data);
        const formData = new FormData();
        formData.append('heading', data.heading);
        formData.append('description', data.description);
        // formData.append('isActive', data.isActive.toString());
        // formData.append('isChunked', data.isChunked.toString());
        formData.append('policy', JSON.stringify(data.policy));
        // formData.append('parsed_at', data.parsed_at?.toISOString() || '');

        // console.log(
        //     '\n\n\n\n-------->formData: ',
        //     formData.entries().toArray()
        // );

        // if (documents.length > 0) {
        //     documents.forEach((file) => {
        //         const allowedTypes = DOCUMENT_TYPES.map(
        //             (type) => type.mimetype
        //         );
        //         if (!allowedTypes.includes(file.type)) {
        //             toast.error(
        //                 'Invalid file type. Please upload a PDF or DOC file.'
        //             );
        //             return;
        //         }
        //         const maxSize = 1 * 1024 * 1024; // 5MB in bytes
        //         if (file.size > maxSize) {
        //             toast.error('File size too large. Maximum size is 5MB.');
        //             return;
        //         }
        //         formData.append('documents', file);
        //     });
        // }

        startTransition(() => {
            editDocument(document._id, formData)
                .then(() => {
                    toast.success('Document updated successfully');
                    // form.reset();
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
                    name="heading"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Heading{' '}
                                <span className="text-red-500">(required)</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Heading" />
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
                            <FormLabel>Description</FormLabel>
                            <FormDescription>
                                A detailed description of the document. It will
                                help AI to understand the document better and
                                generate questions.
                            </FormDescription>
                            <FormControl>
                                <Textarea
                                    placeholder="Document description"
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

                {/* Tags */}
                {tagMasters.length > 0 && (
                    <FormField
                        control={form.control}
                        name="policy.allow_any_of_string"
                        render={({ field }) => {
                            const selectedIds = field.value || [];
                            const availableTagMasters = tagMasters.filter(
                                (tagMaster) =>
                                    !selectedIds.includes(tagMaster.value)
                            );
                            const selectedTagMasters = tagMasters.filter(
                                (tagMaster) =>
                                    selectedIds.includes(tagMaster.value)
                            );

                            const handleAddTag = (tagValue: string) => {
                                const currentValue = field.value || [];
                                if (!currentValue.includes(tagValue)) {
                                    field.onChange([...currentValue, tagValue]);
                                }
                            };

                            const handleRemoveTag = (tagValue: string) => {
                                const currentValue = field.value || [];
                                field.onChange(
                                    currentValue.filter(
                                        (value) => value !== tagValue
                                    )
                                );
                            };

                            return (
                                <FormItem>
                                    <FormLabel>Document Policy</FormLabel>
                                    <FormDescription>
                                        Select one or more tag policies for this
                                        document to filter based on user&apos;s
                                        permissions.
                                    </FormDescription>
                                    <FormControl>
                                        <div className="space-y-3 rounded-lg border p-4">
                                            {/* Selected Tags */}
                                            {selectedTagMasters.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedTagMasters.map(
                                                        (tagMaster) => (
                                                            <Badge
                                                                key={
                                                                    tagMaster.value
                                                                }
                                                                variant="secondary"
                                                                className="flex items-center gap-1.5 px-2 py-1 pr-1"
                                                            >
                                                                <span>
                                                                    {
                                                                        tagMaster.name
                                                                    }
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleRemoveTag(
                                                                            tagMaster.value
                                                                        )
                                                                    }
                                                                    className="ml-1 rounded-full hover:bg-secondary-foreground/20 p-0.5 transition-colors"
                                                                    aria-label={`Remove ${tagMaster.name}`}
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </button>
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            )}

                                            {/* Tag Selector */}
                                            {availableTagMasters.length > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Select
                                                        onValueChange={(
                                                            value
                                                        ) => {
                                                            handleAddTag(value);
                                                        }}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Add a tag master..." />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {availableTagMasters.map(
                                                                (tagMaster) => (
                                                                    <SelectItem
                                                                        key={
                                                                            tagMaster.value
                                                                        }
                                                                        value={
                                                                            tagMaster.value
                                                                        }
                                                                    >
                                                                        {
                                                                            tagMaster.value
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}

                                            {selectedTagMasters.length === 0 &&
                                                availableTagMasters.length ===
                                                    0 && (
                                                    <p className="text-sm text-muted-foreground">
                                                        All tag masters have
                                                        been selected
                                                    </p>
                                                )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                )}
                {/* Tags end */}

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
                    Update Document
                </Button>
            </form>
        </Form>
    );
}
