import { PageWrapper } from '../../../../../components/page-wrapper';
import { getCallById } from '../../../../../lib/services/callService';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../../../components/ui/breadcrumb';
import Link from 'next/link';
import { ICall, IDocument } from '../../../../../types';
import EditCallForm from './edit-call-form';
import { editCall } from '../../../../../lib/services/callService';
import { Button } from '../../../../../components/ui/button';
import {
    ArrowLeftSquareIcon,
    BackpackIcon,
    PhoneCallIcon,
    PlusIcon,
} from 'lucide-react';
import {
    getDocumentById,
    getDocumentsList,
    editDocument,
} from '../../../../../lib/services/documentService';
import EditDocumentForm from './edit-document-form';
import { getTagMastersList } from '../../../../../lib/services/tagMasterService';

// Force dynamic rendering since this page uses auth() which requires headers

const Breadcrumbs = ({ data }: { data: IDocument }) => {
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
                        <Link href={`/documents`}>Documents</Link>
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        {data.heading}
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        Edit Document
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function EditDocumentPage({
    params,
}: {
    params: Promise<{ documentId: string }>;
}) {
    const { documentId } = await params;

    try {
        const document = await getDocumentById(documentId);
        const tagMasters = await getTagMastersList();

        return (
            <PageWrapper breadcrumbs={<Breadcrumbs data={document} />}>
                <div className="flex justify-end gap-2">
                    <Button asChild>
                        <Link href={`/admin/documents/add`}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add document
                        </Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link href={`/admin/documents`}>
                            <PhoneCallIcon className="mr-2 h-4 w-4" />
                            All documents
                        </Link>
                    </Button>
                </div>
                <div className="mx-auto h-full w-full max-w-3xl rounded-xl">
                    <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                        <EditDocumentForm
                            document={document}
                            tagMasters={tagMasters}
                            editDocument={editDocument}
                        />
                    </div>
                </div>
            </PageWrapper>
        );
    } catch (err: unknown) {
        console.log('err: ', err);
        return <div>Error</div>;
    }
}
