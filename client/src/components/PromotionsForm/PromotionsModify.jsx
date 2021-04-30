import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import _PromotionsModify from "../../scss/components/PromotionsForm/_PromotionsModify.scss";
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';

const grisPrincipal= "#EFEFEF";
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
    
      width: "90%",
      color: "red",
      marginTop: "15px",
      marginBottom: "15px"
      
    },
    cancelIcon: {
      color: "rgb(245, 59, 26)",
      backgroundColor: grisPrincipal,
      cursor: "pointer",
      borderRadius: "50%" 
    }
  }));

function PromotionsModify(props) {
  const category = useSelector(
    (state) => state.categoryFilterReducer.categories
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  /* console.log(props.history.location.promotion, "MI PROMOCION ANTES") */
const {
  description,
  categoryCheck,
  products,
  discountDate,
  combo,
  days,
  active, 
  id,
} = props.history.location.promotion;

  const [promotion, setPromotion] = useState([]);
  const [input, setInput] = useState({
    description: '',
    categoryCheck: [],
    products: [],
    discountDate: '',
    combo: '',
    days: []
    
  });
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleCategoryCheck = function (e) {
   if (e.target.checked) {
      setInput({
        ...input,
        categoryCheck: [...input.categoryCheck, parseInt(e.target.value)],
      });
    } else {
      setInput({
        ...input,
        categoryCheck: input.categoryCheck.filter(
          (category) => category !== parseInt(e.target.value)
        ),
      });
    }
  };
 /*  const handleSubmit = function (event) {
    event.preventDefault();
      dispatch(
        postPromotion(
          input.description,
          input.categoryCheck,
          input.products,
          input.discountDate,
          input.combo,
          input.days
        )
      );
      setInput({
        description: '',
        categoryCheck: [],
        products: [],
        discountDate: [],
        combo: '',
        days: []
      });
      
      setProductRender([]);
      setName('');
      let inputs = document.querySelectorAll('input[type=checkbox]');
      inputs.forEach((item) => {
        item.checked = false;
      });
      swal('Éxito!',`La promocion ${input.combo} ha sido modificada`, 'success'); 
  };  */

  async function getPromotion() {
    const token = localStorage.getItem("token");
    const info = await axios.get("http://localhost:3001/promotions/"+ id, 
    {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPromotion(info.data);
  }
  useEffect(() => {
    setPromotion([]);
    getPromotion();
    
  }, []);
  console.log(promotion, "MI PROMO ESTADO")
   return (
    <div className="containerPromotionsModify">
      <form className={classes.root}  /* onSubmit={(e) => handleSubmit(e)} */ >
       <h1>Modificar promociones</h1>
       <div className="cont-2">

       <TextField 
          id="outlined-basic" 
          label={promotion.description} 
          placeholder="Agregue la nueva descripción de la promoción..."
          variant="outlined"
          name="description"
          value={input.description} 
          type="text"
          required 
          onChange={handleChange}
          className={classes.input}/>

         <label className="label">Categoria:</label>
           <div className="categoryBoxes">
             {category &&
               category.map((c) => {
                 let check = promotion.categoryCheck?.includes(c.id).toString()
                 return ( 
                   <div key={c.name}>
                     <label>{c.name}</label>
                     <input
                      type="checkbox"
                      value={c.id}
                      onChange={(e) =>  handleCategoryCheck(e)}
                      checked = { check }
                      
                     />
                   </div>
                 );
               })}
           </div>

        
      
      <h1>Combo:</h1>
      <p>{combo}</p>
      <h1>Días:</h1>
      <p>{days}</p>
      {/* <h1>Descripción:</h1>
      <p>{description}</p> */}
      <h1>Descuento:</h1>
      <p>{`${discountDate}%`}</p>
      <h1>Id:</h1>
      <p>{id}</p>
      <h1>Products Id's:</h1>
      <p>{products?.map(e => `${e.id}, `)}</p>
      <h1>Categories Id's:</h1>
      <p>{categoryCheck?.map(e => `${e}, `)}</p>
       </div>
      </form>
      <Button variant="contained" color="primary">
        <NavLink to="/user/info" style={{ textDecoration: 'none', color:"#eee" }}>Volver</NavLink>
      </Button>
    </div>
  ); 
  
}

export default PromotionsModify;
