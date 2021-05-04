import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe'

export default function MapContainer(props) {
    const [address, setAddress] = useState({
        address: '',
        city: '',
        country: '',
    })
    const [addressUrl, setAddressUrl] = useState({
        address: address.address.replace(' ', '+'),
        city: address.city.replace(' ', '+'),
        country: address.country.replace(' ', '+'),
    })

    function handleSubmit(event){
        event.preventDefault()

    }

    function handleChange(event){
        let {name, value} = event.target        
        setAddress({...address, [name]: value})
        setAddressUrl({...addressUrl, [name]: value.replace(/[^\w\s]/gi, '').split(' ').join('+')})
    }

    return (
        <div>MapContainer
        <form onSubmit={handleSubmit}>
        <label>Dirección:
            <input type='text' name='address' value={address.address} onChange={handleChange}/>
        </label>
        <label>Ciudad:
            <input type='text' name='city' value={address.city} onChange={handleChange}/>
        </label>
        <label>Pais:
            <input type='text' name='country' value={address.country} onChange={handleChange}/>
        </label>
            <input type='submit'/>
        </form>
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

