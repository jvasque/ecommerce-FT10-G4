import React,{useEffect} from "react";
import OrderDetail from "./OrderDetail";
import { useSelector } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import "../../scss/components/Order/_Order.scss"
import { Button } from "@material-ui/core";


function Order() {
  const products = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const user = useSelector(state=>state.loginReducer.user)


  
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
      <div className="total">{total ? <h2>Total ${total}</h2> : ""}
      {(Array.isArray(user) ? <a>Espacio para mercadoPago</a> : <Link className="link-redirect" to='/user/login'><Button className="test2">Realizar Pago</Button></Link>)}
      
      </div>
      {/*falta corregir falla en db para evitar se traiga todos los usuarios
      Al corregir la falla, user se vuelve un objeto, por lo cual se debe cambiar
      la validación Array.isArray y comprobar si hay un nombre de usuario
      */ }
         
        
    </div>
  );
}

export default Order;
