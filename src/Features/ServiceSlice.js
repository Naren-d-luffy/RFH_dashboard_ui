import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        services: []
    },
    reducers: {
        setService: (state, action) => {
            state.services = action.payload;
        },
        addService: (state, action) => {
            state.services.push(action.payload);
        },
        editService: (state, action) => {
            const index = state.services.findIndex((services) => services._id === action.payload._id);
            if (index !== -1) state.services[index] = action.payload;
        },
        deleteService: (state, action) => {
            state.services = state.services.filter((services) => services._id !== action.payload);
        }
    }
});

export const { setService, addService, editService, deleteService } = serviceSlice.actions;
export default serviceSlice.reducer;