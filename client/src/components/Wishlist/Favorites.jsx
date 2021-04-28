import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Pages from '../Catalog/Pages';
import { modifyFav } from '../../redux/iconReducer/iconActions';
import { getFavs } from '../../redux/wishlistReducer/wishlistActions';
import '../../scss/components/Wishlists/_Favorites.scss';

function Favorites() {
  const [favs, setFavs] = useState([]);
  const favData = useSelector((state) => state.wishlistReducer.favorites);
  const dispatch = useDispatch();

  let favList = JSON.parse(localStorage.getItem('Fav'));
  console.log(favList);

  useEffect(() => {
    dispatch(getFavs(favList));
    return () => {};
  }, []);

  const handleButton = (e, id) => {
    e.preventDefault();
    localStorage.removeItem('Fav');
    favList = favList.filter((elem) => elem !== id);
    localStorage.setItem('Fav', JSON.stringify(favList));
    dispatch(modifyFav({ [`Fav-${id}`]: false }));
    dispatch(getFavs(favList));
    // dispatch(addRecommended())
  };

  return (
    <div className="favBoard">
      <h1 className="title">Favoritos</h1>
      {favData &&
        favData.map((favorite, i) => (
          <div className="favProducts">
            <Link to={`/${favorite.id}`}>
              <button
                onClick={(e) => handleButton(e, favorite.id)}
                className="deleteButton"
              >
                X
              </button>
              <img className="favPic" src={favorite.picture[0]}></img>
              <div className="favInfo">
                <div className="favTitle">{favorite.name}</div>
                <div>Precio: {favorite.unitPrice}</div>
                <div>Stock: {favorite.unitsOnStock}</div>
              </div>
            </Link>
          </div>
        ))}
      {favData.length === 0 && (
        <div className="defaultResponse">
          <div>
            <img
              alt="worriedFace"
              src="https://uc-emoji.azureedge.net/orig/53/03d44c77129782799bc1f0134e5279.png"
              width="150"
              height="150"
            />
          </div>
          <h4>
            ¿Todavía no elegiste tus preferidos? ¡Échale un vistazo al{' '}
            <strong>listado de productos</strong>!
          </h4>
          <Link to="/catalog">
            <button>Ir al catálogo</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Favorites;
