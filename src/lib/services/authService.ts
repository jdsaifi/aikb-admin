'use server';

import axiosClient from '../../axiosClient';

/**
 * login with google
 */
export const authGoogleLogin = async (input: {
    email: string;
    name: string;
    authProvider: string;
    googleId: string;
    emailVerified: boolean;
}) => {
    try {
        const res = await axiosClient.post('/auth/google-login', input);
        return res.data.data;
    } catch (error: any) {
        const errorData = error?.errorData;
        throw errorData.error.messages[0];
    }
}; // end
