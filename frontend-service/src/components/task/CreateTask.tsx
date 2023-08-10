import { Autocomplete, Chip, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { BiFile, BiLoaderAlt, BiRename, BiTime, BiX } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { CommonContext } from '../../context'
import { useCreateTask, useGetAllProjects, useGetAllUsers } from '../../hooks'
import ModalLayout from '../../layout/ModalLayout'
import { INewTaskData, IProject, IUser } from '../../types'
import { checkFileType, uploadImage } from '../../utils/file'
import { format, parseISO } from 'date-fns'
import { parseDateString } from '../../utils/date'

const CreateTask: React.FC = () => {

    const [formData, setFormData] = useState<INewTaskData>({
        name: '',
        startDate: '',
        endDate: "",
        description: "",
        assigneesIds: [],
        projectId: "",
        priority: "LOW",
        file: {
            name: '',
            url: ''
        }
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [imageUploading, setImageUploading] = useState<boolean>(false)
    const { setShowCreateTask, users, dispatch, projects } = useContext(CommonContext)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        useCreateTask({ dispatch, setLoading, formData, setShowCreateTask, setFormData })
    }

    const previewImage = () => {
        const input: any = document.querySelector("#task-file");
        const file = input.files[0];
        const reader = new FileReader();
        if (!checkFileType("task-file")) return toast.error("Only images are supported at the time");
        toast.loading("Uploading Image");
        setImageUploading(true)
        reader.addEventListener("loadend", async () => {
            const url = await uploadImage(reader.result as string);
            setFormData({
                ...formData, file: {
                    name: file.name,
                    url
                }
            });
        });
        reader.readAsDataURL(file);
        setImageUploading(false)
    }


    useEffect(() => {
        useGetAllUsers({ dispatch, setLoading })
        useGetAllProjects({ dispatch, setLoading })

    }, [])
    return (
        <ModalLayout setViewModal={setShowCreateTask} >
            <div className='w-full sm:w-11/12 lg:w-8/12 xl:w-6/12 bg-white flex flex-col p-4 z-30 mt-10 rounded-t-xl sm:rounded-t-lg sm:rounded-lg sm:mt-6'>
                <div className='w-full flex items-center justify-between'>
                    <span className='font-bold text-3xl'>Create Task</span>
                    <BiX size={25} onClick={() => setShowCreateTask(false)} />
                </div>

                <form className="px-4 w-full flex flex-col" onSubmit={handleSubmit}>
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
                    <div className='w-full flex items-center'>
                        <div className='w-1/2 flex my-3 flex-col items-start justify-center'>
                            <div className='my-1 mr-1 w-full flex items-center justify-between'>
                                <span className={``}>Start Date</span>
                            </div>
                            <div className='border border-slate-300 w-full rounded-l rounded flex'>
                                <div className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                                    <BiTime />
                                </div>
                                <input value={formData.startDate} min={format(new Date(), 'yyyy-MM-dd')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, startDate: e.target.value }) }} type={'date'} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={"eg: 2023-01-01"} />
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
                                <input value={formData.endDate}  min={formData.startDate ? format(new Date(formData.startDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, endDate: e.target.value }) }} type={'date'} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={"eg: 2023-01-01"} />
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex my-3 flex-col items-start justify-center'>
                        <div className='my-1 w-full flex items-center justify-between'>
                            <span className={``}>Assignees</span>
                        </div>
                        <Autocomplete
                            className=' border border-slate-300 w-full rounded-l rounded flex'
                            multiple
                            id="fixed-tags-demo"
                            value={formData.assigneesIds.map((id: string) => users.find((user: IUser) => user.id === id))}
                            onChange={(_, newValue) => {
                                setFormData({ ...formData, assigneesIds: newValue.map((user: IUser) => user.id) });
                            }}
                            options={users}
                            getOptionLabel={(option: IUser) => option.names}
                            renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                    <Chip
                                        label={option.names}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField className='focus:border-none' {...params} placeholder="Assignees" />
                            )}
                            size='small'
                        />
                    </div>
                    <div className='w-full flex my-3 flex-col items-start justify-center'>
                        <div className='my-1 w-full flex items-center justify-between'>
                            <span className={``}>Project</span>
                        </div>
                        <Autocomplete
                            disablePortal
                            value={projects.find((project: IProject) => project.id === formData.projectId)}
                            onChange={(_, newValue) => {
                                setFormData({ ...formData, projectId: newValue.id });
                            }}
                            getOptionLabel={(option) => option.name || ""}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            options={projects}
                            className='w-full'
                            renderInput={(params) => <TextField {...params} placeholder='Project' />}
                            size='small'
                        />
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
                    <div className='w-full flex my-3 flex-col items-start justify-center'>
                        <div className='my-1 w-full flex items-center justify-between'>
                            <span className={``}>Priority</span>
                        </div>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="LOW"
                            value={formData.priority}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, priority: e.target.value as "LOW" | "MEDIUM" | "HIGH" }) }}
                            row
                            name="radio-buttons-group"
                            className='w-full px-3 flex items-center justify-between'
                        >
                            <FormControlLabel className='w-1/3 border-2 rounded border-slate-400' sx={{ width: "30%" }} value="LOW" control={<Radio />} label="Low" />
                            <FormControlLabel className='w-1/3 border-2 rounded border-slate-400' sx={{ width: "30%" }} value="MEDIUM" control={<Radio />} label="Medium" />
                            <FormControlLabel className='w-1/3 border-2 rounded border-slate-400' sx={{ width: "30%" }} value="HIGH" control={<Radio />} label="High" />
                        </RadioGroup>
                    </div>
                    <div className='w-full flex my-3 flex-col items-start justify-center'>
                        <div className='my-1 w-full flex items-center justify-between'>
                            <span className={``}>File</span>
                        </div>
                        {
                            formData.file.url !== ''
                                ?
                                <div className='border border-slate-300 w-full rounded-l relative rounded flex'>
                                    <img src={formData.file.url} className='rounded-lg' alt="" />
                                    <button className='text-white px-4 py-2 rounded-lg bg-delete-red absolute top-3 right-3' onClick={() => setFormData({ ...formData, file: { name: '', url: '' } })}>Remove Image</button>
                                </div>
                                :
                                <div className='border border-slate-300 w-full rounded-l rounded flex'>
                                    <div className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                                        <BiFile />
                                    </div>
                                    <label htmlFor="task-file" className="w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10 flex items-center justify-center cursor-pointer">{imageUploading ? "Image is uploading please wait..." : "Click here to upload file"}</label>
                                    <input accept='image/*' onChange={previewImage} type={'file'} id='task-file' className={`hidden`} placeholder={"Upload file here"} />
                                </div>}
                    </div>
                    <button disabled={loading || imageUploading} className='bg-secondary-blue mt-4 text-center w-44 h-12 mx-auto rounded text-white text-xl font-bold' type='submit'>{
                        loading ? <BiLoaderAlt size={25} className="mx-auto" /> : "Save"
                    }</button>
                </form>
            </div>
        </ModalLayout>
    )
}

export default CreateTask