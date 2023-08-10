import { Avatar, AvatarGroup } from '@mui/material'
import { format } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCheckCircle, AiOutlinePlus } from 'react-icons/ai'
import { BiDownload, BiSort } from 'react-icons/bi'
import { CommonContext } from '../../context'
import { useGetStats, useGetTasks } from '../../hooks'
import Layout from '../../layout/Layout'
import { ITask } from '../../types'

const Tasks: React.FC = () => {
    const { dispatch, setShowCreateTask, tasks, setActiveTask, setShowTask, setShowDownloadPopup, stats } = useContext(CommonContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [pageNumbers, setPageNumbers] = useState<(string | number)[]>([])

    useEffect(() => {
        useGetTasks({ dispatch, page: page - 1, limit: limit, setLoading, })
        useGetStats({ dispatch, setLoading })
        setTotalPages(Math.ceil(stats.tasks / limit))

    }, [page, limit])

    useEffect(() => {
        setPageNumbers(getPageNumbers())
    }, [totalPages])

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
            <div className='w-full justify-between flex px-6 my-6'>
                <div className='flex items-center'>
                    <div className='border mx-2 border-slate-300 w-24 h-10 rounded-l rounded flex items-center'>
                        <div className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                            <BiSort />
                        </div>
                        <select value={limit} onChange={(e) => { setLimit(parseInt(e.target.value)) }} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-8`}>
                            {
                                [5, 10, 15, 20].map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className='flex items-center'>
                    <button onClick={() => setShowDownloadPopup(true)} className='mx-4 px-4 py-2 flex font-semibold text-lg rounded-lg items-center bg-secondary-blue text-white'>
                        <BiDownload size={25} />
                        <span className='ml-2'>Download Excel</span>
                    </button>
                    <button onClick={() => setShowCreateTask(true)} className='mx-4 px-4 py-2 flex font-semibold text-lg rounded-lg items-center bg-secondary-blue text-white'>
                        <AiOutlinePlus size={25} />
                        <span className='ml-2'>Add Task</span>
                    </button>
                </div>
            </div>
            <div className='w-full grid grid-cols-1 overflow-y-scroll  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {!loading && tasks.length && tasks.map((task: ITask, index: number) => (
                    <div onClick={() => {
                        setActiveTask(task)
                        setShowTask(true)
                    }} className='w-11/12 cursor-pointer mx-auto my-2 bg-slate-200 p-4 rounded hover:bg-slate-300 flex flex-col' key={index}>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold text lg'>{task.name}</span>
                            {
                                task.status !== "DONE" &&
                                <div className={`${task.priority === "HIGH" ? "bg-red-500" : task.priority === "MEDIUM" ? "bg-yellow-600" : "bg-green-500"} w-3 h-3 rounded-full`}></div>
                            }

                        </div>
                        <span className='my-4'>{task.createdAt ? format(new Date(task.createdAt), "d MMM HH:MM ") : format(new Date(), "d MMM HH:MM ")}</span>
                        <div className='w-full flex items-center justify-between'>
                            {
                                task.status === "DONE" &&
                                <div className='bg-green-500 text-white p-1 rounded-full'>
                                    <AiOutlineCheckCircle color='white' size={25} />
                                </div>
                            }
                            <AvatarGroup max={4}>
                                {
                                    task.assignees?.map((assignee, index) => (
                                        <Avatar key={index} alt={assignee.names} title={assignee.names} src={`https://ui-avatars.com/api/?name=${assignee.names}&bold=true&background=1B1464&color=fff`} />
                                    ))
                                }
                            </AvatarGroup>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center my-12">
                <div className="flex justify-center items-center space-x-2 mt-4">
                    <button
                        disabled={page === 1}
                        className={` text-white font-bold py-2 px-4 rounded ${page === 1 ? 'cursor-not-allowed bg-slate-500' : 'bg-blue-500 hover:bg-blue-700'}`}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>
                    {pageNumbers.map((pageNumber, index) => (
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
                    <button
                        disabled={page >= totalPages}
                        className={` text-white font-bold py-2 px-4 rounded ${page === 1 ? 'cursor-not-allowed bg-slate-500' : 'bg-blue-500 hover:bg-blue-700'}`}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default Tasks