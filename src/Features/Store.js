import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./NewsSlice"
import healthPackageSlice from "./HealthPackageSlice"
import departmentSlice from "./DepartmentSlice"

export default configureStore({
    reducer: {
        news: newsSlice,
        healthPackage: healthPackageSlice,
        department: departmentSlice,
    },
});