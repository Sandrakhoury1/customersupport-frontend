import axios from "axios";
import { StatsActions } from "./StatisticsReducers";
import { getTicketsAdmin } from "../../Tickets/TicketsActions";

export const getStats = () => async (dispatch) => {
  try {
    dispatch(StatsActions.statsRequest());
    const res = await axios.get(
      process.env.REACT_APP_API + "/admin/statistics",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    dispatch(StatsActions.statsSuccess(res.data));
  } catch (error) {
    dispatch(StatsActions.statsFail(error));
  }
};
export const getcomps = () => async (dispatch) => {
  try {
    dispatch(StatsActions.getcomplaintsReq());
    const res = await axios.get(
      process.env.REACT_APP_API + "/admin/complaints/statistics",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    dispatch(StatsActions.getcomplaintsSuccess(res.data));
  } catch (error) {
    dispatch(StatsActions.getcomplaintsFail(error));
  }
};

export const getallusers = () => async (dispatch) => {
  try {
    dispatch(StatsActions.getallusersReq());
    const res = await axios.get(process.env.REACT_APP_API + "/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch(StatsActions.getallusersSuccess(res.data));
  } catch (error) {
    dispatch(StatsActions.getallusersFail(error));
  }
};
export const edituser = (id, role) => async (dispatch) => {
  try {
    dispatch(StatsActions.editroleReq());
    const res = await axios.patch(
      process.env.REACT_APP_API + "/admin/user/" + id,
      { role: role },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    dispatch(StatsActions.editroleSuccess(res.data));
    dispatch(getallusers());
  } catch (error) {
    dispatch(StatsActions.editroleFail(error));
  }
};

export const getconts = () => async (dispatch) => {
  try {
    dispatch(StatsActions.getcontactsReq());
    const res = await axios.get(process.env.REACT_APP_API + "/admin/contacts", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch(StatsActions.getcontactsSuccess(res.data));
  } catch (error) {
    dispatch(StatsActions.getcontactsFail(error));
  }
};

export const getfeeds = () => async (dispatch) => {
  try {
    dispatch(StatsActions.getfeedsReq());
    const res = await axios.get(process.env.REACT_APP_API + "/feed", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch(StatsActions.getfeedsSuccess(res.data));
  } catch (error) {
    dispatch(StatsActions.getfeedsFail(error));
  }
};
export const createfeed = (feed) => async (dispatch) => {
  try {
    dispatch(StatsActions.addfeedReq());
    const res = await axios.post(process.env.REACT_APP_API + "/feed", feed, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch(StatsActions.addfeedSuccess(res.data));
    dispatch(getfeeds());
  } catch (error) {
    dispatch(StatsActions.add(error));
  }
};
export const gettestimonialsAdmin = () => async (dispatch) => {
  try {
    dispatch(StatsActions.getTestimonialsReq());
    const res = await axios.get(process.env.REACT_APP_API + "/testimonial", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch(StatsActions.getTestimonialsSuccess(res.data));
  } catch (error) {
    dispatch(StatsActions.getTestimonialsFail(error));
  }
};

export const createtestimonial = (review, user) => async (dispatch) => {
  try {
    dispatch(StatsActions.addTestimonialReq());
    const res = await axios.post(
      process.env.REACT_APP_API + "/testimonial",
      {
        review,
        user,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    dispatch(StatsActions.addTestimonialSuccess(res.data));
    dispatch(gettestimonialsAdmin());
  } catch (error) {
    dispatch(StatsActions.addTestimonialFail(error));
  }
};
export const getcomplaintsbytype = () => async (dispatch) => {
  try {
    dispatch(StatsActions.getcompbytypeReq());
    const res = await axios.get(
      process.env.REACT_APP_API + "/admin/complaints/statistics/type",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    dispatch(StatsActions.getcompbytypeSuccess(res.data));
  } catch (error) {
    dispatch(StatsActions.getcompbytypeFail(error));
  }
};

export const editstatus = (id, status) => async (dispatch) => {
  try {
    dispatch(StatsActions.updateticstatusReq());
    const res = await axios.patch(
      process.env.REACT_APP_API + "/admin/complaint/" + id,
      { status: status },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    dispatch(StatsActions.updateticstatusSuccess(res.data));
    dispatch(getTicketsAdmin());
  } catch (error) {
    dispatch(StatsActions.updateticstatusFail(error));
  }
};
