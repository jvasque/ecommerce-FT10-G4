import React,{useEffect, useState} from 'react';
import OrderDetail from './OrderDetail';
import { useSelector } from 'react-redux';
import '../../scss/components/Order/_Order.scss';
import '../../scss/components/formCategories/_Form.scss';
import FormPayment from '../formPayment/FormPayment';
import axios from 'axios';

function Order() {
  const product = useSelector((state) => state.cartReducer.cart);

  const [checkLocation, setCheckLocation] = useState([])
 

  useEffect(() => {
    async function location(){
    const allLocation  = await axios.get("http://localhost:3001/locations")
    const myArray = allLocation.data.map(x => x.unitsOnLocations)

    var idLocations = []

    for(let i=0; i<myArray.length; i++) {
     const check=  myArray[i].filter(x => {
         const prod = product.find(e => e.id === x.product.id) 
         if(prod) {
           if(prod.quantity <= x.unitsOnStock ){
             return true
           } else {
             i++
             return false 
           }
         }
        }
     )

     if(check.length === product.length){
       idLocations.push(i+1)
       setCheckLocation(idLocations)
     }
    }}
    
    location()
   
  }, [])
  
  console.log(checkLocation)
 
  return (
    <div className="checkoutCart">
      <div className="order-container">
        <div className="cart">
          {product ? (
            product?.map((product) => <OrderDetail product={product} />)
          ) : (
            <h1>No hay elementos en el carrito</h1>
          )}
        </div>
       
      </div>

      <div className="total">
        <FormPayment />
      </div>
    </div>
  );
}
/* {total ? <h2>Total ${total}</h2> : ""}
<Button onClick={(e) => mercadopago(e)}><a href={url}>Continuar Compra</a></Button> */

export default Order;
