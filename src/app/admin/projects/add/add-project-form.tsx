import { cn } from '@/lib/utils';
import { Form, FormDescription } from '@/components/ui/form';
import {
    FormControl,
    FormLabel,
    FormField,
    FormItem,
    FormMessage,
} from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../../../../components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '../../../../components/ui/textarea';
import { Loader2, SaveIcon } from 'lucide-react';

interface AddProjectFormData {
    name: string;
    description?: string;
    isActive: boolean;
}
export function AddProjectForm({
    form,
    onSubmit,
    className,
    isPending,
    ...props
}: {
    form: UseFormReturn<AddProjectFormData>;
    onSubmit: (data: AddProjectFormData) => void;
    className?: string;
    isPending: boolean;
    props?: React.ComponentProps<'form'>;
}) {
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
                    Add Project
                </Button>
            </form>
        </Form>
    );
}
