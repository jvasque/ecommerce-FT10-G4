import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlists, addToWishlist, createWishlist } from '../../redux/wishlistReducer/wishlistActions'

const auxUserId=2


function WishlistButton(props) {
    // let auxWishlists = ['Fertilizantes', 'para alambrados']
    const [desplegable, setDesplegable] = useState(false);
    const [inputDesplegable, setInputDesplegable] = useState(false);
    const [input, setInput] = useState('');
    const wishlists = useSelector((state) => state.wishlistReducer.wishlists);
    const productDetail = useSelector((state) => state.detailReducer.productDetail);
    const changedWishlist = useSelector((state) => state.wishlistReducer.changedWishlist);

    const dispatch = useDispatch();

    function handleClick(){
        dispatch(getWishlists(auxUserId))//sale del user session el id del usuario
        setDesplegable(true);
    }
    function handleAdd(wishlistId, e){
        // despacha action para agregar
        e.preventDefault();
        dispatch(addToWishlist(wishlistId, productDetail.id))
    }

    function handleInput(e){
        e.preventDefault()
        setInput(e.target.value)
    }
    function handleButton(e){
        e.preventDefault();
        dispatch(createWishlist(auxUserId ,input))
        dispatch(addToWishlist(changedWishlist.id, productDetail.id))
       
        setDesplegable(false);
        setInput('');
    }

    function handleCreate(e){
        // despacha action para crear wishlist
        e.preventDefault()
        setInputDesplegable(true)
    }


    return (
        <div>
            <button onClick={handleClick} value="value1">Agregar a wishlist</button>

            {desplegable && 
                <div className='desplegable'>
                        <ul className='desplegable'>
                            {wishlists && wishlists.map((result, i) => (
                                    <li key={i} onClick={(e)=>handleAdd(result.id, e)}><a href="">{result.name}</a></li>
                                ))
                            }
                            {inputDesplegable?
                                (<li>
                                    <input onChange={(e) => handleInput(e)} value={input} type="text" placeholder="Nombre de lista..."/><button onClick={handleButton}>Crear</button>
                                </li>):(<li id='create' onClick={(e) => handleCreate(e)}>Crear Wishlist</li>)
                            }
                            
                            <li onClick={() =>setDesplegable(false)}>X</li>
                        </ul>
                </div>
            }
        </div>
    );

};
  
export default WishlistButton;
  