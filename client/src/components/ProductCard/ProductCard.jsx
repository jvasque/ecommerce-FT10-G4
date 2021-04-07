import React from 'react'
import '../../scss/components/_ProductCard.scss'
import { BiStar, BiDollar, BiHeart, BiCartAlt } from "react-icons/bi";


let imagen = 'https://argentina.agrofystatic.com/media/catalog/product/cache/1/image/850x600/0dc2d03fe217f8c83829496872af24a0/m/e/metolaclor-940x1024.jpg?usewebp=true'
let price = 200
let score = 5

function ProductCard(){
    return (
        <div className='ProductCard'>
            <div className='CardPicture'>
                <img src={imagen} alt='product'></img>
            </div>
            <div className='CardContent'>
                <div className='CardData'>
                    <div className='CardScore'>
                        <div className='cardIcon'>
                            <BiStar className='icon'/>
                            <p className='iconText'>{score}</p>
                        </div>  
                    </div>
                    <div className='CardPrice'>
                        <div className='cardIcon'>
                            <BiDollar className='icon'/>
                            <p className='iconText'>{price}</p>
                        </div>                        
                    </div>
                </div>
                <div className='CardText'>
                    <p>Texto aca</p>
                </div>
                <div className='CardButtons'>
                    <button className='wishlistButton'>
                        <div className='cardIcon'>
                            <BiHeart className='icon'/>
                            <p className='iconText'>Add to wishlist</p>
                        </div>
                    </button>                     
                    <button className='addCartButton'>   
                        <div className='cardIcon'>
                            <BiCartAlt className='icon'/>
                            <p className='iconText'>Add to cart</p>
                        </div>
                    </button>
                     
                </div>
            </div>
        </div>
    )
}

export default ProductCard