import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker'
// import '../../scss/components/LocationStock/_TimeslotForm.scss';
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { getTimes } from '../../redux/locationReducer/locationActions';

function TimeslotForm({ closeModal, center }) {

  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(null);
  const [unavailableDay, setUnavailableDay] = useState(false);
  const [input, setInput] = useState({
    date: startDate,
    time: '',
    userId: JSON.parse(localStorage.getItem('user')),
    locationId: 1,//center.id
  });
  const unavailableTimeslots = useSelector((state) => state.locationReducer.unavailableTimeslots);
  

  useEffect(() => {
    dispatch(getTimes(input.locationId));
    if ( unavailableTimeslots.length === 9 ) {
      setUnavailableDay(true);
    }
    return () => {
    }
  }, []);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = function (e) {
    // dispatch crear turno
    // closeModal();
  };

  return (
    <div className="container-form">
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
            includeDates={[new Date(), addDays(new Date(), 1)]}
            placeholderText="Turnos disponibles"
          />
          </div>
          <div className='time'>Hora:
            <select value={input.time} onChange={handleInputChange} name='time'>
              <option value="9">9:00 hs</option>
              <option value="10">10:00 hs</option>
              <option value="11">11:00 hs</option>
              <option value="12">12:00 hs</option>
              <option value="13">13:00 hs</option>
              <option value="14">14:00 hs</option>
              <option value="15">15:00 hs</option>
              <option value="16">16:00 hs</option>
              <option value="17">17:00 hs</option>
            </select>
          </div>        
        </div>
       
        <button          
          type="submit"
        >
          Generar turno
        </button>
      </form>
    </div>
  );
}

export default TimeslotForm;