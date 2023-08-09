import { Slice, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types";

const initialState: {
    task: ITask;
    tasks: ITask[]
    token: string;
    isLoggedIn: boolean;
} = {
    task: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
    },
    tasks: [],
    token: "",
    isLoggedIn: false,
};

const taskSlice: Slice = createSlice({
    name: "task",
    initialState,
    reducers: {
        updateTask: (state, { payload }) => {
            state.task = payload;
            state.tasks = state.tasks.map((task: ITask) => task.id === payload.id ? payload : task)
        },
        removeTask: (state, { payload }) => {
            state.tasks = state.tasks.filter((task: ITask) => task.id !== payload)
        },
        setTasks: (state, { payload }) => {
            state.tasks = [...payload]
        }
    }
});

export const { login, logout, updateTask, removeTask, setTasks } = taskSlice.actions;

export default taskSlice.reducer;