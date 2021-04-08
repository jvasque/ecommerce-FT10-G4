import React, { useState, useEffect } from 'react'
import '../../scss/components/_SearchBar.scss'
// import { useDispatch, useSelector } from "react-redux";
import { BiSearch } from "react-icons/bi";

// import { getProduct } from '../actions/index.js';

// const dispatch = useDispatch();

function SearchBar(props) {
  const [find, setFind] = useState('');

  const handleChange = (e) => {
    setFind(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // props.getProduct(find);
  };

  return (
    <form className='searchBarForm'
      role="search"
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
  )
}
// const products = useSelector(state => state.products)

// dispatch(getProduct())

export default SearchBar;




