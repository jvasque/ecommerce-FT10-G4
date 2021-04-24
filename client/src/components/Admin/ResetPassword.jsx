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

const ResetPassword = () => {
  const { token } = useParams();
  const classes = useStyles();
  const [password, setPassword] = useState("");

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const passwordSubmit = async (e) => {
    e.preventDefault();

    try {
      const post = await axios.post(
        "http://localhost:3001/auth/reset",
        { password: password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(post.data);
    } catch (e) {
      console.log(e);
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
      <div >
        <form  className="cointainer-form-reset" onSubmit={passwordSubmit}>
          <div className="container-input-reset">
         
            <TextField
              classname={classes.input}
             
              id="filled-basic"
              label="Contrseña"
              name="password"
              onChange={passwordChange}
            />
            <TextField
              classname={classes.input}
              id="filled-basic"
              label="Repita Contrseña"
              name="password"
              onChange={passwordChange}
            />
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
    </div>
  );
};

export default ResetPassword;
