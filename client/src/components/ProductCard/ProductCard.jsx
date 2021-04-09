import React from 'react'
import {Link} from 'react-router-dom'
import '../../scss/components/_ProductCard.scss'
import DivText from './DivText.jsx'
import ButtonIconText from './ButtonIconText';
import ScoreIcon from './ScoreIcon';

// let product = {
//     picture : 'https://argentina.agrofystatic.com/media/catalog/product/cache/1/image/850x600/0dc2d03fe217f8c83829496872af24a0/m/e/metolaclor-940x1024.jpg?usewebp=true',
//     price : 200,
//     score : 4.3,
//     name: 'Metolaclor 96 Summit Agro',
//     description: 'agua de rio con popo adsf sdf af dsaf as asdfasdgdgegr ertreyeryeryer gggggggg ryty gggggg 453534534534ggg ggggggg gggggggggend',
// }


function ProductCard({product}){
    
    return (
        <div className='productCard'>
            <Link className='cardLink' to={`/details/${product.id}`} key={product.id}>
                <div className='cardPicture'>
                    <img src={product.image} alt='product'></img>
                </div>
                <div className='cardContent'>

                    <div className='cardData'>
                        <div className='cardScore'>
                            <div className='starIcon'>
                                <ScoreIcon score={product.score}/>
                            </div>                        
                        </div>
                        <div className='cardPrice'>
                            <DivText content={`USD$${product.price}`}/>
                        </div>
                    </div>

                    <div className='cardText'>
                        <p id='nameCard'><b>{product.name}</b></p>
                        <p id='descriptionCard'>{product.description}</p>
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