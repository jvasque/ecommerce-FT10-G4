import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadDetail } from "../../reducers/details/detailsSlice";
import "../../scss/components/_ProductDetails.scss";

import bd from "./bd";

const ProductDetails = (props) => {
  let productId = props.match.params.id;

  const dispatch = useDispatch();
  const { productDetail, loadingDetail } = useSelector(
    (state) => state.details
  );
  useEffect(() => {
    dispatch(loadDetail(productId));
  }, []);

  return (
    <div>
   
      {loadingDetail ? (
        <div className="containerDetails">
          <div className="title">
            <h1>{bd.name}</h1>
            <img src={bd.imagenes[0]} alt="nope" />
            <img src={bd.imagenes[1]} alt="nope" />
          </div>
          <div className="elements">
            <h3>Elementos</h3>
            {bd.elementos.map((b) => (
              <li key={bd.elementos.indexOf(b)}>{b}</li>
            ))}
          </div>
          <div className="mezcla">
            <h4>Tipo de Mezcla: {bd.tiposMezcla}</h4>
          </div>
          <div className="presentation">
            <h3>Presentacion</h3>
            {bd.presentacion.map((b) => (
              <li key={bd.presentacion.indexOf(b)}>{b}</li>
            ))}
          </div>
          <div className="description">
            <h3>Descripcion</h3>
            {bd.description.map((b) => (
              <p key={bd.description.indexOf(b)}>{b}</p>
            ))}
          </div>
          <div className="disminucion">
            {bd.disminucion.map((b) => (
              <p key={bd.disminucion.indexOf(b)}>{b}</p>
            ))}
          </div>
          <div className="ventajas">
            <h3>Ventajas</h3>
            <ul>
              {bd.ventajas.map((v) => (
                <li key={bd.ventajas.indexOf(v)}>{v}</li>
              ))}
            </ul>
          </div>
          <div className="dosis">
            <h3>Dosis</h3>
            <ul>
              {bd.dosis.map((v) => (
                <li key={bd.dosis.indexOf(v)}>{v}</li>
              ))}
            </ul>
          </div>
          <div className="quality">
            <h4>{bd.certificadoCal}</h4>
          </div>
          <div className="uso">
            <h3>Cultivo/Uso</h3>
            <ul>
              {bd.cultivoUso.map((v) => (
                <li key={bd.cultivoUso.indexOf(v)}>{v}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default ProductDetails;

{
  /*         
          <div>
            <div>
              <h7>{productDetail.categoryId}</h7>
              <h7>{productDetail.locationId}</h7>
              <div>
                <h5>{productDetail.vendorId}</h5>
                <h5>{productDetail.score}</h5>
              </div>
              <h2>{productDetail.unitPrice}</h2>
            </div>
          </div> */
}
