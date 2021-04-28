import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import {
    createLocation,
} from '../../redux/locationReducer/locationActions';
import swal from 'sweetalert';

import '../../scss/components/LocationStock/_FormLocation.scss';

function FormLocation() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [input, setInput] = useState({
        address: '',//latitud y longitud
        country: '',
        province: '',
        city: '',
        postal: '',
    });

    const handleInputChange = function(e) {
        
        setInput({
        ...input,
        [e.target.name]: e.target.value
        });
    };

    const handleCreateLocation = function(e) {
        e.preventDefault();
        dispatch(createLocation(input));
        setInput({
            address: '',//latitud y longitud
            country: '',
            province: '',
            city: '',
            postal: '',
        });
        history.push({
            pathname: "/user/info",
        });
        swal('Éxito!',`Se ha creado el nuevo centro de distribución`, 'success');
    }

    return (
        <div className="container-form">
            <div className='cabecera-form'>
                <h2>Completá la información</h2>
                <div>Recuerda que es la dirección desde donde realizas los envíos de tus insumos</div>
            </div>
            <form onSubmit={handleCreateLocation}>
                <div className='inputs'>

                    <input
                    required
                    name='address'
                    className="input"
                    placeholder="Dirección"
                    value={input.address} 
                    onChange={handleInputChange}
                    />

                    <input
                    required
                    name='country'
                    className="input"
                    placeholder="País"
                    value={input.country} 
                    onChange={handleInputChange}
                    />

                    <input
                    required
                    name='province'
                    className="input"
                    placeholder="Provincia"
                    value={input.province} 
                    onChange={handleInputChange}
                    />

                    <input
                    required
                    name='postal'
                    className="input"
                    placeholder="Código postal"
                    value={input.postal} 
                    type='number'
                    onChange={handleInputChange}
                    />

                </div>

                <button
                    className="createLocationButton"
                    type="submit"
                >
                    Crear nuevo centro de distribución
                </button>
            </form>
    
        </div>
    );
}

export default FormLocation;