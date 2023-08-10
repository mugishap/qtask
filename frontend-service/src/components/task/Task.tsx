import React, { useEffect } from 'react'
import ModalLayout from '../../layout/ModalLayout'
import { CommonContext } from '../../context'
import { ITask, IUpdateTaskData } from '../../types'
import { useGetAllProjects, useGetAllUsers } from '../../hooks'

const Task: React.FC = () => {

    const { activeTask, dispatch, setShowTask } = React.useContext(CommonContext)

    const [editMode, setEditMode] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [task, setTask] = React.useState<IUpdateTaskData>({
        name: activeTask.name,
        description: activeTask.description,
        startDate: activeTask.startDate,
        endDate: activeTask.endDate,
    })

    useEffect(() => {
        useGetAllProjects({ dispatch, setLoading })
        useGetAllUsers({ dispatch, setLoading })
    }, [])

    return (
        <ModalLayout setViewModal={setShowTask}>

        </ModalLayout>
    )
}

export default Task