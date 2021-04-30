import React, {useState} from 'react'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ModifyLocationForm from './ModifyLocationForm';
import { useSelector, useDispatch } from 'react-redux';
import Map from './Map'
import '../../scss/components/LocationStock/_DistributionCenterCard.scss'
import swal from 'sweetalert';
import axios from 'axios'
import {
    deleteCenter,
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

export default function DistributionCenterCard({center}) {
    const [state, setState] = useState(false)
    const [modal, setModal] = useState(false);
    const [modifyForm, setModifyForm] = useState(false);
    const classes = useStyles();
    let activeToggle = state ? 'active':'inactive'

    const dispatch = useDispatch();


    function toggle(){
        setState(!state)
        activeToggle = state ? 'active':'inactive'
    }

    function toggleOff(){
        setState(false)
    }

    function seeMap(){
        setModal(true)
        setState(false)
    }

    const handleClose = () => {
        setModal(false);
    };
    const handleCloseModify = () => {
        setModifyForm(false);
    };

    const modifyLocation = () => {
        setModifyForm(true);
        setState(false)
    }

    const onDelete = () => {
        swal({
            title: `Esta seguro de eliminar el centro de distribución ${center.city}?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                dispatch(deleteCenter(center.id))     
            } else {
                //setStatus(order.state)
              swal("La eliminacion ha sido cancelada!");
            }
          })
          setState(false)
    }


    return (
        <div className='distributionCenterCardContainer'>
            <div className='room' onClick={toggleOff}>
                <RoomOutlinedIcon />
            </div>              
            <div className='centerInfo' onClick={toggleOff}>
                <b><p className='city'>{center.city}</p></b>
                <p className='province'>{center.province + ', CP ' + center.postal}</p>
            </div>  
            <div className='dropdown'>
                <div className='three-dots' onClick={toggle}>
                    <MoreVertIcon /> 
                </div>    
                <div className={`dropdown-content-${activeToggle}`}>
                    <div onClick={seeMap}><p className='seeMap'>Ver en mapa</p></div>
                    <div onClick={modifyLocation}><p className='modifyLocation'>Modificar</p></div>
                    <div onClick={onDelete}><p>Eliminar</p></div>
                </div>
            </div>
            <Modal 
                open={modal}
                onClose={handleClose}
                className={classes.modal}
            >
                <div className='modalMapContent'>
                    <Map location={center}/>
                </div>                
            </Modal>
            <Modal open={modifyForm} onClose={handleCloseModify} className={classes.modal}>
                <div className="modalMapContent">
                    {<ModifyLocationForm closeModal={handleCloseModify} center={center}/>}
                </div>
            </Modal>
        </div>
    )
}
