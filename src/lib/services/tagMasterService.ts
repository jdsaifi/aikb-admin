'use server';
import { auth } from '../../auth';
import axiosClient from '../../axiosClient';
import { IDocument } from '../../types';

/** get tag masters list */
export const getTagMastersList = async () => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }
    try {
        const res = await axiosClient.get(`/tag-masters`, {
            headers: {
                Authorization: `Bearer ${session.jwt}`,
            },
        });
        return res.data.data;
    } catch (error: any) {
        const errorData = error?.errorData;
        throw errorData.error.messages[0];
    }
}; // end
