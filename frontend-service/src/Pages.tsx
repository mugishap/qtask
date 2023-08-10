import { Dispatch } from '@reduxjs/toolkit'
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CommonContext } from './context'
import { useDeleteProject, useDeleteTask, useGetAllUsers, useGetProjects, useGetTasks } from './hooks'
import NotFound from './pages/404/NotFound'
import Login from './pages/auth/login/Login'
import Signup from './pages/auth/signup/Signup'
import Profile from './pages/profile/Profile'
import Projects from './pages/projects/Projects'
import Tasks from './pages/tasks/Tasks'
import Users from './pages/users/Users'
import { IProject, ITask, IUser } from './types'
import TaskPage from './pages/task/TaskPage'
import ProjectPage from './pages/project/ProjectPage'
const Home = React.lazy(() => import('./pages/home/Home'))

const Pages: React.FC<{}> = () => {

    const dispatch: Dispatch = useDispatch()
    const userSlice = useSelector((state: any) => state.userSlice);
    const taskSlice = useSelector((state: any) => state.taskSlice);
    const projectSlice = useSelector((state: any) => state.projectSlice);
    const statsSlice = useSelector((state: any) => state.statsSlice);
    const user: IUser = userSlice.user
    const users: IUser[] = userSlice.users
    const tasks: ITask[] = taskSlice.tasks
    const stats: {
        users: number,
        tasks: number,
        projects: number
    } = statsSlice.stats
    const projects: IProject[] = projectSlice.projects
    const isLoggedIn: boolean = userSlice.isLoggedIn
    const tasksByUserAndStatus = taskSlice.tasksByUserAndStatus

    const [showCreateTask, setShowCreateTask] = React.useState(false)
    const [showCreateProject, setShowCreateProject] = React.useState(false)
    const [showTask, setShowTask] = React.useState(false)
    const [showProject, setShowProject] = React.useState(false)
    const [activeProject, setActiveProject] = React.useState<IProject | null>(null)
    const [activeTask, setActiveTask] = React.useState<ITask | null>(null)
    const [showDownloadPopup, setShowDownloadPopup] = React.useState(false)

    return (
        <CommonContext.Provider
            value={{
                tasksByUserAndStatus,
                showDownloadPopup,
                setShowDownloadPopup,
                stats,
                user,
                users,
                tasks,
                projects,
                dispatch,
                showCreateTask,
                setShowCreateTask,
                showCreateProject,
                setShowCreateProject,
                showTask,
                setShowTask,
                showProject,
                setShowProject,
                activeProject,
                activeTask,
                setActiveProject,
                setActiveTask
            }}
        >
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth/signup" element={<Signup />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to={"/auth/login"} />} />
                        <Route path="*" element={<NotFound />} />
                        {
                            isLoggedIn &&
                            <>
                                <Route path="/tasks" element={<Tasks />} />
                                <Route path="/task/:id" element={<TaskPage />} />
                                <Route path="/project/:id" element={<ProjectPage />} />
                                <Route path="/users" element={<Users />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/projects" element={<Projects />} />
                            </>
                        }
                    </Routes>
                </BrowserRouter>
            </div>
        </CommonContext.Provider>
    )
}

export default Pages