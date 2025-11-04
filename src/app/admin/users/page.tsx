import { getUsers, deleteUser } from '@/lib/services/userService';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb';
import { PageWrapper } from '../../../components/page-wrapper';
import { UserTable } from './table';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { canUserAccess } from '../../../lib/actions';

const Breadcrumbs = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function UsersPage() {
    const canDeleteUser = await canUserAccess(['users.delete']);
    const canEditUser = await canUserAccess(['users.edit']);
    const canCreateUser = await canUserAccess(['users.create']);

    const users = await getUsers();
    return (
        <PageWrapper breadcrumbs={<Breadcrumbs />}>
            <div className="flex flex-col gap-4">
                <div className="flex justify-end">
                    {canCreateUser && (
                        <Button variant="outline" asChild>
                            <Link href="/admin/users/add">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Add User
                            </Link>
                        </Button>
                    )}
                </div>
                <UserTable
                    data={users}
                    deleteUser={deleteUser}
                    canEditUser={canEditUser}
                    canDeleteUser={canDeleteUser}
                />
            </div>
        </PageWrapper>
    );
}
