import React from 'react'
import { Link } from "react-router-dom";
import "../../scss/components/_Nav.scss";
import { useHistory } from "react-router";
import { useDispatch, useSelector} from "react-redux";
import { filterCategory } from '../../redux/categoryFilterReducer/categoryFilterActions';
import { resetQuery } from '../../redux/searchReducer/searchActions';
import { setPage } from '../../redux/catalogReducer/catalogActions';
// npm install --save-dev @iconify/react @iconify-icons/mdi
//import { Icon, InlineIcon } from "@iconify/react";
//import loginIcon from "@iconify-icons/mdi/login";
import SearchBar from "../SearchBar/SearchBar";
import AdminMenu from "../Nav/AdminMenu";

const Nav = () => {
  const categories = useSelector(state => state.categoryFilterReducer.categories)
  const history = useHistory();
  const dispatch = useDispatch();


  function handleClick(cat){
    dispatch(filterCategory(cat))
    dispatch(setPage(1))
    dispatch(resetQuery())
    history.push({
      pathname:  "/catalog",
    })
  }

  return (
  <div className="Nav">
    
    <div className="header">
      <div className="headerSection">
        <div className="headerSection__bg"></div>
          <div className="headerSection__logo">
          <Link to='/'>
            <img
              id="logo"          
              src="https://cdn.discordapp.com/attachments/803407061203025931/830813714487181382/AgroPlace-logo_png.png"
              alt=""
            />
          </Link>
            {/* <svg viewBox="0 0 24 24">                   
            </svg> */}            
          </div>    
          <h1 className="headerSection__title">Sembremos futuro</h1>
          {/* <div className="headerSection__log">
             <svg className="headerSection__log--icon" width="24" height="24" viewBox="0 0 24 24">
              FaInstagram, AiOutlineFacebook, AiOutlineTwitter
            </svg> 
          </div> */}
        </div>
      </div>
    
    <div className="navElements">
      <div className="dropdown">
        <ul className="hList">
            <div className="menu">
              <h2 className="menu-title" onClick={() => handleClick('')}>Productos</h2>
              <ul className="menu-dropdown">
              {
                categories.map((category, index) => {
                    return (
                        <div className='categoriesLoaded' key={index}  onClick={() => handleClick(category.name)}>   
                          <li>{category.name}</li>                                              
                        </div>
                        )
                })
              }
              </ul>
            </div>
        </ul>
      </div>
      
      <SearchBar />
      
      <AdminMenu />
    </div>
  </div>
  );
};

export default Nav;
