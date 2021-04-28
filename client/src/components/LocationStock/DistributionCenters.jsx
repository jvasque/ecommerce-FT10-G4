import React, { useState, useEffect } from 'react'
import DistributionCenterCard from './DistributionCenterCard'
import axios from 'axios';

export default function DistributionCenters() {
    const [centers, setCenters] = useState([])
    const [modified, setModified] = useState(false)

    useEffect(() => {
        getCenters();
    }, [modified]);

    async function getCenters(){
        let data = await axios.get('http://localhost:3001/locations')
        setCenters(data.data)
    }

    const modify = () => {
        setModified(!modified)
    }

    return (
        <div className='distributionCentersContainer'>
            <b>Centros de Distribución</b>
            {
                !centers[0]?.error && centers?.map(center => {
                    return <DistributionCenterCard
                                modified={modify}
                                center={center}     
                                key={center.id}
                            />
                })
            }
            
        </div>
    )
}
