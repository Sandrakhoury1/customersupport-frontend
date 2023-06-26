import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Feeds: [],
  Loading: false,
  error: null,
};

const FeedSlice = createSlice({
  name: "FeedReducers",
  initialState,
  reducers: {
    FeedsRequest: (state) => {
      state.Loading = true;
    },
    FeedsSuccess: (state, action) => {
      state.Loading = false;
      state.Feeds = action.payload;
    },
    FeedsFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
  },
});

export const FeedsActions = FeedSlice.actions;
export default FeedSlice;
