import React from "react";
import DivText from '../ProductCard/DivText'
import '../../scss/components/AllOrders/_AdminOrderDetail.scss'

function AdminOrderDetail({product}){
        return (
            <div className='containerAdminOrderDetail'>
                <div className='orderAdminDetailRegister'>
                    <DivText content={product.id} />
                </div>
                <div className='orderAdminDetailPicture'>
                    <img src={product.product.picture} alt='product'/>
                </div>
                <div className='orderAdminDetailName'>
                    <a href={`/${product.product.id}`} target="_blank" rel="noopener noreferrer">
                        <DivText content={product.product.name} />
                    </a> 
                </div> 
                <div className='orderAdminDetailQuantity'>   
                    <DivText content={product.quantity} /> 
                </div> 
                <div className='orderAdminDetailPrice'>   
                    <DivText content={product.unitPrice} /> 
                </div> 
                <div className='orderAdminDetailCost'>   
                    <DivText content={(product.unitPrice*product.quantity).toFixed(2)} /> 
                </div>           
            </div>
        )    
}

export default AdminOrderDetail;