import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { PageWrapper } from '../../../../components/page-wrapper';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb';
import { getUserGroups } from '../../../../lib/services/userGroupService';
import { addUser } from '../../../../lib/services/userService';
import AddUserForm from './add-user-form';
import { Button } from '../../../../components/ui/button';

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
                <BreadcrumbSeparator />
                <BreadcrumbItem>Add User</BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function AddUserPage() {
    const userGroups = await getUserGroups();

    return (
        <PageWrapper breadcrumbs={<Breadcrumbs />}>
            <div className="flex justify-end">
                <Button variant="outline" asChild>
                    <Link href="/admin/users">
                        <ArrowLeftIcon className="mr-2 h-4 w-4" />
                        Back to Users
                    </Link>
                </Button>
            </div>

            <div className="mx-auto h-full w-full max-w-3xl rounded-xl">
                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                    <AddUserForm addUser={addUser} userGroups={userGroups} />
                </div>
            </div>
        </PageWrapper>
    );
}
