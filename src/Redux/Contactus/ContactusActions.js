import axios from "axios";
import { ContactActions } from "./ContactusReducers";

export const ContactRequest =
  (first_name, last_name, email, subject, message) => async (dispatch) => {
    try {
      dispatch(ContactActions.ContactRequest());

      const res = await axios.post(
        process.env.REACT_APP_API + "/user/contact",
        {
          first_name,
          last_name,
          email,
          subject,
          message,
        }
      );
      dispatch(ContactActions.ContactSuccess(res.data));
    } catch (error) {
      dispatch(
        ContactActions.ContactFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
