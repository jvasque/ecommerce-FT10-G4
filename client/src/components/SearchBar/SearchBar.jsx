import React from 'react'
import '../../scss/components/_SearchBar.scss'
import { BiSearch } from "react-icons/bi";


function SearchBar(){
  return (
    <form className='searchBarForm' onsubmit="event.preventDefault();" role="search">
      <label for="search">Search for stuff</label>
      <input id="search" type="search" placeholder="Search..." autofocus required />
      <button type="submit"><BiSearch/></button>    
    </form>
  )
}

export default SearchBar