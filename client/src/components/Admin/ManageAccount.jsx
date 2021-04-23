import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUsers } from "../../redux/AdminReducer/AdminActions";
import PastOrder from "../OrderHistory/PastOrder";
import DivText from "../ProductCard/DivText";
import UserAccount from "./UserAccount";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

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
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const ManageAccount = () => {
  const classes = useStyles();
  const allUser = useSelector(state => state.AdminReducer);

  const dispatch = useDispatch();
  async function getUsers() {
    const token = localStorage.getItem("token");
    const info = await axios.get("http://localhost:3001/admin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    // setUsers(info.data);
  }
  // llamar estado de redux y ejecutar y setear los comps
  useEffect(() => {
    getUsers();
  }, []);

  
  //crear filtros
  const handleUsers = () => {
    dispatch(GetUsers());
  };

  return (
        <div className='containerOrderHistory'>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Buscar usuario" variant="outlined" />
        </form>
            <div className='containerFilterOrder'>
                <div className='registerFilter' onClick={handleUsers}><DivText content='ID'/></div>
                <div className='stateFilter' onClick={()=>console.log(allUser)}><DivText content='Nombre'/></div>
                <div className='creationFilter' onClick={()=>console.log('name')}><DivText content='Apellido'/></div>
                <div className='updateFilter' onClick={()=>console.log('Mail')}><DivText content='Mail'/></div>
                <div className='paymentFilter' onClick={()=>console.log('name')}><DivText content='Tipo'/></div>
                <div className='totalFilter' onClick={()=>console.log('name')}><DivText content='Estatus'/></div>
            </div>
            
              {allUser.users?.length > 0
        ? allUser.users?.map((user) => <UserAccount user={user} key={allUser.users.indexOf(user)}/>)
        : ""}
            
        </div>
  );
};

export default ManageAccount;
