import React from 'react'
import './_ProductCard.scss'


function ProductCard(){
    return (
        <div className='ProductCard'>
            <div className='CardPicture'></div>
            <div className='CardContent'>
                <div className='CardData'>
                    <div className='CardScore'></div>
                    <div className='CardPrice'></div>
                </div>
                <div className='CardText'>

                </div>
                <div className='CardButtons'>
                    <button className='WishlistButton'></button>
                    <button className='AddCartButton'></button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard