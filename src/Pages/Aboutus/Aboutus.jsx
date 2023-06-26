import { React, useState, useEffect } from "react";
import "./Aboutus.css";
import career1 from "../../assets/images/Aboutus/career_1.png";
import career2 from "../../assets/images/Aboutus/career_2.png";

function Aboutus() {
  return (
    <>
      <div className="career_container_main">
        <img
          src={career1}
          alt="image"
          className="career_img"
          draggable={false}
        />
        <div className="join_team_text">
          <div className="careers_title">Who We Are</div>
          <div className="join_title">The Costumer Support</div>
          <div className="join_details">
            we pride ourselves on creating a unique and exclusive working
            experience. We are always hiring talented individuals to join our
            teams and fix our customers problems.
          </div>
        </div>
        <div className="career_container_second_div">
          <div className="career_container_second_div_left">
            <div className="career_container_second_title">
              Why The Costumer Support?
            </div>
            <div className="career_container_second_content">
              <p>We Solve Your Issues with End to End Privacy.</p>
              <p>
                With our diversified activities and divisions, we help you make
                the most of your talents, and by developing them, we provide you
                with the proper Solutions.
              </p>
              <p>
                We believe in Respect, Integrity, Teamwork, Passion and Personal
                Initiative, you can put all your trust in us
              </p>
              <p>
                With Us all your problems issues and Problems will be solved
              </p>
            </div>
          </div>
          <div className="career_container_second_div_right">
            <img
              src={career2}
              alt="image"
              className="career2_img"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
