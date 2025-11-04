import z from 'zod';

export const AddCallFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    negativeQuestions: z.string().optional(),
    positiveQuestions: z.string().optional(),
    AIPersona: z.string().optional(),
    isActive: z.boolean(),
    documents: z.any(),
});
export type AddCallFormInput = z.infer<typeof AddCallFormSchema>;

export const EditCallFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    negativeQuestions: z.string().optional(),
    positiveQuestions: z.string().optional(),
    AIPersona: z.string().optional(),
    isActive: z.boolean(),
    documents: z.any(),
    // documents: z
    //     .instanceof(File)
    //     .refine(
    //         (file: File) =>
    //             file.size <= 1024 * 1024 && file.type === 'application/pdf',
    //         {
    //             message: 'Only PDF files under 1MB are allowed',
    //         }
    //     ), // multiple files
});
export type EditCallFormInput = z.infer<typeof EditCallFormSchema>;

export const AddProjectFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    isActive: z.boolean(),
});

export type AddProjectFormInput = z.infer<typeof AddProjectFormSchema>;

export const EditProjectFormSchema = AddProjectFormSchema;
export type EditProjectFormInput = z.infer<typeof EditProjectFormSchema>;

export const DOCUMENT_TYPES = [
    { mimetype: 'application/pdf', label: 'PDF' },
    { mimetype: 'application/msword', label: 'Doc' },
    {
        mimetype:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        label: 'Docx',
    },
];

/**
 * Document Schema
 */
export const EditDocumentFormSchema = z.object({
    heading: z.string().min(1, { message: 'Heading is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    // isActive: z.boolean(),
    // isChunked: z.boolean(),
    policy: z.object({
        allow_any_of_string: z.array(z.string()),
    }),
    // parsed_at: z.date().optional(),
});
export type EditDocumentFormInput = z.infer<typeof EditDocumentFormSchema>;
