
import { createSlice } from "@reduxjs/toolkit";

const faqsSlice = createSlice({
  name: "faq",
  initialState: {
    faqs: [],
  },
  reducers: {
    setFaqs: (state, action) => {
      state.faqs = action.payload || [];
    },
    addFaqs: (state, action) => {
      state.faqs.push(action.payload);
    },
    editFaqs: (state, action) => {
      const index = state.faqs.findIndex(
        (faq) => faq._id === action.payload._id
      );
      if (index !== -1) {
        state.faqs[index] = {
          ...state.faqs[index],
          ...action.payload,
        };
      }
    },

    deleteFaqs: (state, action) => {
      state.faqs = state.faqs.filter((faqs) => faqs._id !== action.payload);
  }
  },
});

export const {
  setFaqs,
  addFaqs,
  editFaqs,
  deleteFaqs,
} = faqsSlice.actions;
export default faqsSlice.reducer;
