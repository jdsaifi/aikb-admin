import Link from 'next/link';
import { PageWrapper } from '../../../../../../../components/page-wrapper';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../../../../../components/ui/breadcrumb';
import { ICall } from '../../../../../../../types';
import { getCallById } from '../../../../../../../lib/services/callService';
import { VapiInterview } from '../../../../../../../components/vapi-interview';
import { getOrInsertFeedback } from '../../../../../../../lib/services/feedbackService';

// Force dynamic rendering since this page uses auth() which requires headers
export const dynamic = 'force-dynamic';

const Breadcrumbs = ({ data }: { data: ICall }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-11">
                        <Link href={`/projects/${data.project.id}/calls`}>
                            Projects
                        </Link>
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-11">
                        {data.project.name}
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-11">
                        <Link href={`/projects/${data.project.id}/calls`}>
                            Calls
                        </Link>
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        {data.name}
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        Start Call
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function StartCallPage({
    params,
}: {
    params: Promise<{ id: string; callId: string }>;
}) {
    const { id: projectId, callId } = await params;

    try {
        const call = await getCallById(projectId, callId);
        const feedback = await getOrInsertFeedback(projectId, callId, {});

        return (
            <PageWrapper breadcrumbs={<Breadcrumbs data={call} />}>
                <VapiInterview call={call} feedbackId={feedback.id} />
            </PageWrapper>
        );
    } catch (error) {
        console.error('Error fetching call: ', error);
        return <div>Error fetching call</div>;
    }
}
