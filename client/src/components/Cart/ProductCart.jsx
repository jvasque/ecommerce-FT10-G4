import React, { useState } from 'react';
import '../../scss/components/Cart/_ProductCart.scss';
import ScoreIcon from '../ProductCard/ScoreIcon';
import DeleteButton from '@material-ui/icons/Delete';
import { Button, Input } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../redux/cartReducer/cartActions';
import { totalPrice, incrementQ } from '../../redux/cartReducer/cartActions';
import { modifyCart } from '../../redux/iconReducer/iconActions';

function ProductCard({ product, setValidation}) {
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(true);
  const [negative, setNegative] = useState(true);

  const dispatch = useDispatch();

  let productPromotion = product.promotions || null;
  if (productPromotion) {
    //Los ordeno para tomar la mejor promocion para el consumidor, la mejor promocion quedara (en caso de existir) en la posicion 0
    productPromotion = productPromotion.sort(
      (a, b) => b.discountDate - a.discountDate
    );
  }

  const handleChange = (e, unitsOnStock) => {
    setQuantity(e.target.value);
    if (e.target.value > unitsOnStock) {
      setValidation(false)
      setStock(false);
      return setQuantity(1);
    }
    if (e.target.value && e.target.value < 1) {
      setValidation(false)
      setQuantity(1);
      setNegative(false);
      return;
    }
    setValidation(true)
    setNegative(true);
    setStock(true);
    dispatch(incrementQ(product, e.target.value));
    dispatch(totalPrice());
  };

  return (
    <div className="productCart">
      <div className="cardPicture">
        <img src={product.picture} alt="product" />
      </div>
      <div className="cartContent">
        <div className="cardData">
          <p className="starIcon">
            <ScoreIcon score={product.score} />
          </p>
        </div>
        {!productPromotion?.length > 0 && <h2 className="cardPrice">Precio: USD${product.unitPrice}</h2>}
              {productPromotion?.length > 0 &&
                productPromotion[0].discountDate && (
                  <>
                    <h2
                      className="cardPrice"
                    >{`USD$${(
                      product.unitPrice-(
                        product.unitPrice *
                      (productPromotion[0].discountDate / 100))
                    ).toFixed(2)}`} | <i>{`${productPromotion[0].discountDate}% OFF`}</i></h2>
                    <del style={{color: "#aaa", fontSize:"15px"}}>Precio: USD${`${product.unitPrice}`}</del>
                  </>
                )}
        <h3>{product.name}</h3>
      </div>
      <div className="cartOptions">
        <div className="deleteButton2">
          <Button
            onClick={() => {
              dispatch(deleteProduct(product));
              dispatch(modifyCart({ [`Cart-${product.id}`]: false }));
              localStorage.removeItem(product.id);
              dispatch(totalPrice());
            }}
          >
            <DeleteButton />
          </Button>
        </div>
        
        <div className="stockOptions">
          <Input
            type="number"
            InputProps={{ inputProps: { min: 0, max: 99999 } }}
            defaultValue={quantity}
            onChange={(e) => handleChange(e, product.unitsOnStock)}
          />
          <p className="stockUp">Disponibles:{product.unitsOnStock}</p>

          {stock ? '' : <p className="stock">No hay stock disponible</p>}
          {negative ? '' : <p className="stock">Ingrese un valor valido</p>} 
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
