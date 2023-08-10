import React, { useContext, useState } from 'react'
import { CommonContext } from '../../context'
import ModalLayout from '../../layout/ModalLayout'
import { useCreateProject } from '../../hooks'
import { BiLoaderAlt, BiRename } from 'react-icons/bi'

const CreateProject: React.FC = () => {
    const { setShowCreateProject, dispatch } = useContext(CommonContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            useCreateProject({ dispatch, formData, setLoading, setShowCreateProject })
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <ModalLayout setViewModal={setShowCreateProject}>
            <div className='w-full sm:w-11/12 lg:w-8/12 xl:w-6/12 bg-white flex flex-col p-4 z-30 mt-10 rounded-t-xl sm:rounded-t-lg sm:rounded-lg sm:mt-6'>
                <span className='font-bold text-xl'>Create Project</span>
                <form onSubmit={handleSubmit} className='w-full flex flex-col'>
                    <div className='w-full flex my-3 flex-col items-start justify-center'>
                        <div className='my-1 w-full flex items-center justify-between'>
                            <span className={``}>Name</span>
                        </div>
                        <div className='border border-slate-300 w-full rounded-l rounded flex'>
                            <div className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                                <BiRename />
                            </div>
                            <input value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, name: e.target.value }) }} type={'text'} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={"eg: Create Login Form"} />
                        </div>
                    </div>
                    <div className='w-full flex my-3 flex-col items-start justify-center'>
                        <div className='my-1 w-full flex items-center justify-between'>
                            <span className={``}>Description</span>
                            <span className='text-xs text-delete-red'>{formData.description.length > 100 && "Description can't be beyond 100 characters"}</span>
                        </div>
                        <div className='border border-slate-300 w-full rounded-l rounded flex'>
                            <textarea value={formData.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setFormData({ ...formData, description: e.target.value }) }} rows={4} maxLength={115} className={`w-full rounded p-3 resize-none bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm  rounded-r px-3 ${formData.description.length > 100 ? "outline-delete-red outine-2" : "outline-none"}`} placeholder={"eg: He/She is to create form with 2 inputs email and password"}></textarea>
                        </div>
                    </div>
                    <button disabled={loading} className='bg-secondary-blue mt-4 text-center w-44 h-12 mx-auto rounded text-white text-xl font-bold' type='submit'>{
                        loading ? <BiLoaderAlt size={25} className="mx-auto animate-spin" /> : "Save"
                    }</button>
                </form>

            </div>
        </ModalLayout>
    )
}

export default CreateProject