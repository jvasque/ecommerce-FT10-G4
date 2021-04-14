import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import '../../scss/components/_SearchBar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import {
  getQuery,
  resetQuery,
  getOptions,
  resetOptions,
} from '../../redux/searchReducer/searchActions';
import { filterCategory } from '../../redux/categoryFilterReducer/categoryFilterActions';

function SearchBar() {
  const [find, setFind] = useState('');
  const query = useSelector((state) => state.searchReducer.query);
  const findQuery = useSelector((state) => state.searchReducer.findQuery);
  const options = useSelector((state) => state.searchReducer.options);

  const dispatch = useDispatch();
  const history = useHistory();

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
    <div>
      <div className="searchBar">
        <form
          className="searchBarForm"
          id="searchBarForm"
          onSubmit={handleSubmit}
        >
          <input
            id="search"
            type="search"
            placeholder="Search..."
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
          {options?.map((result, i) =>
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
