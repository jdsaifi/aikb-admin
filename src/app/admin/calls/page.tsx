import { PageWrapper } from '../../../components/page-wrapper';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { deleteCall, getCallsList } from '../../../lib/services/callService';
import { CallTable } from './table';
import { canUserAccess } from '../../../lib/actions';

const Breadcrumbs = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        <Link href="/">Home</Link>
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

export default async function CallsPage() {
    const canViewCalls = await canUserAccess(['calls.view']);
    const canCreateCalls = await canUserAccess(['calls.create']);
    const canEditCall = await canUserAccess(['calls.edit']);
    const canDeleteCall = await canUserAccess(['calls.delete']);

    try {
        const calls = await getCallsList();
        console.log('calls: ', calls);

        return (
            <PageWrapper breadcrumbs={<Breadcrumbs />}>
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
