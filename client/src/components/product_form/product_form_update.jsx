import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { putProduct } from '../../redux/reducerProductForms/actionsProductForms'
import '../../scss/components/productsForm/_ProductFormUpdate.scss'

function Product_form_update(props) {
  
  const [input, setInput] = useState({
    id: "",
    name: "",
    SKU: "",
    price: "",
    description: "",
    pic: "",
    stock: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = function (event) {
    event.preventDefault();

    dispatch(putProduct(
      input.id,
      input.name,
      input.SKU,
      input.price,
      input.description,
      input.pic,
      input.stock)
      );

      alert(`El producto ${input.name} ha sido modificado`);

      setInput({
        id: "",
        name: "",
        SKU: "",
        price: "",
        description: "",
        pic: "",
        stock: "",
      })
  }

  return (
    <div className="containerProdFormUpdate">
      <h1>Modificar productos</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="cont-1">
          <label className="label">Id del producto:</label>
          <input
            type="number"
            name="id"
            min="1"            
            autoComplete="off"
            placeholder=" Id..."
            value={input.id}
            required
            onChange={handleChange}            
          />

          <label className="label">Nombre del producto:</label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder=" Nombre..."
            value={input.name}
            required
            onChange={handleChange}
          />

          <label className="label">SKU:</label>
          <input
            type="text"
            name="SKU"
            autoComplete="off"
            placeholder=" SKU..."
            value={input.SKU}
            required
            onChange={handleChange}
          />

          <label className="label">Precio por unidad:</label>
          <input
            type="number"
            name="price"
            autoComplete="off"
            placeholder=" Precio..."
            value={input.price}
            required
            onChange={handleChange}            
          />

          <label className="label">Descripción:</label>
          <textarea
            name="description"
            value={input.description}
            required
            onChange={handleChange}
          />         

          <label className="label">Imagen:</label>
          <input
            type="text"
            name="pic"
            autoComplete="off"
            placeholder=" Agregar url..."
            value={input.pic}
            required
            onChange={handleChange}
          />          

          <label className="label">Stock:</label>
          <input
            type="number"
            name="stock"
            autoComplete="off"
            placeholder=" Agregar stock..."
            value={input.stock}
            required
            onChange={handleChange}
          />

          <button type="submit">Modificar producto</button>

        </div>        
      </form>

      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>

    </div>
  );
}

export default Product_form_update;