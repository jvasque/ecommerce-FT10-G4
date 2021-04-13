import React from 'react';
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { getProducts } from '../../redux/reducerProductForms/actionsProductForms'
import '../../scss/components/productsForm/_ProductFormQuery.scss'
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard'
import swal from 'sweetalert';
import {useDispatch} from 'react-redux'

function Product_form_query(props) {
  const [id, setId] = useState("");
  const [product, setProduct] = useState([]);

  //const product = useSelector(state => state.products);
  const dispatch = useDispatch();

  async function  handleQuery(id, event) {
    event.preventDefault();
    if(!id) return swal("Advertencia",'No lo se Rick, parece vacio', "warning")
    let data = await axios.get("http://localhost:3001/products/" + id);
    setProduct([data]);
    if(data.data.error) return swal("Oops!","No existe ese ID", "error");
    dispatch({type: "GET_PRODUCTS", payload: data.data})
  }

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
            onChange={ (e) => setId(e.target.value) }
          />
         </div> 
        <button
          onClick={(e) => {handleQuery(id, e)}}
        >
          Consultar producto
        </button>
        <NavLink to="/admin/product/form/update">
            <button >Modificar</button>
        </NavLink>
         {product[0]?.data.name && product.map((prod)=> {
           return (
             <ProductCard product={prod.data}></ProductCard>
           )
         })}

         {product && product[0]?.data.error && <h1>El producto solicitado no existe</h1>}
        
      </form>
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>
        </div>
        
    );
}

export default Product_form_query;