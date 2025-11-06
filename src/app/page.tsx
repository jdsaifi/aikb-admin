// import React from 'react';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ConversationApp() {
    // redirect to login page
    redirect('/login');
    return null;
}
