import React from "react";
import { Link } from "react-router-dom";
import "../../scss/components/ProductCard/_ProductCard.scss";
import DivText from "./DivText.jsx";
import ButtonIconText from "./ButtonIconText";
import ScoreIcon from "./ScoreIcon";

function ProductCard({ product }) {
  let productPromotion = product.promotions || null;
  if (productPromotion) {
    //Los ordeno para tomar la mejor promocion para el consumidor, la mejor promocion quedara (en caso de existir) en la posicion 0
    productPromotion = productPromotion.sort(
      (a, b) => b.discountDate - a.discountDate
    );
  }
  return (
    <div className="productCard">
      {productPromotion?.length > 0 && productPromotion[0].discountDate && (
        <div className="cardDiscount">
          {productPromotion[0].discountDate}% OFF
        </div>
      )}
      <Link className="cardLink" to={`/${product.id}`}>
        <div className="cardPicture">
          <img src={product.picture[0]} alt="product"></img>
        </div>
        <div className="cardContent">
          <div className="cardData">
            <div className="cardScore">
              <div className="starIcon">
                <ScoreIcon score={product.score} />
              </div>
            </div>
            <div className="cardPrice">
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
                    />
                    <del style={{color: "#aaa", fontSize:"20px"}}>{`${product.unitPrice}`}</del>
                  </>
                )}
            </div>
          </div>

          <div className="cardText">
            {/* <p id='nameCard'><b>{product.name}</b></p> */}
            {/* <p id='descriptionCard'>{product.description}</p> */}
            <b>
              <DivText content={product.name} />
            </b>
          </div>
        </div>
      </Link>
      <div className="cardButtons">
        <div className="wishlistButton">
          <div className="cardIcon">
            <ButtonIconText icon="Heart" productId={product.id} />
          </div>
        </div>
        <div className="addCartButton">
          {product.unitsOnStock !== 0 ? (
            <div className="cardIcon">
              <ButtonIconText product={product} productId={product.id} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
