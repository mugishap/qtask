import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CommonContext } from '../../context'
import { useGetProject } from '../../hooks'
import Projects from '../projects/Projects'

const ProjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [loading, setLoading] = useState<boolean>(false)
    const { setActiveProject, setShowProject } = useContext(CommonContext)
    useEffect(() => {
        getProject()
    }, [id])

    const getProject = async () => {
        const project = await useGetProject({ id: id as string, setLoading })
        setActiveProject(project)
        setShowProject(false)
    }
    return (
        <>
            {
                loading ?
                    <div className='w-full h-full flex items-center justify-center'>
                        < div className='w-10 h-10 border-4 border-blue-500 rounded-full animate-spin' ></div >
                    </div >
                    :
                    <Projects />
            }
        </>
    )
}

export default ProjectPage