import React, { useState } from "react";
import AdminOrderDetail from './AdminOrderDetail'
import { sortById, sortByName, sortByQuantity, sortByPrice, sortByCost } from '../OrderHistory/FilterOrderDetail'

import DivText from '../ProductCard/DivText'
import "../../scss/components/AllOrders/_AdminOrderDetail.scss"
import "../../scss/components/AllOrders/_AdminFilterOrderDetail.scss"

function SingleOrder({order}){
    const [state, setState] = useState(false) 
    const [status, setStatus] = useState(order.state)
    const [ordersDetails, setOrdersDetails] = useState(order.orderDetails)  
    const [sort, setSort] = useState({
        id: false,
        name: false,
        quantity: false,
        price: false,
        cost: false,
    })
    let activeToggle = state ? 'active':'inactive'

    function toggle(){
        setState(!state)
        activeToggle = state ? 'active':'inactive'
    }

    function sortId(){
        let [newOrders, newSort] = sortById(ordersDetails, sort)
        setSort(newSort)
        setOrdersDetails(newOrders)
    }

    function sortName(){
        let [newOrdersDetails, newSort] = sortByName(ordersDetails, sort)
        setSort(newSort)
        setOrdersDetails(newOrdersDetails)
    }

    function sortQuantity(){
        let [newOrdersDetails, newSort] = sortByQuantity(ordersDetails, sort)
        setSort(newSort)
        setOrdersDetails(newOrdersDetails)
    }

    function sortPrice(){
        let [newOrdersDetails, newSort] = sortByPrice(ordersDetails, sort)
        setSort(newSort)
        setOrdersDetails(newOrdersDetails)
    }

    function sortCost(){
        let [newOrdersDetails, newSort] = sortByCost(ordersDetails, sort)
        setSort(newSort)
        setOrdersDetails(newOrdersDetails)
    }      
    
    async function handleSubmit(e){
        e.preventDefault();

    }

    function handleStatusChange(event){
        setStatus(event.target.value)
    }

    let statusForm = (status) => {
        if(status==='cart' || status==='created'){
            return (
                <form onSubmit={handleSubmit}>
                    <select value={status} onChange={handleStatusChange}>
                        <option value="cart">Carrito</option>
                        <option value="created">Creada</option>                    
                        <option value="processing">Procesando</option>
                        <option value="cancelled">Cancelada</option>
                    </select>
                    <input disabled={status===order.state} type='submit' value='Guardar'></input>
                </form>
            )
        }else if(status === "processing"){
            return (
                <form onSubmit={handleSubmit}>
                    <select value={status} onChange={handleStatusChange}>
                        <option value="processing">Procesando</option>
                        <option value="cancelled">Cancelada</option>
                        <option value="completed">Completada</option>
                    </select>
                    <input disabled={status===order.state} type='submit' value='Guardar'></input>
                </form>
            )
        }else if(status==="cancelled"){
            return (
                <DivText content='Cancelada'/>
            )
        }else if(status==="completed"){
            return (
                <DivText content='Completada'/>
            )
        }
    } 

    if(!!order){
        return (
            <div className='containerAdminOrder'>
                <div className={activeToggle}>
                    <div className='orderAdmin'>
                        <div className='orderAdminId' onClick={toggle}>
                            <DivText content={order.id}/>
                        </div>
                        <div className='orderAdminFirstName' onClick={toggle}>
                            <DivText content={order.user.firstName}/>
                        </div>
                        <div className='orderAdminLastName' onClick={toggle}>
                            <DivText content={order.user.lastName}/>
                        </div>                        
                        <div className='orderAdminCreatedAt' onClick={toggle}>
                            <DivText content={order.createdAt.substring(0,19).split('T').join(' ')}/>
                        </div>
                        <div className='orderAdminUpdatedAt' onClick={toggle}>
                            <DivText content={order.updatedAt.substring(0,19).split('T').join(' ')}/>
                        </div>
                        <div className='orderAdminPayment' onClick={toggle}>
                            <DivText content={order.paymentMethod.type}/>
                        </div>
                        <div className='orderAdminTotal' onClick={toggle}>
                            <DivText content={order.totalPrice}/>
                        </div>
                        <div className='orderAdminStatus'>
                            {
                                statusForm(order.state)
                            }                            
                        </div>
                    </div>
                    <div className="folding-pannel filter">
                        <b><div className='containerAdminFilterOrderDetail'>
                            <div className='orderAdminFilterDetailId' onClick={sortId}><DivText content='Subregistro'/></div>
                            <div className='orderAdminFilterDetailName' onClick={sortName}><DivText content='Producto'/></div>
                            <div className='orderAdminFilterDetailQuantity' onClick={sortQuantity}><DivText content='Cantidad'/></div>
                            <div className='orderAdminFilterDetailPrice' onClick={sortPrice}><DivText content='Precio Unidad'/></div>
                            <div className='orderAdminFilterDetailCost' onClick={sortCost}><DivText content='Costo por Item'/></div>
                        </div></b>
                    </div>
                    {
                        ordersDetails?.map(orderDetail => {
                            return <div className="folding-pannel answer" key={`OrderDetail-${orderDetail.id}-${order.id}`}>
                                        <AdminOrderDetail product={orderDetail}/>
                                    </div>
                        })
                    }   
                    {/* <div className='order' onClick={toggle}><DivText content={order.id}/></div> */}
                    </div>                       
            </div>
        )
    }else{
        return ()=>{}
    }    
}

export default SingleOrder;