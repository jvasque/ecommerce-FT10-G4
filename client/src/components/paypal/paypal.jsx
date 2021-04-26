import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import '../../scss/components/FormPayment/_FormPayment.scss';
import { useHistory } from 'react-router';
import axios from 'axios';

const Paypal = ({ dataClient }) => {
  const cart = useSelector((state) => state.cartReducer);
  const id = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  useEffect(() => {
    const a = async () =>
      await axios.put(`http://localhost:3001/order/orders/${id}`, {
        firstName: dataClient.firstName,
        lastName: dataClient.lastName,
        state: 'cart',
        paymentDate: 'paypal',
        address: dataClient.address,
        email: dataClient.email,
        phoneNumber: dataClient.phoneNumber,
        totalPrice: cart.total,
      });

    a();
  });

  return (
    <div>
   
  
      <PayPalButton
        style={{ color: 'blue' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: cart.total,
                },
              },
            ],
            application_context: {
              shipping_preference: 'NO_SHIPPING',
            },
          });
        }}
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          // return actions.order.capture().then(function(details) {
          //   // Show a success message to your buyer
          //   alert("Transaction completed by " + details.payer.name.given_name);

          //   // OPTIONAL: Call your server to save the transaction
          //   return fetch("/paypal-transaction-complete", {
          //     method: "post",
          //     body: JSON.stringify({
          //       orderID: data.orderID
          //     })
          //   });
          // });

          history.push('/order/complete');
        }}
      />
     
     
    </div>
  );
};

export default Paypal;
