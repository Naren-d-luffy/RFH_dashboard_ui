import { createSlice } from "@reduxjs/toolkit";

const campSlice = createSlice({
    name: 'camps',
    initialState: {
        camps: []
    },
    reducers: {
        setCamps: (state, action) => {
            state.camps = action.payload;
        },
        addCamp: (state, action) => {
            state.camps.push(action.payload);
        },
        editCamp: (state, action) => {
            const index = state.camps.findIndex((camps) => camps._id === action.payload._id);
            if (index !== -1) state.camps[index] = action.payload;
        },
        deleteCamp: (state, action) => {
            state.camps = state.camps.filter((camps) => camps._id !== action.payload);
        }
    }
});

export const { setCamps, addCamp, editCamp, deleteCamp } = campSlice.actions;
export default campSlice.reducer;