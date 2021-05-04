import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  getProductName,
  deleteProduct,
  clearProduct,
} from "../../redux/reducerProductForms/actionsProductForms";
import "../../scss/components/productsForm/_ProductFormQuery.scss";
import ProductCard from "../ProductCard/ProductCard";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: "10px",
    color: "white",
    padding: "10px",
    fontWeight: "bold",
  },
}));

function Product_form_query(props) {
  const [name, setName] = useState("");
  const [product, setProduct] = useState([]);
  const classes = useStyles();

  const dispatch = useDispatch();

  const productGlobal = useSelector(
    (state) => state.reducerProductForms.product
  );

  useEffect(() => {
    setProduct(productGlobal);
    async function alerting() {
      if (productGlobal[0]?.error) {
        swal("Oops!", "No existe un producto con ese nombre", "error");
      }
    }
    alerting();
  }, [productGlobal, dispatch]);

  function handleQuery(name, event) {
    event.preventDefault();
    if (!name)
      return swal("Advertencia", "No lo se Rick, parece vacio", "warning");
    dispatch(getProductName(name));
  }

  function handlerPreventButton(e) {
    if (!product[0] || product[0]?.error) {
      e.preventDefault();
      return swal("Oops!", "No hay un producto seleccionado", "warning");
    }
  }

  function handleDelete(e) {
    if (!product[0] || product[0]?.error) {
      e.preventDefault();
      return swal("Oops!", "No hay un producto seleccionado", "warning");
    }
    e.preventDefault();
    swal({
      title: "Está seguro de borrar el producto seleccionado?",
      text: "Una vez borrado, desaparecerá de su base de datos!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProduct(product[0]?.id));
        dispatch(clearProduct());
        swal("Su producto fue borrado con éxito!", {
          icon: "success",
        }).then((e) => window.location.reload());
      } else {
        swal("El producto NO fue borrado");
      }
    });
  }

  return (
    <div className="containerProdFormQuery">
      <h1>Consultar producto</h1>
      <form>
        <div className="cont-1">
          <label className="label">Nombre del producto:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Nombre . . . "
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={(e) => {
            handleQuery(name, e);
          }}
        >
          Consultar producto
        </Button>
        <NavLink to="/admin/product/form/update">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={(e) => {
              handlerPreventButton(e);
            }}
          >
            Modificar
          </Button>
        </NavLink>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={(e) => {
            handleDelete(e);
          }}
        >
          Eliminar
        </Button>

        {product[0]?.name &&
          product.map((prod) => {
            return <ProductCard product={prod}></ProductCard>;
          })}

        {product && product[0]?.error && (
          <h1>El producto solicitado no existe</h1>
        )}
      </form>
      <NavLink to="/user/info">
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => dispatch(clearProduct())}
        >
          Volver
        </Button>
      </NavLink>
    </div>
  );
}

export default Product_form_query;
