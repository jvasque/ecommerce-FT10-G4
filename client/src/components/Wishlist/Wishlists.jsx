import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../scss/components/Wishlists/_Wishlists.scss';

const Wishlists = (props) => {
  const [display, setDisplay] = useState('')

  const wishlists = useSelector((state) => state.wishlistReducer.wishlists);
  const dispatch = useDispatch();

  function handleDetail(e){
    console.log('detail wishlist')
  }

  return (
    <div className='allcontent'>
      <h1 className='title'>Wishlists</h1>
      {wishlists &&
        wishlists.map((result, i) => (

          <li key={i} className='wishlist'>
            <h3 onClick={() => setDisplay(result.name)}>{result.name}</h3>
              
              <div className='products' style={ display === result.name? {display: "block"}: {display: "none"}}>
              {result.products.map((product, i) => (
                <div className='wishlistProducts'>
                  <img className='wishlistPic' src={product.picture[0]}></img>
                  <div className='productsInfo'>
                    <div className='productTitle'>{product.name}</div>
                    <div>Precio: {product.unitPrice}</div>
                    <div>Stock: {product.unitsOnStock}</div>
                  </div>
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
