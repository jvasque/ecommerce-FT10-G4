import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
// import { useHistory } from 'react-router';
// import '../../scss/components/LocationStock/_ModifyLocationForm.scss';
import { modifyLocation } from '../../redux/locationReducer/locationActions';

function ModifyLocationForm({ closeModal, center }) {
  const dispatch = useDispatch();
  console.log(center);

  const [input, setInput] = useState({
    id: center.id,
    label: center.label,
    street: center.street,
    city: center.city,
    addressNumber: center.addressNumber,
  });

  const [memo, setMemo] = useState({
    street: center.street,
    city: center.city,
    addressNumber: center.addressNumber,
  });

  const [toggleSubmit, setToggleSubmit] = useState(true);

  useEffect(() => {
    if (
      memo.street !== input.street ||
      memo.city !== input.city ||
      memo.addressNumber !== input.addressNumber
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
    swal({
      title: `Esta seguro de modificar el centro de distribución?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willModify) => {
      if (willModify) {
        dispatch(modifyLocation(input));
        closeModal();

        // swal(
        //   'Éxito!',
        //   `El centro de distribución ha sido modificado.`,
        //   'success'
        // );
      } else {
        closeModal();
        swal('La modificación ha sido cancelada');
      }
    });
  };

  return (
    <div className="container-form">
      <div className="cabecera-form">
        <div
          className="backButton"
          onClick={() => {
            closeModal();
          }}
        >
          {'<'}
        </div>
        <h2>Modifica la información</h2>
        <div>
          Recuerda que es la dirección desde donde realizas los envíos de tus
          insumos
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <h3>{`Centro #${input.id}`}</h3>

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
            placeholder="Ciudad"
            value={input.city}
            type="text"
            onChange={handleInputChange}
          />
        </div>

        <button
          className="ModifyLocationButton"
          type="submit"
          disabled={toggleSubmit}
        >
          Modificar centro de distribución
        </button>
      </form>
    </div>
  );
}

export default ModifyLocationForm;
