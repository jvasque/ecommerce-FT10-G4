import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import { useSelector } from 'react-redux';
import Pages from '../Catalog/Pages';
import '../../scss/components/Wishlists/_Favorites.scss';

function Favorites() {
  const userFavorites = useSelector((state) => state.iconReducer.fav);

  return (
    <div className="favoriteBoard">
      <h1 className="title">Componente Favoritos</h1>
      <div className="favoriteCards">
        {/*
          {userFavorites.map}
           */}
      </div>
    </div>
  );
}

export default Favorites;
