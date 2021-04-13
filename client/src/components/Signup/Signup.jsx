import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGoogle } from "react-icons/fa";
import "../../scss/components/_Signup.scss";


const Signup = () => {
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
          <FaGoogle/> Sign in with Google
        </a>
        <a href="#" className="btn btn-social btn-linkedin">
          <FaLinkedinIn /> Sign in with Linkedin
        </a>
      </div>
      <div className="signup-classic">
        <h2>Or use the classical way</h2>
        <form className="form">

          <fieldset className="firstname">
            <input type="text" placeholder="Nombre..." />
          </fieldset>
          <fieldset className="lastname">
            <input type="text" placeholder="Apellido..." />
          </fieldset>
          <fieldset className="email">
            <input type="email" placeholder="Email..." />
          </fieldset>
          <fieldset className="password">
            <input type="password" placeholder="Contraseña..." />
          </fieldset>          
          <fieldset className="companyName">
            <input type="companyName" placeholder="Compañia..." />
          </fieldset>
          <fieldset className="phone">
            <input type="phone" placeholder="Numero de telefono..." />
          </fieldset>
          <fieldset className="address">
            <input type="address" placeholder="Direccion..." />
          </fieldset>
          <fieldset className="city">
            <input type="city" placeholder="Ciudad..." />
          </fieldset>

          <button type="submit" className="btn">
            sign up
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};


export default Signup;