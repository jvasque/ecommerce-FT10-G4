import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker'
import '../../scss/components/LocationStock/_TimeslotForm.scss';
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { getTimes, createTimeslot, resetTimeslot } from '../../redux/locationReducer/locationActions';
import swal from 'sweetalert';

function TimeslotForm() {

  const dispatch = useDispatch();
  
  const location = useSelector((state) => state.cartReducer.location);
  const [startDate, setStartDate] = useState(null);
  const [input, setInput] = useState({
    date: '',
    time: '',
    userId: JSON.parse(localStorage.getItem('user')),
    locationId: location,
  });
  const [hours,setHours] = useState(['9','10','11','12','13','14','15','16','17']);
  const unavailableTimeslots = useSelector((state) => state.locationReducer.unavailableTimeslots);
  const createdTimeslot = useSelector((state) => state.locationReducer.createdTimeslot);
  let hoursArray = [];

  useEffect(() => {                   
    hoursArray = ['9','10','11','12','13','14','15','16','17'];    
    
    if (unavailableTimeslots.oneDay && unavailableTimeslots.oneDay.length)       
    {
      unavailableTimeslots.oneDay.map(timeslot => { 
        
        hoursArray = hoursArray.filter((h) => timeslot.time != h);
        console.log(hoursArray);
      })
    };

    setHours(hoursArray)

    return () => {
    }
  }, [unavailableTimeslots.oneDay])
  

  useEffect(() => {
    if (startDate) {
      setInput({
        ...input,
        date: startDate,
      });

    dispatch(getTimes( input.locationId, startDate ));
    }
    return () => {
    }
  }, [startDate]);

  useEffect(() => {    
    if (location) {
      setInput({
        ...input,
        locationId: location,
      });
    }
    return () => {
    }
  }, [location]);

  // useEffect(() => {
  //   if (createdTimeslot && !createdTimeslot.error) {    
  //   swal(`Se ha creado un turno el día ${createdTimeslot.date} a las ${createdTimeslot.time}:00 hs.`);
  //   dispatch(resetTimeslot())
  //   }
  //   return () => {
  //   }
  // }, [createdTimeslot])


  const handleInputChange = function (e) {
    let value = e.target.value;
    value = value.toString()
    console.log(typeof value)

    setInput({
      ...input,
      time: value,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault()
    if(startDate){
      dispatch(createTimeslot(input));
    }else{
      swal('Seleccione una fecha')
    }
  }; 

  return (
    <div className="container-form" id='timeslots'>
      <div className="cabecera-form">
        <h2>Genera un turno para retirar su producto</h2>
        <div>
          Elija un día y horario disponible.
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className='day'>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            // includeDates={[new Date(), addDays(new Date(), 2)]}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            maxDate={addDays(new Date(), 7)}
            placeholderText="Turnos disponibles"
          />
          </div>

          { startDate && 
          <div className='time'>Hora:
            { hours && hours.length ?
            <select value={input.time} onChange={(e) => handleInputChange(e)} name='time'>
              {
                hours.map(h => (
                  <option value={h}>{h}:00 hs</option>
                ))
              }
            </select>
            : <p>No hay horarios disponibles para ese día</p>
            }
          </div>
        }        
        </div>
        { hours && hours.length ?
        <button          
          type="submit"
        >
          Generar turno
        </button>
        : <button          
        type="submit"
        disabled={true}
      >
        Generar turno
      </button>
      }
      </form>
    </div>
  );
}

export default TimeslotForm;