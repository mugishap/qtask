import { Avatar, AvatarGroup } from '@mui/material'
import { format } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiDownload } from 'react-icons/bi'
import { CommonContext } from '../../context'
import { useGetStats, useGetTasks } from '../../hooks'
import Layout from '../../layout/Layout'
import { ITask } from '../../types'

const Tasks: React.FC = () => {
    const { dispatch, setShowCreateTask, tasks, setActiveTask, setShowTask, setShowDownloadPopup, stats } = useContext(CommonContext)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(5)
    const [totalPages, setTotalPages] = useState<number>(stats.totalTasks / limit);

    useEffect(() => {
        useGetTasks({ dispatch, page: page, limit: limit, setLoading, })
        useGetStats({ dispatch, setLoading })
    }, [page, limit])

    const getPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages > 10) {
            if (page < 6) {
                for (let i = 1; i <= 8; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (page >= 6 && page <= totalPages - 5) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = page - 2; i <= page + 2; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 7; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            }
        } else {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers;
    }
    return (
        <Layout>
            <div className='w-full justify-end flex px-6 my-6'>
                <button onClick={() => setShowDownloadPopup(true)} className='mx-4 px-4 py-2 flex font-semibold text-lg rounded-lg items-center bg-secondary-blue text-white'>
                    <BiDownload size={25} />
                    <span className='ml-2'>Download Excel</span>
                </button>
                <button onClick={() => setShowCreateTask(true)} className='mx-4 px-4 py-2 flex font-semibold text-lg rounded-lg items-center bg-secondary-blue text-white'>
                    <AiOutlinePlus size={25} />
                    <span className='ml-2'>Add Task</span>
                </button>
            </div>
            <div className='w-full grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {tasks.length && tasks.map((task: ITask, index: number) => (
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
                        <span className='my-4'>{format(new Date(task.createdAt ?? Date.toString()), "d MMM HH:MM ")}</span>
                        <AvatarGroup max={4}>
                            {
                                task.assignees?.map((assignee, index) => (
                                    <Avatar key={index} alt={assignee.names} title={assignee.names} src={`https://ui-avatars.com/api/?name=${assignee.names}&bold=true&background=1B1464&color=fff`} />
                                ))
                            }
                        </AvatarGroup>
                    </div>
                ))}
            </div>
            <div className="flex justify-center my-12">
                <div className="flex justify-center items-center space-x-2 mt-4">
                    {page > 1 && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                    )}
                    {getPageNumbers().map((pageNumber, index) => (
                        <span
                            key={index}
                            className={
                                pageNumber === page
                                    ? 'bg-blue-500 text-white font-bold py-2 px-4 rounded'
                                    : 'hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded'
                            }
                            onClick={() => setPage(pageNumber as number)}
                        >
                            {pageNumber}
                        </span>
                    ))}
                    {page < totalPages && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Tasks