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
import { putPromotion } from '../../redux/PromotionsFormReducer/actionsPromotionsForm';
import swal from 'sweetalert';
import {
  getProductName,
  clearProduct,
} from '../../redux/reducerProductForms/actionsProductForms';

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
  const productGlobal = useSelector(
    (state) => state.reducerProductForms.product
    );
  const dispatch = useDispatch();
  const classes = useStyles();
  
const {
  //description,
  categoryCheck,
  products,
  //discountDate,
  //combo,
  days,
  active, 
  id,
} = props.history.location.promotion;
  const [name, setName] = useState('');
  const [product, setProduct] = useState([]);
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
  const handleSubmit = function (event) {
    event.preventDefault();
      dispatch(
        putPromotion(
          input.description,
          input.categoryCheck,
          input.products.map((e) => e.id),
          input.discountDate,
          input.combo,
          input.days,
          active,
          id
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
      
      /* setProductRender([]);
      setName(''); */
      let inputs = document.querySelectorAll('input[type=checkbox]');
      inputs.forEach((item) => {
        item.checked = false;
      });
      swal('Éxito!',`La promocion ${input.combo} ha sido modificada`, 'success')
      .then(e => window.location.replace("http://localhost:3000/user/info")) 
  };  

  async function getPromotion() {
    const token = localStorage.getItem("token");
    const info = await axios.get("http://localhost:3001/promotions/"+ id, 
    {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPromotion(info.data);
    
  }

  function productFilterFromCategory(products, categoryCheckeds){

    if(!categoryCheckeds) return products;
    let response=[];

    for (let i = 0; i < products.length; i++) {
      const categoryProduct = products[i].categories?.map(e => e.id);
      if(!categoryProduct){
        response.push(products[i]);
        continue;
      }
      if(categoryProduct){
        let filtered = categoryProduct.some(item => categoryCheckeds.includes(item));

        if(!filtered) response.push(products[i]);
        
      }
    }
    return response;
  }

  useEffect(() => {
    setProduct(productGlobal);
    async function alerting() {
      if (productGlobal[0]?.error) {
        swal('Oops!', 'No existe un producto con ese nombre', 'error');
      }
    }
    alerting();
    setPromotion([]);
    getPromotion();
    setInput({
      ...input,
      categoryCheck: categoryCheck,
      days: days.toString().split("").map((d) => parseInt(d)),
      products: productFilterFromCategory(products, categoryCheck)
    });
    if(productGlobal[0] && !productGlobal[0]?.error){
    setInput({
      ...input,
      
      products: [...input.products?.filter((n)=>n.id !== productGlobal[0].id), productGlobal[0]]
    });
  }else if(productGlobal[0]?.error){
    setInput({
      ...input,
      
      products: input.products
  })
  }
  
  }, [productGlobal, dispatch]);
 
console.log(input.products, "PRODUTO")
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

  const handleDeleteProduct = function (e, id) {
    setInput({
      ...input,
      products: input.products.filter(
        (p) => p.id !== id
      ),
    });
  }
  //BUSCAR PRODUCTO
function handleQuery(name, event) {
  event.preventDefault();
  if (!name)
    return swal('Advertencia', 'No lo se Rick, parece vacio', 'warning');
  dispatch(getProductName(name));
}
//FIN BUSCAR PRODUCTO
   return (
    <div className="containerPromotionFormCreate">
      <form className={classes.root}   onSubmit={(e) => handleSubmit(e)}  >
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
          
           <TextField 
          id="outlined-basic" 
          label="productos" 
          placeholder="Agregue los productos a los que aplicará la promoción..."
          variant="outlined"
          name="product" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className={classes.input}/>
          <button
          onClick={(e) => {
            handleQuery(name, e);
          }}
        >
          Consultar producto
        </button>
         {input.products?.length &&
          input.products?.map((n) => {
            return (
              <div className = "ProductName">
              <p>{n.name}</p> 
              <CancelIcon  className={classes.cancelIcon} onClick ={(e) =>  handleDeleteProduct(e, n.id)}/>
              </div>
            )
          })}
        
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
