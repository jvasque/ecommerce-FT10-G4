import React from 'react'
import '../../scss/components/ProductCard/_ButtonIconText.scss'
import DivText from './DivText.jsx'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const Heart = (<FormControlLabel
    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
/>)

const Cart = (<FormControlLabel
    control={<Checkbox icon={<ShoppingCartOutlinedIcon />} checkedIcon={<ShoppingCartIcon style={{color: "white"}}/>} name="checkedC" />}
/>)

function ButtonIconText(props){
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