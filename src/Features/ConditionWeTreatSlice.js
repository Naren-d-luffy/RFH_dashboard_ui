import { createSlice } from "@reduxjs/toolkit";

const conditionWeTreatSlice = createSlice({
    name: 'conditionwetreat',
    initialState: {
        conditionwetreats: []
    },
    reducers: {
        setConditionWeTreat: (state, action) => {
            state.conditionwetreats = action.payload;
        },
        addConditionWeTreat: (state, action) => {
            state.conditionwetreats.push(action.payload);
        },
        editConditionWeTreat: (state, action) => {
            const index = state.conditionwetreats.findIndex((conditionwe) => conditionwe._id === action.payload._id);
            if (index !== -1) state.conditionwetreats[index] = action.payload;
        },
        deleteConditionWeTreat: (state, action) => {
            state.conditionwetreats = state.conditionwetreats.filter((conditionwe) => conditionwe._id !== action.payload);
        }
    }
});

export const { setConditionWeTreat, addConditionWeTreat, editConditionWeTreat, deleteConditionWeTreat } = conditionWeTreatSlice.actions;
export default conditionWeTreatSlice.reducer;