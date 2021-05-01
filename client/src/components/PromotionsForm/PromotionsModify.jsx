import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import "../../scss/components/PromotionsForm/_PromotionsCreate.scss";
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';

const grisPrincipal= "#EFEFEF";
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: "40px auto",
        width: '80%',
        background: grisPrincipal,
        color: "black" 
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
  
  const [hasCategory, setHasCategory] = useState([])
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

  const dias = ["Domingo", "Lunes", "Martes", "Miércoles",
                "Jueves", "Viernes", "Sábado"]
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
    setInput({
      ...input,
      categoryCheck: categoryCheck,
      days: days.toString().split("").map((d) => parseInt(d)) 
    });
     
  }, []);
 

  const handleDayCheck = function (e) {
    if (e.target.checked) {
      setInput({
        ...input,
        days: [...input.days, parseInt(e.target.value)],
      });
    } else {
      setInput({
        ...input,
        days: input.days.filter(
          (day) => day !== parseInt(e.target.value)
        ),
      });
    }
  };

  var handleCheck = function(x){
    let check = categoryCheck?.includes(x)
    return check
  }
  var handleDaysChecked = function(x){
    let check = days?.includes(x)
    return check
  }
   return (
    <div className="containerPromotionFormCreate">
      <form className={classes.root}  /* onSubmit={(e) => handleSubmit(e)} */ >
       <h1>Modificar promociones</h1>
       <div className="cont-1">
       <label>nombre</label>
       <TextField 
          id="outlined-basic" 
          label={promotion.description} 
          placeholder="Agregue la nueva descripción de la promoción..."
          variant="outlined"
          name="description"
          value={input.description} 
          type="text"
          onChange={handleChange}
          className={classes.input}/>

         <label className="label">Categoria:</label>
           <div className="categoryBoxes">
             {category &&
               category.map((c) => {
                 return ( 
                   <div key={c.name}>
                     <label>{c.name}</label>
                     <input
                      type="checkbox"
                      key={c.id}
                      value={c.id}
                      onChange={(e) =>  handleCategoryCheck(e)}
                      defaultChecked = { handleCheck(c.id) }
                      
                     />
                   </div>
                 );
                })}
           </div>
          

        
                <h1>Products Id's:</h1>
                <p>{products?.map(e => `${e.id}, `)}</p>
         <label>Porcentaje de descuento</label>
         <TextField 
          id="outlined-basic" 
          label={promotion.discountDate} 
          placeholder="Agregue el nuevo porcentaje de descuento..."
          variant="outlined"
          name="discountDate" 
          value={input.discountDate} 
          type="number"
          InputProps={{ inputProps: { min: 1, max: 99 } }}
          onChange={handleChange}
          className={classes.input}/>     
     
          <label>Combo</label>
          <TextField 
          id="outlined-basic" 
          label={promotion.combo} 
          variant="outlined"
          name="combo"
          value={input.combo} 
          type="number"
          InputProps={{ inputProps: { min: 0, max: 999999 } }}
          onChange={handleChange}
          className={classes.input}/>

          <label className="label">Día/s:</label>
          <div className="categoryBoxes">
            {dias &&
              dias.map((d) => {
                return (
                  <div key={d}>
                    <label>{d}</label>
                    <input
                      type="checkbox"
                      value={dias.indexOf(d)}
                      onChange={(e) => handleDayCheck(e)}
                      defaultChecked = { handleDaysChecked(dias.indexOf(d)) }
                    />
                  </div>
                );
              })}
          </div>

          <button type="submit">Modificar promocion</button>     
       </div>
      </form>
      <Button variant="contained" color="primary">
        <NavLink to="/user/info" style={{ textDecoration: 'none', color:"#eee" }}>Volver</NavLink>
      </Button>
    </div>
  ); 
  
}

export default PromotionsModify;
