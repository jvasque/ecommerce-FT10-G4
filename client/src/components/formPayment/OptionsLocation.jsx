import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import axios from "axios";

// Material-UI
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { FormControl } from "@material-ui/core";
import Swal from "sweetalert2";

// styles
const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

// Component
export const OptionsLocation = ({ setModalCenters, modalCenters }) => {
  const product = useSelector((state) => state.cartReducer.cart);
  const [checkLocation, setCheckLocation] = useState([]);
  const [value, setValue] = useState("");
  const [centers, setCenters] = useState([]);
  async function getLocations() {
    let data = await axios.get(`http://localhost:3001/locations`);
    setCenters(data.data);
    const myArray = data.data.map(x => x.unitsOnLocations);
    let idLocations = [];
    for(let i=0; i<myArray.length; i++) {
      const check=  myArray[i].filter(x => {
          const prod = product.find(e => e.id === x.product.id) 
          if(prod) {
            if(prod.quantity <= x.unitsOnStock ){
              return true
            } else {
              i++
              return false 
            }
          }
         }
      )
 
      if(check.length === product.length){
        idLocations.push(i+1)
        setCheckLocation(idLocations)
      }
     }
     setCenters(data.data.filter(distribution=>(idLocations.includes(distribution.id))))
  }
  const handleChange = (event) => {
    setValue(event.target.value);
    setModalCenters(!modalCenters);
    localStorage.setItem('distributionNumber',JSON.stringify(event.target.value))
    Swal.fire({
      icon: "success",
      title: `Elegiste ${event.target.name}`,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };



  const radioButtons =
    centers.length !== 0 &&
    centers.map((center) => (
      <FormControlLabel
        key={center.id}
        checked={value === center.id.toString()}
        value={center.id}
        label={` ${center.address} - ${center.city} - ${center.province}`}
        control={<GreenRadio />}
        name={` ${center.address} - ${center.city} - ${center.province}`}
      />
    ));

   
  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div>
      <FormControl>
        <FormLabel><h1>CENTROS DE DISTRIBUCIÓN</h1></FormLabel>
        <RadioGroup aria-label="centros" value={value} onChange={handleChange}>
          {radioButtons}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
