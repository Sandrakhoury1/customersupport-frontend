import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Contact: [],
  Loading: false,
  error: null,
};

const ContactSlice = createSlice({
  name: "ContactReducers",
  initialState,
  reducers: {
    ContactRequest: (state) => {
      state.Loading = true;
    },
    ContactSuccess: (state, action) => {
      state.Loading = false;
      state.Feeds = action.payload;
    },
    ContactFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
  },
});

export const ContactActions = ContactSlice.actions;
export default ContactSlice;
