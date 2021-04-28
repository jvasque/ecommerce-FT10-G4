import React, {useState} from 'react'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Modal } from '@material-ui/core';
import Map from './Map'
import '../../scss/components/LocationStock/_DistributionCenterCard.scss'
import swal from 'sweetalert';
import axios from 'axios'

export default function DistributionCenterCard({center, modified}) {
    const [state, setState] = useState(false)
    const [modal, setModal] = useState(false);
    let activeToggle = state ? 'active':'inactive'

    function toggle(){
        setState(!state)
        activeToggle = state ? 'active':'inactive'
    }

    function toggleOff(){
        setState(false)
    }

    function seeMap(){
        setModal(true)
    }

    const handleClose = () => {
        setModal(false);
    };

    const modifyLocation = () => {
        swal({
            title: `Esta seguro de modificar el centro de distribución ${center.city}?`,
            //text: "Una vez modificada, debera refrescar la pagina para ver los cambios!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                //await axios.post(`http://localhost:3001/locations/delete`)
                swal('Éxito!',`El centro de distribución ${center.city} ha sido modificado.`, 'success');        
            } else {
                //setStatus(order.state)
              swal("La modificación ha sido cancelada!");
            }
          })
    }

    const onDelete = () => {
        swal({
            title: `Esta seguro de eliminar el centro de distribución ${center.city}?`,
            //text: "Una vez modificada, debera refrescar la pagina para ver los cambios!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                await axios.post(`http://localhost:3001/locations/delete/${center.id}`)
                modified()
                swal('Éxito!',`El centro de distribución ${center.city} ha sido eliminado.`, 'success');        
            } else {
                //setStatus(order.state)
              swal("La eliminacion ha sido cancelada!");
            }
          })
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
            >
                <div>
                    <Map location={center}/>
                </div>                
            </Modal>
        </div>
    )
}
