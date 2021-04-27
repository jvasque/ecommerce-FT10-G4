import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
//import '../../scss/components/productsForm/_ProductFormCreate.scss';
//import { postProduct } from '../../redux/reducerProductForms/actionsProductForms';
//import axios from 'axios';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

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
    
  }
}));



export default function PromotionsCreate(props) {
  const classes = useStyles();
  const [input, setInput] = useState({
    description: '',
    categoryCheck: [],
    products: '',
    discountDate: '',
    days: []
    
  });
  

 /*  useEffect(() => {
   
  }, [pic]); */

  
  

  const dispatch = useDispatch();
  const category = useSelector(
    (state) => state.categoryFilterReducer.categories
  );

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
        categoryCheck: [...input.categoryCheck, e.target.value],
      });
    } else {
      setInput({
        ...input,
        categoryCheck: input.categoryCheck.filter(
          (category) => category !== e.target.value
        ),
      });
    }
  };

 /*  const handleSubmit = function (event) {
    event.preventDefault();
    if (input.categoryCheck.length === 0) {
      swal('Aviso!','Se requiere al menos UNA categoría', 'warning');
    } else {
      dispatch(
        postProduct(
          input.name,
          input.SKU,
          input.price,
          input.description,
          resPic,
          input.categoryCheck,
          input.stock
        )
      );

      
      setInput({
        description: '',
        categoryCheck: [],
        producs: '',
        discountDate: [],
        days: []
      });
      
      
      let inputs = document.querySelectorAll('input[type=checkbox]');
      inputs.forEach((item) => {
        item.checked = false;
      });
      swal('Éxito!',`El producto ${input.name} ha sido creado`, 'success');
    }
  }; */

  return (
    <div className="containerPromotionFormCreate">
      <h1>Agregar promociones</h1>
      <form className={classes.root} /* onSubmit={(e) => handleSubmit(e)} */>
        <div className="cont-1">
          
          <TextField 
          id="outlined-basic" 
          label="descripción" 
          placeholder="Agregue la descripción de la promoción..."
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
                return (
                  <div key={c.name}>
                    <label>{c.name}</label>
                    <input
                      type="checkbox"
                      value={c.name}
                      onChange={(e) => handleCategoryCheck(e)}
                    />
                  </div>
                );
              })}
          </div>

          <TextField 
          id="outlined-basic" 
          label="productos" 
          placeholder="Agregue los productos a los que aplicará la promoción..."
          variant="outlined"
          name="products" 
          value={input.products}
          required 
          onChange={handleChange}
          className={classes.input}/>


          <TextField 
          id="outlined-basic" 
          label="Porcentaje" 
          placeholder="Agregue el porcentaje de descuento..."
          variant="outlined"
          name="discountDate" 
          value={input.discountDate} 
          type="number"
          InputProps={{ inputProps: { min: 1, max: 99 } }}
          required 
          onChange={handleChange}
          className={classes.input}/>

          <TextField 
          id="outlined-basic" 
          label="Descripción..." 
          variant="outlined"
          name="description"
          value={input.description} 
          type="text"
          required 
          onChange={handleChange}
          className={classes.input}/>

          <button type="submit">Crear promocion</button>
        </div>
      </form>

      <NavLink to="/user/info">
        <button>Volver</button>
      </NavLink>
    </div>
  );
}