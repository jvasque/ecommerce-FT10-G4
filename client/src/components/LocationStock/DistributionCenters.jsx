import React, { useState, useEffect } from 'react'
import DistributionCenterCard from './DistributionCenterCard'
import axios from 'axios';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import FormLocation from './FormLocation'
import '../../scss/components/LocationStock/_DistributionCenters.scss'

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function DistributionCenters() {
    const [centers, setCenters] = useState([])
    const [modified, setModified] = useState(false)
    const [modal, setModal] = useState(false);
    const classes = useStyles();

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

    const handleClose = () => {
        setModal(false);
    };

    const addNewLocation = () => {
        setModal(true)
    }

    return (
        <div className='distributionCentersContainer'>
            <p className='distributionTitle'><b>Centros de Distribución</b></p>
            {
                !centers[0]?.error && centers?.map(center => {
                    return <DistributionCenterCard
                                modified={modify}
                                center={center}     
                                key={center.id}
                            />
                })
            }
            <div className='addLocation' onClick={addNewLocation}>
                <div className='roomAdd'>
                    <AddLocationOutlinedIcon />
                </div>              
                <div className='centerInfo'>
                    <b><p className='addText'>Agregar otro centro de distribución</p></b>
                </div>
            </div>
            <Modal 
                open={modal}
                onClose={handleClose}
                className={classes.modal}
            >
                <div className='modalMapContent'>
                    {<FormLocation/>}
                </div>                
            </Modal>
        </div>
    )
}
