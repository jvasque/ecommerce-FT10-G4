import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// styles
import '../../scss/components/Cart/_Cart.scss';

// Material UI
import swal from "sweetalert"
import { Button } from '@material-ui/core';

// Redux
import { emptyDb, totalPrice } from '../../redux/cartReducer/cartActions';
import { reset } from '../../redux/iconReducer/iconActions';

// React components
import ProductCart from './ProductCart';

import TimeslotForm from '../Timeslots/TimeslotForm'


function Cart() {
  const products = useSelector((state) => state.cartReducer.cart);
  const history = useHistory()
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();
  const [validation, setValidation] = useState(true)


  useEffect(() => {
    dispatch(totalPrice());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(emptyDb());
    dispatch(totalPrice());
    dispatch(reset())
  };

  const handleNext = () => {
    if(!validation) {
     swal("Aviso!", "Ingrese un valor valido", "warning");
    }else {
      history.push({
        pathname: "/user/cart/order",
      })
    }
  }

  return (
    <div className="cart-container">   
      <h1>Carrito ({products.length})</h1>
      <div className="cart">
        {products ? (
          products?.map((product) => (
            <ProductCart setValidation={setValidation} product={product} key={product.id} />
          ))
        ) : (
          <h1>No hay elementos en el carrito</h1>
        )}
      </div>      
      <div className="deleteAll">
        {products.length !== 0 ? (
          <Button onClick={handleClick}>Eliminar todo</Button>
        ) : (
          ''
        )}
      </div>
      <hr />
      <div>
        
      </div>
      <div className="total">
        {total ? <h2>Total ${total}</h2> : ''}
        {products.length ? (
            <Button onClick={handleNext}>Continuar Compra</Button>
        ) : (
          <div className="defaultResponse">
          <div>
            <img
              alt="	Winking Face"
              src="https://uc-emoji.azureedge.net/orig/55/ceb7ce388c8b07ffa8495e9d8905bd.png"
              width="150"
              height="150"
            />
          </div>
          <h4>
            ¿Todavía no llenas tu carrito? ¡Échale un vistazo al{' '}
            <stronge>listado de productos</stronge>!
          </h4>
          <Link to="/catalog">
            <button>Ir al catálogo</button>
          </Link>
        </div>
        )}
      </div>
     
     
    </div>
  );
}

export default Cart;
