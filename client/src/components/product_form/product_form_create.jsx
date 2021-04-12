import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import '../../scss/components/productsForm/_ProductFormCreate.scss';
import { postProduct } from '../../redux/reducerProductForms/actionsProductForms';
import { getCategories } from '../../redux/categoryFilterReducer/categoryFilterActions'
import { getCatalog } from '../../redux/catalogReducer/catalogActions';
import axios from "axios";

export default function Product_form_create(props) {
  const [input, setInput] = useState({
    name: "",
    SKU: "",
    price: "",
    description: "",
    pic: "",
    categoryCheck: [],
    stock: "",
  })
  const [categoryCheck, setCategoryCheck] = useState([]);
    
  const dispatch = useDispatch();
  const category = useSelector(state => state.categoryFilterReducer.categories);
  
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  }

  const handleCategoryCheck = function (e) {
    if(e.target.checked) {        
      setInput({
        ...input,
        categoryCheck: [...input.categoryCheck, e.target.value]
      }); 
    } else {
      setInput({
        ...input,
        categoryCheck: categoryCheck.filter((category)=> category !== e.target.value)
      })
    }
  }; 

  const handleSubmit = function (event) {
    event.preventDefault();
    if(input.categoryCheck.length === 0) {
      alert("Se requiere al menos UNA categoría")
    } else {

      /// CHECK ERRORS ---------------------------------------------

      dispatch(postProduct(
        input.name, input.SKU, input.price, input.description, 
        input.pic, input.categoryCheck, input.stock));
      // setName("");
      // setSKU("");
      // setPrice("");
      // setDescription("");
      // setPic("");
      // setCategoryCheck([]);
      // setStock("");
      setInput({
        name: "",
        SKU: "",
        price: "",
        description: "",
        pic: "",
        categoryCheck: [],
        stock: "",
      });
      let inputs = document.querySelectorAll('input[type=checkbox]');
      inputs.forEach((item) => {
        item.checked = false;
      });
      alert(`El producto ${input.name} creado`);
    }
  }
  
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
          
          <label className="label">
            Imagen:
          </label>
          <input
            type="text"
            name="pic"
            autoComplete="off"
            placeholder=" Agregar url..."
            value={input.pic}
            required="false"
            onChange={handleChange}
          />
          
          <label className="label">Categoria:</label>
          <div className="categoryBoxes">
           {category&&category.map((c)=>{
             return(
              <div key={c.name}>
                <label>{c.name}</label>                
                <input type = "checkbox"
                value = {c.name}                
                onChange={(e) => handleCategoryCheck(e)}
                />
              </div>
             )
            })} 
          </div>       
          
          <label className="label">
            Stock:
          </label>
          <input
            type="number"
            min="1"
            max="99"
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
      
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>

    </div>
  );
}

// export function validate(input) {
//   let errors = {};

//   if (!input.title) {
//     errors.title = 'Title is required';
//     errors.status = false;
//   } else {
//     errors.status = true;
//   }
//   // else if (!/\S+@\S+\.\S+/.test(input.title)) {
//   //   errors.title = 'Username is invalid';
//   // }

//   if (!input.summary) {
//     errors.summary = 'Summary is required';
//     errors.status = false;
//   } else if (!input.title) {
//     errors.status = false;
//   } else {
//     errors.status = true;
//   }

//   // Checking if score is between 1 and 99
//   if (!input.score) {
//     errors.score = 'Score is required ';
//     errors.status = false;
//   } else if (!/^(?!0)[0-9]{1,2}$/.test(input.score)) {
//     errors.score = 'Score must be a number from 1 to 99';
//     errors.status = false;
//   } else if (!input.title || !input.summary) {
//     errors.status = false;
//   } else {
//     errors.status = true;
//   }

//   // Checking if health is between 1 and 99
//   if (!input.health) {
//     errors.health = 'Health score is required ';
//     errors.status = false;
//   } else if (!/^(?!0)[0-9]{1,2}$/.test(input.health)) {
//     errors.health = 'Health score must be a number from 1 to 99';
//     errors.status = false;
//   } else if (!input.title || !input.summary) {
//     errors.status = false;
//   } else if (!input.score || !/^(?!0)[0-9]{1,2}$/.test(input.score)) {
//     errors.status = false;
//   } else {
//     errors.status = true;
//   }

//   return errors;
// }