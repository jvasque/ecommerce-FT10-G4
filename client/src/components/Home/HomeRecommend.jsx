import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  getFavs,
  addRecommended,
} from '../../redux/wishlistReducer/wishlistActions';
import '../../scss/components/Home/_HomeRecommend.scss';
import ProductCard from '../ProductCard/ProductCard';

function HomeRecommend() {
  // let favList = JSON.parse(localStorage.getItem('Fav'));
  // console.log(favList);
  const userId = useSelector((state) => state.loginReducer.user.id);
  const products = useSelector((state) => state.catalogReducer.products);

  // const recommends = useSelector((state) => state.wishlistReducer.recommended);
  // const dispatch = useDispatch();

  // const [products, setProducts] = useState(recommends);

  const [recommendedProducts, setRecommendedProducts] = useState([]);

  async function getRecommendedProducts() {
    let data = await axios.get(`http://localhost:3001/products/recommendedPredictions?userId=${userId}`);
    setRecommendedProducts(data.data);
  }

  useEffect(() => {
    //dispatch(getFavs(favList));
    //dispatch(addRecommended(favList));
    getRecommendedProducts()
  }, []);

  return (
    <div className="homeRecommend">
      <h2>Recomendados para vos</h2>
      <div className="productsRecommended">
        {/* {products &&
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))} */}
          {recommendedProducts &&
            recommendedProducts.map((recommendedProduct) => (
            <ProductCard product={products.filter(p => {
              return recommendedProduct.id === p.id
            })[0]} key={recommendedProduct.id} />
          ))}
      </div>
    </div>
  );
}

export default HomeRecommend;
