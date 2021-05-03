import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  getHigher, 
  getFeatured,
} from '../../redux/wishlistReducer/wishlistActions';
import '../../scss/components/Home/_HomeHigher.scss';
import ProductCard from '../ProductCard/ProductCard';

function HomeHigher() {
  const userId = useSelector((state) => state.loginReducer.user.id);
  const higher = useSelector((state) => state.wishlistReducer.higher);
  const products = useSelector((state) => state.catalogReducer.products);
  const dispatch = useDispatch();

  //const [higherProducts, setHigherProducts] = useState(higher);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  async function getFeaturedProducts() {
    let data = await axios.get(`http://localhost:3001/products/featuredPredictions?userId=${userId}`);
    setFeaturedProducts(data.data);
  }

  useEffect(() => {
    //dispatch(getHigher());
    getFeaturedProducts()
  }, []);

  return (
    <div className="HomeHigher">
      <h2>Productos Destacados</h2>
      <div className="productsHigher">
        {/* {higherProducts &&
          higherProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))} */}
        {featuredProducts &&
        featuredProducts.map((featuredProduct) => (
          <ProductCard product={products.filter(p => {
            return featuredProduct.id === p.id
          })[0]} key={featuredProduct.id} />
        ))}
      </div>
    </div>
  );
}

export default HomeHigher;