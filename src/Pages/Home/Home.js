import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
//images import
import homevid from "../../assets/images/Home/homePage.mp4";
import chat from "../../assets/images/Home/chat.avif";
//components import
import Section1 from "./Section1/Section1";
import isAuth from "../../Utils/isAuth";
import jwt_decode from "jwt-decode";
import StatisticCard from "../../Components/StatisticsCard/StatisticsCard";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { MdFeed } from "react-icons/md";
import { RiVipCrownLine } from "react-icons/ri";
import ComplaintChart from "../../Components/ComplaintChart/ComplaintChart";
import ComplaintTypeChart from "../../Components/ComplaintTypeChart/ComplaintTypeChart";
import UserComparisonChart from "../../Components/UsersChart/UserComparisonChart";
import { getmyinfo } from "../../Redux/User/UserActions";
import { useSelector, useDispatch } from "react-redux";
import {
  getStats,
  getcomps,
  getcomplaintsbytype,
} from "../../Redux/Admin/Statistics/StatisticsActions";
function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setrole] = useState("");
  useEffect(() => {
    if (isAuth()) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setrole(decoded.role);
    }
  }, [isAuth()]);
  useEffect(() => {
    if (isAuth()) {
      dispatch(getmyinfo());
    }
  }, [isAuth()]);
  useEffect(() => {
    if (role === "admin") {
      dispatch(getStats());
      dispatch(getcomps());
      dispatch(getcomplaintsbytype());
    }
  }, [role]);
  const { Mydata } = useSelector((state) => state.User);
  const { Stats, loading, Comps, TypeComps } = useSelector(
    (state) => state.Stats
  );
  console.log(TypeComps);

  return (
    <>
      {role === "admin" ? (
        <>
          <div className="Main_Home">
            <div className="Heading">
              Welcome {Mydata.first_name + " " + Mydata.last_name} !
            </div>
            <div className="Cards_cont">
              <StatisticCard
                title="Total Users"
                value={Stats?.totalUsers}
                icon={<AiOutlineUser size={30} />}
                color={"colorred"}
              />
              <StatisticCard
                title="Total Complaints"
                value={Stats?.totalComplaints}
                icon={<MdOutlineReportGmailerrorred size={30} />}
                color={"colorcyan"}
              />
              <StatisticCard
                title="Total Feeds"
                value={Stats?.totalFeeds}
                icon={<MdFeed size={30} />}
                color={"coloryellow"}
              />
              <StatisticCard
                title="Total Vip Users"
                value={Stats?.totalVipUsers}
                icon={<RiVipCrownLine size={30} />}
                color={"colorblue"}
              />
              {/* Add more StatisticsCard components as needed */}
            </div>
            <br />
            <br />
            <h1>All Complaint Statistics</h1>
            <div className="Chart_cont">
              <ComplaintChart charts={Comps} />
              <ComplaintTypeChart types={TypeComps} />
              <UserComparisonChart userdata={Stats} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="Main_Home">
            <div className="Home_Video">
              <video autoPlay muted loop className="home_vid" width="100%">
                <source src={homevid} type="video/mp4" />
              </video>
            </div>
            <div className="Home_vid_text">
              <div className="Home_vid_text1">WONDERING WHO WE ARE?</div>
              <div className="Home_vid_text2">
                WE GOT YOU COVERED WITH SOME DETAILS
              </div>
              <div
                className="Home_vid_button_section"
                onClick={() => navigate("/About-Us?section=About-Us")}
              >
                <button className="Home_vid_button">DISCOVER MORE</button>
              </div>
            </div>
          </div>
          <div>
            <Section1 />
          </div>
          <div className="Home_Section3">
            <div className="Home_Section3_text">
              <div className="text_cont1">
                <div className="Home_Section3_text1">Our New Chat System</div>
              </div>
              <div className="text_cont2">
                <div className="Home_Section3_text2">
                  Login and chat with our customer support team
                </div>
              </div>
              <div className="text_cont3">
                <div className="Home_Section3_text3">
                  We have a new chat system for our customers to chat with our
                  customer support team. You can login and chat with our
                  customer support team and get your issues solved.
                </div>
              </div>
              <div
                className="Home_Section3_button_section"
                onClick={() => navigate("/chat")}
              >
                <button className="Home_vid_button">DISCOVER MORE</button>
              </div>
            </div>
            <div className="Home_Section3_img">
              <img
                src={chat}
                alt="section3img"
                className="section3_img"
                draggable={false}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
