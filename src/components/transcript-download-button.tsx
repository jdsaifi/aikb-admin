'use client';

import { DownloadIcon } from 'lucide-react';
import { ITranscript } from '../types';
import { Button } from './ui/button';

export function TranscriptDownloadButton({
    callName,
    transcript,
}: {
    callName: string;
    transcript: ITranscript[];
}) {
    const download = async () => {
        const response = await fetch('/api/transcript', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ transcript }),
        });
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${callName} - Transcript.json`;
        a.click();

        window.URL.revokeObjectURL(url);
    };

    return (
        <div>
            <Button type="button" onClick={download}>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download Transcript
            </Button>
        </div>
    );
}
