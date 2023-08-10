import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CommonContext } from '../../context'
import { useGetTask } from '../../hooks'
import Tasks from '../tasks/Tasks'
import { Logo } from '../../assets'

const TaskPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [loading, setLoading] = useState<boolean>(false)
    const { setActiveTask, setShowTask } = useContext(CommonContext)
    useEffect(() => {
        getTask()
    }, [id])

    const getTask = async () => {
        const task = await useGetTask({ id: id as string, setLoading })
        setActiveTask(task)
        setShowTask(true)
    }
    return (
        <>
            {
                loading ?
                    <div className='w-full bg-slate-200 h-screen flex justify-center items-center'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='relative z-[2] h-44 w-44'>
                                <div className='z-[3] animate-spin absolute w-full h-full rounded-full border-b-2 border-primary-blue p-10'>
                                </div>
                                <div className='z-[4] absolute w-full h-full flex items-center justify-center'>
                                    <img className='w-32' src={Logo} alt="Logo" />
                                </div>
                            </div>
                            <span className='font-bold text-2xl mt-4'>Loading...</span>
                        </div>
                    </div>
                    :
                    <Tasks />
            }
        </>
    )
}

export default TaskPage