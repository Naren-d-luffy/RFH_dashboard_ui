import { createSlice } from "@reduxjs/toolkit";

const treatmentInfoSlice = createSlice({
    name: 'treatments',
    initialState: {
        treatments: []
    },
    reducers: {
        setTreatment: (state, action) => {
            state.treatments = action.payload;
        },
        addTreatment: (state, action) => {
            state.treatments.push(action.payload);
        },
        editTreatment: (state, action) => {
            const index = state.treatments.findIndex((treatment) => treatment._id === action.payload._id);
            if (index !== -1) state.treatments[index] = action.payload;
        },
        deleteTreatment: (state, action) => {
            state.treatments = state.treatments.filter((treatment) => treatment._id !== action.payload);
        }
    }
});

export const { setTreatment, addTreatment, editTreatment, deleteTreatment } = treatmentInfoSlice.actions;
export default treatmentInfoSlice.reducer;