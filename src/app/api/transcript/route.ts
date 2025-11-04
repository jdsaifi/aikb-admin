import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const { transcript } = await request.json();
    const buffer = Buffer.from(JSON.stringify(transcript), 'utf8');
    const headers = new Headers();
    headers.append(
        'Content-Disposition',
        'attachment; filename="transcript.json"'
    );
    headers.append('Content-Type', 'application/json');

    return new Response(buffer, {
        headers,
    });
}
