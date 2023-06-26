import React, { useState, useEffect, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

//imports
import Home from "./Home/Home";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Aboutus from "./Aboutus/Aboutus";
import Testimonials from "./Testimonials/Testimonials";
import News from "./News/News";
import Contactus from "./Contactus/Contactus";
import Tickets from "./Tickets/Tickets";
import Signin from "./Signin/Signin";
import ComunityPosts from "./ComunityPosts/ComunityPosts";
import Chat from "./Chat/Chat";
import UserList from "./UserList/UserList";
import ContactMsgTable from "./ContactMsgs/ContactMsgs";
import FeedsAdmin from "./FeedsAdmin/FeedsAdmin";
import TestimonialTable from "./TestimonialsAdmin/TestimonialsAdmin";
import TicketsList from "./TicketsList/TicketsList";

function PageSwitch() {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/home") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About-Us" element={<Aboutus />} />
        <Route path="/Testimonials" element={<Testimonials />} />
        <Route path="/News" element={<News />} />
        <Route path="/Contact-Us" element={<Contactus />} />
        <Route path="/Tickets" element={<Tickets />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/ComunityPosts" element={<ComunityPosts />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/contactMsgs" element={<ContactMsgTable />} />
        <Route path="/Feeds" element={<FeedsAdmin />} />
        <Route path="/TestimonialsList" element={<TestimonialTable />} />
        <Route path="/TicketsList" element={<TicketsList />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default PageSwitch;
