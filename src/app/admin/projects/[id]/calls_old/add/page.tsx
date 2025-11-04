import { PageWrapper } from '../../../../../../components/page-wrapper';
import { getProjectById } from '../../../../../../lib/services/projectService';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../../../../components/ui/breadcrumb';
import { IProject } from '../../../../../../types';
import AddCallForm from './add-call-form';
import { addCall } from '../../../../../../lib/services/callService';
import { Button } from '../../../../../../components/ui/button';
import { PhoneCallIcon } from 'lucide-react';

// Force dynamic rendering since this page uses auth() which requires headers
export const dynamic = 'force-dynamic';

const Breadcrumbs = ({ project }: { project: IProject }) => {
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
                        <Link href={`/projects/${project.id}/calls`}>
                            Calls
                        </Link>
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        Add Call
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function AddCallPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: projectId } = await params;
    const project = await getProjectById(projectId);

    return (
        <PageWrapper breadcrumbs={<Breadcrumbs project={project.data} />}>
            <div className="flex justify-end gap-2">
                <Button asChild variant="outline">
                    <Link href={`/projects/${projectId}/calls`}>
                        <PhoneCallIcon className="mr-2 h-4 w-4" />
                        All calls
                    </Link>
                </Button>
            </div>
            <div className="mx-auto h-full w-full max-w-3xl rounded-xl">
                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                    <AddCallForm
                        project={project.data}
                        addCall={addCall as any}
                    />
                </div>
            </div>
        </PageWrapper>
    );
}
