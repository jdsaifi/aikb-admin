export interface ICompany {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}

export interface IUser {
    _id: string;
    tags: string[];
    name: string;
    email: string;
    password: string;
    role: string;
    company: ICompany;
    userGroup: IUserGroup | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    // user: {
    //     id: string;
    //     name: string;
    //     email: string;
    //     avatar: string;
    // };
    // token: string;
}

export interface IUserInput {
    name: string;
    email: string;
    // userGroup: string;
    password?: string;
    tags?: string[];
}

export interface ILoginResponse {
    status: 'error' | 'success';
    data: [
        {
            token: string;
            user: IUser;
        }
    ];
}

export interface IProject {
    _id: string;
    name: string;
    description: string;
    company: ICompany;
    isActive: boolean;
    createdBy: IUser;
    createdAt: string;
    updatedAt: string;
    id: string;
}

export interface ITagMaster {
    _id: string;
    id: string;
    key: string;
    name: string;
    value: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IDocument {
    _id: string;
    id: string;
    heading: string;
    subHeading: string;
    description: string;
    createdBy: IUser;
    createdAt: string;
    updatedAt: string;
    filename: string;
    originalname: string;
    path: string;
    mimetype: string;
    size: number;
    content?: string;
    isActive: boolean;
    isChunked: boolean;
    policy: {
        allow_any_of_string: string[];
    };
    parsed_at?: Date;
}

export interface ICall {
    _id: string;
    id: string;
    name: string;
    subHeading?: string;
    description?: string;
    company: ICompany;
    project: IProject;
    createdBy: IUser;
    questions: string[] | null;
    negativeQuestions: string | null;
    positiveQuestions: string | null;
    AIPersona: string | null;
    documents: IDocument[] | null;
    metadata: Record<string, unknown> | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ITranscript {
    role: string;
    content: string;
}

export interface IFeedback {
    company: ICompany;
    project: IProject;
    user: IUser;
    call: ICall;
    transcript: ITranscript[];
    feedback: string | null;
    feedbackDate: Date | null;
    audio: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IModule {
    _id: string;
    id: string;
    name: string;
    displayName: string;
    availablePermissions: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPermission {
    module: IModule;
    actions: string[];
}

export interface IUserGroup {
    _id: string;
    id: string;
    company: ICompany;
    name: string;
    description?: string;
    permissions: IPermission[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserGroupInput {
    name: string;
    description?: string;
    permissions: {
        module: string;
        actions: string[];
    }[];
}

export interface IAxiosResult {
    status: 'success' | 'error';
    data: Record<string, any> | null;
}

export const UnauthorizedError: IAxiosResult = {
    status: 'error',
    data: {
        status: 401,
        errorData: {
            error: 'Unauthorized',
        },
    },
};
