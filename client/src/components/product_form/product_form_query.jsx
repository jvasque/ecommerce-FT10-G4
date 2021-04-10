import React from 'react';
import { NavLink } from "react-router-dom";
import '../../scss/components/productsForm/_ProductFormQuery.scss'
function product_form_query(props) {
    return (
        <div className = "containerProdFormQuery">
            <h1>Consultar producto</h1>
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
          <button
          onClick={() => {/*DESPACHAR LA ACCION CORRECTA*/}}
        >
          Consultar producto
        </button>
         </div> 
        
      </form>
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>
        </div>
    );
}

export default product_form_query;