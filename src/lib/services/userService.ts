'use server';

import { auth } from '@/auth';
import axiosClient, { CustomAxiosError } from '@/axiosClient';
import { IUser, IUserInput } from '../../types';

/** get all users */
export const getUsers = async () => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }
    const res = await axiosClient.get('/users', {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    });
    const result = res.data;
    if (result.status === 'error') {
        throw new Error(result.data[0].message);
    }
    return result.data;
};
// end

/** get user by id */
export const getUserById = async (userId: string) => {
    const session = await auth();
    if (!session?.user) {
        return null;
    }
    const res = await axiosClient.get(`/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    });
    const result = res.data;
    if (result.status === 'error') {
        throw new Error(result.data[0].message);
    }
    return result.data[0];
};
// end

/* update user */
export const updateUser = async (userId: string, data: IUserInput) => {
    const session = await auth();
    if (!session?.user) {
        return null;
    }

    const res = await axiosClient.put(`/users/${userId}`, data, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    });
    return res.data[0];
};
// end

/* add user */
export const addUser = async (data: IUserInput) => {
    const session = await auth();
    if (!session?.user) {
        return null;
    }

    const res = await axiosClient.post(`/users`, data, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    });
    return res.data[0];
};
// end

/* delete user */
export const deleteUser = async (
    userId: string
): Promise<{ data: any; error: string | null }> => {
    let data: any;
    let error: string | null = null;
    try {
        const session = await auth();
        if (!session?.user) {
            error = 'Unauthorized';
            return { data, error };
        }

        const res = await axiosClient.delete(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${session.jwt}`,
            },
        });
        data = res.data.data;
    } catch (err: any) {
        if (err?.errorData) {
            const errorData = err.errorData;
            error = errorData.error.messages[0];
        } else {
            error = err.message;
        }
    }
    return { data, error };
};
// end
