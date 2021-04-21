import React, { useState } from "react";
// import OrderDetail from './OrderDetail'
// import { sortByName, sortByQuantity, sortByPrice, sortByCost } from './FilterOrderDetail'
import DivText from "../ProductCard/DivText";
import "../../scss/components/OrderHistory/_OrderHistory.scss";
import "../../scss/components/OrderHistory/_FilterOrderDetail.scss";
import { Select, Button } from "@material-ui/core";

const UserAccount = ({ user }) => {
  const [state, setState] = useState(false);
  // const [ordersDetails, setOrdersDetails] = useState(order.orderDetails)
  const [sort, setSort] = useState({
    name: false,
    quantity: false,
    price: false,
    cost: false,
  });
  let activeToggle = state ? "active" : "inactive";

  function toggle() {
    setState(!state);
    activeToggle = state ? "active" : "inactive";
  }

  // function sortName(){
  //     let [newOrdersDetails, newSort] = sortByName(ordersDetails, sort)
  //     setSort(newSort)
  //     setOrdersDetails(newOrdersDetails)
  // }

  // function sortQuantity(){
  //     let [newOrdersDetails, newSort] = sortByQuantity(ordersDetails, sort)
  //     setSort(newSort)
  //     setOrdersDetails(newOrdersDetails)
  // }

  // function sortPrice(){
  //     let [newOrdersDetails, newSort] = sortByPrice(ordersDetails, sort)
  //     setSort(newSort)
  //     setOrdersDetails(newOrdersDetails)
  // }

  // function sortCost(){
  //     let [newOrdersDetails, newSort] = sortByCost(ordersDetails, sort)
  //     setSort(newSort)
  //     setOrdersDetails(newOrdersDetails)
  // }
  console.log(user);
  if (!!user) {
    return (
      <div className="containerOrder">
        <div className={activeToggle}>
          <div className="order" onClick={toggle}>
            <div className="orderId">
              <Button className="delete" variant="outlined" color="secondary">
                X
              </Button>
              <DivText content={user.id} />
            </div>

            <div className="orderStatus">
              <DivText content={user.firstName} />
            </div>
            <div className="orderCreatedAt">
              <DivText content={user.lastName} />
            </div>
            <div className="orderUpdatedAt">
              <DivText content={user.email} />
              <Button variant="contained">Modificar</Button>
            </div>
            <div className="orderPayment">
              <DivText content={user.type} />
            </div>
            <div>           
            <Select className="selType">
                <option>Amin</option>
                <option>User</option>
                <option>Banned</option>
              </Select>
            </div>
            <div className="orderTotal">
              <DivText content={user.status} />
            </div>
          </div>
          {/* <div className="folding-pannel filter">
                        <div className='containerFilterOrderDetail'>
                            <div className='orderFilterDetailName' onClick={sortName}><DivText content='Producto'/></div>
                            <div className='orderFilterDetailQuantity' onClick={sortQuantity}><DivText content='Cantidad'/></div>
                            <div className='orderFilterDetailPrice' onClick={sortPrice}><DivText content='Precio Unidad'/></div>
                            <div className='orderFilterDetailCost' onClick={sortCost}><DivText content='Costo por Item'/></div>
                        </div>  
                    </div> */}
          {/* {
                        ordersDetails?.map(orderDetail => {
                            return <div className="folding-pannel answer" key={`OrderDetail-${orderDetail.id}-${order.id}`}>
                                        <OrderDetail product={orderDetail}/>
                                    </div>
                        })
                    }    */}
          {/* <div className='order' onClick={toggle}><DivText content={user.id}/></div>  */}
        </div>
      </div>
    );
  } else {
    return () => {};
  }
};

export default UserAccount;
