import React, { useEffect, useState } from "react";
import DivText from '../ProductCard/DivText'
import '../../scss/components/OrderHistory/_FilterOrder.scss'

export default function FilterOrder() {
    const [sort, setSort] = useState({
        id: true,
        status: false,
        created: false,
        updated: false,
        payment: false,
        total: false,
    })

    // function sortId(){
    //     if(sort.id){
    //         order.sort((a, b)=>{
    //             if (a.id < b.id) {
    //                 return -1;
    //               }
    //             if (b.id < a.id) {
    //                 return 1;
    //             }
    //             return 0;
    //         })
    //         console.log(order)
    //         return
    //     }
    //     setSort({
    //         id: true,
    //         status: false,
    //         created: false,
    //         updated: false,
    //         payment: false,
    //         total: false,
    //     })
    // }

    // useEffect(() => {
    // }, [order]);

    return (
        <div className='containerFilterOrder'>
            <div className='registerFilter'><DivText content='Registro'/></div>
            <div className='stateFilter'><DivText content='Estado'/></div>
            <div className='creationFilter'><DivText content='Fecha de apertura'/></div>
            <div className='updateFilter'><DivText content='Fecha de actualizacion'/></div>
            <div className='paymentFilter'><DivText content='Metodo de Pago'/></div>
            <div className='totalFilter'><DivText content='Valor Total'/></div>
        </div>
    )
}
