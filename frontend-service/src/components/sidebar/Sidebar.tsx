import React, { useContext } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Logo } from '../../assets'
import { sidebarLinks } from '../../constants'
import { CommonContext } from '../../context'
import { logout } from '../../redux/slices/userReducer'
import { ISidebarLink } from '../../types'

const Sidebar: React.FC = () => {
    const { dispatch } = useContext(CommonContext)
    const handleLogout = () => {
        dispatch(logout({}))
    }

    return (
        <div className='sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12 hidden sm:flex flex-col  items-center border-r-2 min-h-screen border-slate-300 pt-6 justify-between pb-4'>
            <div className='w-full flex flex-col items-center'>
                <div className='w-full flex my-6 items-center justify-center'>
                    <img src={Logo} className='w-20' alt="" />
                    <span className='font-bold text-3xl ml-3'> QTask</span>
                </div>
                <div className='w-10/12 flex-col mt-8 items-center'>
                    {
                        sidebarLinks.map((link: ISidebarLink, index: number) => {
                            return (
                                <Link key={index} to={link.path} className={`text-lg my-2 hover:bg-slate-300 w-full rounded-lg px-4 py-2 ${window.location.pathname === link.path && "bg-slate-200"} flex items-center`}>
                                    <link.icon size={25} className='mr-2' />
                                    <span>{link.text}</span>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <button onClick={() => handleLogout()} className='w-9/12 rounded-lg font-bold text-lg py-2 px-4 flex items-center text-white bg-secondary-blue'><BiLogOut size={25} /> <span className='ml-2'>Logout</span></button>
        </div>
    )
}

export default Sidebar