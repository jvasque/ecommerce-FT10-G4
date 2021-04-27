import React, { useState, useEffect } from 'react'
import DistributionCenterCard from './DistributionCenterCard'
import axios from 'axios';

export default function DistributionCenters() {
    const [centers, setCenters] = useState([])

    useEffect(() => {
        getCenters();
    }, []);

    async function getCenters(){
        let data = await axios.get('http://localhost:3001/locations')
        setCenters(data.data)
    }

    return (
        <div className='distributionCentersContainer'>
            <b>Centros de Distribución</b>
            {
                !centers[0]?.error && centers?.map(center => {
                    return <DistributionCenterCard 
                                city={center.city} 
                                province={center.province} 
                                postal={center.postal} 
                                key={center.id}
                            />
                })
            }
            
        </div>
    )
}
