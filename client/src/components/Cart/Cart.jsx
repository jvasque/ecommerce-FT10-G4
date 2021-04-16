import React,{useEffect} from "react";
import {useSelector, useDispatch } from "react-redux"
import ProductCart from "./ProductCart"
import '../../scss/components/Cart/_Cart.scss'
import {totalPrice} from "../../redux/cartReducer/cartActions"
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";




function Cart() {
 const products = useSelector(state =>state.cartReducer.cart)
 const total= useSelector(state =>state.cartReducer.total)
 const dispatch = useDispatch()



 useEffect(() => {
  dispatch(totalPrice())
 }, [products])
 

  return (
    <div className="cart-container">
      <h1>Carrito ({products.length})</h1>
 <div className="cart">
      {products ? products?.map(product => <ProductCart product={product} key={product.id}/>) : <h1>No hay elementos en el carrito</h1>}
       
    </div>
    <div className="total" > 
    {total ? <h2>Total  ${total}</h2>: "" }
      
   {products.length ? (<NavLink to="/user/cart/order"><button>Continuar Compra</button></NavLink>): <div>Aún no llenas tu carrito, !Anímate a hacerlo!</div>}
    
    </div>
    </div>
   
  )
 
}

export default Cart;
