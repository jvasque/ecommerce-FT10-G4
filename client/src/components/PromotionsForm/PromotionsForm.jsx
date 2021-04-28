import React from 'react';
import { NavLink } from 'react-router-dom';
// import { clearProduct } from '../../redux/reducerProductForms/actionsProductForms';
import { useDispatch } from 'react-redux';
//import '../../scss/components/productsForm/_ProductForm.scss'; 
import { clearProduct } from '../../redux/reducerProductForms/actionsProductForms';

function PromotionForm(props) {
  const dispatch = useDispatch();

  return (
    <div className="containerPromotionForm">
      <h1>Administración de promociones</h1>
      <div className="contBtnPromotionForm">
        <NavLink to="/admin/promotion/form/create">
          <button onClick={() => dispatch(clearProduct())}>Crear</button>
        </NavLink>
        <NavLink to="/admin/promotion/form/query">
          <button /* onClick={() => dispatch(clearPrmotion())} */>Consultar</button>
        </NavLink>
      </div>
    </div>
  );
}

export default PromotionForm;