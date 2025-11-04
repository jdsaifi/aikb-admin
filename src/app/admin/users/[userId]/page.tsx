import { PageWrapper } from '../../../../components/page-wrapper';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb';
import { getTagMastersList } from '../../../../lib/services/tagMasterService';
import { getUserGroups } from '../../../../lib/services/userGroupService';
import { getUserById, updateUser } from '../../../../lib/services/userService';
import { IUser, IUserGroup } from '../../../../types';
import EditUserForm from './edit-user-form';

const Breadcrumbs = ({ data }: { data: IUser }) => {
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
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/users/${data?._id}`}>
                        {data?.name}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>Update User</BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function EditUserPage({
    params,
}: {
    params: Promise<{ userId: string }>;
}) {
    const { userId } = await params;
    const user = await getUserById(userId);
    // console.log('user info:', user);

    const tagsList = await getTagMastersList();
    // console.log('tagsList:', tagsList);

    // const userGroup: IUserGroup[] = await getUserGroups();
    // console.log('user group:', userGroup);
    return (
        <PageWrapper breadcrumbs={<Breadcrumbs data={user} />}>
            <div className="mx-auto h-full w-full max-w-3xl rounded-xl">
                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                    <EditUserForm
                        user={user}
                        // userGroups={userGroup}
                        tagsList={tagsList}
                        updateUser={updateUser}
                    />
                </div>
            </div>
        </PageWrapper>
    );
}
