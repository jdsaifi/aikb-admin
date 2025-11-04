import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { PageWrapper } from '../../../components/page-wrapper';
import { getProjects } from '../../../lib/services/projectService';
import { notFound } from 'next/navigation';
import { ProjectTable } from '../../../components/project-table';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb';
import { canUserAccess } from '../../../lib/actions';
import { auth } from '../../../auth';
import { deleteProject } from '../../../lib/services/projectService';

// Force dynamic rendering since this page uses auth() which requires headers
export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
    try {
        const session = await auth();
        const userPermissions = session?.permissions || [];
        const userRole = session?.user?.role;

        const projects = await getProjects();
        console.log('\n\n\n\nprojects: ', projects);
        const canCreateProject = await canUserAccess(['projects.create']);
        console.log('\n\n\n\n\n\ncanCreateProject: ', canCreateProject);
        return (
            <PageWrapper
                breadcrumbs={
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="line-clamp-1">
                                    Projects
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="line-clamp-1">
                                    List
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                }
            >
                {(await canUserAccess(['projects.create'])) && (
                    <div className="flex justify-end">
                        <Button variant="outline" asChild>
                            <Link href="/admin/projects/add">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Add Project
                            </Link>
                        </Button>
                    </div>
                )}

                <div className="flex flex-col gap-4 mt-5">
                    {projects.length > 0 ? (
                        <ProjectTable
                            projects={projects}
                            userPermissions={userPermissions}
                            userRole={userRole || ''}
                            deleteProject={deleteProject}
                        />
                    ) : (
                        <div className="flex flex-col gap-4 text-center bg-muted p-5 rounded-md">
                            <p>No projects found</p>
                        </div>
                    )}
                </div>
            </PageWrapper>
        );
    } catch (error) {
        console.error(error);
        notFound();
    }
}
