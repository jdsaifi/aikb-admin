import Link from 'next/link';
import { IAxiosResult } from '../types';
import { Button } from './ui/button';
import { HomeIcon } from 'lucide-react';

const Error403 = ({ error }: { error: any }) => {
    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 h-screen">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">403</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                    Unauthorized Access
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                    {error?.errorData?.error}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href="/dashboard"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Go back to dashboard
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-semibold text-gray-900"
                    >
                        Contact support <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default function ErrorComponent({ error }: { error: any }) {
    console.log('=====>>>>> Error compoennet: ', error);
    if (error.status === 403) {
        return <Error403 error={error} />;
    }
    return (
        <div className="flex flex-col gap-4 text-center bg-muted p-5 rounded-md">
            <p>{error.data?.error?.messages[0]}</p>
        </div>
    );
}
