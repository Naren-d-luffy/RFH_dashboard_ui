import { createSlice } from "@reduxjs/toolkit";

const technologySlice = createSlice({
    name: 'technology',
    initialState: {
        technologies: []
    },
    reducers: {
        setTechnology: (state, action) => {
            state.technologies = action.payload;
        },
        addTechnology: (state, action) => {
            state.technologies.push(action.payload);
        },
        editTechnology: (state, action) => {
            const index = state.technologies.findIndex((technology) => technology._id === action.payload._id);
            if (index !== -1) state.technologies[index] = action.payload;
        },
        deleteTechnology: (state, action) => {
            state.technologies = state.technologies.filter((technology) => technology._id !== action.payload);
        }
    }
});

export const { setTechnology, addTechnology, editTechnology, deleteTechnology } = technologySlice.actions;
export default technologySlice.reducer;