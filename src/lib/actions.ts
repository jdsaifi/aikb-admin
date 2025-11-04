'use server';

import {
    addProject,
    addUserToProject,
    removeUserFromProject,
} from './services/projectService';
import { ICall, IProject } from '../types';
import { updateFeedbackTranscript } from './services/feedbackService';
import { auth } from '../auth';

/** add new project action */
export const addProjectAction = async (input: Partial<IProject>) => {
    try {
        const project = await addProject(input);
        return { success: true, project };
    } catch (error: unknown) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};

/** add user to project action */
export const addUserToProjectAction = async (
    projectId: string,
    userId: string
) => {
    try {
        const result = await addUserToProject(projectId, userId);
        return { success: true, data: result };
    } catch (error: unknown) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};

/** remove user from project action */
export const removeUserFromProjectAction = async (
    projectId: string,
    userId: string
) => {
    try {
        const result = await removeUserFromProject(projectId, userId);
        return { success: true, data: result };
    } catch (error: unknown) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}; // end

/** call end transcript action, update feedback */
export const callEndTranscriptAction = async (
    call: ICall,
    feedbackId: string,
    transcript: string
) => {
    console.log('==========callEndTranscriptAction==========');
    console.log('call: ', call);
    console.log('\n\n\n');
    console.log('transcript: ', transcript);

    const res = await updateFeedbackTranscript(
        call.project.id,
        call.id,
        feedbackId,
        transcript
    );
    console.log('\n\n\n');
    console.log('updateFeedbackTranscript: res: ', res);

    // projectId: string, // call.project.id
    // callId: string, // call.id
    // feedbackId: string, // feedbackId
    // transcript: {
    //     role: string;
    //     text: string;
    // }[]
};
// end

export const canUserAccess = async (userPermissions: string[]) => {
    const session = await auth();
    if (!session?.user) {
        return false;
    }

    // Admin users have access to everything
    const userRole = session.user?.role;
    if (userRole === 'admin') {
        return true;
    }

    const permissions = session.permissions || [];
    const rs = userPermissions.every((permission) =>
        permissions.includes(permission)
    );
    return rs;
};
