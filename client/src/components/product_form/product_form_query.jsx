import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { getProductName, deleteProduct } from '../../redux/reducerProductForms/actionsProductForms'
import '../../scss/components/productsForm/_ProductFormQuery.scss'
import ProductCard from '../ProductCard/ProductCard'
import swal from 'sweetalert';
import {useDispatch, useSelector} from 'react-redux';


function Product_form_query(props) {
  const [name, setName] = useState("");
  const [product, setProduct] = useState([]);

  const dispatch = useDispatch();
 
  const productGlobal = useSelector(state => state.reducerProductForms.product);

  useEffect(() => {
    setProduct(productGlobal);
    async function alerting () {
      if(productGlobal[0]?.error){ 
        
        swal("Oops!","No existe un producto con ese nombre", "error")
      };

    }
    alerting();
    
    
  }, [productGlobal, dispatch])

  function  handleQuery(name, event) {
    event.preventDefault();
    if(!name) return swal("Advertencia",'No lo se Rick, parece vacio', "warning")
    dispatch(getProductName(name))
    
  }

  function handlerPreventButton(e){
    if(!product[0] || product[0]?.error) {
      e.preventDefault();
      return swal("Oops!","No hay un producto seleccionado", "warning")
    }
  }

  function handleDelete(e){
    if(!product[0] || product[0]?.error) {
      e.preventDefault();
      return swal("Oops!","No hay un producto seleccionado", "warning")
    }
    e.preventDefault();
    swal({
      title: "Está seguro de borrar el producto seleccionado?",
      text: "Una vez borrado, desaparecerá de su base de datos!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {  
      if (willDelete) {  
        dispatch(deleteProduct(product[0]?.productId))
        swal("Su producto fue borrado con éxito!", 
        {icon: "success"})
        .then(e => window.location.reload())
        
      } else {    
        swal("El producto NO fue borrado");  
      }});
  }

    return (
        <div className = "containerProdFormQuery">
            <h1>Consultar producto</h1>
            <form>
        <div className = "cont-1">
          <label className="label">Nombre del producto:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Nombre . . . "
            onChange={ (e) => setName(e.target.value) }
          />
         </div> 
        <button
          onClick={(e) => {handleQuery(name, e)}}
        >
          Consultar producto
        </button>
        <NavLink to="/admin/product/form/update">
            <button onClick={(e) => {handlerPreventButton(e)}}>Modificar</button>
        </NavLink>

          <button onClick={(e) => { handleDelete(e)}}>Eliminar</button>

         {product[0]?.name && product.map((prod)=> {
           return (
             <ProductCard product={prod}></ProductCard>
           )
         })}

         {product && product[0]?.error && <h1>El producto solicitado no existe</h1>}
        
      </form>
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>
        </div>
        
    );
}

export default Product_form_query;