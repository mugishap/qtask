// User hooks

import { Dispatch } from "@reduxjs/toolkit"
import { ILoginData, INewTaskData, ISignupData } from "../types"
import api from "../api";
import { login, setUsers } from "../redux/slices/userReducer";
import { toast } from "react-toastify";
import { setStats } from "../redux/slices/statsReducer";
import { removeProject, setProjects } from "../redux/slices/projectReducer";
import { addTask, removeTask, setTask, setTasks } from "../redux/slices/taskReducer";
import { format, parseISO } from "date-fns";
import { parseDate } from "../utils/date";

export const useLogin = async ({ dispatch, formData, setLoading }: { dispatch: Dispatch, formData: ILoginData, setLoading: Function }) => {
    try {
        setLoading(true);
        const request = await api().post("/auth/login", { ...formData });
        const response = request.data
        dispatch(login({ ...response.data }))
        localStorage.setItem("token", response.data.token)
        setLoading(false)
        window.location.replace("/")
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
}
export const useCreateUser = async ({ dispatch, formData, setLoading }: { dispatch: Dispatch, formData: ISignupData, setLoading: Function }) => {
    try {
        setLoading(true)
        const request = await api().post("/user/create", { ...formData });
        const response = request.data
        dispatch(login({ user: response.data, token: response.data.token }))
        localStorage.setItem("token", response.data.token)
        setLoading(false)
        toast.success(response.message)
        window.location.replace("/")
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
}
// export const useUpdateUser = () => { }
// export const useGetUser = () => { }
// export const useGetUsers = ({ dispatch, page, limit, setLoading }: { dispatch: Dispatch, page: number, limit: number, setLoading: Function }) => { }
// export const useDeleteUser = ({ dispatch, id, setLoading }: { dispatch: Dispatch, setLoading: Function, id: string }) => { }
export const useGetAllUsers = async ({ dispatch, setLoading }: { dispatch: Dispatch, setLoading: Function }) => {
    try {
        setLoading(true)
        const response = await api().get("/user/all")
        dispatch(setUsers(response.data.data.users))
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to get users")
    } finally {
        setLoading(false)
    }
}
// Tasks hooks

export const useCreateTask = async ({ dispatch, setLoading, formData, setShowCreateTask, setFormData }: { setFormData: Function, dispatch: Dispatch, setLoading: Function, formData: INewTaskData, setShowCreateTask: Function }) => {
    try {
        setLoading(true)
        const response = await api().post("/task/create", { ...formData, startDate: new Date(formData.startDate), endDate: new Date(formData.endDate) })
        toast.success(response.data.message)
        dispatch(addTask(response.data.data.task))
        setShowCreateTask(false)
        setFormData({
            name: '',
            startDate: '',
            endDate: "",
            description: "",
            assigneesIds: [],
            projectId: "",
            priority: "LOW",
            file: {
                name: '',
                url: ''
            }
        })
        return
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to create task")
    } finally {
        setLoading(false)
    }
}
export const useUpdateTask = async ({ id, dispatch, setLoading, formData }: { id: string, dispatch: Dispatch, setLoading: Function, formData: any }) => {
    try {
        setLoading(true)
        const response = await api().put("/task/update/" + id, { ...formData })
        dispatch(setTask({ id, task: response.data.data.task }))
        toast.success(response.data.message)
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to update task")
    } finally {
        setLoading(false)
    }
}
export const useAddFileToTask = async ({ id, dispatch, setLoading, formData }: { id: string, dispatch: Dispatch, setLoading: Function, formData: any }) => {
    try {
        setLoading(true)
        const response = await api().post("/task/add-file/" + id, { ...formData })
        dispatch(setTask({ id, task: response.data.data.task }))
        toast.success(response.data.message)
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to add file to task")
    } finally {
        setLoading(false)
    }
}

export const useGetTasks = async ({ dispatch, page, limit, setLoading }: { dispatch: Dispatch, page: number, limit: number, setLoading: Function }) => {
    try {
        setLoading(true)
        const response = await api().get("/task/get-all?page=" + page + "&limit=" + limit)
        dispatch(setTasks(response.data.data.tasks))
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to get tasks")
    } finally {
        setLoading(false)
    }
}
export const useDeleteTask = async ({ dispatch, id, setLoading }: { dispatch: Dispatch, setLoading: Function, id: string }) => {
    try {
        setLoading(true)
        const response = await api().delete("/task/delete/" + id)
        dispatch(removeTask(id))
        toast.success(response.data.message)
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to delete task")
    } finally {
        setLoading(false)
    }
}
export const useGetTasksByProject = () => { }
export const useGetTasksByUser = () => { }

// Project hooks
export const useCreateProject = () => { }
export const useUpdateProject = () => { }
export const useGetProject = () => { }
export const useGetProjects = async ({ dispatch, page, limit, setLoading }: { dispatch: Dispatch, page: number, limit: number, setLoading: Function }) => {
    try {
        setLoading(true)
        const response = await api().get("/project/all?page=" + page + "&limit=" + limit)
        dispatch(setUsers(response.data.data.projects))
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to get projects")
    } finally {
        setLoading(false)
    }
}
export const useGetAllProjects = async ({ dispatch, setLoading }: { dispatch: Dispatch, setLoading: Function }) => {
    try {
        setLoading(true)
        const response = await api().get("/project/get-all")
        console.log(response.data.data.projects);
        dispatch(setProjects(response.data.data.projects))
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to get projects")
    } finally {
        setLoading(false)
    }
}
export const useDeleteProject = async ({ dispatch, id, setLoading }: { dispatch: Dispatch, setLoading: Function, id: string }) => {
    try {
        setLoading(true)
        const response = await api().delete("/project/delete/" + id)
        dispatch(removeProject(id))
        toast.success(response.data.message)
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to delete project")
    } finally {
        setLoading(false)
    }
}


// Stats hooks

export const useGetStats = async ({ dispatch, setLoading }: { dispatch: Dispatch, setLoading: Function }) => {
    try {
        setLoading(true)
        const response = await api().get("/stats")
        dispatch(setStats(response.data.data))
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to get stats")
    } finally {
        setLoading(false)
    }
}


// Excel hooks

export const useDownloadExcel = async ({ formData, setLoading, setView }: { setView: Function, formData: { startDate: string, endDate: string }, setLoading: Function }) => {
    try {
        setLoading(true)
        const response = await api().get("/excel?startDate=" + parseDate(formData.startDate) + "&endDate=" + parseDate(formData.endDate), { responseType: 'blob' })
        console.log(response);
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `Tasks from ${format(new Date(formData.startDate), 'd MMM')} to ${format(new Date(formData.endDate), 'd MMM')}.xlsx`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setView(false)
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to get file")
    } finally {
        setLoading(false)
    }
}
