import { auth } from '../../auth';
import axiosClient from '../../axiosClient';
import { IFeedback } from '../../types';

/** get or insert feedback */
export const getOrInsertFeedback = async (
    projectId: string,
    callId: string,
    input: Partial<IFeedback>
) => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }

    const res = await axiosClient.post(
        `/users/projects/${projectId}/calls/${callId}/feedbacks`,
        input,
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
    return result.data[0];
}; // end

/** update feedback transacript */
export const updateFeedbackTranscript = async (
    projectId: string,
    callId: string,
    feedbackId: string,
    transcript: string
) => {
    const session = await auth();
    if (!session?.user) {
        return [];
    }

    const res = await axiosClient.put(
        `/users/projects/${projectId}/calls/${callId}/feedbacks/${feedbackId}/transcript`,
        {
            transcript,
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
    return result.data[0];
};
// end
