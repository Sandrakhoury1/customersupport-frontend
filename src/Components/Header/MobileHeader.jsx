import React from "react";
import "./MobileHeader.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import logo2 from "../../assets/images/Header/Logo2.png";
import { RiFacebookCircleLine } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function MobileHeader(props) {
  const navigate = useNavigate();
  return (
    <div className="Main_mobile_header">
      <div className="mobile_header_cont">
        <div className="mobile_header_close">
          <AiOutlineCloseCircle
            size={40}
            className="close_butt"
            onClick={() => props.setisshown(false)}
          />
        </div>
        <div className="mobile_header_image">
          <img src={logo2} alt="logo" className="mobile_header_logo" />
        </div>
      </div>
      <div className="mobile_header_icons">
        <div className="header_icons_container1">
          <div className="header_icon">
            <RiFacebookCircleLine className="header-icons" size={30} />
          </div>
          <div className="header_icon">
            <BsInstagram className="header-icons" size={25} />
          </div>

          <a
            href="https://api.whatsapp.com/send?phone=96170656040"
            className="wp_a"
            target="_blank"
          >
            <div className="header_wp_cont">
              <div className="header_icon">
                <IoLogoWhatsapp className="header-icons" size={25} />
              </div>
            </div>
          </a>
        </div>
        <div className="mobile_header_links">
          <div className="mobile_header_link" onClick={() => navigate("/")}>
            Home
          </div>
          <div
            className="mobile_header_link"
            onClick={() => navigate("/Contact-Us")}
          >
            Contact Us
          </div>
          <div
            className="mobile_header_link"
            onClick={() => navigate("/Tickets")}
          >
            Tickets
          </div>
          <div
            className="mobile_header_link"
            onClick={() => navigate("/Testimonials")}
          >
            Testimonials
          </div>
          <div className="mobile_header_link" onClick={() => navigate("/News")}>
            News
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
