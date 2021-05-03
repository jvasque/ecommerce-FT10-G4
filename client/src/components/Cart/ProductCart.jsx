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

  const handleChange = (e, unitsOnStock) => {
    setQuantity(e.target.value);
    if (e.target.value > unitsOnStock) {
      setValidation(false)
      setStock(false);
      //return setQuantity(1);
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
        <h2 className="cardPrice">{`USD$ ${product.unitPrice}`}</h2>
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
