import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  getTickets,
  getTicketsAdmin,
} from "../../Redux/Tickets/TicketsActions";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import Loader from "../../Components/Loader/Loader";
import { getChats, sendMessagered } from "../../Redux/Chat/ChatActions";
import { socket } from "../../App";

const TicketList = ({
  tickets,
  activeTicket,
  setActiveTicket,
  setreceiver,
}) => {
  const dispatch = useDispatch();
  const handlechatselect = (id) => {
    dispatch(getChats(id));
  };
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const id = decoded.id;
  const role = decoded.role;
  return (
    <>
      {role === "admin" ? (
        <div className="col-md-3">
          <h4>Tickets</h4>

          <ul className="list-group">
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className={`list-group-item ${
                  ticket.id === activeTicket ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTicket(ticket.id);
                  setreceiver(ticket.user.id);
                  handlechatselect(ticket.id);
                }}
              >
                <div className="ticket-info">
                  <span className="subject">{ticket.subject}</span>
                  <span className="admin-name">Handled by You</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="col-md-3">
          <h4>Tickets</h4>

          <ul className="list-group">
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className={`list-group-item ${
                  ticket.id === activeTicket ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTicket(ticket.id);
                  setreceiver(ticket.admin.id);
                  handlechatselect(ticket.id);
                }}
              >
                <div className="ticket-info">
                  <span className="subject">{ticket.subject}</span>
                  <span className="admin-name">
                    {ticket.admin.first_name + " " + ticket.admin.last_name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

const ChatWindow = ({ id, adminid }) => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);
  const { chats, Loading } = useSelector((state) => state.Chat);

  useEffect(() => {
    dispatch(getChats(id));
  }, [id]); // Fetch chats when the ticket ID changes
  socket.on("message", (data) => {
    dispatch(getChats(id));
  });
  useEffect(() => {
    scrollChatToBottom();
  }, [chats]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const role = decoded.role;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      await dispatch(sendMessagered(decoded.id, adminid, newMessage, id));
      setNewMessage("");
      dispatch(getChats(id)); // Refresh chat messages after sending the new message
    }
  };

  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <>
      {role === "admin" ? (
        <div className="col-md-9">
          <div className="card">
            <div className="card-header">
              <h3>Chat</h3>
            </div>
            <div className="card-body" ref={chatContainerRef}>
              {Loading ? (
                <Loader />
              ) : (
                <ul className="list-group">
                  {[...chats]
                    .sort(
                      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                    )
                    .map((message, index) => (
                      <li
                        className={`list-group-item ${
                          message.sender.id === decoded.id
                            ? "sender"
                            : "receiver"
                        }`}
                        key={index}
                      >
                        {console.log(message)}
                        <div
                          className={`message ${
                            message.sender.id === decoded.id &&
                            message.sender.id !== message.receiver
                              ? "ltr"
                              : "rtl"
                          }`}
                        >
                          {message.sender.id !== decoded.id
                            ? "User: "
                            : "You: "}
                          {message.message}
                        </div>
                      </li>
                    ))}
                </ul>

                //   <ul className="list-group">
                //     {chats.map((message, index) => (
                //       <li
                //         className={`list-group-item ${
                //           message.sender === "receiver" ? "receiver" : "sender"
                //         }`}
                //         key={index}
                //       >
                //         <div
                //           className={`message ${
                //             message.sender === decoded.id &&
                //             message.sender !== message.receiver
                //               ? "ltr"
                //               : "rtl"
                //           }`}
                //         >
                //           {message.sender !== decoded.id ? "You: " : "Admin: "}
                //           {message.message}
                //         </div>
                //       </li>
                //     ))}
                //   </ul>
              )}
            </div>
            <div className="card-footer">
              <form onSubmit={handleFormSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={handleInputChange}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-md-9">
          <div className="card">
            <div className="card-header">
              <h3>Chat</h3>
            </div>
            <div className="card-body" ref={chatContainerRef}>
              {Loading ? (
                <Loader />
              ) : (
                <ul className="list-group">
                  {[...chats]
                    .sort(
                      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                    )
                    .map((message, index) => (
                      <li
                        className={`list-group-item ${
                          message.sender.id === decoded.id
                            ? "sender"
                            : "receiver"
                        }`}
                        key={index}
                      >
                        <div
                          className={`message ${
                            message.sender.id === decoded.id &&
                            message.sender.id !== message.receiver.id
                              ? "ltr"
                              : "rtl"
                          }`}
                        >
                          {message.sender.id !== decoded.id
                            ? "Admin: "
                            : "You: "}
                          {message.message}
                        </div>
                      </li>
                    ))}
                </ul>

                //   <ul className="list-group">
                //     {chats.map((message, index) => (
                //       <li
                //         className={`list-group-item ${
                //           message.sender === "receiver" ? "receiver" : "sender"
                //         }`}
                //         key={index}
                //       >
                //         <div
                //           className={`message ${
                //             message.sender === decoded.id &&
                //             message.sender !== message.receiver
                //               ? "ltr"
                //               : "rtl"
                //           }`}
                //         >
                //           {message.sender !== decoded.id ? "You: " : "Admin: "}
                //           {message.message}
                //         </div>
                //       </li>
                //     ))}
                //   </ul>
              )}
            </div>
            <div className="card-footer">
              <form onSubmit={handleFormSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={handleInputChange}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* <div className="col-md-9">
        <div className="card">
          <div className="card-header">
            <h3>Chat</h3>
          </div>
          <div className="card-body" ref={chatContainerRef}>
            {Loading ? (
              <Loader />
            ) : (
              <ul className="list-group">
                {[...chats]
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((message, index) => (
                    <li
                      className={`list-group-item ${
                        message.sender === "receiver" ? "receiver" : "sender"
                      }`}
                      key={index}
                    >
                      <div
                        className={`message ${
                          message.sender === decoded.id &&
                          message.sender !== message.receiver
                            ? "ltr"
                            : "rtl"
                        }`}
                      >
                        {message.sender !== decoded.id ? "You: " : "Admin: "}
                        {message.message}
                      </div>
                    </li>
                  ))}
              </ul>

              //   <ul className="list-group">
              //     {chats.map((message, index) => (
              //       <li
              //         className={`list-group-item ${
              //           message.sender === "receiver" ? "receiver" : "sender"
              //         }`}
              //         key={index}
              //       >
              //         <div
              //           className={`message ${
              //             message.sender === decoded.id &&
              //             message.sender !== message.receiver
              //               ? "ltr"
              //               : "rtl"
              //           }`}
              //         >
              //           {message.sender !== decoded.id ? "You: " : "Admin: "}
              //           {message.message}
              //         </div>
              //       </li>
              //     ))}
              //   </ul>
            )}
          </div>
          <div className="card-footer">
            <form onSubmit={handleFormSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={handleInputChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};

function Chat() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const id = decoded.id;
  const role = decoded.role;
  useEffect(() => {
    if (role === "admin") {
      dispatch(getTicketsAdmin());
    } else {
      dispatch(getTickets(id));
    }
  }, []);
  const { Tickets, Loading } = useSelector((state) => state.Tickets);

  const [activeTicket, setActiveTicket] = useState(1);

  const [receiver, setreceiver] = useState("");
  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="container mt-5 height">
          {Tickets.length === 0 ? (
            <>
              <h1>There is no tickets</h1>
            </>
          ) : (
            <div className="row width">
              <TicketList
                tickets={Tickets}
                activeTicket={activeTicket}
                setActiveTicket={setActiveTicket}
                setreceiver={setreceiver}
              />
              <ChatWindow id={activeTicket} adminid={receiver} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Chat;
