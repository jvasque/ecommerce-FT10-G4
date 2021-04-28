import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createLocation } from '../../redux/locationReducer/locationActions';
import swal from 'sweetalert';

import '../../scss/components/LocationStock/_FormLocation.scss';

function FormLocation(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState({
    address: '', 
    postal: '',
    // userId del localstorage
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateLocation = function (e) {
    e.preventDefault();
    dispatch(createLocation(input));
    setInput({
        address: '', 
        postal: '',
        // userId del localstorage
    });
    props.modified();
    swal('Éxito!', `Se ha creado el nuevo centro de distribución`, 'success');
    props.closeModal();
  };

  return (
    <div className="container-form">
      <div className="cabecera-form">
        <button
          onClick={() => {
            props.closeModal();
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
      <form onSubmit={handleCreateLocation}>
          
        <div className="inputs">
            <input
                required
                name="address"
                className="input"
                placeholder="Dirección"
                value={input.street}
                onChange={handleInputChange}
            />


            <input
                required
                name="postal"
                className="input"
                placeholder="Código postal"
                value={input.postal}
                type="number"
                onChange={handleInputChange}
            />
        </div>

        <button className="createLocationButton" type="submit">
          Crear nuevo centro de distribución
        </button>
      </form>
    </div>
  );
}

export default FormLocation;
