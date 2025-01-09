import { createSlice } from "@reduxjs/toolkit";

const hellodoctorSlice = createSlice({
  name: "videos",
  initialState: {
    videos: {},
  },
  reducers: {
    setHelloDoctorVideos: (state, action) => {
      state.videos = action.payload;
    },
    addHelloDoctorVideos: (state, action) => {
      state.videos.push(action.payload);
    },
    editHelloDoctorVideos: (state, action) => {
      const index = state.videos.findIndex(
        (videos) => videos._id === action.payload._id
      );
      if (index !== -1) state.videos[index] = action.payload;
    },
    deleteHelloDoctorVideos: (state, action) => {
      state.videos = state.videos.filter(
        (video) => video._id !== action.payload
      );
    },
  },
});

export const {
  setHelloDoctorVideos,
  addHelloDoctorVideos,
  editHelloDoctorVideos,
  deleteHelloDoctorVideos,
} = hellodoctorSlice.actions;
export default hellodoctorSlice.reducer;
