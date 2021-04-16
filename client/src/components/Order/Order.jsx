import React, { useEffect } from "react";
import OrderDetail from "./OrderDetail";
import { useSelector } from "react-redux";

function Order() {
  const products = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);

  return (
    <div>
      <div className="order-container">
        <div className="cart">
          {products ? (
            products?.map((product) => <OrderDetail product={product} />)
          ) : (
            <h1>No hay elementos en el carrito</h1>
          )}
        </div>
      </div>
      <div className="total">{total ? <h2>Total ${total}</h2> : ""}</div>
    </div>
  );
}

export default Order;
