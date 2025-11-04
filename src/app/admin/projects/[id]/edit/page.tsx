import CommonErrorComponent from '../../../../../components/common-error-component';
import { PageWrapper } from '../../../../../components/page-wrapper';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../../../components/ui/breadcrumb';
import {
    getProjectById,
    updateProject,
} from '../../../../../lib/services/projectService';
import { IProject } from '../../../../../types';
import EditProjectForm from './edit-project-form';

const Breadcrumbs = ({ project }: { project: IProject }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/projects">
                        Projects
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{project.name}</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>Edit Project</BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { data: project, error } = await getProjectById(id);

    if (error) {
        return (
            <CommonErrorComponent
                title="Error"
                message={error}
                actionLabel="Go to Home"
                actionHref="/admin/dashboard"
            />
        );
    }

    return (
        <PageWrapper breadcrumbs={<Breadcrumbs project={project} />}>
            <div className="mx-auto h-full w-full max-w-3xl rounded-xl">
                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                    <EditProjectForm
                        project={project}
                        updateProject={updateProject}
                    />
                </div>
            </div>
        </PageWrapper>
    );
}
