import { Slice, createSlice } from "@reduxjs/toolkit";
import { ITask, IUser } from "../../types";

const initialState: {
    tasks: ITask[],
    searchedTasks: ITask[]
} = {
    searchedTasks: [],
    tasks: [],
};

const taskSlide: Slice = createSlice({
    name: "task",
    initialState,
    reducers: {
        updateTask: (state, { payload }) => {
            state.user = payload;
            state.tasks = state.tasks.map((user: IUser) => user.id === payload.id ? payload : user)
        },
        removeTask: (state, { payload }) => {
            state.tasks = state.tasks.filter((user: IUser) => user.id !== payload)
        },
        setTasks: (state, { payload }) => {
            state.tasks = [...payload]
        },
        setTask: (state, { payload }) => {
            state.tasks = state.tasks.map((task: ITask) => task.id === payload.id ? payload : task)
        },
        addTask: (state, { payload }) => {
            state.tasks = [...state.tasks, payload]
        }
    }
});

export const { updateTask, removeTask, setTasks, setTask, addTask } = taskSlide.actions;

export default taskSlide.reducer;