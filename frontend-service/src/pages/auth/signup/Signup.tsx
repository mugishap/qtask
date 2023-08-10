import React, { useContext, useState } from 'react'
import { AiFillLock, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { BiLoaderAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Logo } from '../../../assets'
import { CommonContext } from '../../../context'
import { useCreateUser } from '../../../hooks'
import AuthLayout from '../../../layout/AuthLayout'
import { ISignupData } from '../../../types'

const Signup: React.FC = () => {

  const [formData, setFormData] = useState<ISignupData>({
    names: "",
    email: "",
    telephone: "",
    password: "",
  })
  const [loading, setLoading] = useState<boolean>(false)

  const { dispatch } = useContext(CommonContext)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    useCreateUser({ dispatch, formData, setLoading })
  }

  return (
    <AuthLayout>
      <div className='w-full pt-16 flex flex-col items-center'>
        <div className='w-full flex my-6 items-center justify-center'>
          <img src={Logo} className='w-20' alt="" />
          <span className='font-bold text-3xl ml-3'> QTask</span>
        </div>
        <span className='text-2xl font-bold my-6'>Welcome to QTask!</span>
        <form className='w-9/12 flex flex-col' onSubmit={handleFormSubmit}>
          <div className='w-full flex my-3 flex-col items-start justify-center'>
            <div className='my-1 w-full flex items-center justify-between'>
              <span className={``}>Names</span>

            </div>
            <div className='border border-slate-300 w-full rounded-l rounded flex'>
              <div className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                <AiOutlineUser />
              </div>
              <input value={formData.names} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, names: e.target.value }) }} type={'text'} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={"eg: Mugisha Precieux"} />
            </div>
          </div>
          <div className='w-full flex my-3 flex-col items-start justify-center'>
            <div className='my-1 w-full flex items-center justify-between'>
              <span className={``}>Email</span>
            </div>
            <div className='border border-slate-300 w-full rounded-l rounded flex'>
              <div className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                <AiOutlineMail />
              </div>
              <input value={formData.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, email: e.target.value }) }} type={'email'} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={"eg: precieuxmugisha@gmail.com"} />
            </div>
          </div>
          <div className='w-full flex my-3 flex-col items-start justify-center'>
            <div className='my-1 w-full flex items-center justify-between'>
              <span className={``}>Telephone</span>
            </div>
            <div className='border border-slate-300 w-full rounded-l rounded flex'>
              <div className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                <AiOutlinePhone />
              </div>
              <input value={formData.telephone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, telephone: e.target.value }) }} type={'tel'} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={"eg: +250782307144"} />
            </div>
          </div>
          <div className='w-full flex my-3 flex-col items-start justify-center'>
            <div className='my-1 w-full flex items-center justify-between'>
              <span className={``}>Password</span>
              {
                (window.location.pathname === "/auth/login")
                &&
                (<Link className='font-bold text-sm text-cr-purple' to={"/auth/forgot-password"}>
                  Forgot Password ?
                </Link>)
              }
            </div>
            <div className='border border-slate-300 w-full rounded-l rounded flex'>
              <div className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                <AiFillLock />
              </div>
              <input value={formData.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })} type={"password"} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={"****"} />
            </div>
          </div>
          <span className='my-6 flex items-center justify-center text-center text-lg w-full'>Already in the family? &nbsp; <Link className='font-bold text-secondary-blue' to={"/auth/login"}>{"Login"}</Link></span>
          <button className='bg-secondary-blue mt-4 text-center w-44 h-12 mx-auto rounded text-white text-xl font-bold' type='submit'>{
            loading ? <BiLoaderAlt /> : "Continue"
          }</button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup