import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
// import { useHistory } from 'react-router';
// import '../../scss/components/LocationStock/_ModifyLocationForm.scss';
import {
  createLocation,
} from '../../redux/locationReducer/locationActions';

function ModifyLocationForm({ closeModal, center }) {
  const dispatch = useDispatch();
  console.log(center)
  const [input, setInput] = useState({
    street: '',
    city: center.city,
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
    swal({
        title: `Esta seguro de modificar el centro de distribución?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(async (willDelete) => {
        if (willDelete) {
            //dispatch modify
            swal('Éxito!',`El centro de distribución ha sido modificado.`, 'success'); 
            setInput({
                ...input,
                street: '',
                city: '',
                addressNumber: '',
            });       
        } else {
          swal("La modificación ha sido cancelada!");
        }
      })
   
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
        <h2>Modifica la información</h2>
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
          />

          <input
            required
            name="addressNumber"
            className="input"
            placeholder="Número"
            value={input.addressNumber}
            onChange={handleInputChange}
          />
          

          <input
            required
            name="city"
            className="input"
            placeholder={center.city}
            value={input.city}
            type="text"
            onChange={handleInputChange}

          />

        </div>

        <button className="ModifyLocationButton" type="submit">
          Modificar centro de distribución
        </button>
      </form>
    </div>
  );
}

export default ModifyLocationForm;