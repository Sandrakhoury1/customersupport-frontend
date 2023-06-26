import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  Loading: false,
  error: null,
};

const ChatSlice = createSlice({
  name: "ChatReducers",
  initialState,
  reducers: {
    chatsRequest: (state) => {
      state.Loading = true;
    },
    chatsSuccess: (state, action) => {
      state.Loading = false;
      state.chats = action.payload;
    },
    chatssFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    sendmessageRequest: (state) => {
      state.Loading = true;
    },
    sendmessageSuccess: (state, action) => {
      state.Loading = false;
      state.chats = action.payload;
    },
    sendmessageFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
  },
});

export const ChatActions = ChatSlice.actions;
export default ChatSlice;
