import { PageWrapper } from '../../../../../../../components/page-wrapper';
import { getCallById } from '../../../../../../../lib/services/callService';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../../../../../components/ui/breadcrumb';
import Link from 'next/link';
import { ICall } from '../../../../../../../types';
import EditCallForm from './edit-call-form';
import { editCall } from '../../../../../../../lib/services/callService';
import { Button } from '../../../../../../../components/ui/button';
import {
    ArrowLeftSquareIcon,
    BackpackIcon,
    PhoneCallIcon,
    PlusIcon,
} from 'lucide-react';

// Force dynamic rendering since this page uses auth() which requires headers
export const dynamic = 'force-dynamic';

const Breadcrumbs = ({ data }: { data: ICall }) => {
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
                        {data.project.name}
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
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
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function EditCallPage({
    params,
}: {
    params: Promise<{ id: string; callId: string }>;
}) {
    const { id: projectId, callId } = await params;
    try {
        const call = await getCallById(projectId, callId);
        return (
            <PageWrapper breadcrumbs={<Breadcrumbs data={call} />}>
                <div className="flex justify-end gap-2">
                    <Button asChild>
                        <Link href={`/projects/${projectId}/calls/add`}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add call
                        </Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link href={`/projects/${projectId}/calls`}>
                            <PhoneCallIcon className="mr-2 h-4 w-4" />
                            All calls
                        </Link>
                    </Button>
                </div>
                <div className="mx-auto h-full w-full max-w-3xl rounded-xl">
                    <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                        <EditCallForm call={call} editCall={editCall} />
                    </div>
                </div>
            </PageWrapper>
        );
    } catch (err: unknown) {
        console.log('err: ', err);
        return <div>Error</div>;
    }
}
