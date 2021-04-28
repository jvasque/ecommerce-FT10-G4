import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getHigher,
} from '../../redux/wishlistReducer/wishlistActions';
import '../../scss/components/Home/_HomeHigher.scss';
import ProductCard from '../ProductCard/ProductCard';

function HomeHigher() {

  const higher = useSelector((state) => state.wishlistReducer.higher);
  const dispatch = useDispatch();

  const [higherProducts, setHigherProducts] = useState(higher);

  useEffect(() => {
    dispatch(getHigher());
    return () => {};
  }, [higherProducts]);

  return (
    <div className="HomeHigher">
      <h2>Productos Destacados</h2>
      <div className="productsHigher">
        {higherProducts &&
          higherProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}

export default HomeHigher;