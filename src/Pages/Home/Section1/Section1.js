import { React, useEffect, useState } from "react";
import "./Section1.css";
import img1 from "../../../assets/images/Header/homepage1.webp";
import img2 from "../../../assets/images/Home/homePage2.webp";
import img3 from "../../../assets/images/Home/homePage3.webp";
import img4 from "../../../assets/images/Home/homePage4.webp";
import { useNavigate } from "react-router-dom";
function Section1() {
  const navigate = useNavigate();
  return (
    <div className="Main_Section1_div">
      <div className="Main_Section1_Container">
        <div className="div1_cont">
          <div className="image-container">
            <img src={img1} alt="watch1" className="image_sec" />
          </div>
          <div className="text-container">
            <div className="text-container1">Got an issue to solve?</div>
            <div className="text-container2">
              Contact us to get the best solution
            </div>
            <div
              className="text-container3"
              onClick={() => navigate("/contact_us")}
            >
              <button className="buttonofcont3">DISCOVER MORE</button>
            </div>
          </div>
        </div>
        <div className="div2_cont">
          <div className="image-container">
            <img src={img2} alt="watch1" className="image_sec2" />
          </div>
          <div className="text-container">
            <div className="text-container1">Check Our Review Section</div>
            <div className="text-container2">
              Find the Reviews Of Our Customers
            </div>
            <div
              className="text-container3"
              onClick={() => navigate("/Testimonials?section=Testimonials")}
            >
              <button className="buttonofcont3">DISCOVER MORE</button>
            </div>
          </div>
        </div>
      </div>
      <div className="Main_Section2_Container">
        <div className="div2_cont">
          <div className="image-container">
            <img src={img3} alt="watch1" className="image_sec2" />
          </div>
          <div className="text-container">
            <div className="text-container1">Create a Ticket</div>
            <div className="text-container2">Login to create a ticket</div>
            <div className="text-container3" onClick={() => navigate("/login")}>
              <button className="buttonofcont3">DISCOVER MORE</button>
            </div>
          </div>
        </div>
        <div className="div1_cont">
          <div className="image-container">
            <img src={img4} alt="watch1" className="image_sec" />
          </div>
          <div className="text-container">
            <div className="text-container1">News & Feeds</div>
            <div className="text-container2">
              Check out the latest news and feeds
            </div>
            <div className="text-container3" onClick={() => navigate("/news")}>
              <button className="buttonofcont3">DISCOVER MORE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
