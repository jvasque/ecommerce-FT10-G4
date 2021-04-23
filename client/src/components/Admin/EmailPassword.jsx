import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../../scss/components/Admin/_ResetPassword.scss";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    height: "2.5em",
    marginLeft: "1em",
    marginTop: "0.6em"
  },
  input: {
   fullWidth: true
  },
}));

const EmailPassword = () => {
  
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const emailSubmit = async (e) => {
    e.preventDefault();

    try {
      const post = await axios.post(
        "http://localhost:3001/auth/forgot/email",
        { email: email },
      );
      console.log(post.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container-reset">
      <div className="container-title-reset">
        <Typography variant="h6" color="primary" gutterBottom>
          Favor ingrese su correo electronico, se enviara un correo con las instrucciones para reestablecer su contrseña
        </Typography>
      </div>
      <div >
        <form  className="cointainer-form-reset" onSubmit={emailSubmit}>
          <div className="container-input-reset">
         
            <TextField
              classname={classes.input}
             
              id="filled-basic"
              label="Contrseña"
              name="password"
              onChange={emailChange}
            />
            {/* <TextField
              classname={classes.input}
              id="filled-basic"
              label="Contrseña"
              name="password"
              onChange={passwordChange}
            /> */}
          </div>
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
  );
};

export default EmailPassword;