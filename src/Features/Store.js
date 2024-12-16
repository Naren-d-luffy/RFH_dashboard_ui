import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./NewsSlice"
import healthPackageSlice from "./HealthPackageSlice"
export default configureStore({
    reducer: {
        news: newsSlice,
        healthPackage:healthPackageSlice
      
    },
});