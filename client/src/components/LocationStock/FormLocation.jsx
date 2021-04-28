import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    createLocation,
} from '../../redux/locationReducer/locationActions';

import '../../scss/components/LocationStock/_FormLocation.scss';

function FormLocation() {

    const dispatch = useDispatch();
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
        })
    }

    return (
        <div className="container-form">
            <div className='cabecera-form'>
                <h2>Completá la información</h2>
                <div>Recuerda que es la dirección desde donde realizas los envíos de tus insumos</div>
            </div>
            <form onSubmit={handleCreateLocation}>
                <input
                name='address'
                className="input"
                placeholder="Dirección"
                value={input.address} 
                onChange={handleInputChange}
                />

                <input
                name='country'
                className="input"
                placeholder="País"
                value={input.country} 
                onChange={handleInputChange}
                />

                <input
                name='province'
                className="input"
                placeholder="Provincia"
                value={input.province} 
                onChange={handleInputChange}
                />

                <input
                name='postal'
                className="input"
                placeholder="Código postal"
                value={input.postal} 
                onChange={handleInputChange}
                />


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