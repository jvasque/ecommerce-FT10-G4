import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../scss/components/Nav/_Nav.scss';

import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategory } from '../../redux/categoryFilterReducer/categoryFilterActions';
import { resetQuery } from '../../redux/searchReducer/searchActions';
import { setPage, setDollar } from '../../redux/catalogReducer/catalogActions';
// npm install --save-dev @iconify/react @iconify-icons/mdi
//import { Icon, InlineIcon } from "@iconify/react";
//import loginIcon from "@iconify-icons/mdi/login";
import SearchBar from '../SearchBar/SearchBar';
import AdminMenu from '../Nav/AdminMenu';

const Nav = () => {
  const categories = useSelector(
    (state) => state.categoryFilterReducer.categories
  );
  const dollar = useSelector((state) => state.catalogReducer.dollar);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDollar());
    return () => {};
  }, [dispatch]);

  function handleClick(cat) {
    dispatch(filterCategory(cat));
    dispatch(setPage(1));
    dispatch(resetQuery());
    history.push({
      pathname: '/catalog',
    });
  }
  let imgURL =
    'https://cdn.discordapp.com/attachments/803407061203025931/835991187286130698/AgroPlace-logo_new_png.png';

  return (
    <div className="Nav">
      <div className="navTitles">
        <div className="menu">
          <div className="logo">
            <Link to="/">
              <img alt="logo" src={imgURL} />
            </Link>
          </div>
          <div id="home">
            <Link to="/">
              <h2>Home</h2>
            </Link>
          </div>
          <div className="products-title">
            <h2 onClick={() => handleClick('')}>Productos</h2>
            <ul>
              {categories.map((category, index) => {
                return (
                  <li key={index} onClick={() => handleClick(category.name)}>
                    {category.name}
                  </li>
                );
              })}
              <li id="lastItem" onClick={() => handleClick('')}>
                Ver todas
              </li>
            </ul>
          </div>
          <div className="exchange">
            <span className="exchange__usd">$USD 1 = </span>
            <span className="exchange__ars">
              {dollar ? `$ARS ${dollar}` : '...'}
            </span>
          </div>
          <SearchBar />

          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default Nav;
