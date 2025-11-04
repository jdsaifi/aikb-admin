'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';

import { Input } from '../../../../components/ui/input';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '../../../../components/ui/form';
import { Button } from '../../../../components/ui/button';
import { Textarea } from '../../../../components/ui/textarea';
import { IModule, IUserGroup, IUserGroupInput } from '../../../../types';
import { Checkbox } from '../../../../components/ui/checkbox';
import { Label } from '../../../../components/ui/label';
import { useState, useTransition } from 'react';
import { Loader2, SaveIcon } from 'lucide-react';

import { toast } from 'sonner';
import { BackButton } from '../../../../components/back-button';

const FormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().optional(),
    // modules: z.array(z.string()),
});

export function AddUserGroupForm({
    className,
    modules,
    addUserGroup,
    ...props
}: {
    className?: string;
    modules: IModule[];
    addUserGroup: (userGroup: IUserGroupInput) => Promise<IUserGroup>;
    props?: React.ComponentProps<'form'>;
}) {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const [permissions, setPermissions] = useState<
        {
            module: string;
            actions: string[];
        }[]
    >([]);

    const onModuleCheckedChange = (module: string, action: string) => {
        setPermissions((prevPermissions) => {
            const existingModule = prevPermissions.find(
                (p) => p.module === module
            );

            if (existingModule) {
                const hasAction = existingModule.actions.includes(action);
                let updatedActions;

                if (hasAction) {
                    // Remove the action
                    updatedActions = existingModule.actions.filter(
                        (a) => a !== action
                    );
                } else {
                    // Add the action
                    updatedActions = [...existingModule.actions, action];
                }

                // If no actions left, remove the module
                if (updatedActions.length === 0) {
                    return prevPermissions.filter((p) => p.module !== module);
                }

                // Update the module
                return prevPermissions.map((p) =>
                    p.module === module ? { ...p, actions: updatedActions } : p
                );
            } else {
                // Add new module with this action
                return [
                    ...prevPermissions,
                    { module: module, actions: [action] },
                ];
            }
        });
    };

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            startTransition(async () => {
                const userGroup: IUserGroupInput = {
                    name: data.name,
                    description: data.description,
                    permissions: permissions,
                };
                const res = await addUserGroup(userGroup);
                form.reset();
                setPermissions([]);
                console.log(res);
                toast.success('User group added successfully');
            });
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to add user group'
            );
        }
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
                                User Group Name{' '}
                                <span className="text-red-500">(required)</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="User group name"
                                />
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
                                    {...field}
                                    placeholder="Description"
                                    rows={4}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* description end */}

                <div>
                    <div className="text-xl font-bold mb-5">
                        Module Permissions
                    </div>
                    <div className="flex flex-col gap-2">
                        {modules.map((module) => (
                            <div
                                key={module._id}
                                className="flex flex-col gap-2 border-b border-gray-200 pb-4 w-full justify-between py-2  rounded-md p-4"
                            >
                                <div className="text-lg font-bold flex items-center gap-2">
                                    {module.displayName}{' '}
                                    <span className="text-sm text-gray-500">
                                        ({module.availablePermissions.length}{' '}
                                        permissions)
                                    </span>
                                </div>
                                <div className="flex flex-row gap-2 ml-auto w-full ">
                                    {module.availablePermissions.map(
                                        (permission) => (
                                            <div
                                                key={permission}
                                                className="flex items-center gap-2"
                                            >
                                                {/* if the module is in the selectedModules array, then check the checkbox */}

                                                <Checkbox
                                                    id={`${module._id}-${permission}`}
                                                    className="border-gray-300"
                                                    onCheckedChange={() => {
                                                        console.log(
                                                            `${module._id}-${permission}`,
                                                            'checked'
                                                        );
                                                        onModuleCheckedChange(
                                                            module._id,
                                                            permission
                                                        );
                                                    }}
                                                    checked={
                                                        permissions
                                                            .find(
                                                                (p) =>
                                                                    p.module ===
                                                                    module._id
                                                            )
                                                            ?.actions.includes(
                                                                permission
                                                            ) || false
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`${module._id}-${permission}`}
                                                    className="text-base font-medium font-normal"
                                                >
                                                    {permission}
                                                </Label>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        type="submit"
                        className="cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Adding User Group...
                            </>
                        ) : (
                            <>
                                <SaveIcon className="w-4 h-4" />
                                Add User Group
                            </>
                        )}
                    </Button>
                    <BackButton variant="outline">Cancel</BackButton>
                </div>
            </form>
        </Form>
    );
}
