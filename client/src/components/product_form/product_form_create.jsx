import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import '../../scss/components/productsForm/_ProductFormCreate.scss';
import { postProduct } from '../../redux/reducerProductForms/actionsProductForms';
import { getCategories } from '../../redux/categoryFilterReducer/categoryFilterActions'
import { getCatalog } from '../../redux/catalogReducer/catalogActions';
import axios from "axios";

export default function Product_form_create(props) {
  const [name, setName] = useState(""); 
  const [SKU, setSKU] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [pic, setPic] = useState("");
  const [categoryCheck, setCategoryCheck] = useState([]);
  const [stock, setStock] = useState(0);
  
  const dispatch = useDispatch();
  const category = useSelector(state => state.categoryFilterReducer.categories);
  
  var handleName = function (event) {
    event.preventDefault();
    setName(event.target.value);
  };
  var handleSku = function (event) {
    event.preventDefault();
    setSKU(event.target.value);
  };
  var handlePrecio = function (event) {
    event.preventDefault();
    setPrice(event.target.value);
  };
  var handleDescripcion = function (event) {
    event.preventDefault();
    setDescription(event.target.value);
  };

  var handleImg = function (event) {
    event.preventDefault();
    setPic(event.target.value);
  };
   var handleCategoryCheck = function (event) {
    
    if(event.target.checked){
      setCategoryCheck([...categoryCheck, event.target.value]) 

    }else{
      setCategoryCheck(categoryCheck.filter((e)=> e != event.target.value))
    }

  }; 
  var handleStock = function (event) {
    event.preventDefault();
    setStock(event.target.value);
  };

  var handleClick = function (event) {
    event.preventDefault();
    dispatch(postProduct(name, SKU, price, description, pic, categoryCheck, stock));
    setName("");
    setSKU("");
    setPrice("");
    setDescription("");
    setPic("");
    setCategoryCheck([]);
    setStock("");
    let inputs = document.querySelectorAll('input[type=checkbox]');
    inputs.forEach((item) => {
      item.checked = false;
    });
  }
  
  return (
    <div className="containerProdFormCreate">
      <h1>Agregar productos</h1>
      <form>
        <div className="cont-1">
          <label className="label">Nombre del producto:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder=" Nombre..."
            value={name}
            onChange={(e) => handleName(e)}
          />
          <label className="label">SKU:</label>
          <input
            type="text"
            id="sku"
            autoComplete="off"
            placeholder=" SKU..."
            value={SKU}
            onChange={(e) => handleSku(e)}
          />

          <label className="label">Precio por unidad:</label>
          <input
            type="text"
            id="precio"
            autoComplete="off"
            placeholder=" Precio..."
            value={price}
            onChange={(e) => handlePrecio(e)}
          />
          <label className="label">Descripción:</label>
          <textarea
            id="descripcion"
            value={description}
            onChange={(e) => handleDescripcion(e)} />                   

          <label className="label">
            Imagen:
          </label>
          <input
            type="text"
            id="img"
            autoComplete="off"
            placeholder=" Agregar url..."
            value={pic}
            onChange={(e) => handleImg(e)}
          />
          <label className="label">Categoria:</label>
          <div className="categoryBoxes">
           {category&&category.map((c)=>{
             return(
               <div key={c.name}>
                <label>{c.name}</label>                
                <input type = "checkbox"
                value = {c.name}
                onChange={(e) => handleCategoryCheck(e)}/>
              </div>
             )
            })} 
          </div>
          
          
          <label className="label">
            Stock:
          </label>
          <input
            type="text"
            id="stock"
            autoComplete="off"            
            placeholder=" Agregar stock..."
            value={stock}
            onChange={(e) => handleStock(e)}
          />
          <button
          onClick={(e) => handleClick(e)}
        >
          Crear producto
        </button>
        </div>
        
      </form>
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>
    </div>
  );
}

