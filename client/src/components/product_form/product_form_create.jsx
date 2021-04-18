import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../../scss/components/productsForm/_ProductFormCreate.scss';
import { postProduct } from '../../redux/reducerProductForms/actionsProductForms';
import axios from 'axios';

export default function Product_form_create(props) {
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
      alert('Se requiere al menos UNA categoría');
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

      alert(`El producto ${input.name} ha sido creado`);

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
    }
  };

  return (
    <div className="containerProdFormCreate">
      <h1>Agregar productos</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="cont-1">
          <label className="label">Nombre del producto:</label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Nombre..."
            value={input.name}
            required
            onChange={handleChange}
          />

          <label className="label">SKU:</label>
          <input
            type="text"
            name="SKU"
            autoComplete="off"
            placeholder=" SKU..."
            value={input.SKU}
            required
            onChange={handleChange}
          />

          <label className="label">Precio por unidad:</label>
          <input
            type="number"
            min="1"
            max="99999"
            name="price"
            autoComplete="off"
            placeholder="Precio..."
            value={input.price}
            required
            onChange={handleChange}
          />

          <label className="label">Descripción:</label>
          <textarea
            name="description"
            value={input.description}
            required
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
            <progress value={progress} max="100"></progress>
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

          <label className="label">Stock:</label>
          <input
            type="number"
            min="0"
            max="9999"
            name="stock"
            autoComplete="off"
            placeholder=" Agregar stock..."
            value={input.stock}
            required
            onChange={handleChange}
          />

          <button type="submit">Crear producto</button>
        </div>
      </form>

      <NavLink to="/user/info">
        <button>Volver</button>
      </NavLink>
    </div>
  );
}
