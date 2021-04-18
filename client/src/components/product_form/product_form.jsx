import React from 'react';
import { NavLink } from 'react-router-dom';
import { clearProduct } from '../../redux/reducerProductForms/actionsProductForms';
import { useDispatch } from 'react-redux';
import '../../scss/components/productsForm/_ProductForm.scss';

function Product_form(props) {
  const dispatch = useDispatch();

  return (
    <div className="containerProdForm">
      <h1>Administración de productos</h1>
      <div className="contBtnProdForm">
        <NavLink to="/admin/product/form/create">
          <button>Crear</button>
        </NavLink>
        <NavLink to="/admin/product/form/query">
          <button onClick={() => dispatch(clearProduct())}>Consultar</button>
        </NavLink>
        <NavLink to="/user/info">
          <button>Volver</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Product_form;
