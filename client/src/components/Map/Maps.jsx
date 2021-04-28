import { MapContainer, TileLayer, Popup } from "react-leaflet";

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
import { Map, Marker , ZoomControl } from "pigeon-maps";

// const center = {
//   lat: 51.505,
//   lng: -0.09,
// };

// function DraggableMarker() {
//   const [draggable, setDraggable] = useState(false);
//   const [position, setPosition] = useState(center);
//   const markerRef = useRef(null);
//   const eventHandlers = useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef.current;
//         if (marker != null) {
//           setPosition(marker.getLatLng());
//         }
//       },
//     }),
//     []
//   );
//   const toggleDraggable = useCallback(() => {
//     setDraggable((d) => !d);
//   }, []);

//   return (
//     <Marker
//       draggable={draggable}
//       eventHandlers={eventHandlers}
//       position={position}
//       ref={markerRef}
//     >
//       <Popup minWidth={90}>
//         <span onClick={toggleDraggable}>
//           {draggable
//             ? "Marker is draggable"
//             : "Click here to make marker draggable"}
//         </span>
//       </Popup>
//     </Marker>
//   );
// }

const Maps = () => {
  const [center, setCenter] = useState([50.879, 4.6997]);
  const [zoom, setZoom] = useState(11);
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCenter(center+1)
  //     console.log(center)
  //   }, 2000);
  // }, [center])

  useLayoutEffect(() => {
    setTimeout(() => {
      setCenter([center[0] + 0.001, center[1]]);
      console.log(center[0]);
    }, 5000);
  }, [center[0]]);

  useEffect(() => {
    console.log(center[0]);
  }, [center[0]]);

  return (
    <Map
      height={800}
      // width={500}
      center={[50.879, 4.6997]}
      zoomControl={zoom}
      color={color}
      onClick={() => setHue(hue + 20)}

      //   onBoundsChanged={({center}) => {
      //  //console.log(center)

      //   }}
    >
      <Marker width={50} anchor={[center[0], 4.6997]} />
      <Marker width={50} anchor={[50.86, 4.6997]} />
      <Marker width={50} anchor={[50.89, 4.6997]} />
      <ZoomControl />
    </Map>
  );
};

export default Maps;
