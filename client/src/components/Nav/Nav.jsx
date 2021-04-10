import React from "react";
import { Link } from "react-router-dom";
import "../../scss/components/_Nav.scss";
// npm install --save-dev @iconify/react @iconify-icons/mdi
import { Icon, InlineIcon } from "@iconify/react";
import loginIcon from "@iconify-icons/mdi/login";

const Nav = () => {
  return (
    <div className="Nav">
      <Link>
        <img
          id="logo"
          src="https://cdn.discordapp.com/attachments/828719452828860436/830295466481549332/logo-mercagro.png"
          alt=""
        />
      </Link>
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
      <div className="search-box">
        <form>
          <input type="search" placeholder="Buscar..." />
          <span className="searchspan"></span>
        </form>
      </div>
      {/* <div>
        <Icon icon={loginIcon} height="70" />
      </div> */}
    </div>
  );
};

export default Nav;
