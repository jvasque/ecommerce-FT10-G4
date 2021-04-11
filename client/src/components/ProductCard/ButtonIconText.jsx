import React from 'react'
import '../../scss/components/ProductCard/_ButtonIconText.scss'
import DivText from './DivText.jsx'
import { BiCartAlt } from "react-icons/bi";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const Heart = (<FormControlLabel
    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
/>)

function ButtonIconText(props){
    return (
        <div className='buttonIcon'>
            <div className='iconContainer'>
                {/* {props.icon === 'Heart' ? <BiHeart className='icon'/>:<BiCartAlt className='icon'/>} */}  
                {props.icon === 'Heart' ? Heart:<BiCartAlt className='icon'/>}              
            </div>
            <div className='textContainer'>
                <DivText className='textIcon' content={props.icon === 'Heart' ? 'Add to Favorites':'Add to Cart'}/>
            </div>
        </div> 
 
    )
}

export default ButtonIconText