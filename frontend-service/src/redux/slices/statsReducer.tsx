import { Slice, createSlice } from "@reduxjs/toolkit";

const initialState: {
    stats: {
        users: number,
        projects: number,
        tasks: number,
    };
} = {
    stats: {
        users: 0,
        projects: 0,
        tasks: 0,
    }

};

const statsSlice: Slice = createSlice({
    name: "stats",
    initialState,
    reducers: {
        setStats: (state, { payload }) => {
            state.stats = payload;
        },

    }
});

export const { setStats } = statsSlice.actions;

export default statsSlice.reducer;