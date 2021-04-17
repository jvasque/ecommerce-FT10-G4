import "../../scss/components/Nav/_AdminMenu.scss"
import {Link} from "react-router-dom"
import {BiLogOut, BiListPlus} from "react-icons/bi"
import {FaProductHunt} from "react-icons/fa"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import React,{useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../../redux/loginReducer/loginActions";

export default function AdminMenu() {
    const [colorChange, setColorChange] = useState("")
    const dispatch = useDispatch()
    const log = useSelector(state => state.loginReducer)
   
    const handleLog = () => {
        setColorChange("Exit")
        if(log.isLogin) {
            dispatch(LogOut());
            alert("deslogeado")
        }
        
    }
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
                    <Link className="test" style={colorChange === "Exit" ? {color:"rgba(243, 208, 11, 0.87)"} : {color :""}}  to={log.isLogin?"/":'/user/login'} 
                    onClick={handleLog}><BiLogOut/></Link>
        
                </li>
                <li>
                   
                <Link className="test" to="/product/cart"><ShoppingCartIcon/></Link>
        
                </li>
            </ul>
        </div>
    )
}
