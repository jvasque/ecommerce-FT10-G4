import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import '../../scss/components/UserScreen/_UserScreen.scss'
import {
    getWishlists,
    addToWishlist,
    createWishlist,
  } from '../../redux/wishlistReducer/wishlistActions';

const auxUserId = 2;
function UserScreen(){

    const [render, setRender] = useState('miCuenta')

    const wishlists = useSelector((state) => state.wishlistReducer.wishlists);
    const dispatch = useDispatch();

    function handleClick(e){
        e.preventDefault();
        setRender(e.target.id);
    }

    useEffect(() => {     
   
        return
    },[])

    return (
        <div className='infoContainer'>
            <div className='selectScreen'>  
                <h2 id='miCuenta' onClick={(e) => handleClick(e)}>Mi Cuenta</h2>
                <div id='misCompras' onClick={(e) => handleClick(e)}>Mis Compras</div>
                <div id='Favoritos' onClick={(e) => handleClick(e)}>Favoritos</div>
                <div id='Wishlists' onClick={(e) => handleClick(e)}>Wishlists</div>
                <div id='logOut' onClick={(e) => handleClick(e)}>Cerrar Sesión</div>         
            </div>

            <div className='rendersContainer'>
                {
                    render ==='miCuenta'? <h3>Datos de mi cuenta</h3>:
                    render === 'misCompras'? <h3>Historial de Ordenes de compras</h3>:
                    render === 'Favoritos'? <h3>Productos Favoritos</h3>:
                    render === 'logOut'? <h3>Cerrar sesión</h3>:
                    <h3>Wishlists</h3>
                }
            </div>
        </div>        
    )
}

export default UserScreen;