import { createSlice } from "@reduxjs/toolkit";

const roleAccessSlice = createSlice({
    name: 'roleAccess',
    initialState: {
        roleAccess: []
    },
    reducers: {
        setRoleAccess: (state, action) => {
            state.roleAccess = action.payload;
        },
        addRoleAccess: (state, action) => {
            state.roleAccess.push(action.payload);
        },
        editRoleAccess: (state, action) => {
            const index = state.roleAccess.findIndex((roleAccess) => roleAccess._id === action.payload._id);
            if (index !== -1) state.roleAccess[index] = action.payload;
        },
        deleteRoleAccess: (state, action) => {
            state.roleAccess = state.roleAccess.filter((roleAccess) => roleAccess._id !== action.payload);
        }
    }
});

export const { setRoleAccess, addRoleAccess, editRoleAccess, deleteRoleAccess } = roleAccessSlice.actions;
export default roleAccessSlice.reducer;