import React,{useEffect} from 'react'
import swal from "sweetalert"
import {useDispatch, useSelector} from "react-redux"
import { emptyCart } from '../../redux/cartReducer/cartActions'
import axios from 'axios'
import { reset } from '../../redux/iconReducer/iconActions'

export default function Successful() {
    const userId = localStorage.getItem("user")
    const dispatch = useDispatch()
    const productBuy = useSelector(state => state.cartReducer.cart)


    useEffect(() => {
    async function stock(){
     swal("Tu compra ha sido completada!", "Gracias por confiar en nosotros", "success")
     const productSaved = productBuy
    dispatch(emptyCart())
     await axios.put(`http://localhost:3001/order/${userId}/state`, {
        state: "created"
            })
     dispatch(reset())

     for(let i =0; i<productSaved.length; i++) {
         const stock = productSaved[i].unitsOnStock - productSaved[i].quantity
         console.log(stock);
        await axios.put(`http://localhost:3001/products/${productSaved[i].id}`, {
            params: {
                unitsOnStock: stock
            }
         })
          
     }

      console.log(productSaved);
     }
   stock()
    },[])

    return (
        <div>
            
        </div>
    )
}
