import { createSlice } from "@reduxjs/toolkit";

const gastroIllnessSlice = createSlice({
    name: 'gastroIllness',
    initialState: {
        gastroIllness: []
    },
    reducers: {
        setGastroIllness: (state, action) => {
            state.gastroIllness = action.payload;
        },
        addGastroIllness: (state, action) => {
            state.gastroIllness.push(action.payload);
        },
        editGastroIllness: (state, action) => {
            const index = state.gastroIllness.findIndex((gastroIllness) => gastroIllness._id === action.payload._id);
            if (index !== -1) state.gastroIllness[index] = action.payload;
        },
        deleteGastroIllness: (state, action) => {
            state.gastroIllness = state.gastroIllness.filter((gastroIllness) => gastroIllness._id !== action.payload);
        }
    }
});

export const { setGastroIllness, addGastroIllness, editGastroIllness, deleteGastroIllness } = gastroIllnessSlice.actions;
export default gastroIllnessSlice.reducer;