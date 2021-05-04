import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  putProduct,
  clearProduct,
} from "../../redux/reducerProductForms/actionsProductForms";
import "../../scss/components/productsForm/_ProductFormUpdate.scss";
import swal from "sweetalert";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, CircularProgress, Button } from "@material-ui/core";

const grisPrincipal = "#EFEFEF";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "40px auto",
      width: "80%",
      background: grisPrincipal,
      color: "black",
    },
  },
  button: {
    margin: "10px",
    color: "white",
    padding: "10px",
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    color: "red",
    marginTop: "15px",
    marginBottom: "15px",
  },
  inputDescription: {
    padding: "0px",
    width: "95%",
    marginTop: "15px",
    marginBottom: "15px",
  },
  cancelIcon: {
    color: "rgb(245, 59, 26)",
    backgroundColor: grisPrincipal,
    cursor: "pointer",
    borderRadius: "50%",
  },
}));

function Product_form_update(props) {
  const classes = useStyles();

  const product = useSelector((state) => state.reducerProductForms.product);

  const [category, setCategory] = useState([]);
  const [modifProduct, setModifProduct] = useState([]);

  const [input, setInput] = useState({
    id: "",
    name: "",
    SKU: "",
    price: "",
    description: "",
    stock: "",
    selectCategory: "",
  });
  const [resPic, setResPic] = useState(product[0]?.picture || []);
  const [pic, setPic] = useState();
  const [progress, setProgress] = useState();

  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dxy0hg426/image/upload";
  const CLOUDINARY_UPLOAD_PRESET = "iyqdnelg";

  const dispatch = useDispatch();

  useEffect(() => {
    async function categories() {
      const data = await axios.get("http://localhost:3001/allCategories");
      setCategory(data.data);
    }
    if (product[0]) {
      setModifProduct(product[0].categories);
    }

    categories();
    //SE VIENEEEEEEEE
    const formData = new FormData();
    formData.append("file", pic);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const fetchImg = (async function () {
      const res = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress(e) {
          setProgress((e.loaded * 100) / e.total);
        },
      });
      setResPic([...resPic, res.data.secure_url]);
    })();
  }, [product, pic]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const deleteCategory = (e) => {
    e.preventDefault();
    setModifProduct(modifProduct.filter((x) => x.id != e.target.value));
  };
  const addCategory = (e) => {
    if (!e.target.value) return;
    let aux = modifProduct.map((e) => e.id);
    if (aux.includes(e.target.value) || aux.includes(parseInt(e.target.value)))
      return swal("Aviso!", "La categoria se encuentra seleccionada", "info");
    setModifProduct([
      ...modifProduct,
      {
        name: e.target[e.target.selectedIndex].text,
        id: e.target.value,
      },
    ]);
  };

  const handleChangeImg = (e) => {
    setPic(e.target.files[0]);
  };

  const handleDeleteImg = (e) => {
    e.preventDefault();
    setResPic(resPic.filter((i) => i != e.target.name));
  };

  const handleSubmit = async function (event) {
    event.preventDefault();
    let categoriesIds = modifProduct.map((e) => e.id);

    dispatch(
      putProduct(
        product[0]?.id,
        input.name,
        input.SKU,
        input.price,
        input.description,
        resPic,
        input.stock,
        categoriesIds
      )
    );

    setModifProduct([]);
    setInput({
      name: "",
      SKU: "",
      price: "",
      description: "",
      stock: "",
    });
    swal(
      "Éxito",
      `El producto ${input.name} ha sido modificado`,
      "success"
    ).then((e) => {
      dispatch(clearProduct());
      window.location.reload();
      window.location.replace("http://localhost:3000/admin/product/form/query");
    });
  };

  return (
    <div className="containerProdFormUpdate">
      <h1>Modificar productos</h1>
      <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
        <div className="cont-1">
          <label className="label">Nombre del producto:</label>

          <TextField
            id="outlined-basic"
            label={product[0]?.name || " Nombre"}
            placeholder="Agregue el nuevo nombre del producto..."
            variant="outlined"
            name="name"
            value={input.name}
            type="text"
            onChange={handleChange}
            className={classes.input}
          />

          <label className="label">SKU:</label>

          <TextField
            id="outlined-basic"
            label={product[0]?.SKU || " SKU"}
            placeholder="Agregue el nuevo SKU del producto..."
            variant="outlined"
            name="SKU"
            value={input.SKU}
            onChange={handleChange}
            className={classes.input}
          />

          <label className="label">Precio por unidad:</label>

          <TextField
            id="outlined-basic"
            label={product[0]?.unitPrice || " Precio..."}
            placeholder="Agregue el nuevo precio del producto..."
            variant="outlined"
            name="price"
            value={input.price}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 99999 } }}
            onChange={handleChange}
            className={classes.input}
          />

          <label className="label">Descripción:</label>
          <textarea
            className="textareaDescription"
            name="description"
            placeholder={product[0]?.description || " Descripción..."}
            value={input.description}
            onChange={handleChange}
          />

          <label className="label">Imagen:</label>
          {resPic.length > 2 ? (
            <div className="input_file_full">
              <label className="input_text">
                Ya se agregaron tres archivos
              </label>
              <input type="file" id="pic" disabled="true" />
            </div>
          ) : (
            <div className="input_file">
              <label className="input_text">Agregar archivo</label>
              <input
                type="file"
                id="pic"
                onChange={(e) => handleChangeImg(e)}
              />
            </div>
          )}

          <div className="img-card-pic">
            {resPic?.map((i) => (
              <div className="img-card-pic-interno">
                <img src={i} />
                <input
                  type="submit"
                  value="x"
                  className="boton"
                  name={i}
                  onClick={(e) => handleDeleteImg(e)}
                />
              </div>
            ))}
            {progress != 100 && (
              <CircularProgress
                className="circular"
                variant="determinate"
                value={progress}
              />
            )}
          </div>

          <TextField
            id="outlined-basic"
            label={product[0]?.unitsOnStock || " Stock..."}
            placeholder="Agregue el nuevo stock del producto"
            variant="outlined"
            name="stock"
            value={input.stock}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 99999 } }}
            onChange={handleChange}
            className={classes.input}
          />

          {modifProduct?.map((x) => (
            <label>
              {x.name + "  "}
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                value={x.id}
                onClick={(e) => deleteCategory(e)}
              >
                x
              </Button>
            </label>
          ))}
          <select onChange={(e) => addCategory(e)}>
            <option value=""> seleccionar ...</option>
            {category.map((x) => {
              return (
                <option key={x.name} name={x.name} value={x.id}>
                  {x.name}
                </option>
              );
            })}
          </select>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Modificar producto
          </Button>
        </div>
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

export default Product_form_update;
