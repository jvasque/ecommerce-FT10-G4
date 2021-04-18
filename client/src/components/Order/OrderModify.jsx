import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { totalPrice, incrementQ } from "../../redux/cartReducer/cartActions";
import "../../scss/components/Order/_OrderModify.scss";
//form que muestre lista de productos y permita editar cantidad
//Eliminar un producto

const OrderModify = () => {
  const products = useSelector((state) => state.cartReducer.cart);
  const [productName, setProductName] = useState();
  const productToModify = products.filter((prod) => prod.name === productName);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(true);


  const onSubmitForm = (e) => {
    e.preventDefault();
  };
  const handleChange = (value, unitsOnStock) => { 
    setQuantity(value);
    if (value > unitsOnStock) {
      setStock(false);
      return setQuantity(1);
    }  
   
    setStock(true);
    //setQuantity(0);
    dispatch(incrementQ(productToModify[0], value));
    dispatch(totalPrice());
  };

  //console.log(productToModify)

  return (
    <div className="container-OrderForm">
      <div className="box-form">
        <h3>MODIFICAR DATOS DE COMPRA</h3>
        <div className="box-options">
          <div>
            <select
              className="select-order"
              type="text"
              name=""
              required
              onChange={(e) => {
                setProductName(e.target.value);
                setQuantity(0);
              }}
            >
              <option defaultValue>-Seleccione un producto-</option>
              {products?.map((product) => (
                <option key={product.name} value={product.name}>
                  {product.quantity} x {product.name}
                </option>
              ))}
            </select>
          </div>
          <form onSubmit={onSubmitForm}>
            {productToModify.length ? (
              <>
                <label className="label-order" htmlFor="product">
                  Cambiar cantidad
                </label>
                <input
                  name="product"
                  type="number"
                  min="0"
                  max={productToModify[0].unitsOnStock}
                  className="input-order"
                  type="text"
                  placeholder="cantidad"
                  value={quantity}
                  onChange={(e) => {
                    let value =
                      parseInt(e.target.value) <= 0 ? 1 : e.target.value;
                    console.log(typeof e.target.value);
                    handleChange(value, productToModify[0]["unitsOnStock"]);
                  }}
                ></input>
                <p className="stockUp">
                  Disponibles:{productToModify[0].unitsOnStock}
                </p>
                {stock ? "" : <p className="stock">No hay stock disponible</p>}
              </>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModify;
