
import React, {
  useState,
  useLayoutEffect,
  useEffect,
} from "react";

import { Map, Marker , ZoomControl } from "pigeon-maps";



import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBg15wobs-aRNI7U841KJVyTqaplHt8eag",
  authDomain: "agroplace-2bbbc.firebaseapp.com",
  projectId: "agroplace-2bbbc",
  storageBucket: "agroplace-2bbbc.appspot.com",
  messagingSenderId: "27807532405",
  appId: "1:27807532405:web:6df3dee402bdcb4a5cff3c",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const data = {
  name: "Los Angeles",
  state: "CA",
  country: "USA",
};



const getPosition = async () => {
  try {
    await db.collection("GPS").add({
      latitud: 300.0,
      longitud: 2.0,
    });
    // 
    // await db.collection('GPS').doc('datos').get();
   
   
  } catch (error) {
    console.log("getPosition -> error", error);
  }
  //console.log('hi',await db.collection("datos").doc("coordenadas").get());
};
 

const Maps = () => {


  //key = 3e14f5a7ff0c5901576a04916413ff25

  const [center, setCenter] = useState([50.879, 4.6997]);
  const [zoom, setZoom] = useState(11);
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;


  useLayoutEffect(() => {
    setTimeout(() => {
      setCenter([center[0] + 0.001, center[1]]);
      
    }, 5000);
  }, [center[0]]);


  useEffect(() => {
    getPosition()
  }, [center[0]]);


  const position = JSON.parse(localStorage.getItem("address"))

 

  return (
    <Map
      height={800}
      // width={500}
      center={[position[0], position[1]]}
      zoomControl={zoom}
      color={color}
      onClick={() => setHue(hue + 20)}

      //   onBoundsChanged={({center,zoom}) => {
    

      //   }}
    >
      <Marker width={50}  anchor={[position[0], position[1]]} />
   
      <ZoomControl />
    </Map>
  );
};

export default Maps;
