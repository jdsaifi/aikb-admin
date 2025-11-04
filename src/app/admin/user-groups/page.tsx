import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { PageWrapper } from '../../../components/page-wrapper';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb';
import { Button } from '../../../components/ui/button';
import {
    getUserGroups,
    deleteUserGroup,
} from '../../../lib/services/userGroupService';
import { UserGroupTable } from './table';
import { canUserAccess } from '../../../lib/actions';

const Breadcrumbs = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        User Groups
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function UserGroupsPage() {
    const userGroups = await getUserGroups();
    const canUserAddUserGroup = await canUserAccess(['user-groups.create']);
    const canEditUserGroup = await canUserAccess(['user-groups.update']);
    const canDeleteUserGroup = await canUserAccess(['user-groups.delete']);

    return (
        <PageWrapper breadcrumbs={<Breadcrumbs />}>
            <div className="flex justify-end">
                {canUserAddUserGroup && (
                    <Button variant="outline" asChild>
                        <Link href="/admin/user-groups/add">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add User Group
                        </Link>
                    </Button>
                )}
            </div>

            <div className="flex flex-col gap-4 mt-5">
                {userGroups && userGroups.length > 0 ? (
                    <UserGroupTable
                        data={userGroups}
                        canEditUserGroup={canEditUserGroup}
                        canDeleteUserGroup={canDeleteUserGroup}
                        deleteUserGroup={deleteUserGroup}
                    />
                ) : (
                    <div className="flex flex-col gap-4 text-center bg-muted p-5 rounded-md">
                        <p>No user groups found</p>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
}
