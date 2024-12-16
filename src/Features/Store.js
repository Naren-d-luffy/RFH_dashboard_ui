import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./NewsSlice"
import hellodoctorSlice from "./HelloDoctorSlice"
import postSlice from "./PostSlice"
import healthPackageSlice from "./HealthPackageSlice"

export default configureStore({
    reducer: {
        videos: hellodoctorSlice,
        post: postSlice,
        news: newsSlice,
        healthPackage:healthPackageSlice
    },
});