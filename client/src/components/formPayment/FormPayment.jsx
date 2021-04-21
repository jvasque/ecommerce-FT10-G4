import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "../../scss/components/FormPayment/_FormPayment.scss"
import { NavLink, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import { saveId ,returnProductCart } from "../../redux/formPaymentReducer/formPaymentActions";

const FormPayment = () => {
  //const history = useHistory();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: 0,
  });
  const [url, setUrl] = useState("")
  const id = JSON.parse(localStorage.getItem("user"))


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
    if (input.firstName.length === 0 || input.lastName.length === 0 || input.address.length === 0) {
     return swal('Aviso!','Todos los datos son obligatorios', 'warning');
    }
    await axios.put(`http://localhost:3001/order/orders/${id}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      state: "processing",
      paymentDate: "Mercadopago",
      address: input.address,
      email: input.email || user.email,
      phoneNumber: input.phoneNumber,
      totalPrice: total,
    });
     //history.push("/user/cart/order/");
     const urlMercadopago = await axios.post("http://localhost:3001/cart/checkout", {
      title: "Pago AgroPlace",
      totalPrice: total
     })
    setUrl(urlMercadopago.data.url)
    window.location = urlMercadopago.data.url
  };

  return (
    <div className="container-payment">
      <Typography variant="h5">
    
      </Typography>
      <FormControl className="" noValidate autoComplete="off">
      <TextField
          type="text"
          name="firstName"
          onChange={handleChange}
          label="Nombre"
          variant="outlined"
          style={{marginBottom: 5}}
          required
        
        />
        <TextField
          type="text"
          name="lastName"
          onChange={handleChange}
          label="Apellido"
          variant="outlined"
          style={{marginBottom: 5}}
          required
        />
        <TextField
          type="number"
          name="phoneNumber"
          label="Telefono de contacto:"
          variant="outlined"
          onChange={handleChange}
          style={{marginBottom: 5}}
          required
        />
        <TextField
          type="text"
          name="address"
          onChange={handleChange}
          label="Dirección de envío:"
          variant="outlined"
          style={{marginBottom: 5}}
          required
        />
        <TextField
          type="email"
          name="email"
          onChange={handleChange}
          label={user.email}
          variant="outlined"
          placeholder = {user.email}
          style={{marginBottom: 5}}
        />

        <Typography>Precio Total: {total}</Typography>

        <TextField
          type="submit"
          value="Pagar"
          variant="outlined"
          onClick={onSubmit}
        />
      </FormControl>

      <TextField
        type="submit"
        value="Volver"
        variant="outlined"
        onClick={returnToCart}
      />
    </div>
  );
};

export default FormPayment;
