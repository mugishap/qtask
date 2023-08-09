import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { CommonContext } from '../../context'
import { useGetProjects } from '../../hooks'

const Projects: React.FC = () => {
    const { dispatch } = useContext(CommonContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        useGetProjects({ dispatch, page: 0, limit: 5, setLoading })
    }, [])
    return (
        <Layout>

        </Layout>
    )
}

export default Projects