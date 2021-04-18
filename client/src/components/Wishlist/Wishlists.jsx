import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../scss/components/Wishlists/_Wishlists.scss';
import {
  removeFromWishlist,
  getWishlists,
  createWishlist,
} from '../../redux/wishlistReducer/wishlistActions';

const Wishlists = (props) => {
  const [display, setDisplay] = useState('');
  const [input, setInput] = useState('');
  const [inputDesplegable, setInputDesplegable] = useState(false);

  const wishlists = useSelector((state) => state.wishlistReducer.wishlists);
  const changedWishlist = useSelector(
    (state) => state.wishlistReducer.changedWishlist
  );
  const login = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    setInput('');
    dispatch(getWishlists(login.user.id));
    return () => {};
  }, [dispatch, changedWishlist]);

  function handleClick(e, wishlistId, productId) {
    e.preventDefault(e);
    dispatch(removeFromWishlist(wishlistId, productId));
    dispatch(getWishlists(login.user.id));
  }

  function handleList(e) {
    e.preventDefault(e);
    dispatch(getWishlists(login.user.id));
  }

  function handleRemove(e) {
    e.preventDefault(e);
    dispatch(getWishlists(login.user.id));
  }

  function handleInput(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function handleCreate(e) {
    // despacha action para crear wishlist
    e.preventDefault();
    setInputDesplegable(true);
  }

  function handleButton(e) {
    dispatch(createWishlist(login.user.id, input));
    dispatch(getWishlists(login.user.id));
  }

  return (
    <div className="allcontent">
      <h1 className="title">Wishlists</h1>
      {wishlists &&
        wishlists.map((result, i) => (
          <li key={i} className="wishlist" onClick={(e) => handleList(e)}>
            <button onClick={(e) => handleRemove(e)} className="X">
              X
            </button>

            <h3 onClick={() => setDisplay(result.name)}>{result.name}</h3>
            <div
              className="products"
              style={
                display === result.name
                  ? { display: 'block' }
                  : { display: 'none' }
              }
            >
              {result.products.map((product, i) => (
                <div className="wishlistProducts">
                  <button
                    onClick={(e) => handleClick(e, result.id, product.id)}
                    className="X"
                  >
                    X
                  </button>

                  <img className="wishlistPic" src={product.picture[0]}></img>
                  <div className="productsInfo">
                    <div className="productTitle">{product.name}</div>
                    <div>Precio: {product.unitPrice}</div>
                    <div>Stock: {product.unitsOnStock}</div>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      {inputDesplegable ? (
        <li className="createInput">
          <input
            onChange={(e) => handleInput(e)}
            value={input}
            type="text"
            placeholder="Nombre de lista..."
          />
          <button onClick={handleButton}>Crear</button>
        </li>
      ) : (
        <li
          className="createButton"
          id="create"
          onClick={(e) => handleCreate(e)}
        >
          Crear Wishlist
        </li>
      )}
    </div>
  );
};

export default Wishlists;
