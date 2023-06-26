import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Stats: [],
  Comps: [],
  Users: [],
  Conts: [],
  TypeComps: [],
  Feeds: [],
  Testimonials: [],
  Tickets: [],
  Loading: false,
  error: null,
};

const StatsSlice = createSlice({
  name: "StatsReducers",
  initialState,
  reducers: {
    statsRequest: (state) => {
      state.Loading = true;
    },
    statsSuccess: (state, action) => {
      state.Loading = false;
      state.Stats = action.payload;
    },
    statsFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    getcomplaintsReq: (state, action) => {
      state.Loading = false;
    },
    getcomplaintsSuccess: (state, action) => {
      state.Loading = false;
      state.Comps = action.payload;
    },
    getcomplaintsFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    getcompbytypeReq: (state, action) => {
      state.Loading = false;
    },
    getcompbytypeSuccess: (state, action) => {
      state.Loading = false;
      state.TypeComps = action.payload;
    },
    getcompbytypeFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    getallusersReq: (state, action) => {
      state.Loading = false;
    },
    getallusersSuccess: (state, action) => {
      state.Loading = false;
      state.Users = action.payload;
    },
    getallusersFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    editroleReq: (state, action) => {
      state.Loading = false;
    },
    editroleSuccess: (state, action) => {
      state.Loading = false;
    },
    editroleFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    getcontactsReq: (state, action) => {
      state.Loading = false;
    },
    getcontactsSuccess: (state, action) => {
      state.Loading = false;
      state.Conts = action.payload;
    },
    getcontactsFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    getfeedsReq: (state, action) => {
      state.Loading = false;
    },
    getfeedsSuccess: (state, action) => {
      state.Loading = false;
      state.Feeds = action.payload;
    },
    getfeedsFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    addfeedReq: (state, action) => {
      state.Loading = false;
    },
    addfeedSuccess: (state, action) => {
      state.Loading = false;
    },
    addfeedFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    getTestimonialsReq: (state, action) => {
      state.Loading = false;
    },
    getTestimonialsSuccess: (state, action) => {
      state.Loading = false;
      state.Testimonials = action.payload;
    },
    getTestimonialsFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    addTestimonialReq: (state, action) => {
      state.Loading = false;
    },
    addTestimonialSuccess: (state, action) => {
      state.Loading = false;
    },
    addTestimonialFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    getTicketsReq: (state, action) => {
      state.Loading = false;
    },
    getTicketsSuccess: (state, action) => {
      state.Loading = false;
      state.Tickets = action.payload;
    },
    getTicketsFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    updateticstatusReq: (state, action) => {
      state.Loading = false;
    },
    updateticstatusSuccess: (state, action) => {
      state.Loading = false;
    },
    updateticstatusFail: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
  },
});

export const StatsActions = StatsSlice.actions;
export default StatsSlice;
