import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import DivText from "../ProductCard/DivText";
import axios from "axios";
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

const ManagePromotion = ({ promotion }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState(false);
  const [days, setDays] = useState(promotion.days);
  const [discountDate, setDiscountDate] = useState(promotion.discountDate);
  const [combo, setCombo] = useState(promotion.combo);
  const [description, setDescription] = useState(promotion.description);
  const [active, setActive] = useState(promotion.active);


  let activeToggle = state ? "active" : "inactive";

  function toggle() {
    setState(!state);
    activeToggle = state ? "active" : "inactive";
    console.log(activeToggle);
  }

  function daysSetting(date) {
    let dictionary = {
      0: "Domingo",
      1: "Lunes",
      2: "Martes",
      3: "Miércoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sábado",
    };
    let aux = date;
    if (aux) {
      aux = aux.split("").sort((a, b) => a - b);
      for (let i = 0; i < aux.length; i++) {
        aux[i] = dictionary[aux[i]];
      }
      aux = aux.join(", ");
    }
    return aux;
  }

  function stateDefine(state) {
    if (state) {
      return "Activado";
    } else {
      return "Desactivado";
    }
  }

  const handleStatus = async (e, id) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
  
      swalWithBootstrapButtons
        .fire({
          title: `Desea ${(active && "desactivar") || (!active && "activar")} esta promoción?`,
          text: `Esto afectará de manera inmediata a todos los productos! ${(!active && "Además se le enviará un mail de notificación a todos los usuarios!") || ""}`,
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
              (async function (){
                setActive(e.target.value);
                const fetching = await axios.put(`http://localhost:3001/promotions/${id}`, {
                  active: e.target.value,
                });
              })()
            swalWithBootstrapButtons.fire(            
              "Listo!",
              `La promoción fue ${(active && "desactivada") || (!active && "activada")}.`,
              "success"
            );
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            setActive(!e.target.value);
            swalWithBootstrapButtons.fire(            
              "Cancelado",
              `No se ${(active && "desactivó") || (!active && "activó")} la promoción.`,
              "error"
            );
          }
        });
    
  };

  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
  
      swalWithBootstrapButtons
        .fire({
          title: "Desea eliminar esta promoción?",
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
              (async function (){
                  const fetching = await axios.delete(
                      `http://localhost:3001/promotions/${id}`
                    );
              })()
            swalWithBootstrapButtons.fire(            
              "Listo!",
              "La promoción fue eliminada.",
              "success"
            );
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(            
              "Cancelado",
              "No se eliminó la promoción.",
              "error"
            );
          }
        });
  };

  if (promotion) {
    return (
      <div className="containerOrder">
        <div className="order inactive">
          <div className="orderId" onClick={toggle}>
            <DivText content={combo} />
          </div>
          <div className="orderStatus" onClick={toggle}>
            <DivText content={discountDate} />
          </div>
          <div className="orderUpdatedAt" onClick={toggle}>
            <DivText content={stateDefine(active)} />
          </div>
          <div className="orderCreatedAt" onClick={toggle}>
            <DivText content={daysSetting(days)} />
          </div>
          <div className="orderCreatedAt" onClick={toggle}>
            <DivText content={description} />
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
                >
                  <NavLink to={{
                      pathname: "/admin/promotion/form/modify",
                      promotion: promotion
                  }} style={{textDecoration: "none", color:"#fff"}}>
                      Modificar
                  </NavLink>
                </Button>
              </div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  className="inside"
                  id="demo-simple-select-outlined-label"
                >
                  {active && "Activado"}
                  {!active && "Desactivado"}
                </InputLabel>
                <Select
                  className={classes.selectuser}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => handleStatus(e, promotion.id)}
                >
                  <MenuItem type="status" value={true}>
                    Activado
                  </MenuItem>
                  <MenuItem type="status" value={false}>
                    Desactivado
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                className={classes.buttonsend}
                variant="contained"
                color="primary"
                onClick={(e) => handleDelete(promotion.id)}
              >
                Eliminar
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

export default ManagePromotion;
