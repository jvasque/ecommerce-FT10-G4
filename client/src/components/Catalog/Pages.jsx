import React from 'react'
import '../../scss/components/Catalog/_Pages.scss'

function Pages({totalProducts}){
    return (
        // <div>{`< 1 2 3 4 5 6 7 8 9 10 >`}</div>
        <div className="catalogResults">{`Se cargaron ${totalProducts} productos.`}</div>
    )
}

export default Pages