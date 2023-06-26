import React, { useState } from "react";
import "./TicketsNav.scss";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { addticket } from "../../Redux/Tickets/TicketsActions";

function TicketsNav({ tickets, user }) {
  const dispatch = useDispatch();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleClosePopup = () => {
    setSelectedTicket(null);
  };
  const handleClosePopup2 = () => {
    setShowAddTicketModal(false);
  };
  const [loading, setloading] = useState(false);
  const randomDropdowns = [
    { label: "Technical Issues", value: "Technical_Issues" },
    {
      label: "Product OR Service Deficiencies",
      value: "Product_or_Service_Deficiencies",
    },
    {
      label: "Billing or Payment Disputes",
      value: "Billing_or_Payment_Disputes",
    },
    {
      label: "Content or Policy Violations",
      value: "Content_or_Policy_Violations",
    },
    {
      label: "Shipping or Delivery  Problems",
      value: "Shipping_or_Delivery_Problems",
    },
  ];

  const [description, setdescription] = useState("");
  const [subject, setsubject] = useState("");
  const [type, settype] = useState("");

  const handleSubmit = () => {
    dispatch(addticket(type, subject, user, description));
    setShowAddTicketModal(false);
    setloading(false);
  };

  return (
    <div className="Main_tickets">
      <div
        className="col-md-5"
        style={{
          width: "100%",
        }}
      >
        <div data-component="card">
          <div className="card border-0 rounded-0 p-4">
            <div className="card-block">
              <h3 className="card-title mb-3">Your Support Tickets</h3>
              {tickets.length !== 0 ? (
                <div className="list-group list-group-flush mb-4">
                  {tickets?.map((ticket) => {
                    const statusClass =
                      ticket.status === "pending"
                        ? "badge-info"
                        : "badge-danger";
                    return (
                      <div
                        key={ticket.id}
                        className="list-group-item flex-column align-items-start border-top-0 text-muted pb-0 px-0 mb-1"
                        onClick={() => handleTicketClick(ticket)}
                      >
                        <div className="d-flex w-100 justify-content-between mb-2">
                          <h6 className="mb-2">
                            <a href="#" className="card-link text-muted">
                              {ticket.subject}
                            </a>
                          </h6>
                          <span className={`badge badge-pill ${statusClass}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <div className="d-flex">
                          <p>Handeled by</p>
                          <p>
                            <a href="#" className="card-link text-info">
                              &nbsp;
                              {ticket.admin.first_name +
                                " " +
                                ticket.admin.last_name}
                              &nbsp;
                            </a>
                          </p>
                          &nbsp; &nbsp;
                          <p className="ml-1">
                            {ticket.createdAt.slice(0, 10).replace(/-/g, "/")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text_tickers">
                  There is no Tickets Available Create a Ticket
                </div>
              )}
              <button
                type="button"
                className="btn btn-primary btn-block border-0 rounded-0 py-4"
                onClick={() => setShowAddTicketModal(true)}
              >
                Submit A New Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
      {selectedTicket && (
        <div
          className="modal show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedTicket.subject}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClosePopup}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <h6>Description:</h6>
                  <p>{selectedTicket.description}</p>
                </div>
                <div>
                  <h6>Handled By:</h6>
                  <p>
                    {selectedTicket.admin.first_name +
                      selectedTicket.admin.last_name}
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleClosePopup}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddTicketModal && (
        <div
          className="modal show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Ticket</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClosePopup2}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={subject}
                      onChange={(e) => setsubject(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dropdown">Type</label>
                    <select
                      className="form-control"
                      id="dropdown"
                      onClick={(e) => settype(e.target.value)}
                    >
                      <option value="Select" disabled selected>
                        Select
                      </option>
                      {randomDropdowns.map((dropdown, index) => (
                        <option key={index} value={dropdown.value}>
                          {dropdown.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="3"
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                      handleSubmit();
                      setloading(true);
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketsNav;
