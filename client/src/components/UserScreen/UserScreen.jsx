import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../scss/components/UserScreen/_UserScreen.scss';
import { BiLogOut, BiListPlus } from 'react-icons/bi';
import OrderHistory from '../OrderHistory/OrderHistory';
import Wishlists from '../Wishlist/Wishlists';
import ProductForm from '../product_form/product_form';
import CategoriesForm from '../formCategories/Form';

import {
  getWishlists,
  addToWishlist,
  createWishlist,
} from '../../redux/wishlistReducer/wishlistActions';
import { LogOut } from '../../redux/loginReducer/loginActions';

export function UserScreen() {
  const [render, setRender] = useState('miCuenta');

  const login = useSelector((state) => state.loginReducer);
  //   const user = useSelector((state) => state.loginReducer.user);

  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    setRender(e.target.id);
  }

  // useEffect(() => {
  //   return;
  // }, []);

  const handleLogOut = () => {
    if (login.isLogin) {
      dispatch(LogOut());
      alert('Se ha cerrado sesión');
    }
  };

  return (
    <div className="infoContainer">
      <div className="selectScreen">
        <h2 id="MyAccount" onClick={(e) => handleClick(e)}>
          Mi Cuenta
        </h2>
        <div id="PurchaseHistory" onClick={(e) => handleClick(e)}>
          Mis Compras
        </div>
        <div id="Favorites" onClick={(e) => handleClick(e)}>
          Favoritos
        </div>
        <div id="Wishlists" onClick={(e) => handleClick(e)}>
          Wishlists
        </div>
        {login.isAdmin ? (
          <div id="CreateProduct" onClick={(e) => handleClick(e)}>
            Crear productos
          </div>
        ) : null}
        {login.isAdmin ? (
          <div id="ManageCategories" onClick={(e) => handleClick(e)}>
            Crear categorías
          </div>
        ) : null}
        <div id="LogOut" onClick={() => handleLogOut()}>
          Cerrar Sesión <BiLogOut />
        </div>
      </div>

      <div className="rendersContainer">
        {render === 'MyAccount' ? (
          <h3>Datos de mi cuenta</h3>
        ) : render === 'PurchaseHistory' ? (
          <OrderHistory />
        ) : render === 'Favorites' ? (
          <h3>Productos Favoritos</h3>
        ) : render === 'LogOut' ? (
          <h3>Cerrar sesión</h3>
        ) : render === 'Wishlists' ? (
          <Wishlists />
        ) : render === 'CreateProduct' ? (
          <ProductForm />
        ) : render === 'ManageCategories' ? (
          <CategoriesForm />
        ) : null}
      </div>
    </div>
  );
}

export default UserScreen;
