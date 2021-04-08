import React, { useState } from 'react'
import axios from 'axios'

function PutCategory({ categorySelect, setPut, put }) {
    const [input, setInput] = useState('');


    const handleChange = async () => {
        setPut(!put)      
        await axios.post("http://localhost:3001/putCategory", {
            name: categorySelect,
            newName: input
        })
        alert("Categoria Modificada")
    }


    return (
        <div>
            <h1>Modificar Categoría</h1>
            <form>
                <label className="">{categorySelect}</label>

                <input placeholder='Inserte nuevo nombre...' onChange={(e) => setInput(e.target.value)} />
                <input type='submit ' value='Enviar' onClick={handleChange} />

            </form>
        </div>
    )
}

export default PutCategory
