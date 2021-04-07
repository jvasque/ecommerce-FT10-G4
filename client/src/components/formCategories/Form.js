import React from 'react';

function Form (){

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return(
        <div>
            <h2 className="">CATEGORIES</h2>

            {/* form start */}
            <form className="" onSubmit={handleSubmit}>

            <label className="">Categories (Categoria)</label>
            <br />
            <select
                className=""
                type="text"
                name = ""
                // value={categories}
                // onChange={(e) => setCategories(e.target.value)}
                required
            >
                <option value="">Escoja una categoria</option>
            </select>
            <br />

            <label className="">subCategories (SubCategorias) </label>
            <br />
            <select
                className=""
                type="text"
                name=""
                // value={subCategories}
                // onChange={(e) => setSubCategories(e.target.value)}
                required
            >
                <option value="">Escoja una subcategoria</option>

               

            </select>
            <br />
            <br />
            <button>Editar</button>
            <button>Agregar</button>
            <button>Borrar</button>
            
            <br />

           </form>

            {/* end of form */}
       
        </div>
    )
}

export default Form;