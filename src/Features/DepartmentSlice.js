import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    departments: [],
  },
  reducers: {
    setDepartment: (state, action) => {
      state.departments = action.payload.departments || [];
    },
    addDepartment: (state, action) => {
      state.departments.push(action.payload);
    },
    editDepartment: (state, action) => {
      const index = state.departments.findIndex(
        (department) => department._id === action.payload._id
      );
      if (index !== -1) {
        state.departments[index] = {
          ...state.departments[index],
          ...action.payload,
        };
      }
    },
    deleteDepartment: (state, action) => {
      state.departments = state.departments.filter(
        (department) => department._id !== action.payload
      );
    },
  },
});

export const {
  setDepartment,
  addDepartment,
  editDepartment,
  deleteDepartment,
} = departmentSlice.actions;
export default departmentSlice.reducer;
