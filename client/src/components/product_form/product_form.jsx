import React from 'react';
import { NavLink } from "react-router-dom";

function product_form(props) {
    return (
        <div>
            <h1>Productos</h1>
            <NavLink to="/admin/product/form/create">
                <button>Crear</button>
            </NavLink>
            <NavLink to="/admin/product/form/query">
                <button>Consultar</button>
            </NavLink>
            <NavLink to="/admin/product/form/update">
                <button>Modificar</button>
            </NavLink>
            <NavLink to="/admin/product/form/delete">
                <button>Eliminar</button>
            </NavLink>
        </div>
    );
}

export default product_form;