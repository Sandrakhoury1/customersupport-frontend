import React from "react";
import "./TestimonialsCard.css";
import quote from "../../assets/images/Testimonials/Testimonials.png";

function Greencarousell({ text, subs }) {
  return (
    <div className="Main_green_carousell">
      <div className="green_carousell_contents">
        <img
          src={quote}
          alt="quote"
          className="quote-img-green"
          draggable="false"
        />
        <div className="green_carousell_texts">{text}</div>
        <div className="green_carousell_subs">{subs}</div>
      </div>
    </div>
  );
}

export default Greencarousell;
