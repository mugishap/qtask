import { IconType } from 'react-icons'

export interface IUser {
    id: string;
    names: string;
    telephone?: string;
    email: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IProject {

    id: string;
    name: string;
    description: string;
    file: IFile
    createdAt?: string;
    updatedAt?: string;
}

export interface ITask {
    id: string;
    name: string
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt?: Date
    assignees?: IUser[]
    file?: IFile
    fileId?: string
    description: string
    project?: IProject,
    priority: "MEDIUM" | "HIGH" | "LOW",
    status: "TODO" | "IN_PROGRESS" | "DONE"
}

export interface IFile {
    id: string;
    name: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IBackground {
    text: string;
    image: string
}

export interface ISidebarLink {
    text: string;
    icon: IconType;
    path: string;
}

export interface ILoginData {
    email: string,
    password: string
}


export interface ISignupData {
    names: string;
    email: string;
    telephone: string;
    password: string
}

export interface INewTaskData {
    name: string,
    startDate: string,
    endDate: string,
    description: string,
    assigneesIds: string[],
    projectId: string,
    priority: "LOW" | "HIGH" | "MEDIUM",
    file: {
        name: string,
        url: string
    }
}

export interface IUpdateTaskData {
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    projectId: string,
    assigneesIds: string[],
    file: {
        name: string,
        url: string
    }
}