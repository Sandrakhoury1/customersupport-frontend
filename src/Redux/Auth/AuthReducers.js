import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  Loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "AuthReducers",
  initialState,
  reducers: {
    // Login
    LoginRequest: (state) => {
      state.Loading = true;
    },
    LoginSuccess: (state, action) => {
      state.Loading = false;
      state.user = action.payload;
    },
    LoginFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    // Logout
    Logout(state, action) {
      state.user = [];
    },
    SignupRequest: (state) => {
      state.Loading = true;
    },
    SignupSuccess: (state, action) => {
      state.Loading = false;
      state.user = action.payload;
    },
    SignupFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
  },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice;
