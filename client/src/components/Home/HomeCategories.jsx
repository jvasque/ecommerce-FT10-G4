import React from "react";
import { Link } from "react-router-dom";
import "../../scss/components/Home/_HomeCategories.scss";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import { filterCategory } from "../../redux/categoryFilterReducer/categoryFilterActions";

const HomeCategories = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (cat) => {
    dispatch(filterCategory(cat));
    history.push({
      pathname: "/catalog",
    });
  };
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
       <div className='cardContent1'>
          <div className='text1'>
              <h2>Proteccion de Cultivos</h2>
              <p>
                En nuestra página reunimos la mejor y más amplia variedad de protección de cultivos, pudiendo encontrar productos agroquímicos para diferentes necesidades, que van desde fungicidas hasta herbicidas y otros insumos.
                <div className='verMas' onClick={()=>handleClick('Proteccion de Cultivos')}>Ver más</div>
              </p>
          </div>
       </div>
     </section>
     <section>
        <div className='cardContent2'>
          <div className='text2'>
            <h2>Fertilizantes</h2>
              <p>
                En nuestra página vas a encontrar una inmensa variedad de insumos para fertilizar a nivel nutricional, estimular el crecimiento y mejorar la calidad de tus cultivos!
                <div className='verMas' onClick={(e)=>handleClick('Fertilizantes')}>Ver más</div>
              </p>
          </div>
        </div>  
     </section>
     <section>
        <div className='cardContent3'>
          <div className='text3'>
            <h2>Semillas e Hibridos</h2>
              <p>
                Si estás buscando cultivar, ¡AgroPlace es el sitio indicado para vos!. Tenemos la más amplia variedad de semillas de las mejores marcas y calidad, para mejorar la producción extensiva de tu campo
                <div className='verMas' onClick={()=>handleClick('Semillas e Hibridos')}>Ver más</div>
              </p>
          </div>
        </div>     
     </section>
     <section>
        <div className='cardContent4'>
          <div className='text4'>
          <h2>Otros Insumos Agricolas</h2>
              <p>
                Variedad de insumos agrícolas desde silobolsas hasta tratamientos de semillas para mejorar y personalizar el cultivo de tu campo.
                <div className='verMas' onClick={()=>handleClick('Otros Insumos Agricolas')}>Ver más</div>
              </p>
          </div>
        </div>      
     </section>
   </div>
 </div>
</div> 
  );
};

export default HomeCategories;