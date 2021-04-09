import React from 'react'
import '../../scss/components/_ScoreIcon.scss'
import DivText from './DivText.jsx'
import { BiStar } from "react-icons/bi";

function ScoreIcon(props){
    return (
        <div className='scoreIcon'>
            <div className='scoreContainer'>
                <DivText className='textIcon dataText' content={props.score}/>
            </div>
            <div className='starContainer'>
                <BiStar className='icon'/>
            </div>            
        </div> 
 
    )
}

export default ScoreIcon