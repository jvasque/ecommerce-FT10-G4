import React from 'react';
import { NavLink } from "react-router-dom";
import '../../scss/components/productsForm/_ProductFormUpdate.scss'
function product_form_update(props) {
    return (
        <div className = "containerProdFormUpdate">
            <h1>Modificar productos</h1>
            <form>
        <div className = "cont-1">
          <label className="label">Nombre del producto:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder=" Nombre..."
            /* onChange={(e) => handleName(e)} */
          />
          <label className="label">SKU:</label>
          <input
            type="text"
            id="sku"
            autoComplete="off"
            placeholder=" SKU..."
            /* onChange={(e) => handleSku(e)} */
          />
          
          <label className="label">Precio por unidad:</label>
          <input
            type="text"
            id="precio"
            autoComplete="off"
            placeholder=" Precio..."
            /* onChange={(e) => handlePrecio(e)} */
          />
          <label className="label">Descripción:</label>
          <textarea 
            id="descripcion"
            /* onChange={(e) => handleDescripcion(e)} */>

          </textarea>
          
          <label className="label">
            Imagen:
          </label>
          <input
            type="text"
            id="img"
            autoComplete="off"
            placeholder=" Agregar url..."
            /* aca usar dsp split */
            /* onChange={(e) => handleImg(e)} */
          />
          
          <label className="label">
            Stock:
          </label>
          <input
            type="text"
            id="stock"
            autoComplete="off"
            placeholder=" Agregar stock..."
            /* aca usar dsp split */
            /* onChange={(e) => handleStock(e)} */
          />
        </div>
        <button
          onClick={() => {/*DESPACHAR LA ACCION CORRECTA*/}}
        >
          Modificar producto
        </button>
      </form>
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>
        </div>
    );
}

export default product_form_update;