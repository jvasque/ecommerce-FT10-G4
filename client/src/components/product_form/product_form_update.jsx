import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { putProduct } from '../../redux/reducerProductForms/actionsProductForms';
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
    pic: '',
    stock: '',
    selectCategory: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    async function categories() {
      const data = await axios.get('http://localhost:3001/allCategories');
      setCategory(data.data);
    }
    if (product[0]) {
      setModifProduct(product[0].categories);
      setInput({
        name: product[0].name,
        SKU: product[0].SKU,
        price: product[0].unitPrice,
        description: product[0].description,
        pic: product[0].picture,
        stock: product[0].unitsOnStock,
      });
    }

    categories();
  }, [product]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const deleteCategory = (e) => {
    e.preventDefault();
    setModifProduct(modifProduct.filter((x) => x.categoryId != e.target.value));
  };
  const addCategory = (e) => {
    if (!e.target.value) return;
    let aux = modifProduct.map((e) => e.categoryId);
    if (aux.includes(e.target.value) || aux.includes(parseInt(e.target.value)))
      return swal('Aviso!', 'La categoria se encuentra seleccionada', 'info');
    setModifProduct([
      ...modifProduct,
      {
        name: e.target[e.target.selectedIndex].text,
        categoryId: e.target.value,
      },
    ]);
  };

  const handleSubmit = async function (event) {
    event.preventDefault();
    let categoriesIds = modifProduct.map((e) => e.categoryId);

    dispatch(
      putProduct(
        product[0]?.productId,
        input.name,
        input.SKU,
        input.price,
        input.description,
        input.pic,
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
      pic: '',
      stock: '',
    });
    swal(
      'Éxito',
      `El producto ${input.name} ha sido modificado`,
      'success'
    ).then((e) => {
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
            placeholder=" Nombre..."
            onChange={handleChange}
          />

          <label className="label">SKU:</label>
          <input
            type="text"
            name="SKU"
            autoComplete="off"
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
          <input
            type="text"
            name="img"
            autoComplete="off"
            placeholder=" Agregar url..."
            value={input.pic}
            required
            onChange={handleChange}
          />

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
              <button value={x.categoryId} onClick={(e) => deleteCategory(e)}>
                x
              </button>
            </label>
          ))}
          <select onChange={(e) => addCategory(e)}>
            <option value=""> seleccionar ...</option>
            {category.map((x) => {
              return (
                <option key={x.name} name={x.name} value={x.categoryId}>
                  {x.name}
                </option>
              );
            })}
          </select>
          <button type="submit">Modificar producto</button>
        </div>
      </form>

      <NavLink to="/admin/product/form/query">
        <button>Volver</button>
      </NavLink>
    </div>
  );
}

export default Product_form_update;
