import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Mydata: [],
  Loading: false,
  error: null,
};

const UserSlice = createSlice({
  name: "UserReducers",
  initialState,
  reducers: {
    UsersRequest: (state) => {
      state.Loading = true;
    },
    UsersSuccess: (state, action) => {
      state.Loading = false;
      state.Mydata = action.payload;
    },
    UsersFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice;
