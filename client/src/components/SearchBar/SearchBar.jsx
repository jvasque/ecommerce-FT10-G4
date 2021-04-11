import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router";
import '../../scss/components/_SearchBar.scss'
import { useDispatch, useSelector} from "react-redux";
import { BiSearch } from "react-icons/bi";
import { getQuery, resetQuery } from '../../redux/searchReducer/searchActions';
import { filterCategory } from '../../redux/categoryFilterReducer/categoryFilterActions';


function SearchBar() {
  const [find, setFind] = useState('');  
  const query = useSelector(state => state.searchReducer.query)
  const findQuery = useSelector(state => state.searchReducer.findQuery)
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {  
    setFind(findQuery)
    return
  },[dispatch, query, findQuery])

  const handleChange = (e) => {
    setFind(e.target.value);
    if(e.target.value === '') dispatch(resetQuery())    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterCategory(''))
    dispatch(getQuery(find)); 
    history.push({
      pathname:  "/catalog",
    })
  };

  return (
    <div className='searchBar'>
      <form className='searchBarForm'
        onSubmit={handleSubmit}
      >
        <input id="search"
          type="search"
          placeholder="Search..."
          autoFocus required
          value={find}
          autocomplete="off"
          onChange={handleChange} />
        <button type="submit"><BiSearch /></button>
      </form>
    </div>
  )
}

export default SearchBar;
//busca del array loaded por titulo (ruta query por keyword de busqueda)


