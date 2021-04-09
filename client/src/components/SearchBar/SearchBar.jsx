import React, { useState, useEffect } from 'react'
import '../../scss/components/_SearchBar.scss'
import { useDispatch, useSelector, connect } from "react-redux";
import { BiSearch } from "react-icons/bi";
import { getQuery } from '../../reducers/searchReducer/actionsSearch';
import ProductCard from '../ProductCard/ProductCard.jsx'
// import axios from 'axios';


function SearchBar(props) {
  // const query = useSelector(state => state.query)
  // const dispatch = useDispatch();
  const [find, setFind] = useState('');


  useEffect(() => {
    console.log(props.query)
    return () => {
    }
  },[props.query])

  const handleChange = (e) => {
    setFind(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.getQuery(find);
    console.log('algo')
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
          props.query && props.query.map((card) => {
            return (                             
              <ProductCard product={card}/>             
            )
          })
        }
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  query: state.query,
})

const mapDispatchToProps = (dispatch) => ({
  getQuery: find => dispatch(getQuery(find))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

// export default SearchBar;

//busca del array loaded por titulo (ruta query por keyword de busqueda)


