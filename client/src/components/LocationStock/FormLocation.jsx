import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import '../../scss/components/LocationStock/_FormLocation.scss';
import swal from 'sweetalert';
import {
  createLocation,
  cleanAddress,
  getAddress,
} from '../../redux/locationReducer/locationActions';

function FormLocation({ modified, closeModal }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    address: '',
    postal: '',
    userId: JSON.parse(localStorage.getItem('user')),
  });
  const [disabled, setDisabled] = useState({
    address: false,
    postal: false,
  });

  const displayCities = useSelector(
    (state) => state.locationReducer.autocomplete
  );

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getAddress(input.address));
  };

  const handleCreateLocation = function (e) {
    e.preventDefault();
    dispatch(createLocation(input));
    setInput({
      ...input,
      address: '',
      postal: '',
    });
    // swal('Éxito!', `Se ha creado el nuevo centro de distribución`, 'success');
    closeModal();
    modified();
  };

  const handleClick = (result, e) => {
    e.preventDefault();
    setInput({
      ...input,
      address: result.name,
      postal: result.postal_code,
    });

    if (result.postal_code === null) {
      setDisabled({ address: true, postal: false });
    } else {
      setInput({ address: result.name, postal: result.postal_code });
      setDisabled({ address: true, postal: true });
    }

    // guardar en estado local
    dispatch(cleanAddress());
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
            value={input.address}
            onChange={handleInputChange}
            disabled={disabled.address}
          />
          <button type="button" onClick={(e) => handleSearch(e)}>
            Buscar
          </button>

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
