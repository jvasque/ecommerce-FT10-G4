import React from 'react'
import '../../scss/components/Catalog/_Filter.scss'
import DivText from '../ProductCard/DivText'

let categorias = ['Arroz', 'Leche', 'Azucar', 'Tomate']

function Filter(){
    return (
        <div className='containerFilter'>
            <div className='categoriesFilter'>
                <b><DivText content='Categorias'/></b>
            </div>            
                {
                    categorias.map((category, index) => {
                        return (
                            <div className='categoriesLoaded' key={index}>
                                <DivText className='categoryButton' content={category}/>
                            </div>
                            )
                    })
                }         
        </div>
    )
}

export default Filter