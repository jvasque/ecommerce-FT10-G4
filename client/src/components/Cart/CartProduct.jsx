import React from "react";
import CardProduct from "./CardProduct";

function CartProduct({ products }) {
  return (
    <div>
      {products.map((product) => (
        <CardProduct
          quantity={product.quantity}
          productName={product.productName}
          price={product.price}
        />
      ))}
    </div>
  );
}

export default CartProduct;
