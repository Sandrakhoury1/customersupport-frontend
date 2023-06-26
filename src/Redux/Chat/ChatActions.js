import axios from "axios";
import { ChatActions } from "./ChatReducers";

export const getChats = (id) => async (dispatch) => {
  try {
    dispatch(ChatActions.chatsRequest());
    const res = await axios.get(
      process.env.REACT_APP_API + `/user/conversation/${id}`
    );
    dispatch(ChatActions.chatsSuccess(res.data));
  } catch (error) {
    dispatch(ChatActions.chatssFail(error.message));
  }
};

export const sendMessagered =
  (sender, receiver, message, complaint) => async (dispatch) => {
    try {
      dispatch(ChatActions.sendmessageRequest());
      const res = await axios.post(
        process.env.REACT_APP_API + `/user/message`,
        {
          sender,
          receiver,
          message,
          complaint,
        }
      );
      dispatch(ChatActions.sendmessageSuccess(res.data));
      dispatch(getChats(sender));
    } catch (error) {
      dispatch(ChatActions.sendmessageFail(error.message));
    }
  };
