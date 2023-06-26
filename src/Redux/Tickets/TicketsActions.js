import axios from "axios";
import { TicketsActions } from "./TicketsReducers";

export const getTickets = (id) => async (dispatch) => {
  try {
    dispatch(TicketsActions.TicketsRequest());
    const res = await axios.get(
      process.env.REACT_APP_API + `/complaint/user/${id}`
    );
    dispatch(TicketsActions.TicketssSuccess(res.data));
  } catch (error) {
    dispatch(TicketsActions.TicketssFail(error.message));
  }
};
export const getTicketsAdmin = () => async (dispatch) => {
  try {
    dispatch(TicketsActions.TicketsRequest());
    const res = await axios.get(
      process.env.REACT_APP_API + `/admin/complaints`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    dispatch(TicketsActions.TicketssSuccess(res.data));
  } catch (error) {
    dispatch(TicketsActions.TicketssFail(error.message));
  }
};
export const addticket =
  (type, subject, user, description) => async (dispatch) => {
    try {
      dispatch(TicketsActions.addticketRequest());
      const res = await axios.post(process.env.REACT_APP_API + `/complaint`, {
        type,
        subject,
        user,
        description,
      });
      dispatch(TicketsActions.addticketSuccess(res.data));
      dispatch(getTickets(user));
    } catch (error) {
      dispatch(TicketsActions.addticketFail(error.message));
    }
  };
