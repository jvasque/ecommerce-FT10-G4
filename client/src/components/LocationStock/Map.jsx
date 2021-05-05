import React, { useState, useEffect } from 'react'
import Iframe from 'react-iframe'


export default function Map({location}) {
    const [addressUrl, setAddressUrl] = useState({
        address: '',
        city: '',
        country: '',
    })

    useEffect(() => {
        setAddressUrl({
            address: location.address.replace(/[^\w\s]/gi, ' ').split(' ').join('+'),
            city: location.city.replace(/[^\w\s]/gi, ' ').split(' ').join('+'),
            country: location.country.replace(/[^\w\s]/gi, ' ').split(' ').join('+'),
        });
    }, []);

    return (
        <div className='mapContainer'>
            <Iframe url={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAWvV27eRWz99D9ILk_vL8ETJWj6LB0e-I&language=es&q=${addressUrl.address},${addressUrl.city},${addressUrl.country}`}
                width="450px"
                height="450px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"/> 
        </div>
    )
}
