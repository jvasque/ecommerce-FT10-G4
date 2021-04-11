import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import '../../scss/components/productsForm/_ProductFormCreate.scss';
import { postProduct } from '../../redux/reducerProductForms/actionsProductForms'
import axios from "axios"
export default function Product_form_create(props) {
  const [name, setName] = useState("")
  const [SKU, setSKU] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [pic, setPic] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState(0)

  useEffect(async ()=>{
   var cat = await axios.get("http://localhost:3001/allCategories")
   setCategory(cat.data)
  }, [])

  const dispatch = useDispatch();

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
   var handleCategory = function (event) {
    event.preventDefault();
    setCategory(event.target.value);
  }; 
  var handleStock = function (event) {
    event.preventDefault();
    setStock(event.target.value);
  };
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
            onChange={(e) => handleName(e)}
          />
          <label className="label">SKU:</label>
          <input
            type="text"
            id="sku"
            autoComplete="off"
            placeholder=" SKU..."
            onChange={(e) => handleSku(e)}
          />

          <label className="label">Precio por unidad:</label>
          <input
            type="text"
            id="precio"
            autoComplete="off"
            placeholder=" Precio..."
            onChange={(e) => handlePrecio(e)}
          />
          <label className="label">Descripción:</label>
          <textarea
            id="descripcion"
            onChange={(e) => handleDescripcion(e)} >

          </textarea>

          <label className="label">
            Imagen:
          </label>
          <input
            type="text"
            id="img"
            autoComplete="off"
            placeholder=" Agregar url..."
            onChange={(e) => handleImg(e)}
          />
          <label className="label">Categoria:</label>
           {category&&category.map((c)=>{
             return(
               <label>
                <input type = "checkbox"/>
                {c.name}
               </label>
               
             )
           })} 
          
          
          <label className="label">
            Stock:
          </label>
          <input
            type="text"
            id="stock"
            autoComplete="off"
            placeholder=" Agregar stock..."
            onChange={(e) => handleStock(e)}
          />
          <button
          onClick={() => dispatch(postProduct(name, SKU, price, description, pic, category, stock))}
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

