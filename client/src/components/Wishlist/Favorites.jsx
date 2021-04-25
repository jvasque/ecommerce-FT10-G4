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
    </div>
  );
}

export default Favorites;
