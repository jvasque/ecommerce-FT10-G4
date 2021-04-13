import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import '../../scss/components/productsForm/_ProductFormCreate.scss';
import { postProduct } from '../../redux/reducerProductForms/actionsProductForms';


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
      
  const dispatch = useDispatch();
  const category = useSelector(state => state.categoryFilterReducer.categories);
  
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
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
        categoryCheck: input.categoryCheck.filter((category)=> category !== e.target.value)
      })
    }
  }; 

  const handleSubmit = function (event) {
    event.preventDefault();
    if(input.categoryCheck.length === 0) {
      alert("Se requiere al menos UNA categoría")
    } else {     

      dispatch(postProduct(
        input.name, input.SKU, input.price, input.description, 
        input.pic, input.categoryCheck, input.stock));
        
        alert(`El producto ${input.name} ha sido creado`);

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
          
          <label className="label">Stock:</label>
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