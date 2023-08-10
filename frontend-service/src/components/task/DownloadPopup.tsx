import React, { useState } from 'react'
import ModalLayout from '../../layout/ModalLayout'
import { CommonContext } from '../../context'
import { useDownloadExcel } from '../../hooks'
import { BiLoaderAlt, BiTime, BiX } from 'react-icons/bi'
import { toast } from 'react-toastify'

const DownloadPopup: React.FC = () => {

    const { setShowDownloadPopup } = React.useContext(CommonContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: ""
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData.startDate || !formData.endDate) return toast.error("Please select start date and end date")
        useDownloadExcel({ formData, setLoading, setView: setShowDownloadPopup })
    }

    return (
        <ModalLayout setViewModal={setShowDownloadPopup}>
            <div className='z-30 rounded-lg w-11/12 md:w-9/12 lg:w-6/12 bg-white p-6 flex flex-col'>
                <div className='w-full flex items-center justify-between'>
                    <span className='font-bold text-3xl'>Select Date Range</span>
                    <BiX size={25} onClick={() => setShowDownloadPopup(false)} />
                </div>
                <form onSubmit={handleSubmit}>

                    <div className='w-full flex items-center'>
                        <div className='w-1/2 flex my-3 flex-col items-start justify-center'>
                            <div className='my-1 mr-1 w-full flex items-center justify-between'>
                                <span className={``}>Start Date</span>
                            </div>
                            <div className='border border-slate-300 w-full rounded-l rounded flex'>
                                <div className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                                    <BiTime />
                                </div>
                                <input value={formData.startDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, startDate: e.target.value }) }} type={'date'} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={"eg: 2023-01-01"} />
                            </div>
                        </div>
                        <div className='w-1/2 ml-1 flex my-3 flex-col items-start justify-center'>
                            <div className='my-1 w-full flex items-center justify-between'>
                                <span className={``}>End Date</span>
                            </div>
                            <div className='border border-slate-300 w-full rounded-l rounded flex'>
                                <div className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                                    <BiTime />
                                </div>
                                <input value={formData.endDate} min={formData.startDate && new Date(formData.startDate).toISOString().split('T')[0]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, endDate: e.target.value }) }} type={'date'} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={"eg: 2023-01-01"} />
                            </div>
                        </div>
                    </div>
                    <button disabled={loading} className='flex items-center justify-center bg-secondary-blue mt-4 text-center w-44 h-12 mx-auto rounded text-white text-xl font-bold' type='submit'>{
                        loading ? <BiLoaderAlt size={25} className="mx-auto animate-spin" /> : "Save"
                    }</button>
                </form>


            </div>
        </ModalLayout>
    )
}

export default DownloadPopup