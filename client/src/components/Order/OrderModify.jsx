import React,{useState} from "react";
import { useSelector } from "react-redux";
import "../../scss/components/Order/_OrderModify.scss";
import FormOrder from "./FormOrder";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/cartReducer/cartActions";
import { totalPrice, incrementQ } from "../../redux/cartReducer/cartActions";
import { modifyCart } from "../../redux/iconReducer/iconActions";
//form que muestre lista de productos y permita editar cantidad
//Eliminar un producto

const OrderModify = () => {
  const products = useSelector((state) => state.cartReducer.cart);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(true);
  const [negative, setNegative] = useState(true);

  const dispatch = useDispatch();

  const handleChange = (e, unitsOnStock) => {
    console.log(e.target.value);
    setQuantity(e.target.value);
    if (e.target.value > unitsOnStock) {
      setStock(false);
      return setQuantity(1);
    }
    if (e.target.value && e.target.value < 1) {
      setQuantity(1);
      setNegative(false);
      return;
    }
    // setNegative(true);
    // setStock(true);
    // dispatch(incrementQ(product, e.target.value));
    // dispatch(totalPrice());
  };

  return (
    <div className="container-OrderForm">
      <FormOrder label="Modificar Orden" valueInputSubmit="Modificar" />
      <select
        className="select-category"
        type="text"
        name=""
        required
        //onChange={(e) => setCategorySelect(e.target.value)}
      >
        <option defaultValue>-Seleccione un producto-</option>
        {products?.map((product) => (
          <option key={product.name} value={product.name}>
            {product.quantity} x {product.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrderModify;
