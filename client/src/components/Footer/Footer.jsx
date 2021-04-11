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
                <h2 className="aboutFooter__title--text">Quienes somos?</h2>
            </div>
            <div className="aboutFooter__text">
                <p className="aboutFooter__text--content">
                    Si estás buscando comprar Insumos Agrícolas, ¡llegaste al lugar indicado! En MercAgro tenemos la más amplia variedad de agro insumos que te acompañan desde la siembra hasta el cuidado y protección de tus cultivos, con productos de las mejores marcas y calidad. Vas a encontrar todo en protección de cultivos como herbicidas, insecticidas, fungicidas y coadyuvantes; semillas con las mejores propiedades; tratamiento de semillas, inoculantes y hasta silo bolsas para almacenar tus granos o forraje. En nuestro sitio encontrar lo que buscás es super sencillo, tenemos filtros que se ajustan a tu medida, donde vas a poder hacer de una búsqueda general una búsqueda minuciosa, ajustando el camino hasta llegar al producto que necesitas. MercAgro quiere que te sientas cómodo y por eso tenemos un rango de precios donde podés poner tu máximo que tenes para gastar e invertir en el campo, y también podes ordenar los listados por avisos más relevantes, menor o mayor precio; o llenando el formulario vas a poder contactarte con el vendedor y obtener tu cotización. Aprovechá las facilidades que te da Mercagro y ¡comprá ya los insumos para tu campo!
                    <br/> 
                </p>
            </div>
            </div>
        </div>
    )
}

export default Footer;


