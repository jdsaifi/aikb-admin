import {
    getProjectById,
    getProjectUsers,
} from '../../../../../lib/services/projectService';
import { getUsers } from '../../../../../lib/services/userService';
import { ProjectUsersTable } from '../../../../../components/project-users-table';
import { PageWrapper } from '../../../../../components/page-wrapper';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../../../components/ui/breadcrumb';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Force dynamic rendering since this page uses auth() which requires headers
export const dynamic = 'force-dynamic';

export default async function ProjectUsersPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    try {
        const { id } = await params;
        const project = await getProjectById(id);
        const projectUsers = await getProjectUsers(id);
        const allUsers = await getUsers();

        return (
            <PageWrapper
                breadcrumbs={
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/admin/dashboard">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/admin/projects">Projects</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`/admin/projects/${id}/edit`}>
                                        {project.name}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Users</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                }
            >
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Manage Project Users
                        </h1>
                        <p className="text-muted-foreground">
                            Assign users to &quot;{project.name}&quot; project
                            to give them access to project features.
                        </p>
                    </div>

                    <ProjectUsersTable
                        projectUsers={projectUsers}
                        allUsers={allUsers}
                        projectId={id}
                    />
                </div>
            </PageWrapper>
        );
    } catch (error) {
        console.error('Error loading project users:', error);
        notFound();
    }
}
