import React from 'react';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/reducerProductForms/actionsProductForms'
import '../../scss/components/productsForm/_ProductFormQuery.scss'
function Product_form_query(props) {
  const [id, setId] = useState("");

  const dispatch = useDispatch();

  const product = useSelector(state => state.products)

  var handleId = function (event) {
    event.preventDefault();
    setId(event.target.value);
  };
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
            onChange={ (e) => handleId(e) }
          />
         </div> 
        <button
          onClick={(e) => {e.preventDefault(); dispatch(getProducts(id)); console.log(product)}}
        >
          Consultar producto
        </button>
         
        
      </form>
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>
        </div>
        
    );
}

export default Product_form_query;