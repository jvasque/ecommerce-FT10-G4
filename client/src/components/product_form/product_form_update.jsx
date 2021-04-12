import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { putProduct } from '../../redux/reducerProductForms/actionsProductForms'
import '../../scss/components/productsForm/_ProductFormUpdate.scss'
function Product_form_update(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [SKU, setSKU] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [pic, setPic] = useState("");
  const [score, setScore] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [stock, setStock] = useState(0);
  const [modifProduct, setModifiProduct] = useState([]);
  const [ids, setIds] = useState([]);
  const product = useSelector(state => state.reducerProductForms.product);

  const dispatch = useDispatch();

  useEffect(() => {
    async function categories() {
     const data = await axios.get("http://localhost:3001/allCategories")
     setCategory(data.data)
    }
    if(product[0]){
      setModifiProduct(product[0].categories)
    }

    categories()
  },[product])

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

  var handleStock = function (event) {
    event.preventDefault();
    setStock(event.target.value);
  };

  var handleClick = async function (event) {
    event.preventDefault();
    dispatch(putProduct(id, name, SKU, price, description, pic, stock))
    await axios.post(`http://localhost:3001/products/${id}/${selectCategory}`, {

      categoryId: selectCategory,
      id: id
    } )
    }

  const deleteCategory = (e) => {
    e.preventDefault()
    setModifiProduct(modifProduct.filter(x => x.categoryId != e.target.value))
  }
  const addCategory = (e) => {
    setIds(e.target.value)
  }

  return (
    <div className="containerProdFormUpdate">
      <h1>Modificar productos</h1>
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

          {modifProduct?.map(x => <label>{x.name}<button value={x.categoryId} onClick={(e) => deleteCategory(e)}>x</button></label>)}
             <select onChange={(e) => addCategory(e)} >{category.map(x => <option  key= {x.name} value={x.categoryId} >{x.name}</option> )} </select>
          <button 
          onClick={(e) => handleClick(e)}
        >   
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