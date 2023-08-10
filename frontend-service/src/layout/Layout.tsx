import { format } from 'date-fns'
import React, { useContext, useEffect } from 'react'
import { Logo } from '../assets'
import CreateProject from '../components/projects/CreateProject'
import Sidebar from '../components/sidebar/Sidebar'
import CreateTask from '../components/task/CreateTask'
import { CommonContext } from '../context'
import { ISidebarLink } from '../types'
import { navbarLinks } from '../constants'
import { Link } from 'react-router-dom'
import Project from '../components/projects/Project'
import Task from '../components/task/Task'
import DownloadPopup from '../components/task/DownloadPopup'

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    const [time, setTime] = React.useState(Date.now())
    const { showCreateProject, showDownloadPopup, showTask, showProject, showCreateTask } = useContext(CommonContext)
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000)
        return () => {
            clearInterval(interval)
        }
    }, [time])

    return (
        <div className='w-full flex items-center min-h-screen'>
            {showCreateProject && <CreateProject />}
            {showCreateTask && <CreateTask />}
            {showTask && <Task />}
            {showProject && <Project />}
            {showDownloadPopup && <DownloadPopup />}
            <Sidebar />
            <div className='w-full sm:w-7/12 md:w-8/12 lg:w-9/12 xl:w-10/12 flex flex-col min-h-screen'>
                <div className='w-full flex justify-between items-center sm:justify-end px-8 py-4 border-b-2 border-slate-300'>
                    <img src={Logo} className='w-12 sm:hidden flex' alt="" />
                    <span className='font-bold text-lg'>{format(time, 'HH:MM:SS aa')}</span>
                </div>
                <div className='w-full overflow-y-scroll'>
                    {children}
                </div>
                <div className='w-full absolute bottom-0 sm:hidden h-16 bg-primary-blue flex items-center'>
                    {
                        navbarLinks.map((link: ISidebarLink, index: number) => (
                            link.path === "/" ?
                                <Link key={index} to={link.path} className='min-h-16 rounded w-1/5 relative'>
                                    <span className='absolute -top-12 bg-secondary-blue w-14 h-14 rounded-full flex items-center justify-center left-0 right-0 mx-auto'><link.icon size={25} color='white' /></span>
                                </Link>
                                :
                                <Link key={index} to={link.path} className='w-1/5 flex items-center justify-center'>
                                    <span className={`${window.location.pathname === link.path ? "bg-white text-primary-blue w-10 h-10 rounded-full" : "text-white"} flex items-center justify-center`}>
                                        <link.icon size={25} />
                                    </span>
                                </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Layout