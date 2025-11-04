'use server';
import { auth } from '../../auth';
import axiosClient from '../../axiosClient';
import { IDocument } from '../../types';

/** get documents list */
export const getDocumentsList = async () => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }
    try {
        const res = await axiosClient.get(`/documents`, {
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

/** get document by id */
export const getDocumentById = async (documentId: string) => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }
    const res = await axiosClient.get(`/documents/${documentId}`, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    });
    return res.data.data[0];
}; // end

// /** get call by id */
// export const getCallById = async (callId: string) => {
//     const session = await auth();
//     if (!session?.user) {
//         return [];
//     }

//     const res = await axiosClient.get(`/users/calls/${callId}`, {
//         headers: {
//             Authorization: `Bearer ${session.jwt}`,
//         },
//     });
//     const result = res.data;
//     if (result.status === 'error') {
//         throw new Error(result.data[0].message);
//     }
//     return result.data[0];
// }; // end

// /** add new call */
// export const addCall = async (data: FormData) => {
//     const session = await auth();
//     if (!session?.user) {
//         return [];
//     }

//     const res = await axiosClient.post(`/users/calls`, data, {
//         headers: {
//             Authorization: `Bearer ${session.jwt}`,
//             'Content-Type': 'multipart/form-data',
//         },
//     });
//     const result = res.data;
//     if (result.status === 'error') {
//         throw new Error(result.data[0].message);
//     }
//     return result.data;
// }; // end

// /* edit call */
// export const editCall = async (callId: string, call: FormData) => {
//     const session = await auth();
//     if (!session?.user) {
//         return [];
//     }

//     const res = await axiosClient.put(`/users/calls/${callId}`, call, {
//         headers: {
//             Authorization: `Bearer ${session.jwt}`,
//             'Content-Type': 'multipart/form-data',
//         },
//     });
//     const result = res.data;
//     if (result.status === 'error') {
//         throw new Error(result.data[0].message);
//     }
//     return result.data;
// }; // end

/* edit document */

export const editDocument = async (documentId: string, document: FormData) => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }

    const res = await axiosClient.put(`/documents/${documentId}`, document, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
            // 'Content-Type': 'multipart/form-data',
            'Content-Type': 'application/json',
        },
    });
    const result = res.data;
    if (result.status === 'error') {
        throw new Error(result.data[0].message);
    }
    return result.data;
}; // end

/** delete document  */
export const deleteDocument = async (documentId: string) => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }

    try {
        const res = await axiosClient.delete(`/documents/${documentId}`, {
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

// /** get call under project */
// export const getCallUnderProject = async (projectId: string) => {
//     const session = await auth();
//     if (!session?.user) {
//         return [];
//     }

//     try {
//         const res = await axiosClient.get(
//             `/users/projects/${projectId}/calls`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${session.jwt}`,
//                 },
//             }
//         );
//         return res.data.data;
//     } catch (error: any) {
//         const errorData = error?.errorData;
//         throw errorData.error.messages[0];
//     }
// }; // end

// /** list all public calls */
// export const publicCalls = async () => {
//     // const session = await auth();
//     // if (!session?.user) {
//     //     return [];
//     // }

//     try {
//         const res = await axiosClient.get(`/calls/public`);
//         return res.data.data;
//     } catch (error: any) {
//         const errorData = error?.errorData;
//         throw errorData.error.messages[0];
//     }
// }; // end
