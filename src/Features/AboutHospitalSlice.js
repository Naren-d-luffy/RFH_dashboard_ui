import { createSlice } from "@reduxjs/toolkit";

const hospitalSlice = createSlice({
    name: 'hospital',
    initialState: {
        hospital: {}
    },
    reducers: {
        setHospitalData: (state, action) => {
            state.hospital = action.payload;
        },
       
        editHospital: (state, action) => {
            state.hospital = action.payload;
        },
       
    }
});

export const { setHospitalData, editHospital} = hospitalSlice.actions;
export default hospitalSlice.reducer;