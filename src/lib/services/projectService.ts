'use server';
import { auth } from '@/auth';
import axiosClient from '@/axiosClient';
import { IProject } from '../../types';
import { AxiosError } from 'axios';

/** get all projects */
export const getProjects = async () => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }

    // console.log('session: ', session);

    const res = await axiosClient.get('/users/projects', {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    });
    return res.data.data;
}; // end

/** add new project */
export const addProject = async (project: Partial<IProject>) => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }

    const res = await axiosClient.post('/users/projects', project, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    });
    const result = res.data;
    if (result.status === 'error') {
        console.log('==========addProject==========');
        console.log('result: ', result);
        throw new Error(result.data[0].message);
    }
    return result.data;
}; // end

/** get project by id */
export const getProjectById = async (
    id: string
): Promise<{ data: any; error: string | null }> => {
    let data: any = [];
    let error: string | null = null;
    try {
        const session = await auth();
        if (!session?.user) {
            error = 'Unauthorized';
            return { data, error };
        }

        const res = await axiosClient.get(`/users/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${session.jwt}`,
            },
        });
        data = res.data.data[0];
    } catch (err: any) {
        if (err instanceof AxiosError) {
            const errorData = err?.response?.data;
            console.log('errorData: ', errorData);
            error = errorData.error.messages[0];
        } else {
            error = err.message;
        }
    }
    return { data, error };
}; // end

/** delete project */
export const deleteProject = async (id: string) => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }

    const res = await axiosClient.delete(`/users/projects/${id}`, {
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

/** update project */
export const updateProject = async (id: string, project: Partial<IProject>) => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }
    // /v1/users/projects/:projectId
    const res = await axiosClient.put(`/users/projects/${id}`, project, {
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

/** get project users */
export const getProjectUsers = async (projectId: string) => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }

    try {
        ///v1/users/projects/:projectId/users
        const res = await axiosClient.get(
            `/users/projects/${projectId}/users`,
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
    } catch (error) {
        // If the API endpoint doesn't exist yet, return empty array
        console.warn('Project users API endpoint not available yet:', error);
        return [];
    }
};
// end

/** add user to project */
export const addUserToProject = async (projectId: string, userId: string) => {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Unauthorized');
    }

    try {
        //v1/users/projects/:projectId/users
        const res = await axiosClient.post(
            `/users/projects/${projectId}/users`,
            {
                userId,
            },
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
    } catch (error) {
        console.error('Error adding user to project:', error);
        throw new Error('Failed to add user to project. Please try again.');
    }
};

/** remove user from project */
export const removeUserFromProject = async (
    projectId: string,
    userId: string
) => {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Unauthorized');
    }

    try {
        // /v1/users/projects/:projectId/users/:userId
        const res = await axiosClient.delete(
            `/users/projects/${projectId}/users/${userId}`,
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
    } catch (error) {
        console.error('Error removing user from project:', error);
        throw new Error(
            'Failed to remove user from project. Please try again.'
        );
    }
};

export const addCallToProject = async (projectId: string, callId: string) => {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Unauthorized');
    }

    try {
        //v1/users/projects/:projectId/calls
        const res = await axiosClient.post(
            `/users/projects/${projectId}/calls`,
            {
                callId,
            },
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
    } catch (error) {
        console.error('Error adding call to project:', error);
        throw new Error('Failed to add call to project. Please try again.');
    }
};

export const removeCallFromProject = async (
    projectId: string,
    callId: string
) => {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Unauthorized');
    }

    try {
        //v1/users/projects/:projectId/calls/:callId
        const res = await axiosClient.delete(
            `/users/projects/${projectId}/calls/${callId}`,
            {
                headers: {
                    Authorization: `Bearer ${session.jwt}`,
                },
            }
        );
        const result = res.data;

        console.log('\n\n===============>>>>>result: ', result);
        if (result.status === 'error') {
            throw new Error(result.data[0].message);
        }
        return result.data;
    } catch (error) {
        console.error('Error removing call from project:', error);
        throw new Error(
            'Failed to remove call from project. Please try again.'
        );
    }
};

export const addCallsToProject = async (
    projectId: string,
    callIds: string[]
) => {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Unauthorized');
    }

    try {
        // v1/users/projects/:projectId/calls
        const res = await axiosClient.post(
            `/users/projects/${projectId}/calls`,
            {
                callIds,
            },
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
    } catch (error) {
        console.error('Error adding calls to project:', error);
        throw new Error('Failed to add calls to project. Please try again.');
    }
};
