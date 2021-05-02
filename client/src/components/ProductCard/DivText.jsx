import React from 'react'
import '../../scss/components/ProductCard/_DivText.scss'


function DivText(props){
   
    return (
        <div className='divText'>
            <div className='divContent'>
                <p className='pContent'>{props.content}</p>
                {props.discount && <del style={{color: "#aaa", fontSize:"20px"}}>${`${props.discount}`}</del>}
            </div>
        </div>
    )
}

export default DivText