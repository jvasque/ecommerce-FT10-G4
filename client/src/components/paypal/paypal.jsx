import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import { useSelector } from "react-redux";
let PayPalButton = null;
const Paypal = ({ isScriptLoaded, isScriptLoadSucceed, total }) => {
const user = useSelector(state=>state.cartReducer.cart)
  const [state, setState] = useState({
    showButtons: false,
    loading: true,
    paid: false,
  });

  useLayoutEffect(() => {
    const scriptJustLoaded = !state.showButtons && !isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        setState(...state, { loading: false, showButtons: true });
      }
    }
  }, [isScriptLoadSucceed, isScriptLoaded, state]);

  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      setState({ loading: false, showButtons: true });
    }
  }, [isScriptLoadSucceed, isScriptLoaded]);

  const createOrder = (data, actions) => {
   
    return actions.order.create({
      purchase_units: [
        {
          description: 'Productos del Agro',
          amount: {
            currency_code: "USD",
            value: total,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    
    actions.order.capture().then(() => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID,
      };

      setState({ showButtons: false, paid: true });
    });
  };

  return (
    <div className="main">
      {state.showButtons && (
        <div>
           <PayPalButton
            createOrder={(data, actions) => createOrder(data,actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        </div>
      )}

      {state.paid && (
        <div className="main">
          <img src="https://lh3.googleusercontent.com/proxy/pEn88o4-vxKuUaOJdKK2Frhxql7tgYef00ov6rO9anX660AT7zoQivsYeOXmhjdDP1quf5SbY4Sj1QdhA538AwZmGT5Vdlso-TB4pA8z8KWP620Tj8CE0KXKw3DYlOs" />
        </div>
      )}
    </div>
  );
};

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=AWYojyzhiP95rFb-XGMQU67p4_dKGieO02dEOIiPD70diKAtmlxaiGfeplqMSNYxXOmkNn-aqSIwtNs5`
)(Paypal);
