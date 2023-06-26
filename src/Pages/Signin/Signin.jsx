import { React, useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { Signup, Login } from "../../Redux/Auth/AuthActions";
import { useDispatch, useSelector } from "react-redux";

//redux
function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [issignup, setissignup] = useState(true);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");

  const { user, error, Loading } = useSelector((state) => state.Auth);
  const handleSignup = () => {
    if (password === confirmpassword) {
      dispatch(Signup(first_name, last_name, email, password, navigate));
      setfirst_name("");
      setlast_name("");
      setemail("");
      setpassword("");
      setconfirmpassword("");
    } else {
      alert({ ...error });
    }
  };
  const handlelogin = () => {
    dispatch(Login(email, password, navigate));
    setemail("");
    setpassword("");
  };

  return (
    <>
      {issignup ? (
        <div>
          {Loading ? (
            <Loader />
          ) : (
            <div className="sign_in_container_main">
              <div className="sign_in_container">
                <div className="sign_in_title">CREATE ACCOUNT</div>

                <>
                  <div className="input_label">USERNAME OR EMAIL ADDRESS *</div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="email_input"
                    onChange={(e) => {
                      setfirst_name(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="email_input"
                    onChange={(e) => {
                      setlast_name(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="email_input"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  <div className="input_label">PASSWORD *</div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="password_input"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="password_input"
                    value={confirmpassword}
                    onChange={(e) => {
                      setconfirmpassword(e.target.value);
                    }}
                  />
                  <button className="login_btn" onClick={handleSignup}>
                    Register
                  </button>{" "}
                </>

                {error && (
                  <div className="text_cont_err">
                    {error.response?.data?.message}
                  </div>
                )}

                <div className="text_cont">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our privacy policy.
                </div>
                <div className="signup_div" onClick={() => setissignup(false)}>
                  Have an account? Sign in
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="sign_in_container_main">
          {Loading ? (
            <Loader />
          ) : (
            <div className="sign_in_container">
              <div className="sign_in_title">Sign In</div>
              <div className="input_label">USERNAME OR EMAIL ADDRESS *</div>
              <input
                type="text"
                placeholder="Enter your email"
                className="email_input"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />

              <div className="input_label">PASSWORD *</div>
              <input
                type="password"
                placeholder="Enter your password"
                className="password_input"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />

              <button className="login_btn" onClick={handlelogin}>
                login
              </button>
              <div className="create_acc" onClick={() => setissignup(true)}>
                Create Account
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Signin;
