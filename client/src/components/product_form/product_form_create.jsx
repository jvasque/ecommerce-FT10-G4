import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../../scss/components/productsForm/_ProductFormCreate.scss';
import { postProduct } from '../../redux/reducerProductForms/actionsProductForms';
import axios from 'axios';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, CircularProgress } from '@material-ui/core';

const grisPrincipal= "#EFEFEF";

const useStyles = makeStyles((theme) => ({
  
  root: {
    '& > *': {
      margin: "40px auto",
      width: '80%',
      background: grisPrincipal,
      color: "black" 
    },
  },
  input: {
    
    width: "90%",
    color: "red",
    marginTop: "15px",
    marginBottom: "15px"
    
  }
}));






export default function Product_form_create(props) {
  const classes = useStyles();
  const [input, setInput] = useState({
    name: '',
    SKU: '',
    price: '',
    description: '',
    categoryCheck: [],
    stock: '',
  });
  const [resPic, setResPic] = useState([]);
  const [pic, setPic] = useState();
  const [progress, setProgress] = useState();

  const CLOUDINARY_URL =
    'https://api.cloudinary.com/v1_1/dxy0hg426/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'iyqdnelg';

  useEffect(() => {
    const formData = new FormData();
    formData.append('file', pic);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const fetchImg = (async function () {
      const res = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress(e) {
          console.log(e.loaded);
          setProgress((e.loaded * 100) / e.total);
        },
      });
      setResPic([...resPic, res.data.secure_url]);
    })();
  }, [pic]);

  const handleChangeImg = (e) => {
    setPic(e.target.files[0]);
  };

  const handleDeleteImg = (e) => {
    e.preventDefault();
    setResPic(resPic.filter((i) => i != e.target.name));
  };

  const dispatch = useDispatch();
  const category = useSelector(
    (state) => state.categoryFilterReducer.categories
  );

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryCheck = function (e) {
    if (e.target.checked) {
      setInput({
        ...input,
        categoryCheck: [...input.categoryCheck, e.target.value],
      });
    } else {
      setInput({
        ...input,
        categoryCheck: input.categoryCheck.filter(
          (category) => category !== e.target.value
        ),
      });
    }
  };

  const handleSubmit = function (event) {
    event.preventDefault();
    if (input.categoryCheck.length === 0) {
      swal('Aviso!','Se requiere al menos UNA categoría', 'warning');
    } else {
      dispatch(
        postProduct(
          input.name,
          input.SKU,
          input.price,
          input.description,
          resPic,
          input.categoryCheck,
          input.stock
        )
      );

      
      setInput({
        name: '',
        SKU: '',
        price: '',
        description: '',
        pic: '',
        categoryCheck: [],
        stock: '',
      });
      setPic('');
      setResPic([]);
      
      let inputs = document.querySelectorAll('input[type=checkbox]');
      inputs.forEach((item) => {
        item.checked = false;
      });
      swal('Éxito!',`El producto ${input.name} ha sido creado`, 'success');
    }
  };

  return (
    <div className="containerProdFormCreate">
      <h1>Agregar productos</h1>
      <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
        <div className="cont-1">
          
          <TextField 
          id="outlined-basic" 
          label="Nombre" 
          placeholder="Agregue el nombre del producto..."
          variant="outlined"
          name="name"
          value={input.name} 
          type="text"
          required 
          onChange={handleChange}
          className={classes.input}/>
         
          <TextField 
          id="outlined-basic" 
          label="SKU" 
          placeholder="Agregue el SKU del producto..."
          variant="outlined"
          name="SKU" value={input.SKU}
          required onChange={handleChange}
          className={classes.input}/>


          <TextField 
          id="outlined-basic" 
          label="Precio" 
          placeholder="Agregue el precio del producto..."
          variant="outlined"
          name="price" 
          value={input.price} 
          type="number"
          InputProps={{ inputProps: { min: 0, max: 99999 } }}
          required 
          onChange={handleChange}
          className={classes.input}/>

          <TextField 
          id="outlined-basic" 
          label="Descripción..." 
          variant="outlined"
          name="description"
          value={input.description} 
          type="text"
          required 
          onChange={handleChange}
          className={classes.input}/>

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
                className="inputFile"
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
            {progress != 100 && <CircularProgress className="circular" variant="determinate" value={progress}/>}
          </div>

          <label className="label">Categoria:</label>
          <div className="categoryBoxes">
            {category &&
              category.map((c) => {
                return (
                  <div key={c.name}>
                    <label>{c.name}</label>
                    <input
                      type="checkbox"
                      value={c.name}
                      onChange={(e) => handleCategoryCheck(e)}
                    />
                  </div>
                );
              })}
          </div>
        
          <TextField 
          id="outlined-basic" 
          label="Stock"
          placeholder="Agregue el stock del producto" 
          variant="outlined"
          name="stock" 
          value={input.stock} 
          type="number"
          InputProps={{ inputProps: { min: 0, max: 99999 } }}
          required 
          onChange={handleChange}
          className={classes.input}/>

          <button type="submit">Crear producto</button>
        </div>
      </form>

      <NavLink to="/user/info">
        <button>Volver</button>
      </NavLink>
    </div>
  );
}
