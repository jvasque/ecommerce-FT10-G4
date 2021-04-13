import React from 'react'
import '../../scss/components/Cart/_ProductCart.scss'
import DivText from "../ProductCard/DivText"
import ScoreIcon from "../ProductCard/ScoreIcon"
import DeleteButton from "@material-ui/icons/Delete"
import { Button } from '@material-ui/core'
import {useDispatch}  from "react-redux"
import {deleteProduct} from "../../redux/cartReducer/cartActions"

function ProductCard({product}){
    
    const dispath = useDispatch()
    return (
        <div className='productCart'>
                <div className='cardPicture'>
                    <img src={product.picture} alt='product'></img>
                </div>
                <div className='cartContent'>

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
                        {/* <p id='nameCard'><b>{product.name}</b></p> */}
                        {/* <p id='descriptionCard'>{product.description}</p> */}
                        <h3>{product.name}</h3>
                        <div className="delete">

                      <Button onClick={() => dispath(deleteProduct(product))}> <DeleteButton/></Button>
                        </div>
                  
                </div>
          
    
        </div>
    )
}

export default ProductCard