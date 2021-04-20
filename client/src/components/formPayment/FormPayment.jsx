import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
//import {  } from "react-router";
import { Link,Redirect ,useHistory} from "react-router-dom";

const FormPayment = () => {
  
    const history = useHistory()

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });

  const total = useSelector((state) => state.cartReducer.total);
  const user = useSelector((state) => state.loginReducer.user);
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/order/orders", {
      firstName: input.firstName,
      lastName: input.lastName,
      state: "cart",
      paymentDate: "pending",
      addres: input.address,
      email: user.email,
      totalPrice: total,
    });
    history.push("/rutaMercadoPago");
  };

  return (
    <div>
      <h1>Detalles de la orden</h1>
      <p>
        Nombres y Apellidos : {user.firstName} {user.lastName}
      </p>
      <form onSubmit={onSubmit}>
        <label>Telefono de contacto:</label>
        <input
          min="1"
          type="number"
          name="phoneNumber"
          onChange={handleChange}
        />
        <label>Dirección de envío</label>
        <input type="text" name="address" onChange={handleChange} />
        <input type="email" name="email" onChange={handleChange} />

        <p>Precio Total: {total}</p>

        <input type="submit" value="Pagar" />
      </form>

      <Link to='/product/cart'>
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default FormPayment;
