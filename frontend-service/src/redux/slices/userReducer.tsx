import { Slice, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types";

const initialState: {
    user: IUser;
    users: IUser[];
    paginatedUsers: IUser[];
    token: string;
    isLoggedIn: boolean;
} = {
    user: {
        id: "",
        names: "",
        email: "",
        telephone: "",
    },
    users: [],
    token: "",
    isLoggedIn: false,
    paginatedUsers: []
};

const userSlice: Slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.isLoggedIn = true;
            state.user = { ...payload.user };
            state.token = payload.token
        },

        logout: (state) => {
            state.isLoggedIn = false;
            state.user = {
                ...initialState.user
            }
            state.token = ""
            state.users = []
            window.location.replace("/auth/login");
        },
        updateUser: (state, { payload }) => {
            state.user = payload;
            state.users = state.users.map((user: IUser) => user.id === payload.id ? payload : user)
        },
        removeUser: (state, { payload }) => {
            state.users = state.users.filter((user: IUser) => user.id !== payload)
        },
        setUsers: (state, { payload }) => {
            state.users = [...payload]
        },
        setPaginatedUsers: (state, { payload }) => {
            state.paginatedUsres = [...payload]
        },
    }
});

export const { login, logout, updateUser, removeUser, setUsers, setPaginatedUsers } = userSlice.actions;

export default userSlice.reducer;