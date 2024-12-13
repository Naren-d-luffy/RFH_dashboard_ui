import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news: []
    },
    reducers: {
        setNews: (state, action) => {
            state.news = action.payload;
        },
        addNews: (state, action) => {
            state.news.push(action.payload);
        },
        editNews: (state, action) => {
            const index = state.news.findIndex((news) => news._id === action.payload._id);
            if (index !== -1) state.news[index] = action.payload;
        },
        deleteNews: (state, action) => {
            state.news = state.news.filter((news) => news._id !== action.payload);
        }
    }
});

export const { setNews, addNews, editNews, deleteNews } = newsSlice.actions;
export default newsSlice.reducer;