import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUsers } from "../../redux/AdminReducer/AdminActions";
import DivText from "../ProductCard/DivText";
import History from "./History";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const HistoryParent = () => {
  const classes = useStyles();
  const allUser = useSelector(state => state.AdminReducer);
const [users, setUsers] = useState([])
  const dispatch = useDispatch();
  async function getUsers() {
    const token = localStorage.getItem("token");
    const info = await axios.get("http://localhost:3001/admin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(info.data);
  }
  // llamar estado de redux y ejecutar y setear los comps
  useEffect(() => {
    setUsers([])
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
        ? users?.map((user) => <History user={user} key={users.indexOf(user)}/>)
        : ""}
            
        </div>
  );
};

export default HistoryParent;
