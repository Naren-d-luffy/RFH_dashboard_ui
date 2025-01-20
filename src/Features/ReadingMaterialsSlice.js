import { createSlice } from "@reduxjs/toolkit";

const readingMaterialsSlice = createSlice({
    name: 'readingmaterials',
    initialState: {
        readingmaterials: []
    },
    reducers: {
        setReadingMaterials: (state, action) => {
            state.readingmaterials = action.payload;
        },
        addReadingMaterials: (state, action) => {
            state.readingmaterials.push(action.payload);
        },
        editReadingMaterials: (state, action) => {
            const index = state.readingmaterials.findIndex((readingmaterial) => readingmaterial._id === action.payload._id);
            if (index !== -1) state.readingmaterials[index] = action.payload;
        },
        deleteReadingMaterials: (state, action) => {
            state.readingmaterials = state.readingmaterials.filter((readingmaterial) => readingmaterial._id !== action.payload);
        }
    }
});

export const { setReadingMaterials, addReadingMaterials, editReadingMaterials, deleteReadingMaterials } = readingMaterialsSlice.actions;
export default readingMaterialsSlice.reducer;