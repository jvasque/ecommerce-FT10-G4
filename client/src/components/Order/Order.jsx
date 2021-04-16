import React from "react";
import OrderDetail from "./OrderDetail";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Order() {
  const products = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const user = useSelector(state=>state.loginReducer.user)

  console.log(user)
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
      {/*falta corregir falla en db para evitar se traiga todos los usuarios
      Al corregir la falla, user se vuelve un objeto, por lo cual se debe cambiar
      la validación Array.isArray y comprobar si hay un nombre de usuario
      */ }
         {(Array.isArray(user) ? <a>Espacio para mercadoPago</a> : <NavLink to='/user/login'>Realizar Pago</NavLink>)}
    </div>
  );
}

export default Order;
