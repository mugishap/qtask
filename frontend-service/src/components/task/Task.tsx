import React, { useEffect } from 'react'
import ModalLayout from '../../layout/ModalLayout'
import { CommonContext } from '../../context'
import { IProject, ITask, IUpdateTaskData, IUser } from '../../types'
import { useDeleteTask, useGetAllProjects, useGetAllUsers, useUpdateTask, useUpdateTaskPriority, useUpdateTaskStatus } from '../../hooks'
import { BiEdit, BiFile, BiLoaderAlt, BiRename, BiTime, BiX } from 'react-icons/bi'
import { AiOutlineAlert } from 'react-icons/ai'
import { Autocomplete, Chip, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { parseDateString } from '../../utils/date'
import { checkFileType, uploadImage } from '../../utils/file'
import { toast } from 'react-toastify'
import { format, parseISO } from 'date-fns'

const Task: React.FC = () => {

    const { activeTask, setActiveTask, dispatch, setShowTask, projects, users } = React.useContext(CommonContext)

    const [editMode, setEditMode] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [statusLoading, setStatusLoading] = React.useState(false)
    const [priorityLoading, setPriorityLoading] = React.useState(false)
    const [imageUploading, setImageUploading] = React.useState(false)
    const [priority, setPriority] = React.useState<"LOW" | "HIGH" | "MEDIUM">(activeTask.priority)
    const [status, setStatus] = React.useState<"IN_PROGRESS" | "DONE" | "TODO">(activeTask.status)
    const [task, setTask] = React.useState<IUpdateTaskData>({
        name: activeTask.name,
        description: activeTask.description,
        startDate: parseDateString(activeTask.startDate),
        endDate: parseDateString(activeTask.endDate),
        assigneesIds: activeTask.assignees?.map((assignee: IUser) => assignee.id),
        projectId: activeTask.project?.id,
        file: { name: activeTask.file?.name, url: activeTask.file?.url }
    })

    useEffect(() => {
        useGetAllProjects({ dispatch, setLoading })
        useGetAllUsers({ dispatch, setLoading })
    }, [])



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // return
        useUpdateTask({ id: activeTask.id, dispatch, setLoading, formData: task, setActiveTask, setEditMode })
    }

    const previewImage = () => {
        console.log("In the function")
        const input: any = document.querySelector("#update-task-file");
        const file = input.files[0];
        const reader = new FileReader();
        if (!checkFileType("update-task-file")) return toast.error("Only images are supported at the time");
        toast.loading("Uploading Image");
        setImageUploading(true)
        reader.addEventListener("loadend", async () => {
            const url = await uploadImage(reader.result as string);
            setTask({
                ...task, file: {
                    name: file.name,
                    url
                }
            });
        });
        reader.readAsDataURL(file);
        setImageUploading(false)
    }


    useEffect(() => {
        if (activeTask.status === status) return
        useUpdateTaskStatus({ id: activeTask.id, dispatch, setLoading: setStatusLoading, status, setActiveTask })
    }, [status])

    useEffect(() => {
        if (activeTask.priority === priority) return
        useUpdateTaskPriority({ id: activeTask.id, dispatch, setLoading: setStatusLoading, priority, setActiveTask })
    }, [priority])

    return (
        <ModalLayout setViewModal={setShowTask}>
            <div className='w-8/12 flex flex-col p-6 rounded-lg bg-white z-30'>
                {
                    editMode && <span className='text-delete-red mb-6 flex items-center justify-center w-full text-center'>
                        <AiOutlineAlert size={25} /> <span>Currently in editing mode.</span> &nbsp; <span className='text-black cursor-pointer underline' onClick={() => setEditMode(false)}>Cancel</span>
                    </span>
                }
                {
                    editMode ?
                        <div className='w-full flex flex-col'>
                            <form className='w-full flex flex-col' onSubmit={handleSubmit}>
                                <div className='w-full flex my-3 flex-col items-start justify-center'>
                                    <div className='my-1 w-full flex items-center justify-between'>
                                        <span className={``}>Name</span>
                                    </div>
                                    <div className='border border-slate-300 w-full rounded-l rounded flex'>
                                        <div className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                                            <BiRename />
                                        </div>
                                        <input value={task.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTask({ ...task, name: e.target.value }) }} type={'text'} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={"eg: Create Login Form"} />
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
                                            <input value={task.startDate} min={format(new Date(), 'yyyy-MM-dd')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTask({ ...task, startDate: e.target.value }) }} type={'date'} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={"eg: 2023-01-01"} />
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
                                            <input value={task.endDate} min={task.startDate ? format(new Date(task.startDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTask({ ...task, endDate: e.target.value }) }} type={'date'} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={"eg: 2023-01-01"} />
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
                                        value={task.assigneesIds.map((id: string) => users.find((user: IUser) => user.id === id))}
                                        onChange={(_, newValue) => {
                                            setTask({ ...task, assigneesIds: newValue.map((user: IUser) => user.id) });
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
                                        value={projects.find((project: IProject) => project.id === task.projectId)}
                                        onChange={(_, newValue) => {
                                            setTask({ ...task, projectId: newValue.id });
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
                                        <span className='text-xs text-delete-red'>{task.description.length > 100 && "Description can't be beyond 100 characters"}</span>
                                    </div>
                                    <div className='border border-slate-300 w-full rounded-l rounded flex'>
                                        <textarea value={task.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setTask({ ...task, description: e.target.value }) }} rows={4} maxLength={115} className={`w-full rounded p-3 resize-none bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm  rounded-r px-3 ${task.description.length > 100 ? "outline-delete-red outine-2" : "outline-none"}`} placeholder={"eg: He/She is to create form with 2 inputs email and password"}></textarea>
                                    </div>
                                </div>
                                <div className='w-full flex my-3 flex-col items-start justify-center'>
                                    <div className='my-1 w-full flex items-center justify-between'>
                                        <span className={``}>File</span>
                                    </div>
                                    {
                                        task.file.url !== ''
                                            ?
                                            <div className='border border-slate-300 w-full relative rounded-l rounded flex'>
                                                <img src={task.file.url} className='rounded-lg' alt="" />
                                                <button className='text-white px-4 py-2 rounded-lg bg-delete-red absolute top-3 right-3' onClick={() => setTask({ ...task, file: { name: '', url: '' } })}>Remove Image</button>
                                            </div>
                                            :
                                            <div className='border border-slate-300 w-full rounded-l rounded flex'>
                                                <div className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                                                    <BiFile />
                                                </div>
                                                <label htmlFor="update-task-file" className="w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10 flex items-center justify-center cursor-pointer">{imageUploading ? "Image is uploading please wait..." : "Click here to upload file"}</label>
                                                <input accept='image/*' onChange={previewImage} type={'file'} id='update-task-file' className={`hidden`} placeholder={"Upload file here"} />
                                            </div>}
                                </div>
                                <button disabled={loading || imageUploading} className='bg-secondary-blue mt-4 text-center w-44 h-12 mx-auto rounded text-white text-xl font-bold' type='submit'>{
                                    loading ? <BiLoaderAlt size={25} className="mx-auto" /> : "Save"
                                }</button>
                            </form>
                        </div>
                        :
                        <div>
                            <div className='w-full flex items-center justify-between'>
                                <span className='font-bold text-3xl'>{task.name}</span>
                                <div className='flex items-center'>
                                    <BiEdit size={25} className='mx-3' onClick={() => setEditMode(!editMode)} />
                                    <BiX size={25} className='mx-3' onClick={() => setShowTask(false)} />
                                </div>
                            </div>
                            <div className='flex flex-col w-full my-4'>
                                <span className='text-sm text-slate-600'>{task.description}</span>
                            </div>
                            <div className='flex flex-col w-full my-4'>
                                <span>Project:</span>
                                <div className='ml-4 flex flex-col'>
                                    <span className='font-bold text-lg'>{activeTask.project?.name}</span>
                                    <span>{activeTask.project?.description}</span>
                                </div>
                            </div>
                            <div className='w-full flex flex-col my-4'>
                                <span className='font-bold text-lg'>Assignees</span>
                                <ul className='list-disc ml-10'>
                                    {
                                        activeTask.assignees?.map((assignee: IUser, index: number) => (
                                            <li key={index}>{assignee.names}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className='w-full flex flex-col my-4'>
                                <span className='font-bold text-lg'>File Reference</span>
                                <img src={task.file.url} alt="" className='w-full h-72 object-cover' />
                            </div>
                            <div className='w-full flex my-3 flex-col items-start justify-center'>
                                <div className='my-1 w-full flex items-center justify-between'>
                                    <span className={``}>Priority</span>
                                </div>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="LOW"
                                    value={priority}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH") }}
                                    row
                                    name="radio-buttons-group"
                                    className='w-full px-3 flex items-center justify-between'
                                >
                                    <FormControlLabel disabled={priorityLoading} className='w-1/3 border-2 rounded border-slate-400' sx={{ width: "30%" }} value="LOW" control={<Radio />} label="Low" />
                                    <FormControlLabel disabled={priorityLoading} className='w-1/3 border-2 rounded border-slate-400' sx={{ width: "30%" }} value="MEDIUM" control={<Radio />} label="Medium" />
                                    <FormControlLabel disabled={priorityLoading} className='w-1/3 border-2 rounded border-slate-400' sx={{ width: "30%" }} value="HIGH" control={<Radio />} label="High" />
                                </RadioGroup>
                            </div>
                            <div className='w-full flex my-3 flex-col items-start justify-center'>
                                <div className='my-1 w-full flex items-center justify-between'>
                                    <span className={``}>Status</span>
                                </div>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="LOW"
                                    value={status}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setStatus(e.target.value as "DONE" | "IN_PROGRESS" | "TODO") }}
                                    row
                                    name="radio-buttons-group"
                                    className='w-full px-3 flex items-center justify-between'
                                >
                                    <FormControlLabel disabled={statusLoading} className='w-1/3 border-2 rounded border-slate-400' sx={{ width: "30%" }} value="DONE" control={<Radio />} label="Done" />
                                    <FormControlLabel disabled={statusLoading} className='w-1/3 border-2 rounded border-slate-400' sx={{ width: "30%" }} value="IN_PROGRESS" control={<Radio />} label="In Progress" />
                                    <FormControlLabel disabled={statusLoading} className='w-1/3 border-2 rounded border-slate-400' sx={{ width: "30%" }} value="TODO" control={<Radio />} label="To Do" />
                                </RadioGroup>
                            </div>
                            <div className='flex items-center justify-end my-3'>
                                <button disabled={loading} onClick={() => useDeleteTask({setShowTask, id: activeTask.id, dispatch, setLoading })} className="bg-delete-red text-white px-4 py-2 rounded-lg">DELETE TASK</button>
                            </div>
                        </div>
                }
            </div>
        </ModalLayout >
    )
}

export default Task