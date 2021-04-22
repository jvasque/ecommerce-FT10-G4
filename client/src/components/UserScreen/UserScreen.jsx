import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../scss/components/UserScreen/_UserScreen.scss';
import { BiLogOut, BiListPlus } from 'react-icons/bi';
import OrderHistory from '../OrderHistory/OrderHistory';
import Favorites from '../Wishlist/Favorites';
import Wishlists from '../Wishlist/Wishlists';
import ProductForm from '../product_form/product_form';
import CategoriesForm from '../formCategories/Form';
import AllOrders from '../AllOrders/AllOrders';
import Newsletter from '../Newsletter/Newsletter';
import { emptyCart } from '../../redux/cartReducer/cartActions';
import { reset } from '../../redux/iconReducer/iconActions';
import { LogOut } from '../../redux/loginReducer/loginActions';
import ManageAccount from '../Admin/ManageAccount';
export function UserScreen() {
  const [render, setRender] = useState("miCuenta");

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
     localStorage.removeItem("user")
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
            render === "PurchaseHistory"
              ? {
                  backgroundColor: "var(--color-brand)",
                  opacity: "50%",
                  color: "var(--color-light)",
                }
              : { backgroundColor: "" }
          }
        >
          Mis Compras
        </div>
        <div
          id="Favorites"
          onClick={(e) => handleClick(e)}
          style={
            render === "Favorites"
              ? {
                  backgroundColor: "var(--color-brand)",
                  opacity: "50%",
                  color: "var(--color-light)",
                }
              : { backgroundColor: "" }
          }
        >
          Favoritos
        </div>
        <div
          id="Wishlists"
          onClick={(e) => handleClick(e)}
          style={
            render === "Wishlists"
              ? {
                  backgroundColor: "var(--color-brand)",
                  opacity: "50%",
                  color: "var(--color-light)",
                }
              : { backgroundColor: "" }
          }
        >
          Wishlists
        </div>
        <div
          id="Newsletter"
          onClick={(e) => handleClick(e)}
          style={
            render === 'Newsletter'
              ? {
                  backgroundColor: 'var(--color-brand)',
                  opacity: '50%',
                  color: 'var(--color-light)',
                }
              : { backgroundColor: '' }
          }
        >
          Newsletter
        </div>
        {login.isAdmin ? (
          <div
            id="allOrders"
            onClick={(e) => handleClick(e)}
            style={
              render === 'allOrders'
                ? {
                    backgroundColor: 'var(--color-brand)',
                    opacity: '50%',
                    color: 'var(--color-light)',
                  }
                : { backgroundColor: '' }
            }
          >
            Administrar órdenes
          </div>
        ) : null}
        {login.isAdmin ? (
          <div
            id="CreateProduct"
            onClick={(e) => handleClick(e)}
            style={
              render === "CreateProduct"
                ? {
                    backgroundColor: "var(--color-brand)",
                    opacity: "50%",
                    color: "var(--color-light)",
                  }
                : { backgroundColor: "" }
            }
          >
            Administrar productos
          </div>
        ) : null}
        {login.isAdmin ? (
          <div
            id="ManageCategories"
            onClick={(e) => handleClick(e)}
            style={
              render === "ManageCategories"
                ? {
                    backgroundColor: "var(--color-brand)",
                    opacity: "50%",
                    color: "var(--color-light)",
                  }
                : { backgroundColor: "" }
            }
          >
            Administrar categorías
          </div>
        ) : null}
        {login.isAdmin ? (
          <div
            id="ManageAccount"
            onClick={(e) => handleClick(e)}
            style={
              render === "ManageAccount"
                ? {
                    backgroundColor: "var(--color-brand)",
                    opacity: "50%",
                    color: "var(--color-light)",
                  }
                : { backgroundColor: "" }
            }
          >
            Modificar usuario
          </div>
        ) : null}
        <div
          id="LogOut"
          onClick={() => handleLogOut()}
          style={
            render === "LogOut"
              ? {
                  backgroundColor: "var(--color-brand)",
                  opacity: "50%",
                  color: "var(--color-light)",
                }
              : { backgroundColor: "" }
          }
        >
          Cerrar Sesión <BiLogOut />
        </div>
      </div>

      <div className="rendersContainer">
        {render === "MyAccount" ? (
          <h3>Datos de mi cuenta</h3>
        ) : render === "PurchaseHistory" ? (
          <OrderHistory />
        ) : render === "Favorites" ? (
          <Favorites />
        ) : render === "Wishlists" ? (
          <Wishlists />
        ) : render === 'Newsletter' ? (
          <div style={{ marginLeft: '3vw' }}>
            <Newsletter />
          </div>
        ) : render === 'allOrders' ? (
          <AllOrders />
        ) : render === 'CreateProduct' ? (
          <ProductForm />
        ) : render === "ManageCategories" ? (
          <CategoriesForm />
        ) : render === "ManageAccount" ? (
          <ManageAccount />
        ) : (
          <div id="welcomeUser">
            <h3>¡Hola {login.user.firstName}!</h3>
            <p>
              {login.isAdmin ? (
                <p>Este es tu panel de administrador, en el que podrás:</p>
              ) : (
                <p>Este es tu panel de usuario, en el que podrás:</p>
              )}

              <ul>
                <li>
                  interactuar con tus <strong>favoritos</strong>
                </li>
                <li>
                  administrar tus <strong>listas de deseados</strong>
                </li>
                <li>
                  ver tu historial de <strong>compras</strong>
                </li>
                {login.isAdmin ? (
                  <li>
                    crear <strong>nuevos productos</strong> y modificar{' '}
                    <strong>existencias</strong>
                  </li>
                ) : null}
                {login.isAdmin ? (
                  <li>
                    crear <strong>nuevas categorías</strong> y modificar las{' '}
                    <strong>existentes</strong>
                  </li>
                ) : null}
                {login.isAdmin ? (
                  <li>
                    ver todas las <strong>órdenes de compra</strong>
                  </li>
                ) : null}
                <li>
                  Salir de tu cuenta al <strong>cerrar sesión</strong>
                </li>
              </ul>
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
