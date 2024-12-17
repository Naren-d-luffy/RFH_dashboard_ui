import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: []
    },
    reducers: {
        setPost: (state, action) => {
            state.post = action.payload;
        },
        addPost: (state, action) => {
            state.post.push(action.payload);
        },
        editPost: (state, action) => {
            const index = state.post.findIndex((post) => post._id === action.payload._id);
            if (index !== -1) state.post[index] = action.payload;
        },
        deletePost: (state, action) => {
            state.post = state.post.filter((post) => post._id !== action.payload);
        }
    }
});

export const { setPost, addPost, editPost, deletePost } = postSlice.actions;
export default postSlice.reducer;