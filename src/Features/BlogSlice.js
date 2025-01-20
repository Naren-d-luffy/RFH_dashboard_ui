import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blogs: []
    },
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        addBlog: (state, action) => {
            state.blogs.push(action.payload);
        },
        editBlog: (state, action) => {
            const index = state.blogs.findIndex((blogs) => blogs._id === action.payload._id);
            if (index !== -1) state.blogs[index] = action.payload;
        },
        deleteBlog: (state, action) => {
            state.blogs = state.blogs.filter((blogs) => blogs._id !== action.payload);
        }
    }
});

export const { setBlogs, addBlog, editBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;