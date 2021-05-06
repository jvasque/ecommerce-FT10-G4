import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DistributionCenterCard from './DistributionCenterCard';
import axios from 'axios';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import FormLocation from './FormLocation';
import '../../scss/components/LocationStock/_DistributionCenters.scss';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import {
  getCenters,
  resetLocation,
  getAppointments,
} from '../../redux/locationReducer/locationActions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DistributionCenters() {
  const classes = useStyles();

  const [modal, setModal] = useState(false);

  // REDUX
  let userId = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const centersLoaded = useSelector(
    (state) => state.locationReducer.centersLoaded
  );
  const locationCreated = useSelector(
    (state) => state.locationReducer.locationCreated
  );
  const locationModified = useSelector(
    (state) => state.locationReducer.locationModified
  );
  const error = useSelector((state) => state.locationReducer.error);
  const centerDeleted = useSelector(
    (state) => state.locationReducer.centerDeleted
  );
  const appointments = useSelector(
    (state) => state.locationReducer.appointments
  );

  // USE EFFECTS
  useEffect(() => {
    dispatch(getCenters());
    dispatch(getAppointments(userId));
  }, []);

  useEffect(() => {
    if (locationCreated) {
      dispatch(getCenters());
      swal('Éxito!', `Se ha creado el nuevo centro de distribución`, 'success');
      dispatch(resetLocation());
    }
    return () => {};
  }, [locationCreated]);

  useEffect(() => {
    if (locationModified) {
      dispatch(getCenters());
      swal(
        'Éxito!',
        `Se han modificado los datos de: Centro #${locationModified.id}`,
        'success'
      );
      dispatch(resetLocation());
    }
    return () => {};
  }, [locationModified]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Locación no encontrada',
        text: 'Por favor ingrese la información de forma más específica.',
        confirmButtonColor: '#378a19',
      });
      dispatch(resetLocation());
    }
    return () => {};
  }, [error]);

  useEffect(() => {
    if (centerDeleted) {
      dispatch(getCenters());
      swal(
        'Éxito!',
        `El centro de distribución de ${centerDeleted.city} ha sido eliminado.`,
        'success'
      );
      dispatch(resetLocation());
    }
    return () => {};
  }, [centerDeleted]);

  const handleClose = () => {
    setModal(false);
  };

  const addNewLocation = () => {
    setModal(true);
  };

  return (
    <div className="distributionCentersContainer">
      <p className="distributionTitle">
        <b>Centros de Distribución</b>
      </p>
      {centersLoaded.length > 0 &&
        centersLoaded.map((center) => {
          return <DistributionCenterCard center={center} key={center.id} />;
        })}
      <div className="addLocation" onClick={addNewLocation}>
        <div className="roomAdd">
          <AddLocationOutlinedIcon />
        </div>
        <div className="centerInfo">
          <b>
            <p className="addText">Agregar otro centro de distribución</p>
          </b>
        </div>
      </div>
      <Modal open={modal} onClose={handleClose} className={classes.modal}>
        <div className="modalMapContent">
          {<FormLocation closeModal={handleClose} />}
        </div>
      </Modal>
      <div className="appointmentBox"></div>
      <div>
        <h3>Mis turnos:</h3>
        {appointments &&
          appointments.map((appointment) => (
            <h4>
              Fecha: {appointment.date} - Hora: {appointment.time} -Lugar:{' '}
              {appointment.location.address}
            </h4>
          ))}
      </div>
    </div>
  );
}
