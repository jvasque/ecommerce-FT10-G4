//Libraries
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Redux
import { GetUsers } from "../../redux/AdminReducer/AdminActions";
import { clearProduct } from "../../redux/reducerProductForms/actionsProductForms";

//Components
import PastOrder from "../OrderHistory/PastOrder";
import DivText from "../ProductCard/DivText";
import ManagePromotion from "../Admin/ManagePromotion";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

//SASS
import _PromotionQuery from "../../scss/components/PromotionsForm/_PromotionsQuery.scss";

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
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const PromotionsQuery = () => {
  const classes = useStyles();
  //const allUser = useSelector((state) => state.AdminReducer);
  const [promotions, setPromotions] = useState([]);
  const dispatch = useDispatch();
  async function getPromotions() {
    const token = localStorage.getItem("token");
    const info = await axios.get("http://localhost:3001/promotions", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPromotions(info.data);
  }
  // llamar estado de redux y ejecutar y setear los comps
  useEffect(() => {
    setPromotions([]);
    getPromotions();
  }, []);

  //crear filtros
  const handleUsers = () => {
    dispatch(GetUsers());
  };

  return (
    <div className="containerPromotionsQuery">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Buscar combo"
          variant="outlined"
        />
      </form>

      <Button variant="contained" color="primary" onClick={() => dispatch(clearProduct())}>
        <NavLink
          to="/admin/promotion/form/create"
          style={{ textDecoration: "none", color: "#fff" }}
        >
          Crear
        </NavLink>
      </Button>

      <div className="containerFilterOrder">
        <div className="registerFilter" onClick={handleUsers}>
          <DivText content="Combo" />
        </div>
        <div className="stateFilter" onClick={() => console.log("promotion")}>
          <DivText content="Descuento %" />
        </div>
        <div className="creationFilter" onClick={() => console.log("name")}>
          <DivText content="Estado" />
        </div>
        <div className="updateFilter" onClick={() => console.log("Mail")}>
          <DivText content="Dias" />
        </div>
        <div className="updateFilter" onClick={() => console.log("Mail")}>
          <DivText content="Descripción" />
        </div>
      </div>

      {promotions?.map((promotion) => (
        <ManagePromotion
          promotion={promotion}
          key={promotions.indexOf(promotion)}
        />
      ))}
    </div>
  );
};

export default PromotionsQuery;
