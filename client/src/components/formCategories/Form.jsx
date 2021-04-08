import React, { useEffect, useState } from "react";
import axios from "axios";
import PutCategory from "../formPutCategory/PutCategory";

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
    <div>
      <form onSubmit={handleAddCategory}>
      <label>Agregar una nueva Categoria</label>
      <input
        value={addCategory}
        onChange={(e) => setAddCategory(e.target.value)}
      ></input>
      <button
        type="submit"
      >
        Agregar
      </button>
      </form>

      <br></br>
        <label className="">Categoria</label>
        <br />
        <select
        
          className=""
          type="text"
          name=""
          // value={categories}
          // onChange={(e) => setCategories(e.target.value)}
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

        <label className="">subCategories (SubCategorias) </label>
        <br />
        <select className="" type="text" name="categorySelect">
          <option value="">Escoja una subcategoria</option>
        </select>
        <br />
        <br />
        {categorySelect === "-Seleccione una Categoria-" ? "" : <div>
         
        <button
          onClick={(e) => {
            handleDelete(e);
            setReload(!reload);
          }}
        >
          Borrar
        </button>
        {categories.length === 0 ? "" :
        <button
          onClick={(e) => {
            e.preventDefault();
            setPut(false);
          }}
        >
          Modificar
        </button>
 }
  </div>}
        <br />

      <div>
        { put ? (
          ""
        ) : (
          <PutCategory
            categorySelect={categorySelect}
            setPut={setPut}
            put={put}
            dataCategories={ dataCategories}
          />
        )}
      </div>
    </div>
  );
}

export default Form;
