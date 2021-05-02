import React, { useState, useLayoutEffect, useEffect } from "react";

import { Map, Marker, ZoomControl } from "pigeon-maps";
const {db} = require('./firebase')

const data = {
  name: "Los Angeles",
  state: "CA",
  country: "USA",
};

const getPosition = async () => {
  try {
    await db.collection("GPS").get();

    let dato = await db.collection("GPS").get();
    let z = dato.data();
    console.log(z);
   
  } catch (error) {
    console.log("getPosition -> error", error);
  }

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
    }, 20000);
  }, [center[0]]);

  useEffect(() => {
    getPosition();
  }, [center[0]]);

  //const position = JSON.parse(localStorage.getItem("address"));

  return (
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
      <ZoomControl />
    </Map>
  );
};

export default Maps;