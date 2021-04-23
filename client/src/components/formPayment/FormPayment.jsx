import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "../../scss/components/FormPayment/_FormPayment.scss";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { FormControl } from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Paypal from "../Paypal/Paypal";

const useStyles = makeStyles({
  root: {
    borderColor: "green",
    fontWeight: 525,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgba(47, 126, 19, 1)",
    },
  },
});

const FormPayment = () => {
  const classes = useStyles();

  const history = useHistory();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: 0,
    email: "",
  });
  const [url, setUrl] = useState("");
  const id = JSON.parse(localStorage.getItem("user"));

  const total = useSelector((state) => state.cartReducer.total);
  const [showPaypal, setShowPaypal] = useState(false);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    input.firstName.length !== 0 &&
    input.lastName.length !== 0 &&
    input.address.length !== 0 &&
    input.email.includes("@")
      ? setShowPaypal(true)
      : setShowPaypal(false);
  }, [showPaypal, input]);

  const onSubmit = async (e, value) => {
    e.preventDefault();

    if (
      input.firstName.length === 0 ||
      input.lastName.length === 0 ||
      input.address.length === 0
    ) {
      setShowPaypal(false);
      return swal("Aviso!", "Todos los datos son obligatorios", "warning");
    }
    if (!input.email.includes("@")) {
      setShowPaypal(false);
      return swal("Aviso!", "Ingrese un Email valido", "warning");
    }

    await axios.put(`http://localhost:3001/order/orders/${id}`, {
      firstName: input.firstName,
      lastName: input.lastName,
      state: "cart",
      paymentDate: "mercadopago",
      address: input.address,
      email: input.email,
      phoneNumber: input.phoneNumber,
      totalPrice: total,
    });

    const urlMercadopago = await axios.post(
      "http://localhost:3001/cart/checkout",
      {
        title: "Pago AgroPlace",
        totalPrice: total,
      }
    );

    setUrl(urlMercadopago.data.url);
    window.location = urlMercadopago.data.url;
  };


  return (
    <ThemeProvider theme={theme}>
      <div className="container-payment">
        <Typography variant="h5"></Typography>
        <FormControl noValidate autoComplete="off">
          <TextField
            type="text"
            name="firstName"
            inputProps={{ className: classes.root }}
            onChange={handleChange}
            label="Nombre"
            variant="filled"
            style={{ marginBottom: 5 }}
            required
          />
          <TextField
            type="text"
            name="lastName"
            onChange={handleChange}
            label="Apellido"
            variant="filled"
            style={{ marginBottom: 5, width: 500 }}
            required
          />
          <TextField
            type="number"
            name="phoneNumber"
            label="Telefono de contacto:"
            variant="filled"
            onChange={handleChange}
            style={{ marginBottom: 5 }}
            required
          />
          <TextField
            type="text"
            name="address"
            onChange={handleChange}
            label="Dirección de envío:"
            variant="filled"
            style={{ marginBottom: 5 }}
            required
          />
          <TextField
            type="email"
            name="email"
            onChange={handleChange}
            label={"Email"}
            variant="filled"
            style={{ marginBottom: 5 }}
          />

          <h3> Total: ${total}</h3>

          <Button onClick={(e) => onSubmit(e, "mercadopago")}>
            Mercadopago
          </Button>

          {showPaypal ? (
            <Paypal dataClient={input} />
          ) : (
            <Button onClick={(e) => onSubmit(e, "paypal")}>Paypal</Button>
          )}
        </FormControl>
      </div>
    </ThemeProvider>
  );
};

export default FormPayment;
