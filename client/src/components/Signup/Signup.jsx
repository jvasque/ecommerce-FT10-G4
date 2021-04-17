import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGoogle } from 'react-icons/fa';
import '../../scss/components/Signup/_Signup.scss';
import { useDispatch } from 'react-redux';
import { postUser } from '../../redux/postUserReducer/postUserActions';

const Signup = () => {
  const [user, setUser] = React.useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    phone: '',
    address: '',
    city: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(postUser(user));
    setUser({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      companyName: '',
      phone: '',
      address: '',
      city: '',
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
              <input
                type="text"
                name="firstName"
                placeholder="Nombre..."
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="lastname">
              <input
                type="text"
                name="lastName"
                placeholder="Apellido..."
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="email">
              <input
                type="email"
                name="email"
                placeholder="Email..."
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="password">
              <input
                type="password"
                name="password"
                placeholder="Contraseña..."
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="companyname">
              <input
                type="text"
                name="companyName"
                placeholder="Compañia..."
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="phone">
              <input
                type="text"
                name="phone"
                placeholder="Numero de telefono..."
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="address">
              <input
                type="text"
                name="address"
                placeholder="Direccion..."
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="city">
              <input
                type="text"
                name="city"
                placeholder="Ciudad..."
                onChange={handleChange}
              />
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
