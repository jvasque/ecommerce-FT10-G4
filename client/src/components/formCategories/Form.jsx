import React, { useEffect, useState } from "react";
import axios from "axios";
import PutCategory from "../formPutCategory/PutCategory";
import "../../scss/components/_Form.scss";



function Form() {
  const [categories, setCategories] = useState([]);
  const [categorySelect, setCategorySelect] = useState(
    "-Seleccione una Categoria-"
  );
  const [addCategory, setAddCategory] = useState("");
  const [put, setPut] = useState("true");
  const [reload, setReload] = useState("true");
  
  
  useEffect(() => {
    dataCategories();
  }, [!put, reload]);

  async function  dataCategories() {
    let data = await axios.get(`http://localhost:3001/allCategories`);
   setCategories(data.data) 
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!categorySelect) {
      alert("Empty");
    } else {
      await axios.post("http://localhost:3001/deleteCategory", {
        name: categorySelect,
      });
      alert("Deleted");
    }
    dataCategories()
    setCategorySelect("-Seleccione una Categoria-")
  };

  const handleAddCategory = async () => {
    
    if (!addCategory) {
      alert("Ingrese una categoria");
    } else {
      await axios.post("http://localhost:3001/addCategory", {
        name: addCategory,
      });
      alert("Categoria Creada");
    }
    dataCategories()
    setReload(!reload)
  };

  return (
    <div className="form-container">

      <div>
        <h2 className="title">Categorias</h2>
      </div>

      <div className="containerform">
        <form onSubmit={handleAddCategory}>
          <label className="label-category">Agregar una nueva Categoria</label>
          <br />
          <br />
          <input
            className="input-category"
            value={addCategory}
            onChange={(e) => setAddCategory(e.target.value)}
          ></input>
          <br />
          <br />
          <button className="button-putcategory" type="submit">
            Agregar
          </button>
        </form>
      </div>

      <form>
        <br></br>
        <label className="label-category">Categoria</label>
        <br />
        <select
          className="select-category"
          type="text"
          name=""
          required
          onChange={(e) => setCategorySelect(e.target.value)}
        >
          <option defaultValue>-Seleccione una Categoria-</option>
          {categories?.map((x) => (
            <option key={x.name} value={x.name}>
              {x.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label className="label-category">subCategories (SubCategorias) </label>
        <br />
        <select className="select-category" type="text" name="categorySelect">
          <option value="">Escoja una subcategoria</option>
        </select>
        <br />
        <br />
        {categorySelect === "-Seleccione una Categoria-" ? (
          ""
        ) : (
          <div>
            <button
              className="button-putcategory"
              onClick={(e) => {
                handleDelete(e);
                setReload(!reload);
              }}
            >
              Borrar
            </button>
            {categories.length === 0 ? (
              ""
            ) : (
              <button
                className="button-putcategory"
                onClick={(e) => {
                  e.preventDefault();
                  setPut(false);
                }}
              >
                Modificar
              </button>
            )}
          </div>
        )}
        <br />

        <div>
          {put ? (
            ""
          ) : (
            <PutCategory
              categorySelect={categorySelect}
              setPut={setPut}
              put={put}
              dataCategories={dataCategories}
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;
