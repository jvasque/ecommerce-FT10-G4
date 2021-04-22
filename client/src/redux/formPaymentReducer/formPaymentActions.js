
export const SAVE_ID = "SAVE_ID";
export const RETURN_PROD_CART = 'RETURN_PROD_CART'

export const saveId = (idOrder) => {
  return {
    type: SAVE_ID,
    payload: idOrder,
  };
};

export const returnProductCart =  (user,idOrder,total) => {
   
  return {
    type: RETURN_PROD_CART,
    payload: {user,idOrder,total},
  };
};
