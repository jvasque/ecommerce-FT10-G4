import React, { useState } from "react";
import axios from "axios";
import AdminOrderDetail from './AdminOrderDetail'
import { sortById, sortByName, sortByQuantity, sortByPrice, sortByCost } from '../OrderHistory/FilterOrderDetail'
import swal from 'sweetalert';
import db from '../Map/firebase'

import DivText from '../ProductCard/DivText'
import "../../scss/components/AllOrders/_AdminOrderDetail.scss"
import "../../scss/components/AllOrders/_AdminFilterOrderDetail.scss"

function SingleOrder({order, modify}){
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
    const token = localStorage.getItem("token");

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
    
    function handleSubmit(e){
        e.preventDefault();
        swal({
            title: `Esta seguro de modificar la orden ${order.id}?`,
            text: "Una vez modificada, debera refrescar la pagina para ver los cambios!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                await axios.post(`http://localhost:3001/orders/${order.id}?state=${status}`)
                console.log(order, "La orden SingleOrder.jsx");
                console.log(status, "Mi estado local, SingleOrder.jsx");
                swal('Éxito!',`La orden ${order.id} ha sido modificada.`, 'success')
                .then(async (e) => {
                    if(status === "completed"){
                        await axios.post(`http://localhost:3001/email/order-notification`, {
                            products: order.orderDetails?.map(e => e.product.name),
                            address: order.address
                        }, {
                            headers: {Authorization: `Bearer ${token}`}
                         })
                    
                         //let dato = await db.collection('GPS')

                    }
                    //window.location.reload();       
                }) 
            } else {
                setStatus(order.state)
              swal("La modificación ha sido cancelada!");
            }
          })
        
        
        
    }

    function handleStatusChange(event){
        setStatus(event.target.value)
    }

    let statusForm = () => {
        if(modify && (order.state==='created')){
            return (
                <form onSubmit={handleSubmit}>
                    <select value={status} onChange={handleStatusChange}>
                        <option value="created">Creada</option>                    
                        <option value="processing">Procesando</option>
                        <option value="cancelled">Cancelada</option>
                    </select>
                    <input disabled={status===order.state} type='submit' value='Guardar'></input>
                    {/* <input type='button' value='Cancelar' onClick={() => setStatus(order.state)}/> */}
                </form>
            )
        }else if(modify && (order.state === "processing" || order.state === "cancelled" || order.state === "completed")){
            return (
                <form onSubmit={handleSubmit}>
                    <select value={status} onChange={handleStatusChange}>
                        <option value="processing">Procesando</option>
                        <option value="cancelled">Cancelada</option>
                        <option value="completed">Completada</option>
                    </select>
                    <input disabled={status===order.state} type='submit' value='Guardar'></input>
                    {/* <input type='button' value='Cancelar' onClick={() => setStatus(order.state)}/> */}
                </form>
            )
        }else if(status==="created"){
            return (
                <DivText content='Creada'/>
            )
        }else if(status==="processing"){
            return (
                <DivText content='Procesando'/>
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
                            <DivText content={`USD$${order.totalPrice}`}/>
                        </div>
                        <div className='orderAdminStatus'>
                            {
                                statusForm(order.state)
                            }                            
                        </div>
                    </div>
                    <div className="folding-pannel filter">
                        <div className='containerAdminFilterOrderDetail'>
                            <div className='orderAdminFilterDetailId' onClick={sortId}><DivText content='Subregistro'/></div>
                            <div className='orderAdminFilterDetailName' onClick={sortName}><DivText content='Producto'/></div>
                            <div className='orderAdminFilterDetailQuantity' onClick={sortQuantity}><DivText content='Cantidad'/></div>
                            <div className='orderAdminFilterDetailPrice' onClick={sortPrice}><DivText content='Precio Unidad'/></div>
                            <div className='orderAdminFilterDetailCost' onClick={sortCost}><DivText content='Costo por Item'/></div>
                        </div>
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