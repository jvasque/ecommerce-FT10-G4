import { Button, FormGroup, TextField } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import "../../scss/components/SettingsUser/_Settings.scss"
import {useSelector} from "react-redux"
import Swal from 'sweetalert2'
import axios from "axios"
import { useHistory } from 'react-router'

function Settings({userDb, setUserDb}) {

    const user = useSelector(state => state.loginReducer.user)
    const history = useHistory()

    const userId = localStorage.getItem("user")
    const [newUser, setNewUser] = useState({
        firstName: userDb.firstName,
        lastName: userDb.lastName,
        phone:  userDb.phone,
        direction: userDb.address
    })
    

    const handleChange = (e) => {
        e.preventDefault()
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    } 
    const handleSubmit = async () => {
       axios.put(`http://localhost:3001/users/update/${userId}`, {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        address: newUser.direction
       })
      
       await Swal.fire({
          icon: 'success',
          title: 'Tus cambios han sido guardados',
          showConfirmButton: false,
          timer: 1500
        })    
        const user = await axios.get(`http://localhost:3001/users/user/${userId}`)
        setUserDb(user.data)

    }
     
  const changePass = () => {
      history.push({
          pathname: "/forgot/email"
      })
  }
   

    return (
        <div className="settings-container">
           <FormGroup>
               <h1>Mis datos</h1>
             <h2>Datos de cuenta</h2>
            <TextField className="user"  label={user.email} disabled></TextField>   
            
         <div className="info-container">
            <h2>Datos personales</h2>
                <div>
                <label for="0">Nombre</label>
                <TextField id ="0" name="firstName" onChange={(e) => handleChange(e)} value={newUser.firstName} defaultValue={user.firstName}></TextField>
                </div>
                <div>
                <label for="1">Apellido</label>
                <TextField id ="1" name="lastName" onChange={(e) => handleChange(e)} value={newUser.lastName} defaultValue={user.lastName}></TextField>
                </div>
                <div>
                <label id="2">Telefono</label>
                <TextField id ="2" name="phone" type="number" onChange={(e) => handleChange(e)} value={newUser.phone}  defaultValue={userDb.phone}></TextField>
                </div>
            <h2>Domicilio</h2>
                <div>
                <label id="2">Dirección</label>
                <TextField id ="2" name="direction" onChange={(e) => handleChange(e)} value={newUser.direction} defaultValue={userDb.address} placeholder="Gustavo"></TextField>
                </div>
                
               <Button className="pass-bu" onClick={changePass}>Cambiar contraseña</Button>
             
         <Button className="save" onClick={handleSubmit}>Guardar Cambios</Button>
         </div>
            </FormGroup> 
        </div>
    )
}

export default Settings
