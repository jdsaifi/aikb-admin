import NextAuth, { User } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';
import axiosClient from './axiosClient';
import { ILoginResponse, IUser } from './types';

async function authenticate(email: string, password: string) {
    try {
        const res = await axiosClient.post('/auth/login', { email, password });
        return res.data;
    } catch (error: any) {
        // console.log('\n\n\nauthenticate error:', error);
        if ('errorData' in error) {
            console.log('\n\n\nauthenticate error:', error.errorData);

            // Try different error message paths
            let message = 'Failed to authenticate user.';

            if (error.errorData?.error?.messages?.[0]) {
                message = error.errorData.error.messages[0];
            } else if (error.errorData?.messages?.[0]) {
                message = error.errorData.messages[0];
            } else if (error.errorData?.message) {
                message = error.errorData.message;
            } else if (error.message) {
                message = error.message;
            }

            throw new Error(message);
        }
        throw new Error('Failed to authenticate user.');
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user: ILoginResponse = await authenticate(
                        email,
                        password
                    );
                    // console.log('\n\n\n=============>user:', user);
                    if (!user) return null;

                    if (user.status === 'success') {
                        const userInfo = user.data[0].user;
                        return {
                            id: userInfo._id,
                            name: userInfo.name,
                            email: userInfo.email,
                            token: user.data[0].token,
                            userInfo,
                        } as User & { userInfo: IUser };
                    }
                }
                return null;
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
});
