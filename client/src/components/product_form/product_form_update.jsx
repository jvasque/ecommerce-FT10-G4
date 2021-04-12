import React from 'react';
import axios from "axios"
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { putProduct } from '../../redux/reducerProductForms/actionsProductForms'
import '../../scss/components/productsForm/_ProductFormUpdate.scss'
function Product_form_update(props) {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [SKU, setSKU] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [pic, setPic] = useState("")
<<<<<<< Updated upstream
  const [score, setScore] = useState("")
=======
  const [category, setCategory] = useState([])
>>>>>>> Stashed changes
  const [stock, setStock] = useState(0)
  const [selectCategory, setSelectCategory] = useState("")

  const dispatch = useDispatch();

  useEffect(() => {
    async function categories () {
     const data =await axios.get("http://localhost:3001/allCategories")
     setCategory(data.data)
    }
    categories()
  },[])

  var handleId = function (event) {
    event.preventDefault();
    setId(event.target.value);
  };
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
  var handleScore = function (event) {
    event.preventDefault();
    setScore(event.target.value);
  };
  var handleStock = function (event) {
    event.preventDefault();
    setStock(event.target.value);
  };
<<<<<<< Updated upstream
=======

  var handleClick = async function (event) {
    event.preventDefault();
    dispatch(putProduct(id, name, SKU, price, description, pic, stock))
    await axios.post(`http://localhost:3001/products/${id}/${selectCategory}`, {
      categoryId: selectCategory,
      id: id
    } )
    }

     
    
  

>>>>>>> Stashed changes
  return (
    <div className="containerProdFormUpdate">
      <h1>Modificar productos</h1>
      <form>
        <div className="cont-1">
          <label className="label">Id del producto:</label>
          <input
            type="text"
            id="id"
            autoComplete="off"
            placeholder=" Id..."
            onChange={(e) => handleId(e)}
          />
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

          <label className="label">
            Stock:
          </label>

          <input
            type="text"
            id="stock"
            autoComplete="off"
            placeholder=" Agregar stock..."

            onChange={(e) => handleStock(e)}
<<<<<<< Updated upstream
          />
          <button
          onClick={() => dispatch(putProduct(id, name, SKU, price, description, pic, score, stock))}
        >
=======
          />   
           <select onChange={(e) => setSelectCategory(e.target.value)}>
          {category.map(x => <option key={x.name} value={x.categoryId}>{x.name}</option>)}
          </select> 
          <button 
          onClick={(e) => handleClick(e)}
        >   
>>>>>>> Stashed changes
          Modificar producto
        </button>
        </div>
        
      </form>
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>
    </div>
  );
}

export default Product_form_update;