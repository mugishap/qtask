import { Slice, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types";

const initialState: {
    user: IUser;
    users: IUser[]
    token: string;
    isLoggedIn: boolean;
} = {
    user: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
    },
    users: [],
    token: "",
    isLoggedIn: false,
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
                _id: "",
                fullname: "",
                avatar: "",
                createdAt: "",
                email: "",
                role: "NORMAL",
                updatedAt: "",
                location: "",
                mobile: ""
            };
            state.token = ""
            state.users = []
            localStorage.removeItem("token");
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
        }
    }
});

export const { login, logout, updateUser, removeUser, setUsers } = userSlice.actions;

export default userSlice.reducer;