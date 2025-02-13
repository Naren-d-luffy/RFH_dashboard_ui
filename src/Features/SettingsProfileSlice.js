import { createSlice } from "@reduxjs/toolkit";

const settingsProfileSlice = createSlice({
    name: 'settingsprofile',
    initialState: {
        settingsprofile: {}
    },
    reducers: {
        setSettingsProfileData: (state, action) => {
            state.settingsprofile = action.payload;
        },
       
        editSettingsProfileData: (state, action) => {
            state.settingsprofile = action.payload; 
        },
       
    }
});

export const { setSettingsProfileData, editSettingsProfileData} = settingsProfileSlice.actions;
export default settingsProfileSlice.reducer;