import "../../scss/components/_AdminMenu.scss"
import {Link} from "react-router-dom"
import {BiLogOut, BiListPlus} from "react-icons/bi"
import {FaProductHunt} from "react-icons/fa"

import React from 'react'

export default function AdminMenu() {
    return (
        <div className="menu">
            <nav >
                <Link className="test" to="/producto"><h2> <FaProductHunt/> Productos</h2></Link>
                <Link className="test"to="/categorias"><h2><BiListPlus/> Categorias</h2></Link>
                <Link className="test" to="/salir"><h2><BiLogOut/> Cerrar Sesion</h2></Link>
            </nav>
        </div>
    )
}
