import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { PageWrapper } from '../../../../components/page-wrapper';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb';
import { Button } from '../../../../components/ui/button';
import { getModules } from '../../../../lib/services/moduleService';
import { AddUserGroupForm } from './add-user-group-form';
import { addUserGroup } from '../../../../lib/services/userGroupService';

const Breadcrumbs = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        User Groups
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        Add User Group
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function AddUserGroupPage() {
    const modules = await getModules();
    console.log('modules: ', modules);

    return (
        <PageWrapper breadcrumbs={<Breadcrumbs />}>
            <div className="flex justify-end">
                <Button variant="outline" asChild>
                    <Link href="/admin/user-groups">
                        <ArrowLeftIcon className="mr-2 h-4 w-4" />
                        Back to User Groups
                    </Link>
                </Button>
            </div>
            <div className="mx-auto h-full w-full max-w-3xl rounded-xl">
                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                    <AddUserGroupForm
                        modules={modules}
                        addUserGroup={addUserGroup}
                    />
                </div>
            </div>
        </PageWrapper>
    );
}
