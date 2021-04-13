import React from 'react'
import '../../scss/components/ProductCard/_DivText.scss'


function DivText(props){
   
    return (
        <div className='divText'>
            <div className='divContent'>
                <p className='pContent'>{props.content}</p>
            </div>
        </div>
    )
}

export default DivText