import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CommonContext } from '../../context'
import { useGetTask } from '../../hooks'
import Tasks from '../tasks/Tasks'

const TaskPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [loading, setLoading] = useState(false)
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
        <Tasks />
    )
}

export default TaskPage