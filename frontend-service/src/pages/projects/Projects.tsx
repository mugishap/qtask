import { Avatar, AvatarGroup } from '@mui/material'
import { format } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillCheckCircle, AiOutlineCheck, AiOutlineCheckCircle, AiOutlinePlus } from 'react-icons/ai'
import { BiDownload } from 'react-icons/bi'
import { CommonContext } from '../../context'
import { useGetStats, useGetProjects } from '../../hooks'
import Layout from '../../layout/Layout'
import { IProject } from '../../types'

const Projects: React.FC = () => {
    const { dispatch, setShowCreateProject, projects, setActiveProject, setShowProject, setShowDownloadPopup, stats } = useContext(CommonContext)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(stats.projects / limit));

    useEffect(() => {
        useGetProjects({ dispatch, page: page - 1, limit: limit, setLoading, })
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
    useEffect(() => {
        console.log(projects)
    }, [projects])
    
    return (
        <Layout>
            <div className='w-full justify-end flex px-6 my-6'>
                <button onClick={() => setShowCreateProject(true)} className='mx-4 px-4 py-2 flex font-semibold text-lg rounded-lg items-center bg-secondary-blue text-white'>
                    <AiOutlinePlus size={25} />
                    <span className='ml-2'>Add Project</span>
                </button>
            </div>
            <div className='w-full grid grid-cols-1 overflow-y-scroll  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {projects.length && projects.map((project: IProject, index: number) => (
                    <div onClick={() => {
                        setActiveProject(project)
                        setShowProject(true)
                    }} className='w-11/12 cursor-pointer mx-auto my-2 bg-slate-200 p-4 rounded hover:bg-slate-300 flex flex-col' key={index}>
                        <div className='w-full flex justify-between'>
                            <span className='font-bold text lg'>{project.name}</span>
                        </div>
                        <span className='my-4'>{project.createdAt ? format(new Date(project.createdAt), "d MMM HH:MM ") : format(new Date(), "d MMM HH:MM ")}</span>
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
                    {page < totalPages - 1 && (
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

export default Projects