import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import { Map, Marker, ZoomControl } from "pigeon-maps";
import firebaseConfig from "../Map/firebase";
import Swal from "sweetalert2";
import db from './firebase'

const Maps = () => {
  //key = 3e14f5a7ff0c5901576a04916413ff25
  let orderId = useSelector(state=>state.paymentIdReducer.orderId)
  
  const [center, setCenter] = useState([-34.9193728, -57.948077777777776]);
  const [warehouse,setWarehouse] = useState([])
  const [zoom, setZoom] = useState(11);
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;
  const getPosition = async () => {
    try {
    
      
    
      const snapshot = await db.collection('GPS').where('orderId', '==', orderId).get();
      if (snapshot.empty) {
         Swal.fire({
        title: 'Tu paquete pronto estará en camino',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
        return;
      }
      snapshot.forEach(doc => {
        //console.log(setWarehouse([doc.data().location.latitude,doc.data().location.longitude]));
      //setWarehouse([doc.data().latitud,doc.data().longitud])
      });

 
      setCenter([center[0]+0.001, center[1]])
  
    } catch (error) {
      console.log("getPosition -> error", error);
    }
  }; 

  const position = JSON.parse(localStorage.getItem("address"));
console.log(warehouse)

  return (
    <>
      <Map
        height={800}
        // width={500}
        center={[center[0], center[1]]}
        zoomControl={zoom}
        color={color}
        onClick={() => setHue(hue + 20)}
        //   onBoundsChanged={({center,zoom}) => {

        //   }}
      >
        <Marker width={50} anchor={[center[0], center[1]]} />
       {warehouse.length!==0 && <Marker width={50} anchor={[warehouse[0], warehouse[1]]} />}
        {/* <ZoomControl /> */}
      </Map>
      <button onClick={() => getPosition()}>Hi</button>
    </>
  );
};

export default Maps;
