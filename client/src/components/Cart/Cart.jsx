<<<<<<< Updated upstream
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCart from "./ProductCart";
import "../../scss/components/Cart/_Cart.scss";
import { emptyDb, totalPrice } from "../../redux/cartReducer/cartActions";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
=======
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCart from './ProductCart';
import '../../scss/components/Cart/_Cart.scss';
import { emptyDb, totalPrice } from '../../redux/cartReducer/cartActions';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {reset} from "../../redux/iconReducer/iconActions"
>>>>>>> Stashed changes

function Cart() {
  const products = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalPrice());  

  }, [dispatch]);

  const handleClick = () => {
<<<<<<< Updated upstream
    dispatch(emptyDb())
    dispatch(totalPrice())
  }
  
=======
    dispatch(emptyDb());
    dispatch(totalPrice());
    dispatch(reset())
  };
>>>>>>> Stashed changes

  return (
    <div className="cart-container">
      <h1>Carrito ({products.length})</h1>
      <div className="cart">
        {products ? (
          products?.map((product) => (
            <ProductCart product={product} key={product.id} />
          ))
        ) : (
          <h1>No hay elementos en el carrito</h1>
        )}
      </div>
      <div className="deleteAll">
      {products.length !==0 ? <Button onClick={handleClick}>Eliminar todo</Button> : ""}
      </div>
      
      <div className="total">
        {total ? <h2>Total ${total}</h2> : ""}
        {products.length ? (
          
          <Link className="link-redirect" to="/user/cart/order">
            <Button>Continuar Compra</Button>
          </Link>
        ) : (
          <div>Aún no llenas tu carrito, !Anímate a hacerlo!</div>
        )}
      </div>
    </div>
  );
}

export default Cart;
