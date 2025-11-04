import { PageWrapper } from '../../../../../components/page-wrapper';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../../../components/ui/breadcrumb';
import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { getProjectById } from '../../../../../lib/services/projectService';
import {
    deleteCall,
    getCallsList,
    getCallUnderProject,
} from '../../../../../lib/services/callService';
import { CallTable } from './table';
import { canUserAccess } from '../../../../../lib/actions';

// Force dynamic rendering since this page uses auth() which requires headers
export const dynamic = 'force-dynamic';

type Project = Awaited<ReturnType<typeof getProjectById>>;

const Breadcrumbs = ({ project }: { project: Project }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        <Link href="/projects">Projects</Link>
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        {project.name}
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        Calls
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function CallsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: projectId } = await params;

    // const canViewCalls = await canUserAccess(['calls.view']);
    const canCreateCalls = await canUserAccess(['calls.create']);
    const canEditCall = await canUserAccess(['calls.edit']);
    const canDeleteCall = await canUserAccess(['calls.delete']);

    try {
        const project: Project = await getProjectById(projectId);
        // console.log('project: ', project);
        const calls = await getCallUnderProject(projectId);
        // console.log('calls: ', calls);

        return (
            <PageWrapper breadcrumbs={<Breadcrumbs project={project} />}>
                <div className="flex justify-end">
                    {canCreateCalls && (
                        <Button variant="outline" asChild>
                            <Link href={`/admin/calls/add`}>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Add Call
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="flex flex-col gap-4 mt-5">
                    {calls.length > 0 ? (
                        <CallTable
                            calls={calls}
                            canEditCall={canEditCall}
                            canDeleteCall={canDeleteCall}
                            deleteCall={deleteCall}
                        />
                    ) : (
                        <div className="flex flex-col gap-4 text-center bg-muted p-5 rounded-md">
                            <p>No calls found</p>
                        </div>
                    )}
                </div>
            </PageWrapper>
        );
    } catch (err: unknown) {
        console.log('err: ', err);
        return <div>Error</div>;
    }
}
