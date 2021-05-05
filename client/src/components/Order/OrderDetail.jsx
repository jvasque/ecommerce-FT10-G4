import React from "react";
import { useSelector } from "react-redux";
import "../../scss/components/Order/_OrderDetail.scss";
import DivText from "../ProductCard/DivText";
function OrderDetail({ product }) {
  let productPromotion = product.promotions || null;
  if (productPromotion) {
    //Los ordeno para tomar la mejor promocion para el consumidor, la mejor promocion quedara (en caso de existir) en la posicion 0
    productPromotion = productPromotion.sort(
      (a, b) => b.discountDate - a.discountDate
    );
  }
  return (
    <div className="orderCard">
      <div>
        <div className="cardPicture">
          <img src={product.picture} alt="product"></img>
        </div>
        <div className="cardContent">
          <div className="cardPrice">
            <DivText content={`Cantidad: ${product.quantity}`} />
            {!productPromotion?.length > 0 && (
                <DivText content={`USD$${product.unitPrice}`} />
              )}
              {productPromotion?.length > 0 &&
                productPromotion[0].discountDate && (
                  <>
                    <DivText
                      content={`USD$${(
                        product.unitPrice-(
                        product.unitPrice *
                        (productPromotion[0].discountDate / 100))
                      ).toFixed(2)}`}
                      discount={product.unitPrice}
                    />
                    
                  </>
                )}
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
