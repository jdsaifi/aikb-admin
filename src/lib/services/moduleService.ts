import { auth } from '@/auth';
import axiosClient from '@/axiosClient';

/** get all modules */
export const getModules = async () => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }

    const res = await axiosClient.get('/modules', {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    });
    const result = res.data;
    if (result.status === 'error') {
        throw new Error(result.data[0].message);
    }
    return result.data;
}; // end
