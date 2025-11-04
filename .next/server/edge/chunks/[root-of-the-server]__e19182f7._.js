(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__e19182f7._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/src/axiosClient.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CustomAxiosError": (()=>CustomAxiosError),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$10$2e$0$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/axios@1.10.0/node_modules/axios/lib/axios.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$10$2e$0$2f$node_modules$2f$axios$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/axios@1.10.0/node_modules/axios/index.js [middleware-edge] (ecmascript) <locals>");
;
const baseURL = ("TURBOPACK compile-time value", "http://localhost:3047/api/v1") || 'http://localhost:3047/api/v1';
// Create an Axios instance
const axiosClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$10$2e$0$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});
// Optional: Add global error handling
axiosClient.interceptors.response.use((response)=>response, (error)=>{
    //     console.log('\n\n\n\n');
    //     console.log(
    //         '=================Axiox Client Error DATA================='
    //     );
    //     console.log(error.response.data);
    //     console.log('\n\n\n\n');
    //     console.log('API Error:');
    //     console.log(
    //         util.inspect(
    //             {
    //                 message: error.message,
    //                 url: error.config?.url,
    //                 status: error.response?.status,
    //                 errorData: error.response?.data,
    //             },
    //             { depth: null, colors: true }
    //         )
    //     );
    // Optionally shape the error to a standard format
    const customError = {
        message: error.response?.data?.message || 'Something went wrong',
        status: error.response?.status || 500,
        originalError: error,
        errorData: error.response?.data
    };
    // throw customError;
    // toast.error(customError.message);
    return Promise.reject(customError); // reject with customError
});
class CustomAxiosError extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$10$2e$0$2f$node_modules$2f$axios$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AxiosError"] {
    // message: string;
    // status: number;
    originalError;
    errorData;
}
const __TURBOPACK__default__export__ = axiosClient;
}}),
"[project]/src/lib/services/authService.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "authGoogleLogin": (()=>authGoogleLogin)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$axiosClient$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/axiosClient.ts [middleware-edge] (ecmascript)");
'use server';
;
const authGoogleLogin = async (input)=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$axiosClient$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].post('/auth/google-login', input);
        return res.data.data;
    } catch (error) {
        const errorData = error?.errorData;
        throw errorData.error.messages[0];
    }
}; // end
}}),
"[project]/src/auth.config.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "authConfig": (()=>authConfig)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$authService$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/authService.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$axiosClient$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/axiosClient.ts [middleware-edge] (ecmascript)");
;
;
async function authenticate(email, password) {
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$axiosClient$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].post('/users/login', {
            email,
            password
        });
        return res.data;
    } catch (error) {
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
const authConfig = {
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async signIn ({ user, account, profile, email, credentials }) {
            console.log('\n\n\nuser from signIn: ', user);
            console.log('\n\n\naccount from signIn: ', account);
            console.log('\n\n\nprofile from signIn: ', profile);
            console.log('\n\n\nemail from signIn: ', email);
            console.log('\n\n\ncredentials from signIn: ', credentials);
            if (account?.provider === 'google') {
                const input = {
                    email: user.email,
                    name: user.name,
                    authProvider: 'google',
                    googleId: profile?.sub,
                    emailVerified: true
                };
                const userRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$authService$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["authGoogleLogin"])(input);
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
        async jwt ({ token, user }) {
            // Attach JWT from Express or Google access token
            if (user) {
                token.user = user?.userInfo;
                token.jwt = user?.token || token.jwt;
            }
            return token;
        },
        async session ({ session, token }) {
            const user = token.user;
            session.user = user;
            session.jwt = token.jwt;
            session.permissions = [];
            const { userGroup } = user;
            if (userGroup) {
                const permissions = userGroup?.permissions;
                if (permissions) {
                    for (const permission of permissions){
                        const moduleName = permission?.module?.name;
                        if (moduleName) {
                            permission?.actions?.forEach((action)=>{
                                session.permissions.push(`${moduleName.toLowerCase()}.${action?.toLowerCase()}`);
                            });
                        }
                    }
                }
            }
            return session;
        },
        authorized ({ auth, request: { nextUrl } }) {
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
                    return Response.redirect(new URL('/admin/dashboard', nextUrl));
                } else {
                    return Response.redirect(new URL('/', nextUrl));
                }
            }
            if (nextUrl.pathname === '/') {
                const userRole = auth?.user?.role;
                if (userRole === 'admin') {
                    return Response.redirect(new URL('/admin/dashboard', nextUrl));
                } else {
                    return Response.redirect(new URL('/', nextUrl));
                }
            }
            // 3. All other cases: allow
            return true;
        }
    },
    providers: []
};
}}),
"[project]/src/auth.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "auth": (()=>auth),
    "handlers": (()=>handlers),
    "signIn": (()=>signIn),
    "signOut": (()=>signOut)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$29_next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@5.0.0-beta.29_next@15.3.4_react-dom@19.1.0_react@19.1.0__react@19.1.0__react@19.1.0/node_modules/next-auth/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$29_next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@5.0.0-beta.29_next@15.3.4_react-dom@19.1.0_react@19.1.0__react@19.1.0__react@19.1.0/node_modules/next-auth/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/auth.config.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$29_next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@5.0.0-beta.29_next@15.3.4_react-dom@19.1.0_react@19.1.0__react@19.1.0__react@19.1.0/node_modules/next-auth/providers/credentials.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$auth$2b$core$40$0$2e$40$2e$0$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@auth+core@0.40.0/node_modules/@auth/core/providers/credentials.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$29_next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@5.0.0-beta.29_next@15.3.4_react-dom@19.1.0_react@19.1.0__react@19.1.0__react@19.1.0/node_modules/next-auth/providers/google.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$auth$2b$core$40$0$2e$40$2e$0$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$google$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@auth+core@0.40.0/node_modules/@auth/core/providers/google.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$71$2f$node_modules$2f$zod$2f$v3$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.71/node_modules/zod/v3/index.js [middleware-edge] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$axiosClient$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/axiosClient.ts [middleware-edge] (ecmascript)");
;
;
;
;
;
;
async function authenticate(email, password) {
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$axiosClient$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].post('/auth/login', {
            email,
            password
        });
        return res.data;
    } catch (error) {
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
const { auth, signIn, signOut, handlers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$29_next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["authConfig"],
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$auth$2b$core$40$0$2e$40$2e$0$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            authorize: async (credentials)=>{
                const parsedCredentials = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$71$2f$node_modules$2f$zod$2f$v3$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
                    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$71$2f$node_modules$2f$zod$2f$v3$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
                    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$71$2f$node_modules$2f$zod$2f$v3$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6)
                }).safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await authenticate(email, password);
                    // console.log('\n\n\n=============>user:', user);
                    if (!user) return null;
                    if (user.status === 'success') {
                        const userInfo = user.data[0].user;
                        return {
                            id: userInfo._id,
                            name: userInfo.name,
                            email: userInfo.email,
                            token: user.data[0].token,
                            userInfo
                        };
                    }
                }
                return null;
            }
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$auth$2b$core$40$0$2e$40$2e$0$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$google$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
});
}}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/auth.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
;
// Define permissions map for different routes
const PERMISSIONS_MAP = {
    '/users': [
        'users.view'
    ],
    '/users/add': [
        'users.create',
        'user-groups.view'
    ],
    '/users/[userId]': [
        'users.view',
        'users.edit',
        'user-groups.view'
    ],
    '/projects': [
        'projects.view'
    ],
    '/projects/add': [
        'projects.create'
    ],
    '/projects/[id]': [
        'projects.view'
    ],
    '/projects/[id]/calls': [
        'projects.view',
        'calls.view'
    ],
    '/projects/[id]/calls/add': [
        'projects.view',
        'calls.create'
    ],
    '/projects/[id]/calls/[callId]': [
        'projects.view',
        'calls.view'
    ],
    '/projects/[id]/calls/[callId]/edit': [
        'projects.view',
        'calls.edit'
    ],
    '/projects/[id]/calls/[callId]/start-call': [
        'projects.view',
        'calls.view'
    ],
    '/projects/[id]/users': [
        'projects.view',
        'users.view',
        'projects.users.view'
    ],
    '/user-groups': [
        'user-groups.view'
    ],
    '/user-groups/add': [
        'user-groups.create'
    ],
    '/user-groups/[userGroupId]': [
        'user-groups.view',
        'user-groups.edit'
    ]
};
// Helper function to check if user has required permissions
function hasPermission(userPermissions, requiredPermissions) {
    return requiredPermissions.every((permission)=>userPermissions.includes(permission));
}
// Helper function to match route pattern
function matchRoute(pathname, routePattern) {
    // Convert Next.js dynamic route pattern to regex
    const regexPattern = routePattern.replace(/\[([^\]]+)\]/g, '[^/]+') // Replace [param] with regex
    .replace(/\//g, '\\/'); // Escape forward slashes
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(pathname);
}
// Helper function to find required permissions for a pathname
function getRequiredPermissions(pathname) {
    for (const [routePattern, permissions] of Object.entries(PERMISSIONS_MAP)){
        if (matchRoute(pathname, routePattern)) {
            return permissions;
        }
    }
    return [];
}
async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    // Skip permission check for public routes
    const publicRoutes = [
        '/login',
        '/api',
        '/_next',
        '/favicon.ico',
        '/'
    ];
    const isPublicRoute = publicRoutes.some((route)=>pathname.startsWith(route));
    if (isPublicRoute) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Get the session using NextAuth v5 auth function
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["auth"])();
    console.log('\n\n\n=============>session:', session);
    // If no session, redirect to login
    if (!session) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', req.url));
    }
    // Check if user is admin - admins have access to everything
    const userRole = session.user?.role;
    if (userRole === 'admin') {
        console.log(`Admin access granted: ${pathname} - Admin role bypasses permission checks`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const userPermissions = session.permissions || [];
    // Get required permissions for the current route
    const requiredPermissions = getRequiredPermissions(pathname);
    // If no specific permissions are required, allow access
    if (requiredPermissions.length === 0) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Check if user has required permissions
    if (!hasPermission(userPermissions, requiredPermissions)) {
        console.log(`Access denied: ${pathname} requires ${requiredPermissions.join(', ')} but user has ${userPermissions.join(', ')}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/403', req.url));
    }
    console.log(`Access granted: ${pathname} - User has required permissions: ${requiredPermissions.join(', ')}`);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         */ '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__e19182f7._.js.map