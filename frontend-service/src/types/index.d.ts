export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
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

}

export interface ITask {
    id: string;
    title: string
    startDate: Date
    endDate: Date
    createdAt?: Date
    updatedAt?: Date
    assignees?: IUser[]
    file?: IFile
    fileId?: string
}

export interface IFile {
    id: string;
    name: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
}