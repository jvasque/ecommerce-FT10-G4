import React, { useEffect, useState } from "react";
import axios from "axios";
import DivText from '../ProductCard/DivText'
import SingleOrder from './SingleOrder'
import { useSelector } from "react-redux";
import "../../scss/components/AllOrders/_AdminOrders.scss"
import "../../scss/components/AllOrders/_AdminFilterOrders.scss"
import { sortById, sortByState, sortByCreation, sortByUpdate, sortByPayment, sortByTotal, sortByFirstName, sortByLastName } from '../OrderHistory/FilterOrder'

function AllOrders(){
    const userId = useSelector(state => state.loginReducer.user.id)
    const [orders, setOrders] = useState([])
    const [sort, setSort] = useState({
        id: false,
        firstName: false,
        lastName: false,
        created: false,
        updated: false,
        payment: false,
        total: false,
        status: false,
    })

    async function getOrderHistory(){
        let data = await axios.get(`http://localhost:3001/orders`);
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
    
    function sortFirstName(){
        let [newOrders, newSort] = sortByFirstName(orders, sort)
        setSort(newSort)
        setOrders(newOrders)
    }

    function sortLastName(){
        let [newOrders, newSort] = sortByLastName(orders, sort)
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

    function sortState(){
        let [newOrders, newSort] = sortByState(orders, sort)
        setSort(newSort)
        setOrders(newOrders)
    }

    return (
        <div className='containerAdminOrders'>
            <b><div className='containerAdminFilterOrder'>
                <div className='registerAdminFilter' onClick={sortId}><DivText content='Registro'/></div>
                <div className='firstNameAdminFilter' onClick={sortFirstName}><DivText content='Nombre'/></div>
                <div className='lastNameAdminFilter' onClick={sortLastName}><DivText content='Apellido'/></div>
                <div className='creationAdminFilter' onClick={sortCreation}><DivText content='Fecha de apertura'/></div>
                <div className='updateAdminFilter' onClick={sortUpdate}><DivText content='Fecha de compra'/></div>
                <div className='paymentAdminFilter' onClick={sortPayment}><DivText content='Metodo de Pago'/></div>
                <div className='totalAdminFilter' onClick={sortTotal}><DivText content='Valor Total'/></div>
                <div className='stateAdminFilter' onClick={sortState}><DivText content='Estado'/></div>
            </div></b>
            {
                !orders[0]?.error && orders?.map((order) => {
                    return <SingleOrder order={order} key={`Order-${order.id}`}/>
                })
            }
        </div>
    )
}

export default AllOrders;