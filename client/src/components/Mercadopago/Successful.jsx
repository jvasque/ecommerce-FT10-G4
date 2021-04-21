import React,{useEffect} from 'react'
import swal from "sweetalert"
import {useDispatch} from "react-redux"
import { emptyCart } from '../../redux/cartReducer/cartActions'
import axios from 'axios'

export default function Successful() {
    const userId = localStorage.getItem("user")

    const dispatch = useDispatch()


    useEffect(() => {
        console.log(userId);
    swal("Tu compra ha sido completada!", "Gracias por confiar en nosotros", "success")
    dispatch(emptyCart())
     axios.put(`http://localhost:3001/order/${userId}/state`, {
         state: "completed"
     })
    }, [])

    return (
        <div>
            
        </div>
    )
}
