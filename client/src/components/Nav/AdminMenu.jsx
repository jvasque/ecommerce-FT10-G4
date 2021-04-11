import "../../scss/components/_AdminMenu.scss"
import {Link} from "react-router-dom"
import {BiLogOut, BiListPlus} from "react-icons/bi"
import {FaProductHunt} from "react-icons/fa"

import React,{useState} from 'react'



export default function AdminMenu() {
    const [colorChange, setColorChange] = useState("")
    return (
        <div className="menu">
            <nav >
                <Link className="test" to="/producto" style={colorChange === "Product" ? {color:"#85da6c"} : {color :""}} 
                onClick={() => setColorChange("Product")}><h2> <FaProductHunt/> Crear Productos</h2></Link>
                
                <Link className="test" to="/categorias" style={colorChange === "Categories" ? {color:"#85da6c"} : {color :""}}
                onClick={() => setColorChange("Categories")}><h2><BiListPlus/> Crear Categorias</h2></Link>

                <Link className="test" style={colorChange === "Exit" ? {color:"#85da6c"} : {color :""}}  to="/salir" 
                onClick={() => setColorChange("Exit")}><h2><BiLogOut/> Cerrar Sesion</h2></Link>
            </nav>
        </div>
    )
}
