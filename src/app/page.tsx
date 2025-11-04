import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ConversationApp() {
    return (
        <div className="min-h-screen ">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1>Home page</h1>
                <Button className="cursor-pointer" asChild>
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        </div>
    );
}
