import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ShieldX } from 'lucide-react';
import Link from 'next/link';

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <ShieldX className="h-8 w-8 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        Access Denied
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        You don&apos;t have permission to access this page.
                        Please contact your administrator if you believe this is
                        an error.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center">
                        <p className="text-sm text-gray-500 mb-4">
                            Error 403 - Forbidden
                        </p>
                        <div className="space-y-2">
                            <Button asChild className="w-full">
                                <Link href="/dashboard">Go to Dashboard</Link>
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="w-full"
                            >
                                <Link href="/">Go Home</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
