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
import Swal from "sweetalert2";

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
    console.log(activeToggle);
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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Esta seguro?",
        text: "Esto modificara el tipo de cuenta y/o su estado!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        reverseButtons: true,
        cancelButtonColor: "#378a19",
        confirmButtonColor: "#378a19",
      })
      .then((result) => {
        if (result.isConfirmed) {
          typeSubmit(e);
          statusSubmit(e);
          swalWithBootstrapButtons.fire(            
            "Listo!",
            "Los cambios fueron guardados.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(            
            "Cancelado",
            "No se guardaron los cambios",
            "error"
          );
        }
      });
  };

  const handleResetPassword = (e) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Esta seguro?",
        text: "Esto modificara la contraseña!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        reverseButtons: true,
        cancelButtonColor: "#378a19",
        confirmButtonColor: "#378a19",
        okButtonColor: "#378a19"
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(ModPass(user.id));
          swalWithBootstrapButtons.fire(
            "Listo!",
            "Email enviado al usuario.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(            
            "Cancelado",
            "No se a reiniciado la contraseña",
            "error"
          );
        }
      });
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
          <div className="folding-pannel">
            <div className="buttons">
              <div>
                <Button
                  className={classes.buttonreset}
                  variant="contained"
                  color="primary"
                  onClick={handleResetPassword}
                >
                  Cambiar contraseña
                </Button>
              </div>
              <FormControl variant="outlined" className={classes.formControl}>
                <form onSubmit={typeSubmit}>
                  <InputLabel
                    className="inside"
                    id="demo-simple-select-outlined-label"
                  >
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
                  <InputLabel
                    className="inside"
                    id="demo-simple-select-outlined-label"
                  >
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
