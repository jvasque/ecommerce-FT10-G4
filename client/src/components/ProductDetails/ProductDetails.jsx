import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetDetail } from "../../reducers/actions/getDetail";

import "../../scss/components/_ProductDetails.scss";

import bd from "./bd";

const ProductDetails = (props) => {
  let productId = props.match.params.id;

  const dispatch = useDispatch();
  const { productDetails, loading } = useSelector((state) => state.details);
  useEffect(() => {
    dispatch(GetDetail(productId));
  }, []);

  return (
    <div>
      {loading && productId - 1 < bd.length ? (
        <div className="containerDetails">
          <div className="title">
            <h1>{bd[productId - 1].name}</h1>
            <img src={bd[productId - 1].picture} alt="nope" />
          </div>

          <div className="price">
            <h4>Precio: {bd[productId - 1].unitPrice} USD</h4>
          </div>
          <div className="description">
            <h3>Descripcion</h3>
            <p>{bd[productId - 1].description}</p>
          </div>
          <div className="stock">
            <h4>Stock: {bd[productId - 1].unitsOnStock}</h4>
          </div>
          <div className="score">
            <h4>stars: {bd[productId - 1].score}</h4>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default ProductDetails;

