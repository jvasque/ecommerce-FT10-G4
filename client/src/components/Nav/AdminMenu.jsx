import "../../scss/components/_AdminMenu.scss"
import {Link} from "react-router-dom"
import {BiLogOut, BiListPlus, BiBorderAll} from "react-icons/bi"
import {FaProductHunt} from "react-icons/fa"

import React,{useState} from 'react'

export default function AdminMenu() {
    const [colorChange, setColorChange] = useState("")

    return (
        <div className="adminMenu">
            <ul>
                <li>
                    <Link className="test" to="/admin/product/form" style={colorChange === "Product" ? {color:"rgba(243, 208, 11, 0.87)"} : {color :""}} 
                    onClick={() => setColorChange("Product")}><FaProductHunt/></Link>
                </li>
                <li>
                    <Link className="test" to="/admin/categories" style={colorChange === "Categories" ? {color:"rgba(243, 208, 11, 0.87)"} : {color :""}}
                    onClick={() => setColorChange("Categories")}><BiListPlus/></Link>
                </li>
                <li>
                    <Link className="test" style={colorChange === "Exit" ? {color:"rgba(243, 208, 11, 0.87)"} : {color :""}}  to="/salir" 
                    onClick={() => setColorChange("Exit")}><BiLogOut/></Link>
                </li>
            </ul>
        </div>
    )
}