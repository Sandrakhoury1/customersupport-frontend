import axios from "axios";
import { AuthActions } from "./AuthReducers";
import setAuthToken from "../../Utils/setAuthToken";

export const Login = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch(AuthActions.LoginRequest());
    const res = await axios.post(process.env.REACT_APP_API + "/auth/login", {
      email,
      password,
    });
    dispatch(AuthActions.LoginSuccess(res.data));
    const token = res.data.token;
    localStorage.setItem("token", token);
    setAuthToken(token);
    navigate("/");
  } catch (error) {
    dispatch(AuthActions.LoginFail(error));
  }
};

export const Signup =
  (first_name, last_name, email, password, navigate) => async (dispatch) => {
    try {
      dispatch(AuthActions.SignupRequest());
      const res = await axios.post(process.env.REACT_APP_API + "/auth/signup", {
        first_name,
        last_name,
        email,
        password,
      });
      dispatch(AuthActions.SignupSuccess(res.data));
      const token = res.data.token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      navigate("/");
    } catch (error) {
      dispatch(AuthActions.SignupFail(error));
    }
  };
export const Logout = (navigate) => async (dispatch) => {
  try {
    localStorage.clear();
    setAuthToken(false);
    dispatch(AuthActions.Logout());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
