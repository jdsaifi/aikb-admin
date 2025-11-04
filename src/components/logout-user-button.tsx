// logout user button
'use client';
import { toast } from 'sonner';
import { IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from './ui/button';

export function LogoutUserButton() {
    const router = useRouter();
    const userLogout = async () => {
        try {
            await signOut();
            return router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Failed to logout');
        }
    };
    return (
        <Button variant="outline" onClick={userLogout}>
            <IconLogout />
            Log out
        </Button>
    );
}
