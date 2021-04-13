import React from "react";

function CartProduct({ quantity, productName, price }) {
  return (
    <divproduct>
      <p>{quantity}</p>
      <p>{productName}</p>
      <p>{price}</p>
    </divproduct>
  );
}

export default CartProduct;
