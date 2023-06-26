import React, { useState, useEffect } from "react";
import { Table, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTicketsAdmin } from "../../Redux/Tickets/TicketsActions";
import { editstatus } from "../../Redux/Admin/Statistics/StatisticsActions";
import Loader from "../../Components/Loader/Loader";
import './TicketList.css';

const TickestList = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTicketsAdmin());
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const { Tickets, Loading } = useSelector((state) => state.Tickets);

  const handleStatusChange = (ticketId, status) => {
    dispatch(editstatus(ticketId, status));
  };

  const filteredTickets = Tickets.filter(
    (ticket) =>
      ticket.user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      ticket.user.last_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Table_cont">
      {/* <div className="search-container">
        <input className='search' type="text" placeholder="Search by Name" value={search} onChange={handleSearch} />
      </div> */}
      {Loading ? (
        <>
          <Loader />
        </>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Type</th>
              <th>Status</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.subject}</td>
                <td>{ticket.description}</td>
                <td>{ticket.type}</td>
                <td>
                  <Dropdown
                    onSelect={(status) => handleStatusChange(ticket.id, status)}
                  >
                    <Dropdown.Toggle
                      variant="primary"
                      id={`status-dropdown-${ticket.id}`}
                    >
                      {ticket.status}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
                      <Dropdown.Item eventKey="active">Active</Dropdown.Item>
                      <Dropdown.Item eventKey="closed">Closed</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>{`${ticket.user.first_name} ${ticket.user.last_name}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TickestList;
