import React from "react";
import "../../scss/components/_Home.scss";

const Home = () => {
  return (
    <div className="containerHome">
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
              <span>Otros Insumos</span>
            </label>
          </li>
        </ul>

        <div className="slider">
          <div className="indicator"></div>
        </div>
        <div className="content">
          <section>
            <h2>Proteccion de Cultivos</h2>
            En nuestra página reunimos la mejor y más amplia variedad de protección de cultivos, pudiendo encontrar productos agroquímicos para diferentes necesidades, que van desde fungicidas hasta herbicidas y otros insumos.
            <img src='https://argentina.agrofystatic.com/media/catalog/product/cache/1/image/850x600/0dc2d03fe217f8c83829496872af24a0/g/l/gl_agrofy_piezas_seleccion_punto-35.jpg?usewebp=true'></img>
          </section>
          <section>
            <h2>Fertilizantes</h2>
            En nuestra página vas a encontrar una inmensa variedad de insumos para fertilizar.
            <img src='https://argentina.agrofystatic.com/media/catalog/product/cache/1/image/850x600/0dc2d03fe217f8c83829496872af24a0/m/e/mezcla_granulada_50.jpg?usewebp=true'></img>
          </section>
          <section>
            <h2>Semillas e Hibridos</h2>
            Si estás buscando cultivar, ¡AgroPlace es el sitio indicado para vos!. Tenemos la más amplia variedad de semillas de las mejores marcas y calidad, para mejorar la producción extensiva de tu campo
            <img src='https://argentina.agrofystatic.com/media/catalog/product/cache/1/image/850x600/0dc2d03fe217f8c83829496872af24a0/b/o/bolsas_trigo_arg_algarrobo_300x300.jpg?usewebp=true'></img>
          </section>
          <section>
            <h2>Otros Insumos Agricolas</h2>
            Variedad de insumos agrícolas desde silobolsas hasta tratamientos de semillas para mejorar y personalizar el cultivo de tu campo.
            <img src='https://argentina.agrofystatic.com/media/catalog/product/cache/1/image/850x600/0dc2d03fe217f8c83829496872af24a0/f/a/facebook-producto600x400--mantas.jpg?usewebp=true'></img>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
