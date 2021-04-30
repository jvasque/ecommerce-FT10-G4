import axios from "axios"
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../../scss/components/Admin/_ResetPassword.scss";
import Swal from "sweetalert2";

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

const EmailPassword = () => {

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  ///validate
  function validateMail(mail) {
    let errors = "";
    if (mail.length > 1) {
      errors = "Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(mail)) {
      errors = "Email no es valido";
    }
    return errors;
  }
  ////////

  const emailChange = (e) => {
    setEmail(e.target.value);
    setError(validateMail(e.target.value));
  };
  const emailSubmit = async (e) => {
    e.preventDefault();
    if (/\S+@\S+\.\S+/.test(email)) {
      try {
        await axios.post(
          "http://localhost:3001/auth/forgot/email",
          {
            email: email,
          }
        );
        Swal.fire({
          title: "Favor siga las instrucciones que hemos enviado!",
          confirmButtonColor: "#378a19",
        });
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Este correo no se encuentra en tus registros",
          confirmButtonColor: "red",
        });
      }
    }
  };

  return (
    <div className="container-reset">
      <div className="container-todo">
        <div className="container-title-reset">
          <Typography variant="h6" color="primary" gutterBottom>
            Favor ingrese su correo electronico, se enviara un mensaje con
            instrucciones para reestablecer su contrseña
          </Typography>
        </div>
        <div>
          <form className="cointainer-form-reset" onSubmit={emailSubmit}>
            <TextField
              classname={classes.input}
              margin="dense"
              id="filled-basic"
              label="email"
              name="email"
              error={
                /\S+@\S+\.\S+/.test(email) || email.length === 0 ? false : true
              }
              value={email}
              helperText={
                /\S+@\S+\.\S+/.test(email) || email.length === 0 ? "" : error
              }
              onChange={emailChange}
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

export default EmailPassword;