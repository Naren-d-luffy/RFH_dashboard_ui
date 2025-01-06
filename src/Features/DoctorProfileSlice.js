import { createSlice } from '@reduxjs/toolkit';

const doctorProfileSlice = createSlice({
  name: 'doctorProfiles',
  initialState: {
    profiles: {},
  },
  reducers: {
    updateDoctorProfile: (state, action) => {
        const { doctorId, profileImage } = action.payload;
        console.log("Reducer called with payload:", action.payload);
        state.profiles[doctorId] = profileImage; // Update state
        console.log("Updated profiles state:", state.profiles);
      },
      getProfiles: (state, action) => {
        const { profiles } = action.payload; // Expecting an object of profiles
        console.log("Fetching profiles:", profiles);
        state.profiles = profiles; // Replace current state with fetched profiles
      },
  },
  
});

export const { updateDoctorProfile,getProfiles } = doctorProfileSlice.actions;
export default doctorProfileSlice.reducer;