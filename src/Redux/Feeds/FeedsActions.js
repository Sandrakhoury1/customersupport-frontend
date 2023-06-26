import axios from "axios";
import { FeedsActions } from "./FeedsReducers";

export const getFeeds = () => async (dispatch) => {
  try {
    dispatch(FeedsActions.FeedsRequest());
    const res = await axios.get(process.env.REACT_APP_API + "/feed");
    dispatch(FeedsActions.FeedsSuccess(res.data));
  } catch (error) {
    dispatch(FeedsActions.FeedsFail(error.message));
  }
};
