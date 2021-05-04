import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../redux/cartReducer/cartActions";
import axios from "axios";
import { reset } from "../../redux/iconReducer/iconActions";
import { useHistory } from "react-router";
import { RiWindowLine } from "react-icons/ri";

export default function Successful({ payment }) {
  const userId = localStorage.getItem("user");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const locationId = localStorage.getItem("distributionNumber");
  const productSend = cart.cart?.map((el) => el.name);
  const idProducts = cart.cart?.map((product) => product.id);

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
      });
      await axios.post(
        `http://localhost:3001/email/buy-confirmation`,
        { products: productSend },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let location = await axios.get(`http://localhost:3001/locations/1`);

      let productsLocation = await location.data?.unitsOnLocations?.filter(
        (location) => idProducts.includes(location.product.id)
      );
  
      for (let i = 0; i < productsLocation.length; i++) {
        const el = cart.cart.find(
          (product) => product.id === productsLocation[i].product.id
        );
  
        const stock = productsLocation[i].unitsOnStock - el.quantity;
        console.log(stock);
        await axios.put(
          `http://localhost:3001/locations/unitsonlocation/${locationId}`,
          {
            productId: el.product.id,
            stock: stock,
          }
        );
      }
      

      //     for(let i =0; i<productSaved.length; i++) {
      //         const stock = productSaved[i].unitsOnStock - productSaved[i].quantity
      //         await axios.put(`http://localhost:3001/products/${productSaved[i].id}`, {
      //             params: {
      //                 unitsOnStock: stock
      //             }
      //         })

      //     }

      //Traer los productos de la location, sacar los que coinciden con el id de
      // los productos del cart y restar unitsOnStock-quantity hacer put
    }

    stock();

    history.push({
      pathname: "/",
    });
  }, []);

  return <div></div>;
}
