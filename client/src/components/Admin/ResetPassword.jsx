import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../../scss/components/Admin/_ResetPassword.scss";
import Swal from "sweetalert2";

import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    height: "2.5em",
    marginLeft: "1em",
    marginTop: "0.6em",
  },
  input: {
    fullWidth: true,
  },
}));

const ResetPassword = () => {
  const { token } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [input, setInput] = useState({
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    repeatPassword: "",
  });
  //validate
  function validatePassword(input) {
    let errors = {};
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
        input.password
      )
    ) {
      errors.password = "Contraseña no es valida";
    }
    if (input.password !== input.repeatPassword) {
      errors.repeatPassword = "Las contraseñas no coinciden";
    }
    return errors;
  }
  //////
  const passwordChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validatePassword({
        ...errors,
        [e.target.name]: e.target.value,
      })
    );
  };
  
  const passwordSubmit = async (e) => {
    e.preventDefault();
if(input.password === input.repeatPassword){
  try{
    const post = await axios.post(
      "http://localhost:3001/auth/reset",
      { password: input.password },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    Swal.fire({
      title: "¡Su contraseña ha sido modificada con éxito!",
      confirmButtonColor: "#378a19",
    });
    history.push({
      pathname: "/user/login",
    });
    console.log(post.data);
  } catch(e){
    Swal.fire({
      icon: "error",
      title: "algo ha salido mal, favor vuelve a pedir una solicitud para cambiar contraseña",
      confirmButtonColor: "red",
    });
    history.push({
      pathname: "/forgot/email",
    });
  }
   
  }
  };

  return (
    <div className="container-reset">
      <div className="container-todo">
        <div className="container-title-reset">
          <Typography variant="h6" color="primary" gutterBottom>
            Favor ingrese su nueva constraseña, esta debe contener al menos 8
            caraceteres, 1 minuscula, 1 mayuscula, 1 numero y 1 simbolo.
          </Typography>
        </div>
        <div>
          <form className="cointainer-form-reset" onSubmit={passwordSubmit}>
            <TextField
              classname={classes.input}
              type={"password"}
              id="filled-basic"
              label="Contrseña"
              name="password"
              margin="dense"
              required
              error={
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                  input.password
                ) || input.password.length < 8
                  ? false
                  : true
              }
              value={input.password}
              helperText={
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                  input.password
                )  || input.password.length < 8
                  ? ""
                  : errors.password
              }
              onChange={passwordChange}
            />
            <TextField
              classname={classes.input}
              type={"password"}
              label="Repita Contrseña"
              name="repeatPassword"
              margin="dense"
              error={input.repeatPassword === input.password || input.repeatPassword.length < 8? false : true}
              value={input.repeatPassword}
              helperText={
                input.repeatPassword === input.password || input.repeatPassword.length < 8
                  ? ""
                  : errors.repeatPassword
              }
              onChange={passwordChange}
            />

            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type={"submit"}
            >
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
