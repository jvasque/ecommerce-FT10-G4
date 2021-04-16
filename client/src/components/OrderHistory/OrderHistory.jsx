import React, { useEffect, useState } from "react";
import axios from "axios";
import DivText from '../ProductCard/DivText'
import PastOrder from './PastOrder'
import "../../scss/components/OrderHistory/_OrderHistory.scss"
import "../../scss/components/OrderHistory/_FilterOrder.scss"

function OrderHistory(){
    let userId = 2
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
        let ordersSorted = [...orders]
        if(sort.id){            
            setSort({
                id: false,
                status: false,
                created: false,
                updated: false,
                payment: false,
                total: false,
            })
            ordersSorted.sort((a, b)=>{
                if (a.id > b.id) {
                    return -1;
                  }
                if (a.id < b.id) {
                    return 1;
                }
                return 0;
            })
            setOrders(ordersSorted)
            return
        }
        setSort({
            id: true,
            status: false,
            created: false,
            updated: false,
            payment: false,
            total: false,
        })
        ordersSorted.sort((a, b)=>{
            if (b.id > a.id) {
                return -1;
              }
            if (b.id < a.id) {
                return 1;
            }
            return 0;
        })
        setOrders(ordersSorted)
        return
    }

    return (
        <div className='containerOrderHistory'>
            <div className='containerFilterOrder'>
                <div className='registerFilter' onClick={sortId}><DivText content='Registro'/></div>
                <div className='stateFilter'><DivText content='Estado'/></div>
                <div className='creationFilter'><DivText content='Fecha de apertura'/></div>
                <div className='updateFilter'><DivText content='Fecha de actualizacion'/></div>
                <div className='paymentFilter'><DivText content='Metodo de Pago'/></div>
                <div className='totalFilter'><DivText content='Valor Total'/></div>
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