import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './app.css';
import { Toaster } from '../components/ui/sonner';
import { SessionProvider } from 'next-auth/react';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'AI Knowledge Base Admin',
    description: 'AI Knowledge Base Admin',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SessionProvider>
                    <main>{children}</main>
                    <Toaster />
                </SessionProvider>
            </body>
        </html>
    );
}
