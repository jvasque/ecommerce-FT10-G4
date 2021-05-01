import { Button, FormGroup, TextField } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import "../../scss/components/SettingsUser/_Settings.scss"
import {useSelector, useDispatch} from "react-redux"
import Swal from 'sweetalert2'
import axios from "axios"
import { useHistory } from 'react-router'

function Settings() {

    const user = useSelector(state => state.loginReducer.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const userId = localStorage.getItem("user")
    const [newUser, setNewUser] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        phone:  user.phone,
        city: user.city,
        capital: user.capital,
        street: user.street,
        number: user.number
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
        city: newUser.city,
        capital: newUser.capital,
        street: newUser.street,
        number: newUser.number

       })
       console.log(newUser);
     
      dispatch({type:"CHANGEUSER", payload: newUser})
       await Swal.fire({
          icon: 'success',
          title: 'Tus cambios han sido guardados',
          showConfirmButton: false,
          timer: 1500
        })    
        //const user = await axios.get(`http://localhost:3001/users/user/${userId}`)
        

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
                <TextField id ="2" name="phone" type="number" onChange={(e) => handleChange(e)} value={newUser.phone}  defaultValue={user.phone}></TextField>
                </div>
            <h2>Domicilio</h2>
                <div>
                <label id="2">Provincia</label>
                <TextField id ="3" name="city" onChange={(e) => handleChange(e)} value={newUser.city} defaultValue={user.city}></TextField>
                </div>
                <div>
                <label id="2">Localidad</label>
                <TextField id ="4" name="capital" onChange={(e) => handleChange(e)} value={newUser.capital} defaultValue={user.capital}></TextField>
                </div>
                <div>
                <label id="2">Calle</label>
                <TextField id ="5" name="street" onChange={(e) => handleChange(e)} value={newUser.street} defaultValue={user.street}></TextField>
                </div>
                <div>
                <label id="2">Número</label>
                <TextField type="number" id ="2" name="number" onChange={(e) => handleChange(e)} value={newUser.number} defaultValue={user.number}></TextField>
                </div>
                
               <Button className="pass-bu" onClick={changePass}>Cambiar contraseña</Button>
             
         <Button className="save" onClick={handleSubmit}>Guardar Cambios</Button>
         </div>
            </FormGroup> 
        </div>
    )
}

export default Settings
