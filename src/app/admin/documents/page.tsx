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
import {
    deleteDocument,
    getDocumentsList,
} from '@/lib/services/documentService';
import { canUserAccess } from '../../../lib/actions';
import { DocumentTable } from './table';

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
                        Documents
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function DocumentsPage() {
    const canViewDocuments = await canUserAccess(['documents.view']);
    const canCreateDocuments = await canUserAccess(['documents.create']);
    const canEditDocument = await canUserAccess(['documents.edit']);
    const canDeleteDocument = await canUserAccess(['documents.delete']);

    try {
        const documents = await getDocumentsList();
        console.log('documents: ', documents);

        return (
            <PageWrapper breadcrumbs={<Breadcrumbs />}>
                <div className="flex justify-end">
                    {canCreateDocuments && (
                        <Button variant="outline" asChild>
                            <Link href={`/admin/documents/add`}>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Add Document
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="flex flex-col gap-4 mt-5">
                    {documents.length > 0 ? (
                        <DocumentTable
                            documents={documents}
                            canEditDocument={canEditDocument}
                            canDeleteDocument={canDeleteDocument}
                            deleteDocument={deleteDocument}
                        />
                    ) : (
                        <div className="flex flex-col gap-4 text-center bg-muted p-5 rounded-md">
                            <p>No documents found</p>
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
