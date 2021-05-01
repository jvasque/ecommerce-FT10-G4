
import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import "../../scss/components/SendOrder/_SendCard.scss"
import axios from "axios"



function SendCart({order}) {
    const history =  useHistory()

 const handleSend = async () => {
  
  const apiData =  await axios.get(`https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=q25zaLysr0fVTbApPZXE9dwg-PoUlN-n89C5d_o6lhY&searchtext=${order.address}`)
  let dataRes = apiData.data.Response.View[0].Result[0].Location.DisplayPosition;
  let address = [dataRes.Latitude, dataRes.Longitude]

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
            
            <Button  className="envio" onClick={handleSend}>Envio</Button>
            
        </div>
    )
}

export default SendCart
