import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const { feedback } = await request.json();
    const buffer = Buffer.from(feedback, 'utf8');
    const headers = new Headers();
    headers.append(
        'Content-Disposition',
        'attachment; filename="feedback.txt"'
    );
    headers.append('Content-Type', 'application/text');

    return new Response(buffer, {
        headers,
    });
}
