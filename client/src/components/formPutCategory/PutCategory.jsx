import React, { useState } from 'react'
import axios from 'axios'
import "../../scss/components/_PutCategory.scss";

function PutCategory({ categorySelect, setPut, put, dataCategories }) {
    const [input, setInput] = useState('');


    const handleChange = async () => {
        setPut(!put)      
        await axios.post("http://localhost:3001/putCategory", {
            name: categorySelect,
            newName: input
        })
        alert("Categoria Modificada")
        dataCategories()
    }


    return (
      <div>
        {categorySelect === "-Seleccione una Categoria-" ? (
          ""
        ) : (
          <div>
            <h1>Modificar Categoría</h1>
            <form>
              {/* <label className="">{categorySelect}</label> */}
              <input
   
                placeholder="Inserte nuevo nombre..."
                onChange={(e) => setInput(e.target.value)}
              />

              <button
              className="button-putcategory"
              type="submit"
              value="Enviar"
              onClick={handleChange} />
            </form>
          </div>
        )}
      </div>
    );
}

export default PutCategory
