import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button, colors, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "../../scss/components/FormPayment/_FormPayment.scss";
import { NavLink, useHistory } from "react-router-dom";
import swal from "sweetalert";
import {
  FormControl,
} from "@material-ui/core";
import {makeStyles, createMuiTheme, ThemeProvider} from "@material-ui/core/styles"


const useStyles = makeStyles({
  root: {
    borderColor: "green",
    fontWeight: 525,
  },
  buttns : {
    border: "none",
    color: "green"
  }
 

})

const theme = createMuiTheme({
  palette: {
    primary: {
      main:  "rgba(47, 126, 19, 1)"
    }
  },
 
})


const FormPayment = () => {
  
  const classes = useStyles()

  const history = useHistory();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: 0,
  });
  const [url, setUrl] = useState("");
  const id = JSON.parse(localStorage.getItem("user"));

  const total = useSelector((state) => state.cartReducer.total);
 
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      input.firstName.length === 0 ||
      input.lastName.length === 0 ||
      input.address.length === 0
    ) {
      return swal("Aviso!", "Todos los datos son obligatorios", "warning");
    
    }
    console.log(input);
    await axios.put(`http://localhost:3001/order/orders/${id}`, {
      firstName: input.firstName,
      lastName: input.lastName,
      state: "cart",
      paymentDate: "Mercadopago",
      address: input.address,
      email: input.email,
      phoneNumber: input.phoneNumber,
      totalPrice: total,
    });
    //history.push("/user/cart/order/");
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

  // const returnToCart = (e) => {
  //   e.preventDefault();
  //   dispatch(returnProductCart(user, id, total));
  //   history.push("/product/cart");
  // };
  

  return (
    <ThemeProvider theme={theme}>
    <div className="container-payment">
      <Typography variant="h5"></Typography>
      <FormControl  noValidate autoComplete="off">
        <TextField
          type="text"
          name="firstName"
          inputProps= {{className: classes.root}}
          onChange={handleChange}
          label="Nombre"
          variant="filled"
          style={{ marginBottom: 5}}
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

        <h3 > Total: ${total}</h3>

      <Button onClick={onSubmit}>Pagar</Button>
      </FormControl>

      
      
    </div>
    </ThemeProvider>
  );
};
//<Button className="test" onClick={()=>{ history.push("/product/cart")}} >Volver</Button>

export default FormPayment;
