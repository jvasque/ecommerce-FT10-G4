import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Pages from '../Catalog/Pages';
import { modifyFav } from '../../redux/iconReducer/iconActions';
import {
  getFavs,
  addRecommended,
} from '../../redux/wishlistReducer/wishlistActions';
import '../../scss/components/Home/_HomeRecommend.scss';
import ProductCard from '../ProductCard/ProductCard';

function HomeRecommend() {
  let favList = JSON.parse(localStorage.getItem('Fav'));
  console.log(favList);


  const recommends = useSelector((state) => state.wishlistReducer.recommended);
  const dispatch = useDispatch();

  const [products, setProducts] = useState(recommends);

  useEffect(() => {
    dispatch(getFavs(favList));
    dispatch(addRecommended(favList));
    return () => {};
  }, [products]);

  return (
    <div className="homeRecommend">
      <h2>Recomendados para vos</h2>
      <div className="productsRecommended">
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}

export default HomeRecommend;
