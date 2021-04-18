import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getWishlists,
  addToWishlist,
  createWishlist,
} from '../../redux/wishlistReducer/wishlistActions';
import '../../scss/components/Wishlists/_WishlistButton.scss';

function WishlistButton(props) {
  // Local React States
  const [desplegable, setDesplegable] = useState(false);
  const [inputDesplegable, setInputDesplegable] = useState(false);
  const [input, setInput] = useState('');
  // Redux States
  const wishlists = useSelector((state) => state.wishlistReducer.wishlists);
  const productDetail = useSelector(
    (state) => state.detailReducer.productDetail
  );
  const changedWishlist = useSelector(
    (state) => state.wishlistReducer.changedWishlist
  );
  const user = useSelector((state) => state.loginReducer.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlists(user.id));
    return () => {};
  }, [dispatch, changedWishlist]);

  function handleClick() {
    dispatch(getWishlists(user.id)); //sale del user session el id del usuario
    setDesplegable(true);
  }

  function handleAdd(wishlistId, e) {
    // despacha action para agregar a la wishlist
    e.preventDefault();
    dispatch(addToWishlist(wishlistId, productDetail.id));
  }

  function handleInput(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function handleButton(e) {
    e.preventDefault();
    dispatch(createWishlist(user.id, input));
    setInput('');
  }

  function handleCreate(e) {
    e.preventDefault();
    setInputDesplegable(true);
  }

  function handleClose() {
    setInputDesplegable(false);
    setDesplegable(false);
  }

  return (
    <div id="wishlistButton">
      <button onClick={handleClick} value="value1">
        Agregar a wishlist
      </button>

      {desplegable && (
        <div className="desplegable">
          <ul>
            {wishlists &&
              wishlists.map((result, i) => (
                <li key={i} onClick={(e) => handleAdd(result.id, e)}>
                  <a href="">{result.name}</a>
                </li>
              ))}
          </ul>
          {inputDesplegable ? (
            <div className="wishlistCreate">
              <input
                onChange={(e) => handleInput(e)}
                value={input}
                type="text"
                placeholder="Nombre de lista..."
              />
              <button onClick={(e) => handleButton(e)}>Crear</button>
            </div>
          ) : (
            <button id="create" onClick={(e) => handleCreate(e)}>
              Crear Wishlist
            </button>
          )}
          <button onClick={handleClose}>X</button>
        </div>
      )}
    </div>
  );
}

export default WishlistButton;
