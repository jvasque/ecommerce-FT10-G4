import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/components/Nav/_NavBanner.scss';

import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategory } from '../../redux/categoryFilterReducer/categoryFilterActions';
import { resetQuery } from '../../redux/searchReducer/searchActions';
import { setPage } from '../../redux/catalogReducer/catalogActions';
// npm install --save-dev @iconify/react @iconify-icons/mdi
//import { Icon, InlineIcon } from "@iconify/react";
//import loginIcon from "@iconify-icons/mdi/login";
import SearchBar from '../SearchBar/SearchBar';
import AdminMenu from '../Nav/AdminMenu';

const NavBanner = () => {
  return (
    <div className="header">
      <div className="headerSection">
        <div className="headerSection__bg"></div>
        <h1 className="headerSection__title">Sembremos futuro</h1>
      </div>
    </div>
  );
};

export default NavBanner;
