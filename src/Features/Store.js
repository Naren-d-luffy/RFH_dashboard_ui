import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./NewsSlice"
export default configureStore({
    reducer: {
        news: newsSlice,
      
    },
});