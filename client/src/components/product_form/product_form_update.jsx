import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { putProduct, clearProduct } from '../../redux/reducerProductForms/actionsProductForms';
import '../../scss/components/productsForm/_ProductFormUpdate.scss';
import swal from 'sweetalert';

function Product_form_update(props) {
  const product = useSelector((state) => state.reducerProductForms.product);

  const [category, setCategory] = useState([]);
  const [modifProduct, setModifProduct] = useState([]);

  const [input, setInput] = useState({
    id: '',
    name: '',
    SKU: '',
    price: '',
    description: '',
    stock: '',
    selectCategory: '',
  });
  const [resPic, setResPic] = useState([])
  const [pic, setPic] = useState()
  
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxy0hg426/image/upload"
  const CLOUDINARY_UPLOAD_PRESET = "iyqdnelg"

  const dispatch = useDispatch();

  useEffect(() => {
    async function categories() {
      const data = await axios.get('http://localhost:3001/allCategories');
      setCategory(data.data);
    }
    if (product[0]) {
      console.log(product[0], "EL PRODUCTOOOOOOOO");
      setModifProduct(product[0].categories);
      setInput({
        name: product[0].name,
        SKU: product[0].SKU,
        price: product[0].unitPrice,
        description: product[0].description,
        stock: product[0].unitsOnStock,
      });
      setResPic(product[0].picture)
    }

    categories();
    //SE VIENEEEEEEEE
    const formData = new FormData()
    formData.append("file", pic);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
    
    const fetchImg = async function(){

      const res = await axios.post(CLOUDINARY_URL, formData, {
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      setResPic([...resPic, res.data.secure_url])
     }()
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
      return swal('Aviso!', 'La categoria se encuentra seleccionada', 'info');
    setModifProduct([
      ...modifProduct,
      {
        name: e.target[e.target.selectedIndex].text,
        id: e.target.value,
      },
    ]);
    
  };

  const handleChangeImg =  (e) => {
    setPic(e.target.files[0]);
  }

  const handleDeleteImg =  (e) => {
  e.preventDefault()
  setResPic(resPic.filter((i) => i != e.target.name) );
  }

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
      name: '',
      SKU: '',
      price: '',
      description: '',
      stock: '',
    });
    swal(
      'Éxito',
      `El producto ${input.name} ha sido modificado`,
      'success'
    ).then((e) => {
      dispatch(clearProduct())
      window.location.reload();
      window.location.replace('http://localhost:3000/admin/product/form/query');
    });
  };

  return (
    <div className="containerProdFormUpdate">
      <h1>Modificar productos</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="cont-1">
          <label className="label">Nombre del producto:</label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            value={input.name}
            placeholder=" Nombre..."
            onChange={handleChange}
          />

          <label className="label">SKU:</label>
          <input
            type="text"
            name="SKU"
            autoComplete="off"
            value={input.SKU}
            placeholder=" SKU..."
            onChange={handleChange}
          />

          <label className="label">Precio por unidad:</label>
          <input
            type="number"
            name="price"
            autoComplete="off"
            placeholder=" Precio..."
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
          {resPic.length>2 ? 
          <input
          type="file"
          id="pic"
          disabled = "true"
          /> : 
          <input
          type="file"
          id="pic"
          onChange={(e) => handleChangeImg(e)}
          /> }
          
          <div className = "img-card-pic">
            {resPic?.map((i)=>(
            <div className = "img-card-pic-interno">
                 <img src ={i}/>
                 <input type= "submit" value = "x" className ="boton" name = {i} onClick={(e) => handleDeleteImg(e)}/>
              </div>
              ))}

          </div>

          <label className="label">Stock:</label>
          <input
            type="number"
            name="stock"
            autoComplete="off"
            placeholder=" Agregar stock..."
            value={input.stock}
            required
            onChange={handleChange}
          />

          {modifProduct?.map((x) => (
            <label>
              {x.name}
              <button value={x.id} onClick={(e) => deleteCategory(e)}>
                x
              </button>
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
          <button type="submit">Modificar producto</button>
        </div>
      </form>

      <NavLink to="/admin/product/form/query">
        <button onClick = {()=> dispatch(clearProduct())}>Volver</button>
      </NavLink>
    </div>
  );
}

export default Product_form_update;
