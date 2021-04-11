import React from 'react';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { getProducts } from '../../redux/reducerProductForms/actionsProductForms'
import '../../scss/components/productsForm/_ProductFormQuery.scss'
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard'

function Product_form_query(props) {
  const [id, setId] = useState("");
  const [product, setProduct] = useState([]);

  //const product = useSelector(state => state.products);

  async function  handleQuery(id) {
    if(!id) return alert('No lo se Rick, parece vacio')
    let data = await axios.get("http://localhost:3001/products/" + id);
    setProduct([data]) ;
    console.log(product, "MY PRODUCT");
    console.log(data, "MY DATA");
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
          onClick={(e) => {e.preventDefault();console.log(id); handleQuery(id)}}
        >
          Consultar producto
        </button>
         {product[0]?.data.name && product.map((prod)=> {
           console.log(prod, "MAP PRODUCT")
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