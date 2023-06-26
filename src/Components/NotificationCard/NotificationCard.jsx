import React, { useState } from "react";
import { Navbar, Button } from "react-bootstrap";
import "./NotificationCard.css";
function NotificationCard({ isOpen, setIsOpen }) {
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      {isOpen && (
        <div className="box_cont">
          <div className="random-message cont">
            <Button className="close-btn" variant="link" onClick={handleClose}>
              &times;
            </Button>
            <div className="random-message-content ">
              <div className="line" />
              <div className="message-text">You Have A New Ticket</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationCard;
