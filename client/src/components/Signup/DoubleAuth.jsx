import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { LogFailHandle, PostDoubleAuth } from "../../redux/loginReducer/loginActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid  #378A19",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& > *": {
      margin: theme.spacing(),
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  buttonsend: {
    marginLeft: "25px",
    color: "white",
    padding: "15px",
  },
}));

const DoubleAuth = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [secret, setSecret] = useState("");
  const dispatch = useDispatch();
  
  const secretChange = (e) => {
    setSecret(e.target.value);
    
  };

  const secretSubmit = (e) => {
    e.preventDefault();
    dispatch(PostDoubleAuth(secret));
 
  };


  const login = useSelector(state => state.loginReducer)
  useEffect(() => {
    // console.log(login.errorLogin)
    if (login.errorLogin) {
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: login.error,
        confirmButtonColor: '#378a19',
      });
      dispatch(LogFailHandle());
    }
  }, [login.errorLogin])

  return (
    // <div>
    // <form onSubmit={secretSubmit}>
    //     <input name='secret' type='number' onChange={secretChange}></input>
    //     <button type='submit'>enviar</button>
    //     </form>
    // </div>
    <div>
      <Button        
        className={classes.buttonsend}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Verificar codigo
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              Ingresa tu codigo de autenticación.
            </h2>
            <form onSubmit={secretSubmit}>
              <TextField
                id="outlined-password-input"
                label="Codigo secreto"
                name="secret"
                type="text"
                variant="outlined"
                onChange={secretChange}
              />             
              <Button
                type="submit"
                className={classes.buttonsend}
                variant="contained"
                color="primary"
              >
                Enviar
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default DoubleAuth;
