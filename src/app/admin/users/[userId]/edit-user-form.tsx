'use client';
import { z } from 'zod';
import { ITagMaster, IUser, IUserGroup, IUserInput } from '../../../../types';
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
import { BackButton } from '../../../../components/back-button';
import { Button } from '../../../../components/ui/button';
import { Loader2, SaveIcon, X } from 'lucide-react';
import { Badge } from '../../../../components/ui/badge';
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
    // userGroup: z.string().min(1, { message: 'User group is required' }),
    tags: z.array(z.string()).optional(),
});

export default function EditUserForm({
    className,
    user,
    // userGroups,
    tagsList,
    updateUser,
    ...props
}: {
    className?: string;
    user: IUser;
    // userGroups: IUserGroup[];
    tagsList: ITagMaster[];
    updateUser: (userId: string, data: IUserInput) => Promise<void>;
    props?: React.ComponentProps<'form'>;
}) {
    console.log('\n\n\n\n-------->user info in edit user form: ', user);
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            // userGroup: user.userGroup?._id,
            tags: user.tags,
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        startTransition(async () => {
            try {
                const input: IUserInput = {
                    name: data.name,
                    email: data.email,
                    tags: data.tags,
                    // userGroup: data.userGroup,
                };
                if (data.password && data.password.length > 0) {
                    input.password = data.password;
                }
                //console.log('input: ', input);
                await updateUser(user._id, input);
                // form.reset();
                toast.success('User updated successfully');
            } catch (error) {
                toast.error('Error updating user');
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

                {/* tags list */}
                {tagsList.length > 0 && (
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => {
                            const selectedIds = field.value || [];
                            const availableTags = tagsList.filter(
                                (tag) => !selectedIds.includes(tag.value)
                            );
                            const selectedTags = tagsList.filter((tag) =>
                                selectedIds.includes(tag.value)
                            );

                            const handleAddTag = (tagValue: string) => {
                                const currentValue = field.value || [];
                                if (!currentValue.includes(tagValue)) {
                                    field.onChange([...currentValue, tagValue]);
                                }
                            };

                            const handleRemoveTag = (tagValue: string) => {
                                const currentValue = field.value as string[];
                                field.onChange(
                                    currentValue.filter(
                                        (value) => value !== tagValue
                                    )
                                );
                            };

                            return (
                                <FormItem>
                                    <FormLabel>Tag Policy</FormLabel>
                                    <FormDescription>
                                        Select one or more tags for this user.
                                    </FormDescription>
                                    <FormControl>
                                        <div className="space-y-3 rounded-lg border p-4">
                                            {/* Selected Tags */}
                                            {selectedTags.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedTags.map((tag) => (
                                                        <Badge
                                                            key={tag.value}
                                                            variant="secondary"
                                                            className="flex items-center gap-1.5 px-2 py-1 pr-1"
                                                        >
                                                            <span>
                                                                {tag.name}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRemoveTag(
                                                                        tag.value
                                                                    )
                                                                }
                                                                className="ml-1 rounded-full hover:bg-secondary-foreground/20 p-0.5 transition-colors"
                                                                aria-label={`Remove ${tag.name}`}
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Tag Selector */}
                                            {availableTags.length > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Select
                                                        onValueChange={(
                                                            value
                                                        ) => {
                                                            handleAddTag(value);
                                                        }}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Add a tags..." />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {availableTags.map(
                                                                (tag) => (
                                                                    <SelectItem
                                                                        key={
                                                                            tag.value
                                                                        }
                                                                        value={
                                                                            tag.value
                                                                        }
                                                                    >
                                                                        {
                                                                            tag.value
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}

                                            {selectedTags.length === 0 &&
                                                availableTags.length === 0 && (
                                                    <p className="text-sm text-muted-foreground">
                                                        All tags have been
                                                        selected
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

                {/* <FormField
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
                                            {userGroups.map((userGroup) => (
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
                /> */}
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
                                Updating User...
                            </>
                        ) : (
                            <>
                                <SaveIcon className="w-4 h-4" />
                                Update User
                            </>
                        )}
                    </Button>
                    <BackButton variant="outline">Cancel</BackButton>
                </div>
            </form>
        </Form>
    );
}
