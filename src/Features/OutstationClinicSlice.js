import { createSlice } from "@reduxjs/toolkit";

const outstationClinicSlice = createSlice({
  name: "clinics",
  initialState: {
    clinics: [],
  },
  reducers: {
    setOutstationClinic: (state, action) => {
      state.clinics = action.payload;
    },
    addOutstationClinic: (state, action) => {
      state.clinics.push(action.payload);
    },
    editOutstationClinic: (state, action) => {
      const index = state.clinics.findIndex(
        (clinic) => clinic._id === action.payload._id
      );
      if (index !== -1) state.clinics[index] = action.payload;
    },
    deleteOutstationClinic: (state, action) => {
      state.clinics = state.clinics.filter(
        (clinic) => clinic._id !== action.payload
      );
    },
  },
});

export const {
  setOutstationClinic,
  addOutstationClinic,
  editOutstationClinic,
  deleteOutstationClinic,
} = outstationClinicSlice.actions;
export default outstationClinicSlice.reducer;
