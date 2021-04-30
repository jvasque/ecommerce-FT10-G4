import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../scss/components/Wishlists/_Wishlists.scss';
import {
  removeFromWishlist,
  getWishlists,
  createWishlist,
  deleteWishlist,
} from '../../redux/wishlistReducer/wishlistActions';
import swal from 'sweetalert';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function handleRemove(e, wishlistId) {
    e.preventDefault(e);
    swal({
      title: 'Está seguro de eliminar la wishlist?',
      text: 'Una vez borrada, desaparecerá de su base de datos!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteWishlist(wishlistId));
        swal('La wishlist fue borrada con éxito!', {
          icon: 'success',
        });
      } else {
        swal('La wishlist NO fue borrada');
      }
    });
  }

  function handleInput(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function handleCreate(e) {
    e.preventDefault();
    setInputDesplegable(true);
  }

  function handleButton(e) {
    if (input) {
      dispatch(createWishlist(login.user.id, input));
      dispatch(getWishlists(login.user.id));
      swal(
        'Éxito!',
        `Se ha se ha creado la lista ${input} correctamente`,
        'success'
      );
    } else {
      swal('Aviso!', 'Se requiere un nombre para la lista', 'warning');
    }
  }

  return (
    <div className="allcontent">
      <h1 className="title">Wishlists</h1>
      {wishlists &&
        wishlists.map((result, i) => (
          <li key={i} className="wishlist" onClick={(e) => handleList(e)}>
            <h3 onClick={() => setDisplay(result.name)}>
              {result.name}
              <button
                onClick={(e) => handleRemove(e, result.id)}
                className="deleteButton"
              >
                X
              </button>
            </h3>
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
                    className="deleteButton"
                  >
                    X
                  </button>

                  <img
                    alt="productImage"
                    className="wishlistPic"
                    src={product.picture[0]}
                  ></img>
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
      {wishlists.length === 0 && (
        <div className="defaultResponse">
          <div>
            <img
              alt="worriedFace"
              src="https://uc-emoji.azureedge.net/orig/5f/42bafd42dafb608ee3d37fc3f50665.png"
              width="150"
              height="150"
            />
          </div>
          <h4>
            ¿Hay algo que estés deseando? ¡Crea tu primera{' '}
            <strong>wishlist</strong>!
          </h4>
        </div>
      )}
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
