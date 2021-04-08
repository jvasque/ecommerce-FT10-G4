import React, { useState, useEffect } from 'react'
import '../../scss/components/_SearchBar.scss'
import { useDispatch, useSelector } from "react-redux";
import { BiSearch } from "react-icons/bi";
import Catalogo from '../Catalogo/Catalogo.jsx'
import { getQuery } from '../../redux/reducerSearch/actionsSearch';

function SearchBar(props) {
  const [find, setFind] = useState('');

  const products = useSelector(state => state.query)
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFind(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getQuery(find))
  };

  return (
    <>
      <form className='searchBarForm'
        onSubmit={(e) => handleSubmit(e)}
      >
        <input id="search"
          type="search"
          placeholder="Search..."
          autofocus required
          value={find}
          onChange={(e) => handleChange(e)} />
        <button type="submit"><BiSearch /></button>
      </form>

      <Catalogo />

    </>
  )
}

export default SearchBar;

//busca del array loaded por titulo (ruta query por keyword de busqueda)


