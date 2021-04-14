import React from 'react';
import { NavLink } from "react-router-dom";
import '../../scss/components/productsForm/_ProductForm.scss'
function product_form(props) {
    return (
        <div className = "containerProdForm">
            <h1>Administración de productos</h1>
            <div className = "contBtnProdForm">
                <NavLink to="/admin/product/form/create">
                    <button>Crear</button>
                </NavLink>
                <NavLink to="/admin/product/form/query">
                    <button>Consultar</button>
                </NavLink>
                <NavLink to="/">
                    <button>Volver</button>
                </NavLink>
            </div>
        </div>
    );
}

export default product_form;