import { PageWrapper } from '../../../../components/page-wrapper';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb';
import { getModules } from '../../../../lib/services/moduleService';
import { getUserGroupById } from '../../../../lib/services/userGroupService';
import { IUserGroup } from '../../../../types';
import { EditUserGroupForm } from './edit-user-group-form';
import { updateUserGroup } from '../../../../lib/services/userGroupService';

const Breadcrumbs = ({ data }: { data: IUserGroup }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/user-groups">
                        User Groups
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/user-groups/${data._id}`}>
                        Edit User Group
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function EditUserGroupPage({
    params,
}: {
    params: Promise<{ userGroupId: string }>;
}) {
    const modules = await getModules();
    const { userGroupId } = await params;
    const userGroup = await getUserGroupById(userGroupId);

    return (
        <PageWrapper breadcrumbs={<Breadcrumbs data={userGroup} />}>
            <div className="mx-auto h-full w-full max-w-3xl rounded-xl">
                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                    <EditUserGroupForm
                        modules={modules}
                        userGroup={userGroup}
                        updateUserGroup={updateUserGroup}
                    />
                </div>
            </div>
        </PageWrapper>
    );
}
