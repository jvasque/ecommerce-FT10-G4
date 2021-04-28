import axios from "axios";
import decode from "jwt-decode";
import React, { useEffect, useState } from "react";
// config general
// const token =localStorage.getItem("token")
// axios.interceptors.request.use(
//     config=>{
//         config.headers.authorization = `Bearer ${token}`;
//         return config;
//     },
//     error =>{
//         return Promise.reject(error)
//     }
// )

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");

  const handleUsers = async () => {
    try {
      if (token) console.log(token);
      const info = await axios.get("http://localhost:3001/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(info.data);
      setShow(true);
      console.log(info.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <button onClick={handleUsers}>click!</button>
      {show
        ? users.map((u) => <h1 key={users.indexOf(u)}>{u.firstName}</h1>)
        : ""}
    </div>
  );
};

export default Admin;
