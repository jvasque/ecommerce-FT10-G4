import React,{useEffect} from "react";
import {useSelector, useDispatch } from "react-redux"
import ProductCart from "./ProductCart"
import '../../scss/components/Cart/_Cart.scss'
import {totalPrice} from "../../redux/cartReducer/cartActions"




function Cart() {
 const products = useSelector(state =>state.cartReducer.cart)
 const total= useSelector(state =>state.cartReducer.total)
 const dispatch = useDispatch()
 console.log(total);

 useEffect(() => {
  dispatch(totalPrice())
 }, [products])


  return (
    <div className="cart">
      {products ? products?.map(product => <ProductCart product={product} key={product.productId}/>) : <h1>No hay elementos en el carrito</h1>}
       {total ? <h1>Total:{total}</h1>: "" }
    </div>
    
  )
 
}

export default Cart;
