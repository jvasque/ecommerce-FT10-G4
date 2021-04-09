import React from 'react';
import { NavLink } from "react-router-dom";
import '../../scss/components/productsForm/_ProductFormDelete.scss'
function product_form_delete(props) {
    return (
        <div className = "containerProdFormDelete">
            <h1>Borrar producto</h1>
            <form>
        <div className = "cont-1">
          <label className="label">Id del producto:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder=" Id..."
            /* onChange={ (e) => handleId(e) } */
          />
         </div> 
        <button
          onClick={() => {/*DESPACHAR LA ACCION CORRECTA*/}}
        >
          Borrar producto
        </button>
      </form>
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>
        </div>
    );
}

export default product_form_delete;