import React, {useState} from 'react'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import '../../scss/components/LocationStock/_DistributionCenterCard.scss'


export default function DistributionCenterCard({city, province, postal}) {
    const [state, setState] = useState(false)
    let activeToggle = state ? 'active':'inactive'

    function toggle(){
        setState(!state)
        activeToggle = state ? 'active':'inactive'
    }

    return (
        <div className='distributionCenterCardContainer'>
            <div className='room'>
                <RoomOutlinedIcon />
            </div>              
            <div className='centerInfo'>
                <b><p className='city'>{city}</p></b>
                <p className='province'>{province + ', CP ' + postal}</p>
            </div>  
            <div className='dropdown'>
                <div className='three-dots' onClick={toggle}>
                    <MoreVertIcon /> 
                </div>    
                <div className={`dropdown-content-${activeToggle}`}>
                    <div><p className='seeMap'>Ver en mapa</p></div>
                    <div><p className='modifyLocation'>Modificar</p></div>
                    <div><p>Eliminar</p></div>
                </div>
            </div>
        </div>
    )
}
