import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createLocation } from '../../redux/locationReducer/locationActions';
import swal from 'sweetalert';
import {
    getAddress,
} from '../../redux/locationReducer/locationActions';

import '../../scss/components/LocationStock/_FormLocation.scss';

function FormLocation({modified, closeModal}) {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState({
    address: false, 
    postal: true,        
})
  const [input, setInput] = useState({
    address: '', 
    postal: '',
    userId: JSON.parse(localStorage.getItem('user')),
    });      
    const displayCities = useSelector((state) => state.locationReducer.autocomplete);
  
    // dispatch(getAddress(input.address))
    

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.name='address'){       
        dispatch(getAddress(input.address)) // redux 
    }
  };

  const handleCreateLocation = function (e) {
    e.preventDefault();
    dispatch(createLocation(input));
    setInput({
        ...input,
        address: '', 
        postal: '',        
    });
    swal('Éxito!', `Se ha creado el nuevo centro de distribución`, 'success');   
    closeModal();
    modified();
  };

  const handleClick = (result, e) => {
    e.preventDefault();
    setInput({
        ...input,
        address: result.name, 
        postal: result.postal_code || '',        
    });
    setDisabled({  
        ...disabled,   
        address: true,
        postal: input.postal? true : false,
    })
    dispatch(createLocation(input));
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
      <form onSubmit={handleCreateLocation}>
          
        <div className="inputs">
            <input
                required
                name="address"
                className="input"
                placeholder="Dirección"
                value={input.street}
                onChange={handleInputChange}
                disabled={disabled.address}
            />


            <input
                required
                name="postal"
                className="input"
                placeholder="Código postal"
                value={input.postal}
                type="number"
                onChange={handleInputChange}
                disabled={disabled.postal}
            />
        </div>
        <div className="displayCities">
            <ul>
            {displayCities?.map((result, i) =>
                result.error ? null : i < 5 ? (
                <li key={i} onClick={(e) => handleClick(result, e)}>
                    {result.name}
                </li>
                ) : null
            )}
            </ul>
        </div>

        <button className="createLocationButton" type="submit">
          Crear nuevo centro de distribución
        </button>
      </form>
    </div>
  );
}

export default FormLocation;
