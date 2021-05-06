import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  putProduct,
  clearProduct,
} from "../../redux/reducerProductForms/actionsProductForms";
import axios from "axios";
import swal from "sweetalert";
import "../../scss/components/productsForm/_ProductFormStock.scss";

//MATERIA UI
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import Fade from "@material-ui/core/Fade";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
//action locations
import { getCenters } from "../../redux/locationReducer/locationActions.js";
import { getProductName } from "../../redux/reducerProductForms/actionsProductForms";
import Swal from "sweetalert2";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "rgba(69, 161, 74, 1)",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:focus": {
      outline: "none",
      border: "none",
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  button: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalButton: {
    color: "#fff",
    fontWeight: "bold",
    margin: "5px 10px",
  },
  addButton: {
    color: "#fff",
    marginLeft: "200px",
    fontWeight: "bold",
  },
  option: {
    cursor: "pointer",
    "&:hover": {
      background: "#eee",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginLeft: "200px",
    },
  },
  modalTextField: {
    width: "100%",
  },
  h1title: {
    display: "flex",
    justifyContent: "center",
  },
}));

function Product_form_stock(props) {
  const product = useSelector((state) => state.reducerProductForms.product);

  const [locations, setLocations] = useState([]);
  const [addLocationId, setAddLocationId] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modifStock, setModifStock] = useState([]);
  const [open, setOpen] = useState(false);
  const [positionArr, setPositionArr] = useState("");

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(getProductName(product[0]?.name));
    dispatch(getCenters());
    if (product[0]?.unitsOnLocations) {
      setLocations(
        product[0].unitsOnLocations?.map((e) => {
          return {
            place: `${e.location.address} - ${e.location.city} - ${e.location.province} - ${e.location.country}`,
            stock: e.unitsOnStock,
            id: e.location.id,
            productId: e.product.id,
          };
        })
      );
    }
  }, [dispatch]);
  const locationsLoaded = useSelector(
    (state) => state.locationReducer.centersLoaded
  );
  let ids = locations.map((e) => e.id);
  let locationsSelect = locationsLoaded.filter((e) => !ids.includes(e.id) && e);

  const addProduct = async function (event) {
    event.preventDefault();
    const res = await axios.put(
      "http://localhost:3001/locations/addproduct/" + addLocationId[0],
      {
        productId: product[0]?.id /* unitsOnLocations?.map((e) => e.id) */,
      }
    );

    function later(delay) {
      return new Promise(function (resolve) {
        setTimeout(resolve, delay);
      });
    }

    Promise.all([
      dispatch(getProductName(product[0]?.name)),
      handleToggle(),
      later(1500),
    ]).then((e) => {
      window.location.reload();
      handleToggle();
    });
  };

  const addNewStock = async function (event, id) {
    event.preventDefault();
    console.log(product, modifStock, id);
    handleCloseModal()
    const res = await axios.put(
      "http://localhost:3001/locations/unitsonlocation/" + id,
      {
        productId: product[0].id /* unitsOnLocations?.map((e) => e.id) */,
        stock: modifStock,
      }
    );
    swal("Producto modificado !").then((e) => {
      Promise.all([
        dispatch(getProductName(product[0].name)),
        // handleToggle(),
      ]).then((e) => {
        // ;
        handleCloseModal()
        // 
 
    

        
      })
    });

     // //NEWSLETTER
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    // 
    swalWithBootstrapButtons
      .fire({
        title: "Desea enviar una notificación a los usuarios?",
        text: "Los usuarios seran notificados del nuevo stock!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        reverseButtons: true,
        cancelButtonColor: "#378a19",
        confirmButtonColor: "#378a19",
      })
      .then(async (result) => {
        handleToggle()
        if (result.isConfirmed) {
          const info = await axios.post(
            "http://localhost:3001/newsletter/stock",
            {
              productId: product[0].id,
              motive: "information",
              locationId: id,
            }
            
          );
          // handleToggle()
          window.location.reload()
          swalWithBootstrapButtons.fire(
            "Listo!",
            `${info.data.message}`,
            "success"
          );
        
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "No se guardaron los cambios",
            "error"
          );
          window.location.reload()
        }
       
      });
    ////
  
  };

  const removeProduct = async function (event, locationId, productId) {
    event.preventDefault();

    swal({
      title: "Está seguro de borrar el producto seleccionado?",
      text: "Una vez borrado, desaparecerá de su base de datos!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await axios.delete(
          "http://localhost:3001/locations/removeproduct/" + locationId,
          {
            data: {
              productId: productId,
            },
          }
        );
        function later(delay) {
          return new Promise(function (resolve) {
            setTimeout(resolve, delay);
          });
        }
        Promise.all([
          dispatch(getProductName(product[0].name)),
          handleToggle(),
          later(1500),
        ]).then((e) => {
          window.location.reload();
          handleToggle();
        });
      } else {
        swal("El producto NO fue borrado");
      }
    });
  };

  const addLocation = (e) => {
    if (!e.target.value) return;
    setAddLocationId([parseInt(e.target.value)]);
  };

  const handleOpenModal = (i) => {
    setPositionArr(i);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const newStock = (e) => {
    e.preventDefault();
    setModifStock(parseInt(e.target.value));
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="containerProdFormStock">
      <h1 className="title">Administración del stock</h1>
      <div className="selectDiv">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            Seleccionar locación
          </InputLabel>
          <Select onChange={(e) => addLocation(e)} className="select">
            {locationsSelect?.map((e) => {
              return (
                <option
                  value={e.id}
                  className={classes.option}
                  inputProps={{
                    name: `${e.address} - 
                  ${e.city} - 
                  ${e.province} - 
                  ${e.country}`,
                  }}
                >
                  {`${e.address} - ${e.city} - 
              ${e.province} - ${e.country}`}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className={classes.addButton}
          startIcon={<AddBoxIcon />}
          onClick={(e) => addProduct(e)}
        >
          Agregar centro de distribución
        </Button>
      </div>
      <TableContainer component={Paper} style={{ width: "85%" }}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Locación </StyledTableCell>
              <StyledTableCell align="center">Stock</StyledTableCell>
              <StyledTableCell align="center">Opciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations?.length > 0 &&
              locations.map((e, i) => {
                return (
                  <StyledTableRow key={e.place}>
                    <StyledTableCell component="th" scope="row">
                      {e.place}
                    </StyledTableCell>
                    <StyledTableCell align="center">{e.stock}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        style={{ margin: "0 15px 0 0" }}
                        onClick={(event) =>
                          removeProduct(event, e.id, e.productId)
                        }
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<EditIcon />}
                        onClick={() => handleOpenModal(i)}
                      >
                        Editar
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              className={classes.modal}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              disableBackdropClick={true}
              disableEscapeKeyDown={true}
            >
              <Fade in={openModal}>
                <div className={classes.paper}>
                  <h2 id="simple-modal-title" className={classes.h1title}>
                    Elija el nuevo stock
                  </h2>
                  <TextField
                    id="outlined-number"
                    label="Nuevo stock"
                    type="number"
                    className={classes.modalTextField}
                    onChange={(e) => {
                      newStock(e);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <div className="modalButtons">
                    <Button
                      className={classes.modalButton}
                      onClick={(ev) =>
                        addNewStock(ev, locations[positionArr]?.id)
                      }
                      variant="contained"
                      color="primary"
                    >
                      Modificar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.modalButton}
                      onClick={() => setOpenModal(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </Fade>
            </Modal>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        style={{
          height: "54px",
          textAlign: "center",
          justifySelf: "center",
          margin: "8px",
        }}
        onClick={() => dispatch(clearProduct())}
      >
        <NavLink
          to="/admin/product/form/query"
          style={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}
        >
          Volver
        </NavLink>
      </Button>
      <Backdrop
        className={classes.backdrop}
        open={open} /* onClick={handleClose} */
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Product_form_stock;
