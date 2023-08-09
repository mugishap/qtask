import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { CommonContext } from '../../context'
import { useGetTasks } from '../../hooks'
import { AiOutlinePlus } from 'react-icons/ai'

const Tasks: React.FC = () => {
    const { dispatch, setShowCreateTask } = useContext(CommonContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        useGetTasks({ dispatch, page: 0, limit: 5, setLoading })
    }, [])
    return (
        <Layout>
            <div className='w-full justify-end flex px-6 my-6'>
                <button onClick={() => setShowCreateTask(true)} className='px-4 py-2 flex font-semibold text-lg rounded-lg items-center bg-secondary-blue text-white'>
                    <AiOutlinePlus size={25} />
                    <span className='ml-2'>Add Task</span>
                </button>
            </div>
            <div></div>

        </Layout>
    )
}

export default Tasks