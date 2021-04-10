import React from 'react'
import '../../scss/components/_Footer.scss'
// import { FaInstagram, AiOutlineFacebook, AiOutlineTwitter } from "react-icons/bi";

const Footer = () => {
    return (
        <div className="footer">
            <div className="headerFooter">
            <div className="headerFooter__bg"></div>
            <div className="headerFooter__logo">
                <svg viewBox="0 0 24 24">                   
                </svg>
            </div>
            <h1 className="headerFooter__title">Crece con nosotros.</h1>
            <div className="headerFooter__log">
                <svg className="headerFooter__log--icon" width="24" height="24" viewBox="0 0 24 24">
                {/* FaInstagram, AiOutlineFacebook, AiOutlineTwitter */}
                </svg>
                
            </div>
            </div>

            <div className="aboutFooter">
            <div className="aboutFooter__title">
                <h2 className="aboutFooter__title--text">Who we are?</h2>
            </div>
            <div className="aboutFooter__text">
                <p className="aboutFooter__text--content">
                    Somos un grupo dedicado a la venta de insumos agropecuarios, siempre cuidando los intereses de nuestros clientes y del medio ambiente.
                    
                    <br/>
                    
                    Best team in the group is definetly Kappa, im sure everyone agrees!
                    
                    <br/>
                    
                    Hope everyone enjoys this Footer!
                </p>
            </div>
            </div>
        </div>
    )
}

export default Footer;


