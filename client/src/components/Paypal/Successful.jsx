import React, { useEffect } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../redux/cartReducer/cartActions";
import axios from "axios";
import { reset } from "../../redux/iconReducer/iconActions";
import { useHistory } from "react-router";
import db from '../Map/firebase'

export default function Successful({ payment }) {
  const userId = localStorage.getItem("user");
  const dispatch = useDispatch();
  const productBuy = useSelector((state) => state.cartReducer.cart);
  const history = useHistory();
  const token = localStorage.getItem("token");

  const productSend = productBuy?.map((el) => el.name);
  const address = useSelector((state) => state.paymentIdReducer.address);
  const dataUser = useSelector((state) => state.loginReducer.user);

  useEffect(() => {
    async function stock() {
      swal(
        "Tu compra ha sido completada!",
        "Gracias por confiar en nosotros",
        "success"
      );
      const productSaved = productBuy;
      dispatch(emptyCart());
      await axios.put(`http://localhost:3001/order/${userId}/state`, {
        state: "created",
        paypal: "Paypal",
      });
      dispatch(reset());

      for (let i = 0; i < productSaved.length; i++) {
        const stock = productSaved[i].unitsOnStock - productSaved[i].quantity;
        console.log(stock);
        await axios.put(
          `http://localhost:3001/products/${productSaved[i].id}`,
          {
            params: {
              unitsOnStock: stock,
            },
          }
        );
      }
      await axios.post(
        `http://localhost:3001/email/buy-confirmation`,
        { products: productSend },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      
      // const apiData = await axios.get(
      //   `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=q25zaLysr0fVTbApPZXE9dwg-PoUlN-n89C5d_o6lhY&searchtext=${address?.replace(" ",'+')}`
      // );
      // let dataRes =
      //   apiData?.data?.Response?.View[0]?.Result[0]?.Location?.DisplayPosition;
       
      // await db.collection("GPS").add({
      //   location: {
      //     longitude: dataRes?.Longitude,
      //     latitude: dataRes?.Latitude,
      //   },
      //   //orderId: order.id,
      //   address: address,
      //   distributionCenter: 1,        
      //   name: `${dataUser.firstName} ${dataUser.lastName}`,

      //   // distributionCenter: location
      // });
    }

    stock();
    history.push({
      pathname: "/",
    });
  }, []);

  return <div></div>;
}
