import { createSlice } from "@reduxjs/toolkit";

const facilitySlice = createSlice({
    name: 'facility',
    initialState: {
        facilities: []
    },
    reducers: {
        setFacility: (state, action) => {
            state.facilities = action.payload;
        },
        addFacility: (state, action) => {
            state.facilities.push(action.payload);
        },
        editFacility: (state, action) => {
            const index = state.facilities.findIndex((facility) => facility._id === action.payload._id);
            if (index !== -1) state.facilities[index] = action.payload;
        },
        deleteFacility: (state, action) => {
            state.facilities = state.facilities.filter((facility) => facility._id !== action.payload);
        }
    }
});

export const { setFacility, addFacility, editFacility, deleteFacility } = facilitySlice.actions;
export default facilitySlice.reducer;