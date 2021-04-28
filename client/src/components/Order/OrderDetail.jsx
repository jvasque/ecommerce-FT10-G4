import React from "react";
import "../../scss/components/Order/_OrderDetail.scss";
import DivText from "../ProductCard/DivText";
function OrderDetail({ product }) {

  return (
    <div className="orderCard">
      <div>
        <div className="cardPicture">
          <img src={product.picture[0]} alt="product"></img>
        </div>
        <div className="cardContent">
          <div className="cardPrice">
            <DivText content={`Cantidad: ${product.quantity}`} />
            <DivText
              content={`Valor : USD$${product.unitPrice * product.quantity} `}
            />
          </div>

          <div className="cardText">
            <b>
              <DivText content={product.name} />
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
