import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./UserList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getallusers,
  edituser,
} from "../../Redux/Admin/Statistics/StatisticsActions";
import Loader from "../../Components/Loader/Loader";

const UserTable = () => {
  const dispatch = useDispatch();
  const { Users, Loading } = useSelector((state) => state.Stats);
  useEffect(() => {
    dispatch(getallusers());
  }, []);
  const handleOnChange = (e, id) => {
    dispatch(edituser(id, e.target.value));
  };

  return (
    <>
      {Loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="Table_cont">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user) => (
                <tr key={user.id}>
                  <td>{user.first_name}</td>
                  <td>{user.first_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleOnChange(e, user.id)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="vip">VIP</option>
                    </select>
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

export default UserTable;
