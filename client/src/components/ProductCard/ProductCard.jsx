import React from 'react'
import {Link} from 'react-router-dom'
import '../../scss/components/ProductCard/_ProductCard.scss'
import DivText from './DivText.jsx'
import ButtonIconText from './ButtonIconText';
import ScoreIcon from './ScoreIcon';

function ProductCard({product}){
    
    return (
        <div className='productCard'>
            <Link className='cardLink' to={`/${product.productId}`}>
                <div className='cardPicture'>
                    <img src={product.picture} alt='product'></img>
                </div>
                <div className='cardContent'>

                    <div className='cardData'>
                        <div className='cardScore'>
                            <div className='starIcon'>
                                <ScoreIcon score={product.score}/>
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
                        <ButtonIconText icon='Heart'/>
                    </div>
                </div>                     
                <div className='addCartButton'>   
                    <div className='cardIcon'>
                        <ButtonIconText/>
                    </div>
                </div>                     
            </div>
        </div>
    )
}

export default ProductCard