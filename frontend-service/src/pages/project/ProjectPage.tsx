import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CommonContext } from '../../context'
import { useGetProject } from '../../hooks'
import Projects from '../projects/Projects'

const ProjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [loading, setLoading] = useState(false)
    const { setActiveProject, setShowProject } = useContext(CommonContext)
    useEffect(() => {
        getProject()
    }, [id])

    const getProject = async () => {
        const project = await useGetProject({ id: id as string, setLoading })
        setActiveProject(project)
        setShowProject(true)
    }
    return (
        <Projects />
    )
}

export default ProjectPage