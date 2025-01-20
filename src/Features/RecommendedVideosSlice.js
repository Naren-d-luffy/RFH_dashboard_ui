import { createSlice } from "@reduxjs/toolkit";

const recommendedVideosSlice = createSlice({
  name: "recommendedvideos",
  initialState: {
    videos: {},
  },
  reducers: {
    setRecommendedVideos: (state, action) => {
      state.recommendedvideos = action.payload;
    },
    addRecommendedVideos: (state, action) => {
      state.recommendedvideos.push(action.payload);
    },
    editRecommendedVideos: (state, action) => {
      const index = state.recommendedvideos.findIndex(
        (recommendedvideos) => recommendedvideos._id === action.payload._id
      );
      if (index !== -1) state.recommendedvideos[index] = action.payload;
    },
    deleteRecommendedVideos: (state, action) => {
      state.recommendedvideos = state.recommendedvideos.filter(
        (video) => video._id !== action.payload
      );
    },
  },
});

export const {
  setRecommendedVideos,
  addRecommendedVideos,
  editRecommendedVideos,
  deleteRecommendedVideos,
} = recommendedVideosSlice.actions;
export default recommendedVideosSlice.reducer;
