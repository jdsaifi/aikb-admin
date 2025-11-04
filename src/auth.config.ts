import type { NextAuthConfig, Session, User } from 'next-auth';
import { authGoogleLogin } from './lib/services/authService';
import axiosClient from './axiosClient';

async function authenticate(email: string, password: string) {
    try {
        const res = await axiosClient.post('/users/login', { email, password });
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

export const authConfig = {
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('\n\n\nuser from signIn: ', user);
            console.log('\n\n\naccount from signIn: ', account);
            console.log('\n\n\nprofile from signIn: ', profile);
            console.log('\n\n\nemail from signIn: ', email);
            console.log('\n\n\ncredentials from signIn: ', credentials);

            if (account?.provider === 'google') {
                const input = {
                    email: user.email as string,
                    name: user.name as string,
                    authProvider: 'google',
                    googleId: profile?.sub as string,
                    emailVerified: true,
                };

                const userRes = await authGoogleLogin(input);

                if (userRes?.length > 0 && userRes[0].token) {
                    console.log('\n\n\nuserRes from signIn: ', userRes);
                    const userInfo = userRes[0].user;
                    // Store user ID for session
                    user.id = userInfo._id;
                    user.authProvider = 'google';
                    user.name = userInfo.name;
                    user.email = userInfo.email;
                    user.token = userRes[0].token;
                    user.userInfo = userInfo;
                    return true;
                }
                return false;
            }
            return true;
        },
        async jwt({ token, user }) {
            // Attach JWT from Express or Google access token
            if (user) {
                token.user = user?.userInfo;
                token.jwt = user?.token || token.jwt;
            }
            return token;
        },
        async session({ session, token }) {
            const user = token.user as Record<string, unknown>;
            (session as Session).user = user;
            (session as Session).jwt = token.jwt as string | undefined;
            (session as Session).permissions = [];
            const { userGroup } = user as any;
            if (userGroup) {
                const permissions = userGroup?.permissions as any;
                if (permissions) {
                    for (const permission of permissions) {
                        const moduleName = permission?.module?.name;
                        if (moduleName) {
                            permission?.actions?.forEach((action: any) => {
                                (session as Session).permissions.push(
                                    `${moduleName.toLowerCase()}.${action?.toLowerCase()}`
                                );
                            });
                        }
                    }
                }
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isLoginPage = nextUrl.pathname === '/login';

            // 1. Not logged in → redirect to /login (unless already on /login)
            if (!isLoggedIn && !isLoginPage) {
                return Response.redirect(new URL('/login', nextUrl));
            }

            // 2. Logged in and trying to visit /login → redirect based on role
            if (isLoggedIn && isLoginPage) {
                const userRole = auth.user?.role;
                if (userRole === 'admin') {
                    return Response.redirect(
                        new URL('/admin/dashboard', nextUrl)
                    );
                } else {
                    return Response.redirect(new URL('/', nextUrl));
                }
            }

            if (nextUrl.pathname === '/') {
                const userRole = auth?.user?.role;
                if (userRole === 'admin') {
                    return Response.redirect(
                        new URL('/admin/dashboard', nextUrl)
                    );
                } else {
                    return Response.redirect(new URL('/', nextUrl));
                }
            }

            // 3. All other cases: allow
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
