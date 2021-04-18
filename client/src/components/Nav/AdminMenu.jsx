import '../../scss/components/Nav/_AdminMenu.scss';
import { Link } from 'react-router-dom';
// import { BiLogOut, BiListPlus } from 'react-icons/bi';
// import { FaProductHunt } from 'react-icons/fa';
import { RiAccountCircleLine, RiShoppingCart2Line } from 'react-icons/ri';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from '../../redux/loginReducer/loginActions';

export default function AdminMenu() {
  const [colorChange, setColorChange] = useState('');
  const products = useSelector((state) => state.cartReducer.cart);

  let productCart = products.length !== 0 ? products.length : '';

  //   const dispatch = useDispatch();

  //   const handleLogOut = () => {
  //     setColorChange('Exit');
  //     if (log.isLogin) {
  //       dispatch(LogOut());
  //       alert('deslogeado');
  //     }
  //   };

  return (
    <div>
      <div className="adminMenu">
        <ul>
          <li>
            <Link
              className="test"
              to="/user/info"
              style={
                colorChange === 'User'
                  ? { color: 'rgba(243, 208, 11, 0.87)' }
                  : { color: '' }
              }
              onClick={() => setColorChange('User')}
            >
              <RiAccountCircleLine />
            </Link>
          </li>
          {/* <li>
                    <Link className="test" to="/admin/product/form" style={colorChange === "Product" ? {color:"rgba(243, 208, 11, 0.87)"} : {color :""}} 
                    onClick={() => setColorChange("Product")}><FaProductHunt/></Link>
                </li> */}
          {/* <li>
                    <Link className="test" to="/admin/categories" style={colorChange === "Categories" ? {color:"rgba(243, 208, 11, 0.87)"} : {color :""}}
                    onClick={() => setColorChange("Categories")}><BiListPlus/></Link>
                </li> */}
          <li>
            <Link
              className="test"
              to="/product/cart"
              style={
                colorChange === 'Cart'
                  ? { color: 'rgba(243, 208, 11, 0.87)' }
                  : { color: '' }
              }
              onClick={() => setColorChange('Cart')}
            >
              <RiShoppingCart2Line />
              <span
                style={
                  colorChange === 'Cart'
                    ? { backgroundColor: 'rgba(243, 208, 11, 0.87)' }
                    : { backgroundColor: '' }
                }
                onClick={() => setColorChange('Cart')}
              >
                {productCart}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
