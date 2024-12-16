import { createSlice } from "@reduxjs/toolkit";

const healthPackageSlice = createSlice({
    name: 'healthPackage',
    initialState: {
        healthPackage: []
    },
    reducers: {
        setPackages: (state, action) => {
            state.healthPackage = action.payload;
        },
        addHealthPackage: (state, action) => {
            state.healthPackage.push(action.payload);
        },
        editHealthPackage: (state, action) => {
            const index = state.healthPackage.findIndex((healthPackage) => healthPackage._id === action.payload._id);
            if (index !== -1) state.healthPackage[index] = action.payload;
        },
        deleteHealthPackage: (state, action) => {
            state.healthPackage = state.healthPackage.filter((healthPackage) => healthPackage._id !== action.payload);
        }
    }
});

export const { setPackages, addHealthPackage, editHealthPackage, deleteHealthPackage } = healthPackageSlice.actions;
export default healthPackageSlice.reducer;