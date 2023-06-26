import React from "react";
import "./StatisticsCard.css";

const StatisticsCard = ({ title, value, icon, color }) => {
  return (
    <div className={`card ${color}`}>
      <div className="body">
        <div className="cont">
          <div className="icon_cont">{icon}</div>
          <div className="text_cont">
            <h5 className="card-title">{title}</h5>
            <h6 className="card-subtitle mb-2 text-muted font">{value}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
