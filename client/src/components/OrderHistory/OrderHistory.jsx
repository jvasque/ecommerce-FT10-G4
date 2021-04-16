import React, { useEffect, useState } from "react";
import axios from "axios";
import DivText from '../ProductCard/DivText'
import PastOrder from './PastOrder'
import { sortById, sortByState, sortByCreation, sortByUpdate, sortByPayment, sortByTotal } from './FilterOrder'
import "../../scss/components/OrderHistory/_OrderHistory.scss"
import "../../scss/components/OrderHistory/_FilterOrder.scss"

function OrderHistory(){
    let userId = 5
    const [orders, setOrders] = useState([])
    const [sort, setSort] = useState({
        id: false,
        status: false,
        created: false,
        updated: false,
        payment: false,
        total: false,
    })

    async function getOrderHistory(){
        let data = await axios.get(`http://localhost:3001/users/${userId}/orders`);
        setOrders(data.data); 
    }

    useEffect(() => {
        getOrderHistory();
    }, []);

    function sortId(){
        let [newOrders, newSort] = sortById(orders, sort)
        setSort(newSort)
        setOrders(newOrders)
    }

    function sortState(){
        let [newOrders, newSort] = sortByState(orders, sort)
        setSort(newSort)
        setOrders(newOrders)
    }

    function sortCreation(){
        let [newOrders, newSort] = sortByCreation(orders, sort)
        setSort(newSort)
        setOrders(newOrders)
    }

    function sortUpdate(){
        let [newOrders, newSort] = sortByUpdate(orders, sort)
        setSort(newSort)
        setOrders(newOrders)
    }

    function sortPayment(){
        let [newOrders, newSort] = sortByPayment(orders, sort)
        setSort(newSort)
        setOrders(newOrders)
    }

    function sortTotal(){
        let [newOrders, newSort] = sortByTotal(orders, sort)
        setSort(newSort)
        setOrders(newOrders)
    }

    return (
        <div className='containerOrderHistory'>
            <div className='containerFilterOrder'>
                <div className='registerFilter' onClick={sortId}><DivText content='Registro'/></div>
                <div className='stateFilter' onClick={sortState}><DivText content='Estado'/></div>
                <div className='creationFilter' onClick={sortCreation}><DivText content='Fecha de apertura'/></div>
                <div className='updateFilter' onClick={sortUpdate}><DivText content='Fecha de compra'/></div>
                <div className='paymentFilter' onClick={sortPayment}><DivText content='Metodo de Pago'/></div>
                <div className='totalFilter' onClick={sortTotal}><DivText content='Valor Total'/></div>
            </div>
            {
                !orders[0]?.error && orders?.map((order) => {
                    return <PastOrder order={order} key={`Order-${order.id}`}/>
                })
            }
        </div>
    )
}

export default OrderHistory;