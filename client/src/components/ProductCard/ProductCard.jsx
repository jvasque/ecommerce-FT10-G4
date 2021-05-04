import React from 'react'
import {Link} from 'react-router-dom'
import '../../scss/components/ProductCard/_ProductCard.scss'
import DivText from './DivText.jsx'
import ButtonIconText from './ButtonIconText';
import ScoreIcon from './ScoreIcon';

function ProductCard({product}){
    if(product){
        return (
            <div className='productCard'>
                <Link className='cardLink' to={`/${product.id}`}>
                    <div className='cardPicture'>
                        <img src={product.picture[0]} alt='product'></img>
                    </div>
                    <div className='cardContent'>
    
                        <div className='cardData'>
                            <div className='cardScore'>
                                <div className='starIcon'>
                                    <ScoreIcon score={Math.round(product.score)}/>
                                </div>                        
                            </div>
                            <div className='cardPrice'>
                                <DivText content={`USD$${product.unitPrice}`}/>
                            </div>
                        </div>
    
                        <div className='cardText'>
                            {/* <p id='nameCard'><b>{product.name}</b></p> */}
                            {/* <p id='descriptionCard'>{product.description}</p> */}
                            <b><DivText content={product.name}/></b>
                        </div>
                    </div>
                </Link>
                <div className='cardButtons'>
                    <div className='wishlistButton'>
                        <div className='cardIcon'>
                            <ButtonIconText icon='Heart' productId={product.id}/>
                        </div>
                    </div>                     
                    <div className='addCartButton'>   
    
                    {product.unitsOnStock !== 0 ? <div className='cardIcon'>
                            <ButtonIconText product={product} productId={product.id}/>
                        </div> : "" }
                      
                    </div>                     
                </div>
            </div>
        )
    }else{
        return <></>
    }    
} 

export default ProductCard