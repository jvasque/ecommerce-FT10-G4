import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DivText from "../ProductCard/DivText";
import "../../scss/components/AllOrders/_AdminOrderDetail.scss";
import "../../scss/components/Admin/_UserAccount.scss";



const History = ({ user }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState(false);
  let activeToggle = state ? "active" : "inactive";

  function toggle() {
    setState(!state);
    activeToggle = state ? "active" : "inactive";
    console.log(activeToggle);
  }
  if (!!user) {
    return (
      <div className="containerOrder">
        <div className="order inactive">
          <div className="orderId" onClick={toggle}>
            <DivText content={user.id} />
          </div>
          <div className="orderStatus" onClick={toggle}>
            <DivText content={user.firstName} />
          </div>
          <div className="orderCreatedAt" onClick={toggle}>
            <DivText content={user.lastName} />
          </div>
          <div className="orderUpdatedAt" onClick={toggle}>
            <DivText content={user.email} />
          </div>
          <div className="orderPayment" onClick={toggle}>
            <DivText content={user.type} />
          </div>
          <div className="orderTotal" onClick={toggle}>
            <DivText content={user.status} />
          </div>
        </div>

        <div className={activeToggle}>
          <div className="folding-pannel">
            <div className="buttons">              
              <FormControl variant="outlined" className={"aca va el template del email"}>   
              </FormControl>   
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return () => {};
  }
};

export default History;
