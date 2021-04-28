import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {
    PostDoubleAuth
  } from "../../redux/loginReducer/loginActions";
const DoubleAuth = () => {
 
const [secret, setSecret] = useState('')
const dispatch = useDispatch()
const secretChange = (e) => {
    setSecret(e.target.value)
}
const secretSubmit = (e) => {
    e.preventDefault();
    //// enviar a redux
    dispatch(PostDoubleAuth(secret))
    
}


    return (
        <div>
        <form onSubmit={secretSubmit}>
            <input name='secret' type='number' onChange={secretChange}></input>
            <button type='submit'>enviar</button>
            </form>
        </div>
    )
}

export default DoubleAuth
