import React from "react";
import "./NewsCard.css";

function NewsCard({ image, title, description, date }) {
  return (
    <div className="Main_news_card">
      <div className="news_card_image">
        <img src={image} alt="" className="card_news_Img" />
      </div>
      <div className="news_card_cont">
        <div className="news_card_title">{title}</div>
        <div className="news_card_description">{description}</div>
        <div className="news_card_date">{date}</div>
      </div>
    </div>
  );
}

export default NewsCard;
