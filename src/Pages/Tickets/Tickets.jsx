import React, { useState, useEffect } from "react";
import "./Tickets.css";
import TicketsNav from "../../Components/TicketsNav/TicketsNav";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../../Redux/Tickets/TicketsActions";
import Loader from "../../Components/Loader/Loader";
import jwt_decode from "jwt-decode";

function Tickets() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const id = decoded.id;
  const { Tickets, Loading } = useSelector((state) => state.Tickets);


  useEffect(() => {
    dispatch(getTickets(id));
  }, []);
  const [ticketList, setTicketList] = useState([]);

  // const [filter, setFilter] = useState("all"); // Set the initial filter value

  // useEffect(() => {
  //   // Apply the filter based on the selected value
  //   const filteredTickets = Tickets.filter((ticket) => {
  //     if (filter === "active") {
  //       return ticket.status === "active";
  //     } else if (filter === "pending") {
  //       return ticket.status === "pending";
  //     } else if (filter === "closed") {
  //       return ticket.status === "closed";
  //     }
  //     else if (filter ==="all") {
  //       return true; // If no filter selected, show all tickets
  //     }
  //   });

  //   setTicketList(filteredTickets);
  // }, [Tickets, filter]);

  // const handleFilterChange = (event) => {
  //   setFilter(event.target.value);
  // };

  return (
    <div className="Main_tickets_component">
      {Loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="Main_tickets">
          {/* <div>
            <label htmlFor="filter">Filter:</label>
            <select id="filter" value={filter} onChange={handleFilterChange}>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="closed">Closed</option>
            </select>
          </div> */}
          <TicketsNav tickets={Tickets} user={id} />
        </div>
      )}
    </div>
  );
}

export default Tickets;
