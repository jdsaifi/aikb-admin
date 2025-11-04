'use client';

import { DownloadIcon } from 'lucide-react';
import { Button } from './ui/button';

export function FeedbackDownloadButton({
    callName,
    feedback,
}: {
    callName: string;
    feedback: string;
}) {
    const download = async () => {
        const response = await fetch('/api/feedback', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ feedback }),
        });
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${callName} - Feedback.txt`;
        a.click();

        window.URL.revokeObjectURL(url);
    };

    return (
        <div>
            <Button type="button" onClick={download}>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download Feedback
            </Button>
        </div>
    );
}
