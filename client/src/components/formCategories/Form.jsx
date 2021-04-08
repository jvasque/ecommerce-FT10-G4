import React, { useEffect, useState } from "react";
import axios from "axios";
import PutCategory from "../formPutCategory/PutCategory";

function Form() {
  const [categories, setCategories] = useState([]);
  const [categorySelect, setCategorySelect] = useState(
    ""
  );
  const [addCategory, setAddCategory] = useState("");
  const [put, setPut] = useState("true");
  const [reload, setReload] = useState("true");
  const [empty, setEmpty] = useState("true");
  console.log(empty)
  useEffect(() => {
    test();
  }, [!put, reload]);

  async function test() {
    let data = await axios.get(`http://localhost:3001/allCategories`);
    console.log(data.data);

    data.data.length !== 0 ? setCategories(data.data) : (() => { setEmpty(false); setCategories([{ name: "No hay categorías" }]) })()
    data.data.length !== 0 && setCategorySelect(data.data[0].name)
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    setPut(true);
    if (!categorySelect) {
      alert("Empty");
    } else {
      await axios.post("http://localhost:3001/deleteCategory", {
        name: categorySelect,
      });
      alert("Deleted");
    }
  };

  const handleAddCategory = async () => {
    setPut(true);
    if (!addCategory) {
      alert("Ingrese una categoria");
    } else {
      await axios.post("http://localhost:3001/addCategory", {
        name: addCategory,
      });
      alert("Categoria Creada");
    }
  };

  return (
    <div>
      <label>Agregar una nueva Categoria</label>
      <input
        value={addCategory}
        onChange={(e) => setAddCategory(e.target.value)}
      ></input>
      <button
        onClick={() => {
          handleAddCategory();
          setReload(!reload);
        }}
      >
        Agregar
      </button>
      <h2 className="">CATEGORIES</h2>

      {/* form start */}
      <form className="">
        <label className="">Categories (Categoria)</label>
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
        <button
          onClick={(e) => {
            handleDelete(e);
            setReload(!reload);
          }}
        >
          Borrar
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setPut(false);
          }}
        >
          Modificar
        </button>

        <br />
      </form>

      {/* end of form */}

      <div>
        { put ? (
          ""
        ) : (
          <PutCategory
            categorySelect={categorySelect}
            setPut={setPut}
            put={put}
          />
        )}
      </div>
    </div>
  );
}

export default Form;
