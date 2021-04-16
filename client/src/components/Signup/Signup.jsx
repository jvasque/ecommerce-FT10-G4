import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGoogle } from "react-icons/fa";
import "../../scss/components/Signup/_Signup.scss";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/postUserReducer/postUserActions";
import Swal from 'sweetalert2'

const Signup = () => {
  const [user, setUser] = React.useState({

    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    phone: "",
    address: "",
    city: "",
  });

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(postUser(user));   
   
    Swal.fire(
      'Listo',
      'El usuario ha sido creado',
      
    )
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      companyName: "",
      phone: "",
      address: "",
      city: "",
    });
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <div className="signup-connect">
          <h1>Create your account</h1>
          <a href="#" className="btn btn-social btn-facebook">
            <FaFacebookF /> Sign in with Facebook
          </a>
          <a href="#" className="btn btn-social btn-twitter">
            <FaTwitter /> Sign in with Twitter
          </a>
          <a href="#" className="btn btn-social btn-google">
            <FaGoogle /> Sign in with Google
          </a>
          <a href="#" className="btn btn-social btn-linkedin">
            <FaLinkedinIn /> Sign in with Linkedin
          </a>
        </div>
        <div className="signup-classic">
          <h2>Or use the classical way</h2>
          <form className="form" onSubmit={handlesubmit}>
            <fieldset className="firstname">
              <input type="text"  name="firstName" autoComplete="off" placeholder="Nombre..." value={user.firstName} onChange={handleChange} />
            </fieldset>
            <fieldset className="lastname">
              <input type="text" name="lastName" placeholder="Apellido..." value={user.lastName} onChange={handleChange}/>
            </fieldset>
            <fieldset className="email">
              <input type="email" name="email" placeholder="Email..." value={user.email} onChange={handleChange}/>
            </fieldset>
            <fieldset className="password">
              <input type="password" name="password" placeholder="Contraseña..." value={user.password} onChange={handleChange}/>
            </fieldset>
            <fieldset className="companyname">
              <input type="text" name="companyName" placeholder="Compañia..." value={user.companyName} onChange={handleChange}/>
            </fieldset>
            <fieldset className="phone">
              <input type="text" name="phone" placeholder="Numero de telefono..." value={user.phone} onChange={handleChange}/>
            </fieldset>
            <fieldset className="address">
              <input type="text" name="address" placeholder="Direccion..." value={user.address} onChange={handleChange}/>
            </fieldset>
            <fieldset className="city">
              <input type="text" name="city" placeholder="Ciudad..." value={user.city} onChange={handleChange}/>
            </fieldset>

            <button type="submit" className="btn">
              Registrate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
