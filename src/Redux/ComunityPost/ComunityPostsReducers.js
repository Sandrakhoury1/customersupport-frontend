import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Posts: [],
  Comments: [],
  Loading: false,
  error: null,
};

const PostsSlice = createSlice({
  name: "ContactReducers",
  initialState,
  reducers: {
    PostsRequest: (state) => {
      state.Loading = true;
    },
    PostsSuccess: (state, action) => {
      state.Loading = false;
      state.Posts = action.payload;
    },
    PostsFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    addPostRequest: (state) => {
      state.Loading = true;
    },
    addPostSuccess: (state, action) => {
      state.Loading = false;
      state.Posts = action.payload;
    },
    addPostFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    addCommentRequest: (state) => {
      state.Loading = true;
    },
    addCommentSuccess: (state, action) => {
      state.Loading = false;
      state.Comments = action.payload;
    },
    addCommentFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
  },
});

export const PostsActions = PostsSlice.actions;
export default PostsSlice;
