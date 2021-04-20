import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PastOrder from "../OrderHistory/PastOrder";
import DivText from "../ProductCard/DivText";
import UserAccount from "./UserAccount";

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

const ManageAccount = () => {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  async function getUsers() {
    const token = localStorage.getItem("token");
    const info = await axios.get("http://localhost:3001/admin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(info.data);
  }

  useEffect(() => {
    getUsers();
  }, []);
//crear filtros
  const handleUsers = () => {
    console.log(users);
  };
  return (
        <div className='containerOrderHistory'>
            <div className='containerFilterOrder'>
                <div className='registerFilter' onClick={()=>console.log('ID')}><DivText content='ID'/></div>
                <div className='stateFilter' onClick={()=>console.log('NOMBRE')}><DivText content='Nombre'/></div>
                <div className='creationFilter' onClick={()=>console.log('name')}><DivText content='Apellido'/></div>
                <div className='updateFilter' onClick={()=>console.log('Mail')}><DivText content='Mail'/></div>
                <div className='paymentFilter' onClick={()=>console.log('name')}><DivText content='Tipo'/></div>
                <div className='totalFilter' onClick={()=>console.log('name')}><DivText content='Estatus'/></div>
            </div>
            
              {users.length > 0
        ? users.map((user) => <UserAccount user={user} key={users.indexOf(user)}/>)
        : ""}
            
        </div>
  );
};

export default ManageAccount;
