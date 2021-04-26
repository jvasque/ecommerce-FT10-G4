import React from "react";
import DivText from '../ProductCard/DivText'
import '../../scss/components/OrderHistory/_OrderDetail.scss'

function OrderDetail({product}){
        return (
            <div className='containerOrderDetail'>
                <div className='orderDetailPicture'>
                    <img src={product.product.picture} alt='product'/>
                </div>
                <div className='orderDetailName'>
                    <a href={`/${product.product.id}`} target="_blank">
                        <DivText content={product.product.name} />
                    </a> 
                </div> 
                <div className='orderDetailQuantity'>   
                    <DivText content={product.quantity} /> 
                </div> 
                <div className='orderDetailPrice'>   
                    <DivText content={product.unitPrice} /> 
                </div> 
                <div className='orderDetailCost'>   
                    <DivText content={(product.unitPrice*product.quantity).toFixed(2)} /> 
                </div>           
            </div>
        )    
}

export default OrderDetail;