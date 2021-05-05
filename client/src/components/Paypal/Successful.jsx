import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from '../../redux/cartReducer/cartActions';
import axios from 'axios';
import { reset } from '../../redux/iconReducer/iconActions';
import { useHistory } from 'react-router';

export default function Successful() {
  const userId = localStorage.getItem('user');
  const dispatch = useDispatch();
  const productBuy = useSelector((state) => state.cartReducer.cart);
  const locationId = useSelector((state) => state.cartReducer.location);
  const history = useHistory();
  const token = localStorage.getItem('token');

  const productSend = productBuy?.map((el) => el.name);
  const idProducts = productBuy?.map((product) => product.id);

  useEffect(() => {
    async function stock() {
      swal(
        "Tu compra ha sido completada!",
        "Gracias por confiar en nosotros",
        "success"
      );

      dispatch(emptyCart());
      dispatch(reset());

      await axios.put(`http://localhost:3001/order/${userId}/state`, {
        state: "created",
        paypal: "Paypal"
      });
      await axios.post(
        `http://localhost:3001/email/buy-confirmation`,
        { products: productSend },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
        let location = await axios.get(`http://localhost:3001/locations/${locationId}`);

        let productsLocation = await location.data?.unitsOnLocations?.filter(
          (location) => idProducts.includes(location.product.id)
        );
  
        for (let i = 0; i < productsLocation.length; i++) {
          const el = productBuy.find(
            (product) => product.id === productsLocation[i].product.id
          );
    
          const stock = productsLocation[i].unitsOnStock - el.quantity;
          await axios.put(
            `http://localhost:3001/locations/unitsonlocation/${locationId}`,
            {
              productId: el.id,
              stock: stock,
            }
          );
        }
      

      /*   const productSaved = cart.cart

        for(let i =0; i<productSaved.length; i++) {
          const stock = productSaved[i].unitsOnStock - productSaved[i].quantity
         await axios.put(`http://localhost:3001/products/${productSaved[i].id}`, {
             params: {
                 unitsOnStock: stock
             }
        })

      } */
    
    }

    stock();

    history.push({
      pathname: "/",
    });
  }, []);

  return <div></div>;
}
