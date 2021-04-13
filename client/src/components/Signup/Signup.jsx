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
          <fieldset className="username">
            <input type="text" placeholder="username" />
          </fieldset>
          <fieldset className="email">
            <input type="email" placeholder="email" />
          </fieldset>
          <fieldset className="password">
            <input type="password" placeholder="password" />
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