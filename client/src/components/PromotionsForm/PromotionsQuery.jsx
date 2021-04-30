//Libraries
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Redux
import { clearProduct } from "../../redux/reducerProductForms/actionsProductForms";
import { getPromotion } from "../../redux/PromotionsFormReducer/actionsPromotionsForm";

//Components
import DivText from "../ProductCard/DivText";
import ManagePromotion from "../Admin/ManagePromotion";
import { sortById, sortByCombo, sortByDiscountDate, sortByActive } from './promotionsFilter';

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

//SASS
import _PromotionQuery from "../../scss/components/PromotionsForm/_PromotionsQuery.scss";

//Sweet Alert
import Swal from "sweetalert2";

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

  const [promotions, setPromotions] = useState([]);
  const [sort, setSort] = useState({
    id: false,
    combo: false,
    discountDate: false,
    active: false,
});


  const dispatch = useDispatch();
  const statePromotions = useSelector(state => state.PromotionsFormReducer);
  

  async function getPromotions() {
    const token = localStorage.getItem("token");
    const info = await axios.get("http://localhost:3001/promotions", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPromotions(info.data);
  }

  useEffect(() => {
    setPromotions([]);
    getPromotions();
    dispatch(getPromotion())
    Swal.fire({
      title: "ALERTA!",
      text: "En caso de activar la promoción, afectará de manera inmediata y se le enviará un mail de notificación a todos los usuarios. Si desactiva la promoción de igual manera afectará de manera inmediata a todos los productos relacionados pero no se les notificará a los usuarios!",
      icon: "warning",
      confirmButtonText: "Entendido",
    })
  }, []);

  function sortId(){
    let [newPromotions, newSort] = sortById(promotions, sort);
    setSort(newSort);
    setPromotions(newPromotions);
  }

  function sortCombo(){
    let [newPromotions, newSort] = sortByCombo(promotions, sort);
    setSort(newSort);
    setPromotions(newPromotions);
  }

  function sortDiscountDate(){
    let [newPromotions, newSort] = sortByDiscountDate(promotions, sort);
    setSort(newSort);
    setPromotions(newPromotions);
  }

  function sortActive(){
    let [newPromotions, newSort] = sortByActive(promotions, sort);
    setSort(newSort);
    setPromotions(newPromotions);
  }

  function stateFilterAfterDelete(idPromotion){
    setPromotions(promotions.filter(e => e.id !== idPromotion))
  }

  function stateActiveUpdate(idPromotion, state){
    setPromotions(promotions.map(e => {
      if(e.id === idPromotion){
        return  e = {
          ...e,
          active: state
        }
      } else {
        return e
      }
    }))
  }

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
        <div className="registerFilter" onClick={sortId}>
          <DivText content="Registro" />
        </div>
        <div className="registerFilter" onClick={sortCombo}>
          <DivText content="Combo" />
        </div>
        <div className="stateFilter" onClick={sortDiscountDate}>
          <DivText content="Descuento %" />
        </div>
        <div className="creationFilter" onClick={sortActive}>
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
          key={promotion.id}
          stateFilterAfterDelete={stateFilterAfterDelete}
          stateActiveUpdate={stateActiveUpdate}
        />
      ))}
    </div>
  );
};

export default PromotionsQuery;
