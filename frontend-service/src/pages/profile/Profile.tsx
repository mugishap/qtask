import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { CommonContext } from '../../context'
import { Link } from 'react-router-dom'
import { Avatar, AvatarGroup } from '@mui/material'
import { format } from 'date-fns'
import { useGetTasksByUserAndStatus } from '../../hooks'
import { ITask } from '../../types'

const Profile: React.FC = () => {
    const { user, tasksByUserAndStatus, dispatch,setActiveTask,setShowTask } = useContext(CommonContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [activeTaskStatus, setActiveTaskStatus] = useState<"DONE" | "IN_PROGRESS" | "TODO">("TODO")
    useEffect(() => {
        useGetTasksByUserAndStatus({ dispatch, setLoading, status: activeTaskStatus })
    }, [activeTaskStatus])
    return (
        <Layout>
            <div className='w-full flex flex-col items-center mx-auto'>
                <div className='w-7/12 mx-auto my-2 bg-slate-200 p-4 rounded hover:bg-slate-300 flex flex-col'>
                    <div className='w-full flex justify-between'>
                        <span className='font-bold text lg'>{user.names}</span>
                    </div>
                    <span>Email: <Link to={`mailto:${user.email}`} target='_blank' className=' text-secondary-blue underline'>{user.email}</Link> </span>
                    <span className='my-4'>Joined {user.createdAt ? format(new Date(user.createdAt), "d MMM HH:MM ") : format(new Date(), "d MMM HH:MM ")}</span>
                    <Avatar alt={user.names} title={user.names} src={`https://ui-avatars.com/api/?name=${user.names}&bold=true&background=1B1464&color=fff`} />
                </div>
                <span className='font-bold text-lg my-3'>Tasks assigned to you</span>
                <div className='w-7/12 flex items-center h-10'>
                    {
                        ["DONE", "IN_PROGRESS", "TODO"].map((status, index: number) => (
                            <div key={index} className={`${activeTaskStatus === status && "border-b-2  border-secondary-blue text-secondary-blue"} w-1/3 mx-4 text-center cursor-pointer`} onClick={() => setActiveTaskStatus(status as "DONE" | "IN_PROGRESS" | "TODO")}>{status}</div>
                        ))
                    }
                </div>
                <div className='w-full grid grid-cols-1 overflow-y-scroll  lg:grid-cols-2 xl:grid-cols-3'>
                    {
                      tasksByUserAndStatus?.map((task: ITask, index: number) => (
                            <div onClick={() => {
                                setActiveTask(task)
                                setShowTask(true)
                            }} className='w-11/12 mx-auto my-2 bg-slate-200 p-4 rounded hover:bg-slate-300 flex flex-col' key={index}>
                                <div className='w-full flex justify-between'>
                                    <span className='font-bold text lg'>{task.name}</span>
                                    {
                                        task.status !== "DONE" &&
                                        <div className={`${task.priority === "HIGH" ? "bg-red-500" : task.priority === "MEDIUM" ? "bg-yellow-600" : "bg-green-500"} w-3 h-3 rounded-full`}></div>
                                    }
                                    {
                                        task.status === "DONE" &&
                                        <span className='bg-green-500 text-white px-3 py-2'>DONE</span>
                                    }
                                </div>
                                <span className='my-4'>{task.createdAt ? format(new Date(task.createdAt), "d MMM HH:MM ") : format(new Date(), "d MMM HH:MM ")}</span>
                                <AvatarGroup max={4}>
                                    {
                                        task.assignees?.map((assignee, index) => (
                                            <Avatar key={index} alt={assignee.names} title={assignee.names} src={`https://ui-avatars.com/api/?name=${assignee.names}&bold=true&background=1B1464&color=fff`} />
                                        ))
                                    }
                                </AvatarGroup>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Profile