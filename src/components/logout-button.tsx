// logout button
'use client';
import { toast } from 'sonner';
import { IconLogout } from '@tabler/icons-react';
import { DropdownMenuItem } from './ui/dropdown-menu';
// import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export function LogoutButton() {
    // const router = useRouter();
    const userLogout = async () => {
        try {
            await signOut({
                redirect: true,
                callbackUrl: '/login',
            });
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Failed to logout');
        }
    };
    return (
        <DropdownMenuItem onClick={userLogout}>
            <IconLogout />
            Log out
        </DropdownMenuItem>
    );
}
