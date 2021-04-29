import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import '../../scss/components/LocationStock/_FormLocation.scss';
import Swal from "sweetalert2";
import swal from "sweetalert";
import {
  createLocation,
} from '../../redux/locationReducer/locationActions';

function FormLocation({ closeModal }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    street: '',
    city: '',
    addressNumber: '',
    userId: JSON.parse(localStorage.getItem('user')),
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(createLocation(input));
    setInput({
      ...input,
      street: '',
      city: '',
      addressNumber: '',
    });
    
    closeModal();
  };


  return (
    <div className="container-form">
      <div className="cabecera-form">
        <button
          onClick={() => {
            closeModal();
          }}
        >
          X
        </button>
        <h2>Completá la información</h2>
        <div>
          Recuerda que es la dirección desde donde realizas los envíos de tus
          insumos
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            required
            name="street"
            className="input"
            placeholder="Calle"
            value={input.street}
            onChange={handleInputChange}
            // disabled={disabled.street}
          />

          <input
            required
            name="addressNumber"
            className="input"
            placeholder="Número"
            value={input.addressNumber}
            onChange={handleInputChange}
            // disabled={disabled.addressNumber}
          />
          

          <input
            required
            name="city"
            className="input"
            placeholder="Ciudad"
            value={input.postal}
            type="text"
            onChange={handleInputChange}
            // disabled={disabled.city}
          />

        </div>
        {/* <button type="button" onClick={(e) => handleSearch(e)}>
            Buscar
        </button> */}

        <button className="createLocationButton" type="submit">
          Crear nuevo centro de distribución
        </button>
      </form>
    </div>
  );
}

export default FormLocation;
