import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import '../../scss/components/SearchBar/_SearchBar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import {
  getQuery,
  resetQuery,
  getOptions,
  resetOptions,
} from '../../redux/searchReducer/searchActions';
import { setPage } from '../../redux/catalogReducer/catalogActions';
import { filterCategory } from '../../redux/categoryFilterReducer/categoryFilterActions';
// import useOutsideClick from '../../useOutsideClick';

function SearchBar() {
  const [find, setFind] = useState('');

  const query = useSelector((state) => state.searchReducer.query);
  const findQuery = useSelector((state) => state.searchReducer.findQuery);
  const options = useSelector((state) => state.searchReducer.options);
  const page = useSelector((state) => state.catalogReducer.page);

  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef();

  const useOutsideClick = (ref, callback) => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
  
    useEffect(() => {
      if(find !== ''){
        document.addEventListener('click', handleClick);
      }else{
        document.removeEventListener('click', handleClick);
      }
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [find]);
  };
  
  useOutsideClick(ref, () => {
    dispatch(resetOptions());
    setFind('');
  });
  useEffect(() => {
    setFind(findQuery);
    return;
  }, [dispatch, query, findQuery]);

  const handleChange = (e) => {
    setFind(e.target.value);
    if (e.target.value === '') dispatch(resetQuery());
    if (e.target.value === '') dispatch(resetOptions());
    if (e.target.value.length > 1) {
      dispatch(getOptions(e.target.value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterCategory(''));
    dispatch(getQuery(find));
    dispatch(resetOptions());
    dispatch(setPage(1));
    history.push({
      pathname: '/catalog',
    });
  };

  const handleClick = (name, e) => {
    e.preventDefault();
    setFind('');
    dispatch(getQuery(name));
    dispatch(resetOptions());
    history.push({
      pathname: '/catalog',
    });
  };

  return (
    <div id="searchGroup" ref={ref}>
      <div className="searchBar">
        <form
          className="searchBarForm"
          id="searchBarForm"
          onSubmit={handleSubmit}
        >
          <input
            id="search"
            type="search"
            placeholder="Buscar..."
            autoFocus
            required
            value={find}
            autoComplete="off"
            onChange={handleChange}
          />
          <button type="submit">
            <BiSearch />
          </button>
        </form>
      </div>

      <div className="displayOptions">
        <ul>
          {options.length > 0 && options?.map((result, i) =>
            result.error ? null : i < 5 ? (
              <li key={i} onClick={(e) => handleClick(result.name, e)}>
                {result.name}
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
