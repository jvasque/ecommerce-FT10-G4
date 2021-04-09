import React, { useState, useEffect } from 'react'
import '../../scss/components/_SearchBar.scss'
import { useDispatch, useSelector} from "react-redux";
import { BiSearch } from "react-icons/bi";
import { getQuery } from '../../redux/searchReducer/searchActions';
import ProductCard from '../ProductCard/ProductCard.jsx'

function SearchBar(props) {
  const [find, setFind] = useState('');
  
  const query = useSelector(state => state.searchReducer.query)
  const dispatch = useDispatch();


  useEffect(() => {
    console.log(query)    
    return () => {
    }
  },[query])

  const handleChange = (e) => {
    setFind(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getQuery(find));    
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

      <div className='queryDisplay'>
        {
          query && query.map((card,i) => {
            return (                                  
              <ProductCard product={card}/>             
            )
          })
        }
      </div>
    </>
  )
}

export default SearchBar;
//busca del array loaded por titulo (ruta query por keyword de busqueda)


