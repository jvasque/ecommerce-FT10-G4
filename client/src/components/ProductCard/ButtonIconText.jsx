import React,{useState} from 'react'
import '../../scss/components/ProductCard/_ButtonIconText.scss'
import DivText from './DivText.jsx'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {addProduct, deleteProduct} from "../../redux/cartReducer/cartActions"
import {useDispatch} from "react-redux"


function ButtonIconText(props){

    const [state, setState] = useState(true)
    const dispath = useDispatch()

    const handleClick = () => {
        setState(!state)
        if(state) {
            dispath(addProduct(props.product))
        } else {
         dispath(deleteProduct(props.product))
        }
    }

    const Heart = (<FormControlLabel
        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
    />)
    
    const Cart = (<FormControlLabel
        control={<Checkbox onClick={handleClick} icon={<ShoppingCartOutlinedIcon />} checkedIcon={ <ShoppingCartIcon style={{color: "white"}}/>} name="checkedC" />}
    />)

    return (
        <div className='buttonIcon'>
            <div className='iconContainer'>
                {props.icon === 'Heart' ? Heart:Cart}              
            </div>
            <div className='textContainer'>
                <DivText className='textIcon' content={props.icon === 'Heart' ? 'Add to Favorites':'Add to Cart'}/>
            </div>
        </div> 
 
    )
}

export default ButtonIconText