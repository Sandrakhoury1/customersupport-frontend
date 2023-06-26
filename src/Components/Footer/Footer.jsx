import React from "react";
import "./Footer.css";
import logo2 from "../../assets/images/Header/Logo2.png";
import {useNavigate} from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="main-footer ">
        <div className="container">
          <div className="row">
            <img src={logo2} alt="logo" className="logo2" />
          </div>

          <div className="row">
            <div className="row_title">COSTUMER SERVICE</div>
            <div className="row_content">
              <div className="row_content_item" 
              onClick={() => navigate("/Tickets?section=Tickets")}>Create A Ticket</div>
              <div className="row_content_item"
              onClick={() => navigate("/chat")}>Chat With US</div>
              <div className="row_content_item"
              onClick={() => navigate("/Testimonials?section=Testimonials")}>Review Our Service</div>
            </div>
          </div>
          <div className="row">
            <div className="row_title">USEFUL INFORMATION</div>
            <div className="row_content">
              <div className="row_content_item">FAQ</div>
              <div className="row_content_item">Terms Of Use</div>
              <div className="row_content_item"
              onClick={() => navigate("/")}>Homepage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
