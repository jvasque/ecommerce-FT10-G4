import React,{useEffect, useState} from "react";
import {useSelector, useDispatch } from "react-redux"
import ProductCart from "./ProductCart"
import '../../scss/components/Cart/_Cart.scss'
import {totalPrice} from "../../redux/cartReducer/cartActions"
import { Button } from "@material-ui/core";




function Cart() {
 const products = useSelector(state =>state.cartReducer.cart)
 const total= useSelector(state =>state.cartReducer.total)
 const dispatch = useDispatch()
 const [cartLocal, setCartLocal] = useState([])


 useEffect(() => {
  dispatch(totalPrice())
 }, [products])
 

  return (
    <div className="cart-container">
 <div className="cart">
      {products ? products?.map(product => <ProductCart product={product} key={product.id}/>) : <h1>No hay elementos en el carrito</h1>}
       
    </div>
    <div className="total" > 
    {total ? <h1>Total:${total}</h1>: "" }
    <Button>Continar compra</Button>
    </div>
    </div>
   
  )
 
}

export default Cart;
