import React, { useEffect, useState } from 'react';
import {
    createLocation,
} from '../../redux/locationReducer/locationReducer';

// import '../../scss/components/formCategories/_FormLocation.scss';

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
        //setear errores
        setInput({
        ...input,
        [e.target.name]: e.target.value
        });
    };

    const handleCreateLocation = function(e) {
        e.preventDefault();
        dispatch(createLocation(input));
    }

    return (
        <div className="container-form">
        
            <form onSubmit={handleCreateLocation}>
                <input
                name='address'
                className="input"
                placeholder="Dirección"
                onChange={(e) => handleInputChange(e.target.value)}
                />

                <input
                name='country'
                className="input"
                placeholder="País"
                onChange={(e) => handleInputChange(e.target.value)}
                />

                <input
                name='province'
                className="input"
                placeholder="Provincia"
                onChange={(e) => handleInputChange(e.target.value)}
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