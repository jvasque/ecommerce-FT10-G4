import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  putProduct,
  clearProduct,
} from "../../redux/reducerProductForms/actionsProductForms";
import swal from "sweetalert";
import "../../scss/components/productsForm/_ProductFormStock.scss";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import EditIcon from "@material-ui/icons/Edit";

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function Product_form_stock(props) {
  const product = useSelector((state) => state.reducerProductForms.product);

  const [locations, setLocations] = useState([]);

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (product[0]?.unitsOnLocations) {
      setLocations(
        product[0].unitsOnLocations?.map((e) => {
          return {
            place: `${e.location.address} - ${e.location.city} - ${e.location.province} - ${e.location.country}`,
            stock: e.unitsOnStock,
            id: e.location.id
          };
        })
      );
    }
  }, []);
  return (
    <div className="containerProdFormStock">
      <h1>Administración del stock</h1>

      <TableContainer component={Paper} style={{ width: "85%" }}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Locacion </StyledTableCell>
              <StyledTableCell align="center">Stock</StyledTableCell>
              <StyledTableCell align="center">Opciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations?.length > 0 &&
              locations.map((e) => {
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
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<EditIcon />}
                      >
                        Editar
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
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
          style={{ textDecoration: "none", color: "#fff" }}
        >
          Volver
        </NavLink>
      </Button>
    </div>
  );
}

export default Product_form_stock;
