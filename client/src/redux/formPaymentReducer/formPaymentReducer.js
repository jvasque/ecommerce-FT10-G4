import { SAVE_ID, RETURN_PROD_CART, RETURN_ADDRESS } from "./formPaymentActions";
import axios from "axios";
const initialState = {
  orderId: 0,
};

const returnToCart = async (user, idOrder, total) => {
  await axios.put(`http://localhost:3001/order/orders/${idOrder}`, {
    firstName: user.firstName,
    lastName: user.lastName,
    state: "cart",
    paymentDate: "pending",
    address: "",
    email: user.email,
    phoneNumber: 0,
    totalPrice: total,
  });
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_ID:
      return {
        ...state,
        orderId: payload,
      };
    case RETURN_PROD_CART:
      returnToCart(payload.user, payload.idOrder, payload.total);
      return {
        ...state,
        orderId: payload.idOrder,
      };
    case RETURN_ADDRESS:
      return  {
        ...state,
        address:payload
      }
    default:
      return state;
  }
};

