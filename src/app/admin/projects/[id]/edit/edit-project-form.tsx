'use client';
import { Form, FormDescription } from '../../../../../components/ui/form';
import { IProject } from '../../../../../types';
import { cn } from '../../../../../lib/utils';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../../../components/ui/form';
import { Input } from '../../../../../components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    EditProjectFormInput,
    EditProjectFormSchema,
} from '../../../../../types/schema';
import { Textarea } from '../../../../../components/ui/textarea';
import { Switch } from '../../../../../components/ui/switch';
import { Button } from '../../../../../components/ui/button';
import { Loader2, SaveIcon } from 'lucide-react';
import { BackButton } from '../../../../../components/back-button';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type EditProjectProps = {
    className?: string;
    project: IProject;
    updateProject: (
        id: string,
        project: Partial<IProject>
    ) => Promise<IProject>;
    props?: React.ComponentProps<'form'>;
};

export default function EditProjectForm({
    className,
    project,
    updateProject,
    ...props
}: EditProjectProps) {
    const [isPending, startTransition] = useTransition();
    const form = useForm<EditProjectFormInput>({
        resolver: zodResolver(EditProjectFormSchema),
        defaultValues: {
            name: project.name,
            description: project.description,
            isActive: project.isActive,
        },
    });

    const onSubmit = async (data: EditProjectFormInput) => {
        startTransition(async () => {
            try {
                await updateProject(project._id, data);
                toast.success('Project updated successfully');
            } catch (error) {
                console.error('Error updating project: ', error);
                toast.error('Error updating project');
            }
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
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Project Name" />
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
                            <FormControl>
                                <Textarea
                                    placeholder="Project Description"
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
                    name="isActive"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5 w-full">
                                <FormLabel>Active?</FormLabel>
                                <FormDescription>
                                    Is the project active?
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    // disabled
                                    // aria-readonly
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {/* isActive end */}

                <div className="flex justify-end gap-2">
                    <Button
                        type="submit"
                        className="cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <SaveIcon className="mr-2 h-4 w-4" />
                        )}
                        Update Project
                    </Button>
                    <BackButton variant="outline">Cancel</BackButton>
                </div>
            </form>
        </Form>
    );
}
