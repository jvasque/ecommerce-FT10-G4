import React from "react";
import "../../scss/components/_Footer.scss";
// import { FaInstagram, AiOutlineFacebook, AiOutlineTwitter } from "react-icons/bi";
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div className="foot">
      <footer className="site-footer">        
          <div className="row">
            <div className="about">
              <h6>Quienes somos</h6>
              <p className="text-justify">
              A través de los años formamos una red de distribución que facilita la llegada de nuestros productos a las diferentes zonas de Latino America y el mundo. Nuestro compromiso es tener la más rápida respuesta para que los productos llegue en tiempo y forma a nuestros clientes.
              </p>
            </div>
            <div className="linksrap">
              <h6>Links rapidos</h6>
              <ul className="footer-links">
                <li>
                <Link to="/">Pagina Principal</Link>                  
                </li>
                <li>
                <Link to="/catalog">Catalogo</Link>                  
                </li>               
                <li>
                <Link to="/">Politica de Privacidad</Link>                  
                </li>               
              </ul>
            </div> 
        </div>
        <hr />
        <div className="container-footer">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12 elements" > 
              <p className="copyright-text">
                Copyright &copy; 2021 Todos los derechos reservados por 
                <a href="#"> Web-FT10-04</a>.
              </p>
            </div>

            <div className="social-links">
              <ul className="social-icons">
                <li>
                  <a className="facebook" href="#">
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a className="twitter" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>                
                <li>
                  <a className="linkedin" href="#">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
