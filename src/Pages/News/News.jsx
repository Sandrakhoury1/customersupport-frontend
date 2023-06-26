import React, { useEffect, useState } from "react";
import "./News.css";
import NewsCard from "../../Components/NewsCard/NewsCard";
import img from "../../assets/images/Home/homePage2.webp";
import { useSelector, useDispatch } from "react-redux";
import { getFeeds } from "../../Redux/Feeds/FeedsActions";
import Loader from "../../Components/Loader/Loader";
function News() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const { Feeds, Loading } = useSelector((state) => state.Feeds);
  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="Main_news">
          <div className="testimonials_heading">Company Feeds & News</div>
          <div className="testimonials_subheading">
            Get the latest news and updates from our company
          </div>
          <div className="news_content">
            {Feeds.map((item) => {
              const date = item.createdAt.substr(0, 10);
              return (
                <NewsCard
                  image={process.env.REACT_APP_API + "/images/" + item.image}
                  title={item.title}
                  description={item.content}
                  date={date}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default News;
