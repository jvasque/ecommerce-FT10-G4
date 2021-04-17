import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../scss/components/ProductDetail/_Wishlist.scss';

const Wishlists = (props) => {
  const [display, setDisplay] = useState('')

  const wishlists = useSelector((state) => state.wishlistReducer.wishlists);
  const dispatch = useDispatch();

  function handleDetail(e){
    console.log('detail wishlist')
  }

  return (
    <div>
      <h1>Wishlists</h1>
      {wishlists &&
        wishlists.map((result, i) => (

          <li key={i}>
            <h3 onClick={() => setDisplay(result.name)}>{result.name}</h3>
              <div className={`${result.name}Items`} style={ display === result.name? {display: "block"}: {display: "none"}}>
              {result.products.map((product, i) => (
                <div>
                  <div>{product.name}</div>
                  <div>Precio: {product.unitPrice}</div>
                  <div>Stock: {product.unitsOnStock}</div>
                  <img src={product.picture[0]}></img>
                </div>
              ))}  
              </div>
          </li>
        ))
      }
    </div>
  );
};

export default Wishlists
