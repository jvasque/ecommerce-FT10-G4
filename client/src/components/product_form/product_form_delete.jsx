import React from 'react';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import '../../scss/components/productsForm/_ProductFormDelete.scss'
import axios from 'axios';
import swal from 'sweetalert';


function Product_form_delete(props) {
  const [id, setId] = useState("");
  const [res, setRes] = useState("");

  async function handleId (id, event) {
    event.preventDefault();
    setRes('');
    if(!id) return swal("Advertencia",'No lo se Rick, parece vacio', "warning");
    var data = await axios.delete("http://localhost:3001/products/" + id, { data: id });
    setRes([data]);
    if(data.data.error) return swal("Oops!","No existe ese ID", "error");
    if(data.data.suceffullyDelete) return swal("Éxito!","Producto borrado con exito", "success");

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