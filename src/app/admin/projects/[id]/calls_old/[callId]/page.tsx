import { FileText, PencilIcon, PhoneCallIcon } from 'lucide-react';
import Link from 'next/link';
import { PageWrapper } from '../../../../../../components/page-wrapper';
import { Button } from '../../../../../../components/ui/button';
import { getCallById } from '../../../../../../lib/services/callService';
import {
    Breadcrumb,
    BreadcrumbSeparator,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from '../../../../../../components/ui/breadcrumb';
import { ICall, IDocument, IFeedback } from '../../../../../../types';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../../../../../../components/ui/card';
import { getOrInsertFeedback } from '../../../../../../lib/services/feedbackService';
import { TranscriptDownloadButton } from '../../../../../../components/transcript-download-button';
import { FeedbackDownloadButton } from '../../../../../../components/feedback-download-button';
import { DOCUMENT_TYPES } from '../../../../../../types/schema';

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
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function CallInfoPage({
    params,
}: {
    params: Promise<{ id: string; callId: string }>;
}) {
    const { id: projectId, callId } = await params;
    // console.log('projectId: ', projectId);
    // console.log('callId: ', callId);

    try {
        const call = await getCallById(callId);
        const feedback: IFeedback = await getOrInsertFeedback(
            projectId,
            callId,
            {}
        );
        // console.log('call: ', call);
        // console.log('feedback: ', feedback);

        return (
            <PageWrapper breadcrumbs={<Breadcrumbs data={call} />}>
                <div className="flex justify-end">
                    <Button variant="outline" asChild className="mr-2">
                        <Link
                            href={`/projects/${projectId}/calls/${callId}/edit`}
                        >
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit Call
                        </Link>
                    </Button>

                    <Button asChild>
                        <Link
                            href={`/projects/${projectId}/calls/${callId}/start-call`}
                        >
                            <PhoneCallIcon className="mr-2 h-4 w-4" />
                            Start Call
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col gap-4 mt-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{call.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p
                                        className="text-lg pb-3 prose dark:prose-invert"
                                        dangerouslySetInnerHTML={{
                                            __html: call.description
                                                ? call?.description?.replace(
                                                      /\n/g,
                                                      '<br />'
                                                  )
                                                : '',
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Documents</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Documents List */}
                                    {call.documents &&
                                        call.documents.length > 0 && (
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    {call.documents.map(
                                                        (doc: IDocument) => (
                                                            <div
                                                                key={doc.id}
                                                                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <FileText className="w-5 h-5 text-slate-500" />
                                                                    <div>
                                                                        <button
                                                                            type="button"
                                                                            // onClick={() => {
                                                                            //     setSelectedDocument(doc);
                                                                            //     setIsDocumentModalOpen(
                                                                            //         true
                                                                            //     );
                                                                            // }}
                                                                            className="text-sm font-medium text-slate-900 dark:text-white hover:underline cursor-pointer"
                                                                            // disabled={
                                                                            //     updateInterviewMutation.isPending
                                                                            // }
                                                                        >
                                                                            {
                                                                                doc.originalname
                                                                            }
                                                                        </button>
                                                                        <p className="text-xs text-slate-500">
                                                                            {
                                                                                DOCUMENT_TYPES.find(
                                                                                    (
                                                                                        type
                                                                                    ) =>
                                                                                        type.mimetype ===
                                                                                        doc.mimetype
                                                                                )
                                                                                    ?.label
                                                                            }{' '}
                                                                            •{' '}
                                                                            {(
                                                                                doc.size /
                                                                                1024
                                                                            ).toFixed(
                                                                                1
                                                                            )}{' '}
                                                                            KB
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {/* <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    // onClick={() =>
                                                                    //     deleteDocumentMutation.mutate(
                                                                    //         doc._id
                                                                    //     )
                                                                    // }
                                                                    className="text-slate-500 hover:text-red-500 cursor-pointer"
                                                                >
                                                                    <DownloadCloud className="w-4 h-4" />
                                                                </Button> */}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    {/* end documents list */}
                                </CardContent>
                            </Card>

                            <Card className="mt-4">
                                <CardHeader>
                                    <CardTitle>Transcript & Feedback</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-row gap-4 justify-start">
                                        {feedback &&
                                            feedback?.transcript?.length >
                                                0 && (
                                                <TranscriptDownloadButton
                                                    callName={call.name}
                                                    transcript={
                                                        feedback.transcript
                                                    }
                                                />
                                            )}

                                        {feedback && feedback?.feedback && (
                                            <FeedbackDownloadButton
                                                callName={call.name}
                                                feedback={feedback.feedback}
                                            />
                                        )}

                                        {feedback &&
                                            feedback?.transcript?.length == 0 &&
                                            !feedback?.feedback && (
                                                <div className="flex flex-col gap-2 items-center justify-center bg-gray-100 p-4 rounded-md w-full">
                                                    <p className="text-sm text-gray-500">
                                                        No transcript or
                                                        feedback available.
                                                        Please start the call
                                                        first.
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        );
    } catch (err: unknown) {
        console.log('error got from call info page: ', err);
    }
}
