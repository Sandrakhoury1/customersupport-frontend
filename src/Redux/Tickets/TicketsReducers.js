import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Tickets: [],
  Loading: false,
  error: null,
};

const TicketsSlice = createSlice({
  name: "TicketsReducers",
  initialState,
  reducers: {
    TicketsRequest: (state) => {
      state.Loading = true;
    },
    TicketssSuccess: (state, action) => {
      state.Loading = false;
      state.Tickets = action.payload;
    },
    TicketssFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    addticketRequest: (state) => {
      state.Loading = true;
    },
    addticketSuccess: (state, action) => {
      state.Loading = false;
      state.Tickets = action.payload;
    },
    addticketFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
  },
});

export const TicketsActions = TicketsSlice.actions;
export default TicketsSlice;
