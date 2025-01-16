import { createSlice } from "@reduxjs/toolkit";

const discovereventSlice = createSlice({
    name: 'discoverevent',
    initialState: {
        events: []
    },
    reducers: {
        setEvent: (state, action) => {
            state.events = action.payload;
        },
        addEvent: (state, action) => {
            state.events.push(action.payload);
        },
        editEvent: (state, action) => {
            const index = state.events.findIndex((event) => event._id === action.payload._id);
            if (index !== -1) state.events[index] = action.payload;
        },
        deleteEvent: (state, action) => {
            state.events = state.events.filter((event) => event._id !== action.payload);
        }
    }
});

export const { setEvent, addEvent, editEvent, deleteEvent } = discovereventSlice.actions;
export default discovereventSlice.reducer;












