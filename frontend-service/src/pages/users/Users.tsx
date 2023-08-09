import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { CommonContext } from '../../context'
import { useGetAllUsers, } from '../../hooks'

const Users: React.FC = () => {
    const { dispatch } = useContext(CommonContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        useGetAllUsers({ dispatch, setLoading })
    }, [])
    return (
        <Layout>

        </Layout>
    )
}

export default Users