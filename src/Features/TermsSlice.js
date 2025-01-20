import { createSlice } from "@reduxjs/toolkit";
const termsSlice = createSlice({
    name: 'term',
    initialState: {
        terms: []
    },
    reducers: {
        setTerms: (state, action) => {
            state.terms = action.payload;
        },
        addTerm: (state, action) => {
            state.terms.push(action.payload);
        },
        editTerm: (state, action) => {
            const index = state.terms.findIndex((terms) => terms._id === action.payload._id);
            if (index !== -1) state.terms[index] = action.payload;
        },
        deleteTerm: (state, action) => {
            state.terms = state.terms.filter((terms) => terms._id !== action.payload);
        }
    }
});

export const { setTerms, addTerm, editTerm, deleteTerm } = termsSlice.actions;
export default termsSlice.reducer;