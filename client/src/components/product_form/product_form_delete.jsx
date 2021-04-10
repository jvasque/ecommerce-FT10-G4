import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { deleteProduct } from '../../redux/reducerProductForms/actionsProductForms'
import '../../scss/components/productsForm/_ProductFormDelete.scss'
function Product_form_delete(props) {
  const [id, setId] = useState("")

  const dispatch = useDispatch();

  var handleId = function (event) {
    event.preventDefault();
    setId(event.target.value);
  };
  return (
    <div className="containerProdFormDelete">
      <h1>Borrar producto</h1>
      <form>
        <div className="cont-1">
          <label className="label">Id del producto:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder=" Id..."
            onChange={(e) => handleId(e)}
          />
        </div>
        <button
          onClick={(e) => {e.preventDefault(); dispatch(deleteProduct(id)) }}
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

export default Product_form_delete;