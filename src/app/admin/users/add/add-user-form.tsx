'use client';
import { z } from 'zod';
import { IUserGroup, IUserInput } from '../../../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../../components/ui/form';
import { cn } from '../../../../lib/utils';
import { Input } from '../../../../components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../../../../components/ui/select';
import Link from 'next/link';
import { Button } from '../../../../components/ui/button';
import { Loader2, SaveIcon } from 'lucide-react';
import { useTransition } from 'react';

import { toast } from 'sonner';

const FormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .optional()
        .refine((val: any) => !(val !== '' && val?.length < 6), {
            message: 'Password must be at least 6 characters long',
        }),
    userGroup: z.string().min(1, { message: 'User group is required' }),
});

export default function AddUserForm({
    className,
    userGroups,
    addUser,
    ...props
}: {
    className?: string;
    userGroups: IUserGroup[];
    addUser: (data: IUserInput) => Promise<void>;
    props?: React.ComponentProps<'form'>;
}) {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
            userGroup: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        startTransition(async () => {
            try {
                const input: IUserInput = {
                    name: data.name,
                    email: data.email,
                    userGroup: data.userGroup,
                    password: data.password,
                };
                await addUser(input);
                form.reset({
                    name: '',
                    email: '',
                    userGroup: '',
                    password: '',
                });
                toast.success('User added successfully');
            } catch (error) {
                toast.error('Error adding user');
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
                            <FormLabel>
                                Full Name{' '}
                                <span className="text-red-500">(required)</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Full name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* full name end */}

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Email{' '}
                                <span className="text-red-500">(required)</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Email"
                                    type="email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* email end */}

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Password{' '}
                                <span className="text-blue-500">
                                    (optional)
                                </span>
                            </FormLabel>
                            <FormDescription>
                                Leave blank to keep the same password
                            </FormDescription>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Password"
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* password end */}

                <FormField
                    control={form.control}
                    name="userGroup"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                User Group{' '}
                                <span className="text-red-500">(required)</span>
                            </FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select user group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                User Groups
                                            </SelectLabel>
                                            {userGroups?.map((userGroup) => (
                                                <SelectItem
                                                    key={userGroup._id}
                                                    value={userGroup._id}
                                                >
                                                    {userGroup.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* user group end */}

                <div className="flex justify-end gap-2">
                    <Button
                        type="submit"
                        className="cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Adding User...
                            </>
                        ) : (
                            <>
                                <SaveIcon className="w-4 h-4" />
                                Add User
                            </>
                        )}
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/users">Cancel</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
