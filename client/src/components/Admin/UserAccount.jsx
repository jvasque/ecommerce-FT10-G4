import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DivText from "../ProductCard/DivText";
import "../../scss/components/AllOrders/_AdminOrderDetail.scss";
import "../../scss/components/Admin/_UserAccount.scss";
import { Select, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {
  ModPass,
  ChangeType,
  ChangeStatus,
} from "../../redux/AdminReducer/AdminActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "200px",
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
    width: "100px",
  },

  iconControl: {
    margin: theme.spacing(3),
    width: "100%",
  },
  // buttons: {
  //   justifyContent: "center",
  // },

  root: {
    "& > *": {
      margin: theme.spacing(1),
      minHeight: "90%",
    },
  },
  selectuser: {
    width: "100%",
    height: "100%",
      
  },
  buttonreset: {
    margin: "10px",
    color: "white",
    height: "70%",
  },
  buttonsend: {
    margin: "10px",
    color: "white",
  
  },
}));

const UserAccount = ({ user }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState(false);
  const [type, setType] = useState(user.type);
  const [status, setStatus] = useState(user.status);

  let activeToggle = state ? "active" : "inactive";

  function toggle() {
    setState(!state);
    activeToggle = state ? "active" : "inactive";
    console.log(activeToggle)
  }

  const handleTypes = (e) => {
    setType(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const typeSubmit = (e) => {
    e.preventDefault();
    dispatch(ChangeType(user.id, type));
  };

  const statusSubmit = (e) => {
    e.preventDefault();
    dispatch(ChangeStatus(user.id, status));
  };

  const handleSubmit = (e) => {
    typeSubmit(e);
    statusSubmit(e);
  };

  if (!!user) {
    return (
        <div className="containerOrder">        
          <div className="order inactive">
            <div className="orderId" onClick={toggle}>
              <DivText content={user.id} />
            </div>
            <div className="orderStatus" onClick={toggle}>
              <DivText content={user.firstName} />
            </div>
            <div className="orderCreatedAt" onClick={toggle}>
              <DivText content={user.lastName} />
            </div>
            <div className="orderUpdatedAt" onClick={toggle}>
              <DivText content={user.email} />
            </div>
            <div className="orderPayment" onClick={toggle}> 
              <DivText content={user.type} />
            </div>
            <div className="orderTotal" onClick={toggle}>
              <DivText content={user.status} />
            </div>
          </div>

          <div className={activeToggle}>
            <div className='folding-pannel'>
              <div className="buttons">
                <div>
                  <Button                    
                    className={classes.buttonreset}
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(ModPass(user.id))}
                  >
                    Cambiar contraseña
                  </Button>
                </div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <form onSubmit={typeSubmit}>
                    <InputLabel className="inside" id="demo-simple-select-outlined-label">
                      Tipo de usuario
                    </InputLabel>
                    <Select
                      className={classes.selectuser}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={type.name}
                      onChange={handleTypes}
                    >
                      <MenuItem name="type" value=""></MenuItem>
                      <MenuItem name="type" value={"admin"}>
                        Admin
                      </MenuItem>
                      <MenuItem name="type" value={"user"}>
                        Usuario
                      </MenuItem>
                    </Select>
                  </form>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <form onSubmit={statusSubmit}>
                    <InputLabel className="inside" id="demo-simple-select-outlined-label">
                      Estado
                    </InputLabel>
                    <Select
                      className={classes.selectuser}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={status.name}
                      onChange={handleStatus}
                    >
                      <MenuItem type="status" value={"active"}>
                        Activo
                      </MenuItem>
                      <MenuItem type="status" value={"disabled"}>
                        Desactivado
                      </MenuItem>
                      <MenuItem type="status" value={"banned"}>
                        Suspendido
                      </MenuItem>
                    </Select>
                  </form>
                </FormControl>
                <Button
                  type="submit"                  
                  className={classes.buttonsend}
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleSubmit(e)}
                >
                   Enviar 
                </Button>
              </div>
            </div>
          </div>
        </div>
    );
  } else {
    return () => {};
  }
};

export default UserAccount;
