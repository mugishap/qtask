import { IBackground, ISidebarLink } from "../types";
import { AiOutlineDashboard, AiOutlineEdit, AiOutlineProject, AiOutlineUser } from "react-icons/ai";
import { HiUserGroup } from 'react-icons/hi'

export const backgrounds: IBackground[] = [
    {
        text: "Task Management at your fingertips",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFza3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1800&q=60",
    },
    {
        text: "Team work made effective",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGFza3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1800&q=60",
    },
    {
        text: "Always find it hard to manage your tasks?",
        image: "https://images.unsplash.com/photo-1515847049296-a281d6401047?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRhc2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1800&q=60",
    },
    {
        text: "Best task management tool in the market",
        image: "https://images.unsplash.com/photo-1590402494587-44b71d7772f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRhc2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1800&q=60",
    },
    {
        text: "Let's get you into QTask",
        image: "https://images.unsplash.com/photo-1586282023692-6bfbd629e85d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRhc2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1800&q=60",
    },
    {
        text: "Is finishing projects on time a problem for you?",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRhc2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1800&q=60",
    },
    {
        text: "Let's help you keep track of your tasks",
        image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1800&q=60",
    },
    {
        text: "Don't say we didn't tell you",
        image: "https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlzY3Vzc2lvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1800&q=60",
    },
    {
        text: "This is the best task management tool you'll ever use",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlzY3Vzc2lvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1800&q=60",
    },
    {
        text: "Get started with QTask today",
        image: "https://images.unsplash.com/photo-1603202662747-00e33e7d1468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRpc2N1c3Npb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1800&q=60",
    },
]

export const sidebarLinks: ISidebarLink[] = [
    {
        text: "Dashboard",
        icon: AiOutlineDashboard,
        path: "/"
    },
    {
        text: "Tasks",
        icon: AiOutlineEdit,
        path: "/tasks"
    },
    {
        text: "Projects",
        icon: AiOutlineProject,
        path: "/projects"
    },
    {
        text: "Users",
        icon: HiUserGroup,
        path: "/users"
    },
    {
        text: "Profile",
        icon: AiOutlineUser,
        path: "/profile"
    },
]


export const navbarLinks: ISidebarLink[] = [
    {
        text: "Tasks",
        icon: AiOutlineEdit,
        path: "/tasks"
    },
    {
        text: "Projects",
        icon: AiOutlineProject,
        path: "/projects"
    },
    {
        text: "Dashboard",
        icon: AiOutlineDashboard,
        path: "/"
    },
    {
        text: "Users",
        icon: HiUserGroup,
        path: "/users"
    },
    {
        text: "Profile",
        icon: AiOutlineUser,
        path: "/profile"
    },
]

