
import React,{useState, useEffect } from 'react'
import axios from "axios"
import SendCard from './SendCard';
import DivText from '../ProductCard/DivText';
import "../../scss/components/SendOrder/_SendOrder.scss"

export default function SendOrder() {

    const [orders, setOrders] =  useState([])

    const userId = localStorage.getItem("user")

    async function getOrderHistory() {
        let data = await axios.get(`http://localhost:3001/users/${userId}/orders`)
        const filter = data?.data?.filter(x => x.state === "created")
      
        setOrders(filter)
    }

    useEffect(() => {
     getOrderHistory()
    }, [])
     


    return (
        <div>
             <div className="containerOrderSend">
        <div className="containerFilterOrder">
          <div className="updateFilterSend" >
            <DivText content="Fecha de compra" />
          </div>
          <div className="paymentFilterSend" >
            <DivText content="Metodo de Pago" />
          </div>
          <div className="totalFilterSend" >
            <DivText content="Valor Total" />
          </div>
          <div className="totalFilterSend" >
            <DivText content="Seguir envio" />
          </div>
        </div>
        </div>
          {orders?.map(order => <SendCard order={order}/>)}
        </div>
    )
}
