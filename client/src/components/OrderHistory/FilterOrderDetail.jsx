import React from 'react'
import DivText from '../ProductCard/DivText'
import '../../scss/components/OrderHistory/_FilterOrderDetail.scss'
import '../../scss/components/OrderHistory/_OrderHistory.scss'
export default function FilterOrderDetail() {
    return (
        <div className='containerFilterOrderDetail'>
            <div className='orderFilterDetailName'><DivText content='Producto'/></div>
            <div className='orderFilterDetailQuantity'><DivText content='Cantidad'/></div>
            <div className='orderFilterDetailPrice'><DivText content='Precio Unidad'/></div>
            <div className='orderFilterDetailCost'><DivText content='Costo por Item'/></div>
        </div>
    )
}
