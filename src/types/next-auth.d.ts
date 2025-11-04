import { DefaultSession } from 'next-auth';
// import { JWT } from 'next-auth/jwt';

// declare module 'next-auth' {
//     interface User {
//         userInfo?: Record<string, unknown>;
//         token?: string;
//     }
//     interface Session {
//         user: Record<string, unknown>;
//         jwt?: string;
//     }
// }

// declare module 'next-auth/jwt' {
//     interface JWT {
//         user?: Record<string, unknown>;
//         jwt?: string;
//     }
// }

declare module 'next-auth' {
    interface Session {
        user: Record<string, unknown> &
            DefaultSession['user'] & {
                role?: 'admin' | 'user';
            };
        jwt?: string;
        permissions: string[];
    }

    interface User {
        userInfo?: Record<string, unknown>;
        token?: string;
        role?: 'admin' | 'user';
        id?: string;
        authProvider?: string;
        name?: string;
        email?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        user?: Record<string, unknown>;
        jwt?: string;
        role?: 'admin' | 'user';
    }
}
