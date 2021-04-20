import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
//import {  } from "react-router";
import { NavLink, useHistory } from "react-router-dom";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

const FormPayment = () => {
  const history = useHistory();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    address: "",   
  });
  const [id, setId] = useState(0);

  const total = useSelector((state) => state.cartReducer.total);
  const user = useSelector((state) => state.loginReducer.user);
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    async function getId() {
      let data = await axios.get("http://localhost:3001/order/users/orders/");
      setId(await data.data[0]?.id);
    
    }
    
    getId();

  }, []);

  const onSubmit = async (e) => {
    console.log('onsubmit')
    e.preventDefault();
    await axios.put(`http://localhost:3001/order/orders/${id}`, {
      firstName: input.firstName,
      lastName: input.lastName,
      state: "processing",
      paymentDate: "pending",
      address: input.address,
      email: input.email ||user.email,
      totalPrice: total,
    });
     history.push("/user/cart/order/");
  };

  return (
    <div>
      <Typography variant="h5">
        Nombres y Apellidos : {user.firstName} {user.lastName}
      </Typography>
      <FormControl className="" noValidate autoComplete="off">
        <TextField
          type="number"
          name="phoneNumber"
          label="Telefono de contacto:"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          type="text"
          name="address"
          onChange={handleChange}
          label="Dirección de envío:"
          variant="outlined"
        />
        <TextField
          type="email"
          name="email"
          onChange={handleChange}
          label="Email"
          variant="outlined"
          placeholder = {user.email}
        />

        <Typography>Precio Total: {total}</Typography>
       
        <TextField
          type="submit"
          value="Pagar"
          variant="outlined"
          onClick={onSubmit}
        />
         
      </FormControl>
      <NavLink to="/product/cart">
        <TextField type="submit" value="Volver" variant="outlined" />
      </NavLink>
    </div>
  );
};

export default FormPayment;
