import React from "react";
import "../../scss/components/_Home.scss";

const Home = () => {
  return (
    <div className="containerHome">
      <h1 className='title'>Productos</h1>
      <div className="tabs">
        <input type="radio" id="tab1" name="tab-control" defaultChecked />
        <input type="radio" id="tab2" name="tab-control" />
        <input type="radio" id="tab3" name="tab-control" />
        <input type="radio" id="tab4" name="tab-control" />
        <ul>
          <li title="Features">
            <label htmlFor="tab1" role="button">              
              <br />
              <span>Proteccion de Cultivos</span>
            </label>
          </li>
          <li title="Delivery Contents">
            <label htmlFor="tab2" role="button">
              
              <br />
              <span>Fertilizantes</span>
            </label>
          </li>
          <li title="Shipping">
            <label htmlFor="tab3" role="button">
              
              <br />
              <span>Semillas e Hibridos</span>
            </label>
          </li>
          <li title="Returns">
            <label htmlFor="tab4" role="button">
              
              <br />
              <span>Otros Insumos Agricolas</span>
            </label>
          </li>
        </ul>

        <div className="slider">
          <div className="indicator"></div>
        </div>
        <div className="content">
          <section>
            <h2>Proteccion de Cultivos</h2>
            Renderizamos las catalogo de los productos de Prot de cultivos.
          </section>
          <section>
            <h2>Fertilizantes</h2>
            Renderizamos las catalogo de los productos de Fertilizantes.
          </section>
          <section>
            <h2>Semillas e Hibridos</h2>
            Renderizamos las catalogo de los productos de Semillas e Hibridos.
          </section>
          <section>
            <h2>Otros Insumos Agricolas</h2>
            Renderizamos las catalogo de los productos de otros Insumos Agricolas.
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
