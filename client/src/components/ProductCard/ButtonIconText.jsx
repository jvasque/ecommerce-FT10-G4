import React from 'react'
import '../../scss/components/_ButtonIconText.scss'
import DivText from './DivText.jsx'
import { BiHeart, BiCartAlt } from "react-icons/bi";

function ButtonIconText(props){
    return (
        <div className='buttonIcon'>
            <div className='iconContainer'>
                {props.icon === 'Heart' ? <BiHeart className='icon'/>:<BiCartAlt className='icon'/>}
            </div>
            <div className='textContainer'>
                <DivText className='textIcon' content={props.icon === 'Heart' ? 'Add to Favorites':'Add to Cart'}/>
            </div>
        </div> 
 
    )
}

export default ButtonIconText