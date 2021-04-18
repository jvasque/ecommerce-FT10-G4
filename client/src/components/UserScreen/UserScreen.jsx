import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../scss/components/UserScreen/_UserScreen.scss';
import { BiLogOut, BiListPlus } from 'react-icons/bi';
import OrderHistory from '../OrderHistory/OrderHistory';
import Favorites from '../Wishlist/Favorites';
import Wishlists from '../Wishlist/Wishlists';
import ProductForm from '../product_form/product_form';
import CategoriesForm from '../formCategories/Form';
import { emptyCart } from '../../redux/cartReducer/cartActions';
import { reset } from '../../redux/iconReducer/iconActions';
import { LogOut } from '../../redux/loginReducer/loginActions';

export function UserScreen() {
  const [render, setRender] = useState('miCuenta');

  const login = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    setRender(e.target.id);
  }

  const handleLogOut = () => {
    if (login.isLogin) {
      dispatch(LogOut());
      dispatch(emptyCart());
      dispatch(reset());
      alert('Se cerró sesión');
      localStorage.setItem('user', 0);
    }
  };

  return (
    <div className="infoContainer">
      <div className="selectScreen">
        <h2 id="MyAccount" onClick={(e) => handleClick(e)}>
          Mi Cuenta
        </h2>
        <div
          id="PurchaseHistory"
          onClick={(e) => handleClick(e)}
          style={
            render === 'PurchaseHistory'
              ? {
                  backgroundColor: 'var(--color-brand)',
                  opacity: '50%',
                  color: 'var(--color-light)',
                }
              : { backgroundColor: '' }
          }
        >
          Mis Compras
        </div>
        <div
          id="Favorites"
          onClick={(e) => handleClick(e)}
          style={
            render === 'Favorites'
              ? {
                  backgroundColor: 'var(--color-brand)',
                  opacity: '50%',
                  color: 'var(--color-light)',
                }
              : { backgroundColor: '' }
          }
        >
          Favoritos
        </div>
        <div
          id="Wishlists"
          onClick={(e) => handleClick(e)}
          style={
            render === 'Wishlists'
              ? {
                  backgroundColor: 'var(--color-brand)',
                  opacity: '50%',
                  color: 'var(--color-light)',
                }
              : { backgroundColor: '' }
          }
        >
          Wishlists
        </div>
        {login.isAdmin ? (
          <div
            id="CreateProduct"
            onClick={(e) => handleClick(e)}
            style={
              render === 'CreateProduct'
                ? {
                    backgroundColor: 'var(--color-brand)',
                    opacity: '50%',
                    color: 'var(--color-light)',
                  }
                : { backgroundColor: '' }
            }
          >
            Crear productos
          </div>
        ) : null}
        {login.isAdmin ? (
          <div
            id="ManageCategories"
            onClick={(e) => handleClick(e)}
            style={
              render === 'ManageCategories'
                ? {
                    backgroundColor: 'var(--color-brand)',
                    opacity: '50%',
                    color: 'var(--color-light)',
                  }
                : { backgroundColor: '' }
            }
          >
            Crear categorías
          </div>
        ) : null}
        <div
          id="LogOut"
          onClick={() => handleLogOut()}
          style={
            render === 'LogOut'
              ? {
                  backgroundColor: 'var(--color-brand)',
                  opacity: '50%',
                  color: 'var(--color-light)',
                }
              : { backgroundColor: '' }
          }
        >
          Cerrar Sesión <BiLogOut />
        </div>
      </div>

      <div className="rendersContainer">
        {render === 'MyAccount' ? (
          <h3>Datos de mi cuenta</h3>
        ) : render === 'PurchaseHistory' ? (
          <OrderHistory />
        ) : render === 'Favorites' ? (
          <Favorites />
        ) : render === 'Wishlists' ? (
          <Wishlists />
        ) : render === 'CreateProduct' ? (
          <ProductForm />
        ) : render === 'ManageCategories' ? (
          <CategoriesForm />
        ) : (
          <div>
            <h3>Bienvenido {login.user.firstName}!</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              delectus sunt inventore minima, in beatae, vero eos sapiente qui
              nisi autem obcaecati dolorem molestiae architecto voluptate enim
              exercitationem, vitae quas?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              delectus sunt inventore minima, in beatae, vero eos sapiente qui
              nisi autem obcaecati dolorem molestiae architecto voluptate enim
              exercitationem, vitae quas?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              delectus sunt inventore minima, in beatae, vero eos sapiente qui
              nisi autem obcaecati dolorem molestiae architecto voluptate enim
              exercitationem, vitae quas?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserScreen;
