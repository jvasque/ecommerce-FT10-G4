import React from "react";
import { Link } from "react-router-dom";
import "../../scss/components/_Nav.scss";
// npm install --save-dev @iconify/react @iconify-icons/mdi
import { Icon, InlineIcon } from "@iconify/react";
import loginIcon from "@iconify-icons/mdi/login";
import SearchBar from "../SearchBar/SearchBar";
import AdminMenu from "../Nav/AdminMenu";

const Nav = () => {
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
            <a href="/catalog" className="menu">
              <h2 className="menu-title">Productos</h2>
              <ul className="menu-dropdown">
                <li href="/catalog">Proteccion de Cultivos</li>
                <li href="/catalog">Fertilizantes</li>
                <li href="/catalog">Semillas e Hibridos</li>
                <li href="/catalog">Otros Insumos Agricolas</li>                
              </ul>
            </a>
        </ul>
      </div>
      
      <SearchBar />
      
      <AdminMenu />
    </div>
  </div>
  );
};

export default Nav;
