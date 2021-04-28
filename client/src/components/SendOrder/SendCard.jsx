
import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import "../../scss/components/SendOrder/_SendCard.scss"
import axios from "axios"



function SendCart({order}) {
    const history =  useHistory()

 const handleSend = async () => {
  
  const apiData =  await axios.get(`http://api.positionstack.com/v1/forward?access_key=3e14f5a7ff0c5901576a04916413ff25&query=${order.address}&country=AR`)
  const address = [apiData.data.data[0].latitude, apiData.data.data[0].longitude]
  localStorage.setItem("address", JSON.stringify(address))
  
   history.push({
       pathname:"/map"
   })
 }

    return (
        <div className="send-container">
            
            <p>{order.createdAt}</p>
            <p>{order.paymentMethod.type}</p>
            <p>USD${order.totalPrice}</p>
            
            <Button className="envio" onClick={handleSend}>Envio</Button>
            
        </div>
    )
}

export default SendCart
