import axios from "axios";
import { UserActions } from "./UserReducers";

export const getmyinfo = () => async (dispatch) => {
  try {
    dispatch(UserActions.UsersRequest());
    const res = await axios.get(process.env.REACT_APP_API + "/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(UserActions.UsersSuccess(res.data));
  } catch (error) {
    dispatch(UserActions.UsersFail(error.message));
  }
};
