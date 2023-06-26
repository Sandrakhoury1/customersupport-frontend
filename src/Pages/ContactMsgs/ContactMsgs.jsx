import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./ContactMsgs.css";
import { getconts } from "../../Redux/Admin/Statistics/StatisticsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";

const ContactMsgTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getconts());
  }, []);
  const { Conts, Loading } = useSelector((state) => state.Stats);

  console.log(Conts);
  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="Table_cont">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {Conts.map((contactMsg) => (
                <tr key={contactMsg.id}>
                  <td className="td_cont">{contactMsg.first_name}</td>
                  <td className="td_cont">{contactMsg.last_name}</td>
                  <td className="td_cont">{contactMsg.email}</td>
                  <td className="td_cont">{contactMsg.subject}</td>
                  <td className="td_cont_msg">{contactMsg.message}</td>
                  <td className="td_cont">
                    {new Date(contactMsg.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default ContactMsgTable;
