import React from 'react'
import { AiOutlineEdit, AiOutlineProject } from 'react-icons/ai'
import { HiUserGroup } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useGetStats } from '../../hooks'
import Layout from '../../layout/Layout'
import { CommonContext } from '../../context'

const Home: React.FC = () => {

    const [loading, setLoading] = React.useState<boolean>(false)
    const { user, stats, dispatch } = React.useContext(CommonContext)

    const sections = [
        {
            name: "Users",
            icon: HiUserGroup,
            count: stats.users,
            path: "/users"
        },
        {
            name: "Tasks",
            icon: AiOutlineEdit,
            count: stats.tasks,
            path: "/tasks"
        },
        {
            name: "Projects",
            icon: AiOutlineProject,
            count: stats.projects,
            path: "/projects"
        },
    ]
    React.useEffect(() => {
        useGetStats({ dispatch, setLoading })
    }, [])

    return (
        <Layout>
            <div className='h-full pt-8 px-8 flex flex-col w-full'>
                <span className='text-xl font-bold my-4'>Hello there, {user.names}</span>
                <span className='text-2xl font-bold my-4 '>QTask Statistics</span>
                {loading ?
                    "Loading..."
                    :
                    <div className='w-full flex items-center justify-start'>
                        <div className='w-full lg:w-10/12 grid grid-cols-1 mmsm:grid-cols-2 lg:grid-cols-3'>
                            {
                                sections.map((data, index) => (
                                    <Link to={data.path} key={index} className={`rounded w-11/12  mx-auto my-2 p-4 flex flex-col bg-slate-200`}>
                                        <span className='flex items-center text-xl'>
                                            <data.icon className='mr-2' />
                                            <span className='font-medium'>{data.name}</span>
                                        </span>
                                        <span className='mt-4 font-bold text-2xl'>
                                            {data.count}
                                        </span>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>}
            </div>

        </Layout>
    )
}

export default Home