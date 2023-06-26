import { React, useState, useEffect } from "react";
import "./Navbar.css";
import isAuth from "../../Utils/isAuth";
import jwt_decode from "jwt-decode";
import { socket } from "../../App";
import NotificationCard from "../NotificationCard/NotificationCard";
function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  const handleOnClick = (section) => {
    setActiveSection(section);
    window.location.href = `/${section}?section=${section}`;
  };
  const [headerin, setheaderin] = useState(false);
  const [role, setrole] = useState(null);
  const [open, setopen] = useState(false);
  useEffect(() => {
    if (isAuth()) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setrole(decoded.role);
      socket.emit("join_room", { user: decoded.id });
      socket.on("notification", (data) => {
        setopen(true);
        playNotificationSound();
        setTimeout(() => {
          setopen(false);
        }, 30000);
      });
    }
  }, [isAuth()]);
  const playNotificationSound = () => {
    const audio = new Audio(
      "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
    );
    audio.play().catch((error) => {
      console.error("Failed to play notification sound:", error);
    });
  };

  useEffect(() => {
    const sectionFromUrl = new URLSearchParams(window.location.search).get(
      "section"
    );
    setActiveSection(sectionFromUrl || "");
  }, [window.location.search]);
  const sections = [
    role !== "user" && isAuth() ? "ComunityPosts" : "About-Us",
    "Testimonials",
    "News",
    "Contact-Us",
    isAuth() ? "Tickets" : "Signin",
  ];

  const adminsections = [
    "Chat",
    "UserList",
    "ComunityPosts",
    "ContactMsgs",
    "Feeds",
    "TestimonialsList",
    "TicketsList",
  ];
  return (
    <>
      {role === "admin" ? (
        <div className="Main_navbar_login">
          <div className="navbar_container">
            <nav className="navbar">
              {adminsections.map((section) => (
                <a
                  key={section}
                  className={`navbar__item ${
                    activeSection === section ? "active" : ""
                  }`}
                  onClick={() => handleOnClick(section)}
                >
                  {section}
                </a>
              ))}
            </nav>
          </div>
          {open && (
            <div className="notification">
              <NotificationCard isOpen={open} setIsOpen={setopen} />
            </div>
          )}
        </div>
      ) : (
        <div className="Main_navbar_login">
          <div className="navbar_container">
            <nav className="navbar">
              {sections.map((section) => (
                <a
                  key={section}
                  className={`navbar__item ${
                    activeSection === section ? "active" : ""
                  }`}
                  onClick={() => handleOnClick(section)}
                >
                  {section}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
