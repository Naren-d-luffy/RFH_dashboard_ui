import { createSlice } from "@reduxjs/toolkit";

const featuresSlice = createSlice({
    name: 'features',
    initialState: {
        features: []
    },
    reducers: {
        setFeature: (state, action) => {
            state.features = action.payload;
        },
        addFeature: (state, action) => {
            state.features.push(action.payload);
        },
        editFeature: (state, action) => {
            const index = state.features.findIndex((feature) => feature._id === action.payload._id);
            if (index !== -1) state.features[index] = action.payload;
        },
        deleteFeature: (state, action) => {
            state.features = state.features.filter((feature) => feature._id !== action.payload);
        }
    }
});

export const { setFeature, addFeature, editFeature, deleteFeature } = featuresSlice.actions;
export default featuresSlice.reducer;