import { Dispatch } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { toast } from "react-toastify";
import api from "../api";
import { addProject, removeProject, setProjects } from "../redux/slices/projectReducer";
import { setStats } from "../redux/slices/statsReducer";
import { addTask, removeTask, setTask, setTasks, setTasksByUserAndStatus } from "../redux/slices/taskReducer";
import { login, setPaginatedUsers, setUsers } from "../redux/slices/userReducer";
import { ILoginData, INewTaskData, ISignupData, IUpdateTaskData } from "../types";
import { parseDate } from "../utils/date";

// User hooks
export const useLogin = async ({ dispatch, formData, setLoading }: { dispatch: Dispatch, formData: ILoginData, setLoading: Function }) => {
    try {
        setLoading(true);
        if (!formData.email || !formData.password) return toast.error("Please fill all fields")
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
export const useGetTasksByUserAndStatus = async ({ dispatch, setLoading, status }: { dispatch: Dispatch, setLoading: Function, status: string }) => {
    try {
        setLoading(true)
        const response = await api().get("/task/get-by-user-and-status/" + status)
        dispatch(setTasksByUserAndStatus(response.data.data.tasks))
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to get tasks")
    } finally {
        setLoading(false)
    }
}
export const useGetUsers = async ({ dispatch, page, limit, setLoading }: { dispatch: Dispatch, page: number, limit: number, setLoading: Function }) => {
    try {
        setLoading(true)
        const response = await api().get("/user/get-users-paginated?page=" + page + "&limit=" + limit)
        dispatch(setPaginatedUsers(response.data.data.users))
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to get users")
    } finally {
        setLoading(false)
    }
}
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
        if (formData.assigneesIds.length === 0) return toast.error("Please select at least one assignee")
        if (!formData.file.name || !formData.file.url) return toast.error("Please select a file for reference")
        if (!formData.startDate || !formData.endDate) return toast.error("Please select start and end date")
        if(!formData.projectId) return toast.error("Please select a project")
        if(!formData.priority) return toast.error("Please select a priority")
        if(!formData.name) return toast.error("Please enter a name")
        if(!formData.description) return toast.error("Please enter a description")

        const response = await api().post("/task/create", { ...formData, startDate: (new Date(formData.startDate)).toISOString(), endDate: (new Date(formData.endDate)).toISOString() })
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
        toast.success(response.data.message)
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to create task")
    } finally {
        setLoading(false)
    }
}
export const useUpdateTask = async ({ id, dispatch, setLoading, formData, setActiveTask, setEditMode }: { setEditMode: Function, setActiveTask: Function, id: string, dispatch: Dispatch, setLoading: Function, formData: IUpdateTaskData }) => {
    try {
        setLoading(true)
         if (formData.assigneesIds.length === 0) return toast.error("Please select at least one assignee")
        if (!formData.file.name || !formData.file.url) return toast.error("Please select a file for reference")
        if (!formData.startDate || !formData.endDate) return toast.error("Please select start and end date")
        if(!formData.projectId) return toast.error("Please select a project")
        if(!formData.name) return toast.error("Please enter a name")
        if(!formData.description) return toast.error("Please enter a description")
        
        const response = await api().put("/task/update/" + id, { ...formData, startDate: (new Date(formData.startDate)).toISOString(), endDate: (new Date(formData.endDate)).toISOString() })
        dispatch(setTask({ id, task: response.data.data.task }))
        setActiveTask({ ...response.data.data.task })
        toast.success(response.data.message)
        setLoading(false)
        setEditMode(false)
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
export const useGetTask = async ({ id, setLoading }: { id: string, setLoading: Function }) => {
    try {
        setLoading(true)
        const response = await api().get("/task/get/" + id)
        return response.data.data.task
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to get task")
    } finally {
        setLoading(false)
    }
}
export const useDeleteTask = async ({ dispatch, id, setLoading, setShowTask }: { setShowTask: Function, dispatch: Dispatch, setLoading: Function, id: string }) => {
    try {
        setLoading(true)
        const response = await api().delete("/task/delete/" + id)
        dispatch(removeTask(id))
        toast.success(response.data.message)
        setShowTask(false)
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to delete task")
    } finally {
        setLoading(false)
    }
}
export const useGetTasksByProject = async ({ projectId, dispatch, setLoading }: { projectId: string, dispatch: Dispatch, setLoading: Function }) => {
    try {
        setLoading(true)
        const response = await api().get("/task/get-by-project/" + projectId)
        dispatch(setTasks(response.data.data.tasks))
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to get tasks")
    } finally {
        setLoading(false)
    }
}
export const useGetTasksByUser = async ({ userId, dispatch, setLoading }: { userId: string, dispatch: Dispatch, setLoading: Function }) => {
    try {
        setLoading(true)
        const response = await api().get("/task/get-by-user/" + userId)
        dispatch(setTasks(response.data.data.tasks))
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to get tasks")
    } finally {
        setLoading(false)
    }
}
export const useUpdateTaskPriority = async ({ id, dispatch, setLoading, priority, setActiveTask }: { setActiveTask: Function, id: string, dispatch: Dispatch, setLoading: Function, priority: string }) => {
    try {
        setLoading(true)
        const response = await api().patch(`/task/update-priority/${id}/${priority}`)
        dispatch(setTask({ id, task: response.data.data.task }))

        setActiveTask({ ...response.data.data.task })
        toast.success(response.data.message)
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to update task priority")
    } finally {
        setLoading(false)
    }
}
export const useUpdateTaskStatus = async ({ id, dispatch, setLoading, status, setActiveTask }: { setActiveTask: Function, id: string, dispatch: Dispatch, setLoading: Function, status: string }) => {
    try {
        setLoading(true)
        const response = await api().patch(`/task/update-status/${id}/${status}`)
        dispatch(setTask({ id, task: response.data.data.task }))
        setActiveTask({ ...response.data.data.task })
        toast.success(response.data.message)
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to update task status")
    } finally {
        setLoading(false)
    }
}
// Project hooks
export const useCreateProject = async ({ dispatch, setLoading, formData, setShowCreateProject }: { setShowCreateProject: Function, dispatch: Dispatch, setLoading: Function, formData: any }) => {
    try {
        setLoading(true)
        const response = await api().post("/project/create", { ...formData })
        dispatch(addProject(response.data.data.project))
        toast.success(response.data.message)
        setShowCreateProject(false)
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to create project")
    } finally {
        setLoading(false)
    }
}
export const useUpdateProject = () => { }
export const useGetProject = async ({ id, setLoading }: { id: string, setLoading: Function }) => {
    try {
        setLoading(true)
        const response = await api().get("/project/get/" + id)
        return response.data.data.project
    } catch (error: any) {
        console.log(error);
        if (error.response.data.message) return toast.error(error.response.data.message)
        toast.error("Failed to get project")
    } finally {
        setLoading(false)
    }
}
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
