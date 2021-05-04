import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import '../../scss/components/LocationStock/_TimeslotForm.scss';
import { createLocation } from '../../redux/locationReducer/locationActions';

function TimeslotForm({ closeModal }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    street: '',
    city: '',
    addressNumber: '',
    userId: JSON.parse(localStorage.getItem('user')),
  });
  const [toggleSubmit, setToggleSubmit] = useState(true);

  useEffect(() => {
    if (
      input.street !== '' &&
      input.city !== '' &&
      input.addressNumber !== ''
    ) {
      setToggleSubmit(false);
    } else {
      setToggleSubmit(true);
    }
  }, [input]);

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
        <h2>Genera un turno para retirar su producto</h2>
        <div>
          Elija un día y horario disponible.
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            
          />
        </div>
       
        <button
          
          type="submit"
          disabled={toggleSubmit}
        >
          Generar turno
        </button>
      </form>
    </div>
  );
}

export default TimeslotForm;