'use client';
import { GalleryVerticalEnd } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { LoginForm } from '@/components/login-form';
import Image from 'next/image';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTransition, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
// import LoginBg from '../../../public/images/login-bg.jpg';

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginPage() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { data: session, status } = useSession();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Check user role and redirect accordingly after successful login
    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            const userRole = session.user.role;

            if (userRole === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/');
            }
        }
    }, [session, status, router]);

    const onSubmit = async (data: FormData) => {
        try {
            startTransition(async () => {
                const res = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                });

                console.log('\n\n\nres: ', res);

                if (res?.error) {
                    toast.error('Invalid credentials');
                    return;
                }

                // The redirect will be handled by the useEffect above
                // when the session becomes available
            });
        } catch (error: unknown) {
            console.log('error got from login page onSubmit : ', error);
            toast.error(
                `An error occurred: ${
                    error instanceof Error ? error.message : 'Unknown error'
                }`
            );
        }
    };

    const loginWithGoogle = async () => {
        // alert('loginWithGoogle');

        try {
            startTransition(async () => {
                await signIn('google', { callbackUrl: '/test-auth' });
            });
        } catch (error: any) {
            console.error('Google sign in error:', error);
            toast.error(
                `An error occurred: ${
                    error instanceof Error ? error.message : 'Unknown error'
                }`
            );
        }

        // const { data, error } = await supabase.auth.signInWithOAuth({
        //     provider: 'google',
        //     options: {
        //         redirectTo: `${window.location.origin}/oauth-callback`,
        //     },
        // });

        // if (error) console.error('OAuth error', error);
        // console.log('data: ', data);
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        AI Knowledge Base
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm
                            form={form}
                            onSubmit={onSubmit}
                            isPending={isPending}
                            loginWithGoogle={loginWithGoogle}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <img
                    src="/images/login-bg.jpg"
                    alt="Login Background"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
                {/* <Image
                    src={'/images/login-bg.jpg'}
                    alt="Login Background"
                    fill
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                /> */}
            </div>
        </div>
    );
}
