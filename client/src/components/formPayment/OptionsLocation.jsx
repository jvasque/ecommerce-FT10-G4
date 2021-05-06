import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { FormControl, Button } from '@material-ui/core';
import Swal from 'sweetalert2';
import TimeslotForm from '../Timeslots/TimeslotForm'; 
import { resetTimeslot } from '../../redux/locationReducer/locationActions';
import swal from 'sweetalert';              

// styles
const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const buttons = {
  backgroundColor: '#378a19',
  color: '#f7f7f7',

  margin: 10,
};

// Component
export const OptionsLocation = ({ onCloseModal }) => {
  const product = useSelector((state) => state.cartReducer.cart);
  const createdTimeslot = useSelector((state) => state.locationReducer.createdTimeslot);
  const dispatch = useDispatch();

  const [value, setValue] = useState();
  const [centers, setCenters] = useState([]);  

  useEffect(() => {
    if (createdTimeslot && !createdTimeslot.error) {    
    swal(`Se ha creado un turno el día ${createdTimeslot.date} a las ${createdTimeslot.time}:00 hs.`);
    dispatch(resetTimeslot());
    setValue('');
    }
    if(createdTimeslot && createdTimeslot.error){
      swal(`Usted ya tiene asignado ese turno.`);
    }
    return () => {
    }
  }, [createdTimeslot])


  async function getLocations() {
    let data = await axios.get(`http://localhost:3001/locations`);
    console.log('data', data.data);
    const myArray = data.data.map((x) => x.unitsOnLocations);
    let idLocations = [];
    for (let i = 0; i < myArray.length; i++) {
      const check = myArray[i].filter((x) => {
        const prod = product.find((e) => e.id === x.product.id);
        if (prod) {
          if (prod.quantity <= x.unitsOnStock) {
            return true;
          } else {
            i++;
            return false;
          }
        }
      });

      if (check.length === product.length) {
        idLocations.push(i + 1);
      }
    }

    setCenters([
      ...centers,
      ...data.data.filter((distribution) =>
        idLocations.includes(distribution.id)
      ),
    ]);
  }



  const handleChange = (event) => {
    dispatch({ type: 'LOCATION', payload: event.target.value });
    setValue(event.target.value);    
  };

  const radioButtons =
    centers.length !== 0 &&
    centers.map((center) => (
      <div>
      <FormControlLabel
        key={center.id}
        value={center.id}
        checked={center.id.toString() === value}
        label={` ${center.address} - ${center.city} - ${center.province}`}
        control={<GreenRadio />}
        name={` ${center.address} - ${center.city} - ${center.province}`}        
      />
      <div
        style={
          value != center.id
            ? {
                display: 'none',
              }
            : {
              display: ''
            }
        }>
          <TimeslotForm />
        </div>
 
      </div>
    ));

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div>
      <FormControl>
        <FormLabel>
          <h1>CENTROS DE DISTRIBUCIÓN</h1>
        </FormLabel>
        <RadioGroup aria-label="centros" value={value} onChange={handleChange}>
          {radioButtons}
        </RadioGroup>
        
        <Button style={buttons} onClick={onCloseModal}>
          Metodo de Pago
        </Button>
      </FormControl>
    </div>
  );
};
