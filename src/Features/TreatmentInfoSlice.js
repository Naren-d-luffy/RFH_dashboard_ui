import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  treatments: [],
};

const treatmentInfoSlice = createSlice({
    name: "treatments",
    initialState,
    reducers: {
      addTreatment: (state, action) => {
        state.treatments.push(action.payload);
      },
      setTreatments: (state, action) => {
        state.treatments = action.payload;
      },
    },
  });
  
  export const { addTreatment, setTreatments } = treatmentInfoSlice.actions;
  
  export default treatmentInfoSlice.reducer;