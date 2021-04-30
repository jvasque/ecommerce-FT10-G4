import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { PostDoubleAuth } from "../../redux/loginReducer/loginActions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
    //// enviar a redux
    dispatch(PostDoubleAuth(secret));
  };

  return (
    // <div>
    // <form onSubmit={secretSubmit}>
    //     <input name='secret' type='number' onChange={secretChange}></input>
    //     <button type='submit'>enviar</button>
    //     </form>
    // </div>
    <div>      
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
              <input
                id="transition-modal-description"
                name="secret"
                type="number"
                onChange={secretChange}
              ></input>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default DoubleAuth;
