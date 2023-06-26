import React, { useState, useEffect } from "react";
import "./Contactus.css";
import { useRef } from "react";
import ContactUsImg from "../../assets/images/ContactUs/contact_us.jpg";
import { useSelector, useDispatch } from "react-redux";
import { ContactRequest } from "../../Redux/Contactus/ContactusActions";
import Loader from "../../Components/Loader/Loader";
function Contactus() {
  const [first_name, setfirst_Name] = useState("");
  const [last_name, setlast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { Loading, Contact } = useSelector((state) => state.Contact);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ContactRequest(first_name, last_name, email, subject, message));
  };
  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="Main_contactus">
          <div className="contact_us_main_container">
            <img
              src={ContactUsImg}
              alt="image"
              className="contact_us_img"
              draggable={false}
            />
            <div className="contact_us_text">
              <div className="contact_us_title">CONTACT US</div>
              <div className="help_title">WE’re here to help you</div>
              <div className="help_details">
                We would love to hear from you! Please feel free to contact us
                with any questions, comments, or concerns you may have. You can
                reach us via phone, email, or by filling out the contact form
                below.
              </div>
            </div>
            <form>
              <div className="contact_us_form">
                <div className="contact_us_content">
                  <label className="contact_us_labels">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="contact_us_input"
                    required
                    onChange={(e) => setfirst_Name(e.target.value)}
                  />
                  <label className="contact_us_labels">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="contact_us_input"
                    required
                    onChange={(e) => setlast_Name(e.target.value)}
                  />
                  <div className="contact_us_content_row">
                    <div className="contact_us_phone_row">
                      <div className="input_width">
                        <label className="contact_us_labels">Subject</label>
                        <input
                          type="text"
                          placeholder="Subject"
                          className="contact_us_input"
                          required
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="contact_us_email_row">
                      <div className="input_width">
                        <label className="contact_us_labels">
                          Email Address
                        </label>
                        <input
                          type="text"
                          placeholder="Email Address"
                          className="contact_us_input"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <label className="contact_us_labels">Message</label>
                  <textarea
                    type="text"
                    placeholder="Message"
                    className="contact_us_input contact_us_textarea"
                    required
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="contact_us_submit_btn"
                    onClick={handleSubmit}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
            <div className="reach_us_container">
              <label className="reach_us_title">Reach us</label>
              <div className="reach_us_container_row">
                <div className="reach_us_container_col">
                  <label className="contact_us_labels">Location</label>
                  Lebanon , Beirut , Sin El Fil , The Costumer Service , 5th
                  Floor
                </div>
                <div className="reach_us_container_col">
                  <label className="contact_us_labels">Headquarter</label>
                  Phone: +961 22 223 445 Fax: +961 22 223 445
                </div>
              </div>

              <div className="reach_us_container_row">
                <div className="reach_us_container_col">
                  <label className="contact_us_labels">
                    For General Inquiries
                  </label>
                  hello@thecostumerservice.com
                </div>
              </div>

              <div className="reach_us_container_row">
                <div className="reach_us_container_col">
                  <label className="contact_us_labels">Hotline</label>
                  Phone: +961 22 223 445
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contactus;
