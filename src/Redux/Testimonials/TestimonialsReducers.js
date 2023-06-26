import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testimonials: [],
  Loading: false,
  error: null,
};

const TestimonialsSlice = createSlice({
  name: "TestimonialsReducers",
  initialState,
  reducers: {
    TestimonialsRequest: (state) => {
      state.Loading = true;
    },
    TestimonialsSuccess: (state, action) => {
      state.Loading = false;
      state.testimonials = action.payload;
    },
    TestimonialsFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    addtestimonialRequest: (state) => {
      state.Loading = true;
    },
    addtestimonialSuccess: (state, action) => {
      state.Loading = false;
      state.testimonials = action.payload;
    },
    addtestimonialFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
  },
});

export const TestimonialsActions = TestimonialsSlice.actions;
export default TestimonialsSlice;
