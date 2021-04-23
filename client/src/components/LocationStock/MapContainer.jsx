import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe'

export default function MapContainer(props) {
    const [address, setAddress] = useState({
        address: '',
        city: '',
        country: '',
    })
    const [addressUrl, setAddressUrl] = useState(address.address.replace(' ', '+'))
    const [cityUrl, setCityUrl] = useState(address.city.replace(' ', '+'))
    const [countryUrl, setCountryUrl] = useState(address.country.replace(' ', '+'))
    let origin = `KR+83+65C+18,Bogota,Colombia`
    let destination = `KR+101+70+14,Bogota,Colombia`
    let waypoints = `Kr91+100`
    function handleSubmit(event){
        event.preventDefault()

    }

    function handleChange(event){
        let {name, value} = event.target        
        setAddress({...address, [name]: value})
        if(name === 'address'){setAddressUrl(value.replace(/[^\w\s]/gi, '').split(' ').join('+'))}
        if(name === 'city'){setCityUrl(value.replace(/[^\w\s]/gi, '').split(' ').join('+'))}
        if(name === 'country'){setCountryUrl(value.replace(/[^\w\s]/gi, '').split(' ').join('+'))}

    }

    return (
        <div>MapContainer
        <form onSubmit={handleSubmit}>
            <input type='text' name='address' value={address.address} onChange={handleChange}/>
            <input type='text' name='city' value={address.city} onChange={handleChange}/>
            <input type='text' name='country' value={address.country} onChange={handleChange}/>
            <input type='submit'/>
        </form>
        <Iframe url={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAWvV27eRWz99D9ILk_vL8ETJWj6LB0e-I&language=es&q=${addressUrl},${cityUrl},${countryUrl}`}
            width="450px"
            height="450px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"/> 
        <Iframe url={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAWvV27eRWz99D9ILk_vL8ETJWj6LB0e-I&language=es&origin=${origin}&destination=${destination}&waypoints=${waypoints}`}
            width="450px"
            height="450px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"/>        
        </div>
    )
}

