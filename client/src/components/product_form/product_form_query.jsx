import React from 'react';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../../scss/components/productsForm/_ProductFormQuery.scss'
function Product_form_query(props) {
  const [id, setId] = useState("");

<<<<<<< Updated upstream
  const dispatch = useDispatch();

  const product = useSelector(state => state.products)
=======
  //const product = useSelector(state => state.products);
  const dispatch = useDispatch()

  async function  handleQuery(id, event) {
    event.preventDefault();
    if(!id) return alert('No lo se Rick, parece vacio')
    let data = await axios.get("http://localhost:3001/products/" + id);
    setProduct([data]) ;
    dispatch({type:"GET_PRODUCTS", payload:data.data})
  }
>>>>>>> Stashed changes

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
          onClick={(e) => {e.preventDefault(); console.log(product)}}
        >
          Consultar producto
        </button>
<<<<<<< Updated upstream
         
=======
        <NavLink to="/admin/product/form/update">
                    <button >Modificar</button>
                </NavLink>
         {product[0]?.data.name && product.map((prod)=> {
           return (
             <ProductCard product={prod.data}></ProductCard>
           )
         })}

         {product && product[0]?.data.error && <h1>El producto solicitado no existe</h1>}
>>>>>>> Stashed changes
        
      </form>
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>
        </div>
        
    );
}

export default Product_form_query;