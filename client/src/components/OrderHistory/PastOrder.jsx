import React, { useEffect, useState } from "react";
import OrderDetail from './OrderDetail'
import FilterOrderDetail from './FilterOrderDetail'
import DivText from '../ProductCard/DivText'
import "../../scss/components/OrderHistory/_OrderHistory.scss"

function PastOrder({order}){
    const [state, setState] = useState(false) 
    const [ordersDetails, setOrdersDetails] = useState(order.orderDetails)  
    const [sort, setSort] = useState({
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

    function sortName(){
        let ordersDetailsSorted = [...ordersDetails]
        if(sort.name){            
            setSort({
                name: false,
                quantity: false,
                price: false,
                cost: false,
            })
            ordersDetailsSorted.sort((a, b)=>{
                if (a.product.name > b.product.name) {
                    return -1;
                  }
                if (a.product.name < b.product.name) {
                    return 1;
                }
                return 0;
            })
            setOrdersDetails(ordersDetailsSorted)
            return
        }
        setSort({
            name: true,
            quantity: false,
            price: false,
            cost: false,
        })
        ordersDetailsSorted.sort((a, b)=>{
            if (b.product.name > a.product.name) {
                return -1;
              }
            if (b.product.name < a.product.name) {
                return 1;
            }
            return 0;
        })
        setOrdersDetails(ordersDetailsSorted)
        return
    }
        
    if(!!order){
        return (
            <div className='containerOrder'>
                <div className={activeToggle}>
                    <div className='order' onClick={toggle}>
                        <div className='orderId'>
                            <DivText content={order.id}/>
                        </div>
                        <div className='orderStatus'>
                            <DivText content={order.status}/>
                        </div>
                        <div className='orderCreatedAt'>
                            <DivText content={order.createdAt.substring(0,19).split('T').join(' ')}/>
                        </div>
                        <div className='orderUpdatedAt'>
                            <DivText content={order.updatedAt.substring(0,19).split('T').join(' ')}/>
                        </div>
                        <div className='orderPayment'>
                            <DivText content={order.paymentMethod.type}/>
                        </div>
                        <div className='orderTotal'>
                            <DivText content={order.totalPrice}/>
                        </div>
                    </div>
                    <div className="folding-pannel filter">
                        <div className='containerFilterOrderDetail'>
                            <div className='orderFilterDetailName' onClick={sortName}><DivText content='Producto'/></div>
                            <div className='orderFilterDetailQuantity'><DivText content='Cantidad'/></div>
                            <div className='orderFilterDetailPrice'><DivText content='Precio Unidad'/></div>
                            <div className='orderFilterDetailCost'><DivText content='Costo por Item'/></div>
                        </div>  
                    </div>
                    {
                        ordersDetails?.map(orderDetail => {
                            return <div className="folding-pannel answer" key={`OrderDetail-${orderDetail.id}-${order.id}`}>
                                        <OrderDetail product={orderDetail}/>
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

export default PastOrder;