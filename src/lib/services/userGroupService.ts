'use server';

import { auth } from '@/auth';
import axiosClient, { CustomAxiosError } from '@/axiosClient';
import { IUserGroup, IUserGroupInput, UnauthorizedError } from '../../types';
import { AxiosError } from 'axios';

/** get all user groups */
export const getUserGroups = async (): Promise<IUserGroup[]> => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }
    try {
        const res = await axiosClient.get('/users/user-groups', {
            headers: {
                Authorization: `Bearer ${session.jwt}`,
            },
        });
        console.log('\n\n\n\n-------->res user group: ', res);
        const result = res.data;
        if (result.status === 'error') {
            throw new Error(result.data[0].message);
        }
        return result.data;
    } catch (error) {
        console.log('Error getting user groups: ', error);
        return [];
    }
}; // end

/** add new user group */

export const addUserGroup = async (userGroup: IUserGroupInput) => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }
    const res = await axiosClient.post('/users/user-groups', userGroup, {
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

/** get user group by id */
export const getUserGroupById = async (userGroupId: string) => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }
    const res = await axiosClient.get(`/users/user-groups/${userGroupId}`, {
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

/** update user group */
export const updateUserGroup = async (
    userGroupId: string,
    userGroup: IUserGroupInput
) => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }
    const res = await axiosClient.put(
        `/users/user-groups/${userGroupId}`,
        userGroup,
        {
            headers: {
                Authorization: `Bearer ${session.jwt}`,
            },
        }
    );
    const result = res.data;
    if (result.status === 'error') {
        throw new Error(result.data[0].message);
    }
    return result.data;
};
// end

/** delete user group */
export const deleteUserGroup = async (
    userGroupId: string
): Promise<{ data: any; error: string | null }> => {
    let data: any;
    let error: string | null = null;
    try {
        const session = await auth();
        if (!session?.user) {
            error = 'Unauthorized';
            return { data, error };
        }
        const res = await axiosClient.delete(
            `/users/user-groups/${userGroupId}`,
            {
                headers: {
                    Authorization: `Bearer ${session.jwt}`,
                },
            }
        );
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
