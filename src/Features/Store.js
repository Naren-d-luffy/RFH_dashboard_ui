import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./NewsSlice"
import hellodoctorSlice from "./HelloDoctorSlice"
import postSlice from "./PostSlice"
export default configureStore({
    reducer: {
        news: newsSlice,
        videos: hellodoctorSlice,
        post: postSlice,
    },
});