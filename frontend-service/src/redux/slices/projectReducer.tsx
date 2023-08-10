import { Slice, createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../types";

const initialState: {
    searchedProjects: IProject[];
    projects: IProject[]
} = {
    searchedProjects: [],
    projects: [],
};

const projectSlice: Slice = createSlice({
    name: "project",
    initialState,
    reducers: {
        updateProject: (state, { payload }) => {
            state.project = payload;
            state.projects = state.projects.map((project: IProject) => project.id === payload.id ? payload : project)
        },
        removeProject: (state, { payload }) => {
            state.projects = state.projects.filter((project: IProject) => project.id !== payload)
        },
        setProjects: (state, { payload }) => {
            state.projects = [...payload]
        },
        addProject: (state, { payload }) => {
            state.projects = [...state.projects, payload]
        }
    }
});

export const { updateProject, removeProject, setProjects, addProject } = projectSlice.actions;

export default projectSlice.reducer;