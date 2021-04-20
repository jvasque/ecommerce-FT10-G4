import React, { useEffect, useState } from "react";
import OrderDetail from "./OrderDetail";
import { useSelector } from "react-redux";
import "../../scss/components/Order/_Order.scss";
import "../../scss/components/formCategories/_Form.scss";
import { Button } from "@material-ui/core";
import OrderModify from "./OrderModify";
import axios from "axios";
import FormPayment from "../formPayment/FormPayment";

function Order() {
  let products = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const user = useSelector((state) => state.loginReducer.user);
  const isLogin = useSelector((state) => state.loginReducer.isLogin);

  const [url, setUrl] = useState("")

  useEffect(() => {
    async function postOrder() {
      // let id = Date.now();

      // let user = {
      //   firstName: "NataN",
      //   lastName: "J",
      //   state: "cart",
      //   paymentDate: "hoy",
      //   totalPrice: total,
      // };

      // await axios.post(`http://localhost:3001/order/orders/`, {
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   state: "cart",
      //   paymentDate: user.paymentDate,
      //   totalPrice: total,
      //   email:user.email
      // });

      let orderDetails = await axios.get(
        `http://localhost:3001/cart/${user.id}/cart`
      );
      orderDetails &&
        orderDetails.data.map(
          (order, i) => (products[i]["quantity"] = order.quantity)
        );
    }

    postOrder();
  }, [isLogin, products]);

  const mercadopago = async (e) => {
     e.preventDefault()
    const urlMercadopago = await axios.post("http://localhost:3001/cart/checkout", {
      title: "Pago AgroPlace",
      totalPrice: total
     })
    setUrl(urlMercadopago.data.url)
    window.location = urlMercadopago.data.url
  }

  return (
    <div>
      <div className="order-container">
        <div className="cart">
          <div className="OrderModify">{/* <OrderModify /> */}</div>
          {products ? (
            products?.map((product) => <OrderDetail product={product} />)
          ) : (
            <h1>No hay elementos en el carrito</h1>
          )}
        </div>
      </div>

      <div className="total">
        {total ? <h2>Total ${total}</h2> : ""}
        <Button onClick={(e) => mercadopago(e)}><a href={url}>Continuar Compra</a></Button>
       
      </div>
    </div>
  );
}

export default Order;
