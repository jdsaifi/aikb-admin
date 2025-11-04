'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { signIn } from 'next-auth/react';
import { authGoogleLogin } from '../../lib/services/authService';
import { toast } from 'sonner';

export default function OAuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const handleOAuth = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();
            if (error || !session?.user) {
                console.error('OAuth session error', error);
                return;
            }

            const { user } = session;
            const { email, user_metadata, id } = user;
            const name = user_metadata.full_name;

            console.log('\n\n\nuser from oauth callback: ', user);

            // // Send user info to Express backend

            try {
                const res = await authGoogleLogin({
                    email: email as string,
                    name: name as string,
                    authProvider: 'google',
                    googleId: id as string,
                    emailVerified: true,
                });

                console.log('\n\n\nres from oauth callback: ', res);

                // // Call NextAuth credentials provider to create session
                const authRes = await signIn('credentials', {
                    email,
                    token: res.token,
                    redirect: false,
                });

                console.log('\n\n\nauthRes from oauth callback: ', authRes);

                if (authRes?.ok) {
                    router.push('/');
                } else {
                    console.error('NextAuth sign-in failed', authRes);
                }
            } catch (error: any) {
                toast.error(error.message);
                return;
            }

            // const token = data.token; // from Express backend
        };

        handleOAuth();
    }, []);

    return <p>Logging in...</p>;
}
