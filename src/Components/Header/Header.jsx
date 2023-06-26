import { React, useEffect, useState } from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
//images
import logo from "../../assets/images/Header/Logo2.png";

import { RiFacebookCircleLine } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import isAuth from "../../Utils/isAuth";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../App";
import { Logout } from "../../Redux/Auth/AuthActions";
//components
import MobileHeader from "./MobileHeader";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logedin, setlogedin] = useState(false);
  const [isshown, setisshown] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [headerin, setheaderin] = useState(false);
  const handleburgerclick = () => {
    setisshown(!isshown);
  };

  useEffect(() => {
    if (isAuth()) {
      setlogedin(true);
    } else {
      setlogedin(false);
    }
  }, [isAuth()]);
  const location = useLocation();
  const currentRoute = location.pathname;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  const handlelogout = () => {
    dispatch(Logout(navigate));
  };
  return (
    <>
      <div className="header">
        <div className="Main_header_section">
          <div className="header_icons_container">
            <div className="header_icon">
              <RiFacebookCircleLine className="header-icons" size={30} />
            </div>
            <div className="header_icon">
              <BsInstagram className="header-icons" size={25} />
            </div>
            <div className="divider" />
            <a
              href="https://api.whatsapp.com/send?phone="
              className="wp_a"
              target="_blank"
            >
              <div className="header_wp_cont">
                <div className="header_icon">
                  <IoLogoWhatsapp className="header-icons" size={25} />
                </div>
                {/* <div className="header_wp_text"> 70 656 040</div> */}
              </div>
            </a>
          </div>
          <div className="header_logo_container" onClick={() => navigate("/")}>
            <img src={logo} alt="logo" className="header_logo" />
          </div>
          {logedin ? (
            <div className="header_icons_container_right1">
              {" "}
              <div className="header_icon" onClick={() => handlelogout()}>
                <AiOutlineLogout className="header-icons" size={30} />
              </div>
              {/* <div className="header_icon" onClick={() => navigate("/Tickets")}>
                <AiOutlineHeart className="header-icons" size={30} />
              </div> */}
            </div>
          ) : (
            <div className="header_icons_container_right">
              <div
                className="header_wp_cont"
                onClick={() => navigate("/Signin")}
              >
                <div className="header_wp_text"> Sign In or Register </div>
              </div>
            </div>
          )}
          <div
            className="header_hamburger_menu_cont"
            onClick={handleburgerclick}
          >
            <GiHamburgerMenu className="header_hamburger_menu" size={30} />
          </div>
          {isshown && (
            <MobileHeader isShown={isshown} setisshown={setisshown} />
          )}
        </div>
        <Navbar />
      </div>
    </>
  );
}

export default Header;
