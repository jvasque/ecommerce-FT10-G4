import React from 'react'
import ProductCard from '../ProductCard/ProductCard.jsx'
import Pages from './Pages.jsx'
import Filter from './Filter.jsx'
import '../../scss/components/_Catalogo.scss'

let prod = {
    id: 1,
    image : 'https://argentina.agrofystatic.com/media/catalog/product/cache/1/image/850x600/0dc2d03fe217f8c83829496872af24a0/m/e/metolaclor-940x1024.jpg?usewebp=true',
    price : 200,
    score : 4.3,
    name: 'Metolaclor 96 Summit Agro',
    description: 'agua de rio con popo adsf sdf af dsaf as asdfasdgdgegr ertreyeryeryer gggggggg ryty gggggg 453534534534ggg ggggggg gggggggggend',
}

let products = [prod, prod, prod, prod, prod, prod, prod]

function Catalogo(){
    return (
        <div className='catalogScreen'>
            <div className='catalogMatrix'>
                {
                    products.map((product, index) => {
                        return (                             
                            <ProductCard product={product}/>             
                        )
                    })
                }
            </div>
            <Pages/>
        </div>
    )
}

export default Catalogo