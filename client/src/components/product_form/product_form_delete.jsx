import React from 'react';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import '../../scss/components/productsForm/_ProductFormDelete.scss'
import axios from 'axios';

function Product_form_delete(props) {
  const [id, setId] = useState("");

  async function handleId (id, event) {
    event.preventDefault();
    if(!id) return alert('No lo se Rick, parece vacio');
    var data = await axios.delete("http://localhost:3001/products/" + id, { data: id });
    if(data.data.error) return alert("No existe ese ID");
    if(data.data.suceffullyDelete) return alert("Producto borrado con exito");

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
            onChange={(e) => setId(e.target.value)}
          />
          <button
          onClick={(e) => {handleId(id, e);}}
        >
          Borrar producto
        </button>
        </div>
      </form>
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>
    </div>
  );
}

export default Product_form_delete;