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

            <label className="">subCategories (Subcategoria)</label>
            <br />
            <input
                className=""
                type="text"
                name=""
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                required
            />
            <br />

            <label className="">Brand (Marca) </label>
            <br />
            <input
                className=""
                type="text"
                name=""
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                required
            />
            <br />

            <label className="">Pests (Plagas) </label>
            <br />
            <input
                className=""
                type="text"
                name=""
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                required
            />
            <br />

            <label className="">Origin (Origen) </label>
            <br />
            <input
                className=""
                type="text"
                name=""
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                required
            />
            <br />

            <label className="">Clasification (Clasificación) </label>
            <br />
            <input
                className=""
                type="text"
                name=""
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                required
            />
            <br />

           </form>

            {/* end of form */}
       
        </div>
    )
}

export default Form;