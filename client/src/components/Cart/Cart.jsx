import React,{useEffect, useState,Link} from "react";
import {useSelector, useDispatch } from "react-redux"
import ProductCart from "./ProductCart"
import '../../scss/components/Cart/_Cart.scss'
import {totalPrice} from "../../redux/cartReducer/cartActions"
import { Button } from "@material-ui/core";
import OrderDetail from "../Order/OrderDetail";
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
      
    <NavLink to="/user/cart/order">Continuar Compra</NavLink>
    
    </div>
    </div>
   
  )
 
}

export default Cart;
