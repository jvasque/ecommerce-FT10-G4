import React from 'react';
import '../../scss/components/Footer/_Footer.scss';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="foot">
      <footer className="site-footer">
        <div className="row">
          <div className="about">
            <h6>Quienes somos</h6>
            <p className="text-justify">
              A través de los años formamos una red de distribución que facilita
              la llegada de nuestros productos a las diferentes zonas de Latino
              America y el mundo. Nuestro compromiso es tener la más rápida
              respuesta para que los productos llegue en tiempo y forma a
              nuestros clientes.
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
            <div className="elements">
              <p className="copyright-text">
                Copyright &copy; 2021 Todos los derechos reservados por
                <span>Web-FT10-04</span>.
              </p>
            </div>

            <div className="social-links">
              <ul className="social-icons">
                <li>
                  <a
                    className="facebook"
                    href="https://www.facebook.com/soyhenryok/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a
                    className="instagram"
                    href="https://www.instagram.com/soyhenry_ok/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a
                    className="twitter"
                    href="https://twitter.com/soyhenry_ok"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a
                    className="linkedin"
                    href="https://www.linkedin.com/school/soyhenry/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn />
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
