import React, { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import "../../scss/components/Signup/_Signup.scss";
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../../redux/postUserReducer/postUserActions";
import Swal from "sweetalert2";
import { LoginAction, LogOut, SwalBoo } from "../../redux/loginReducer/loginActions";
import { useHistory } from "react-router";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  //Session iniciada D:

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]=useState(false)
  const log = useSelector((state) => state.loginReducer);
  const sessionChange = (e) => {
    return e.target.name === "uname"
      ? setUsername(e.target.value)
      : e.target.name === "psw"
      ? setPassword(e.target.value)
      : () => {};
  };
  const sessionSubmit = async (e) => {
    e.preventDefault();

    if (username.length > 5) {
   dispatch(LoginAction(username, password));
   
 
  }};

  useEffect(() => {
    if(log.isLogin){
      history.push({
        pathname: "/",
      });}
     
  }, [log.isLogin])


  useEffect(() => {
    if(log.errorLogin){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No voy a mentirte marge, tus datos estan mal',
        confirmButtonColor: "#378a19",
      })
    dispatch(SwalBoo())}
    
  }, [log.errorLogin])


  ////////

  const signUpButton = () => {
    setShow("right-panel-active");
  };
  const signInButton = () => {
    setShow(null);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (
      user.firstName.length &&
      user.lastName.length &&
      user.email.length &&
      user.password.length
    ) {
      dispatch(postUser(user));

      Swal.fire({
        title: "Listo, El usuario ha sido creado",
        confirmButtonColor: "#378a19",
      });
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="Signup">
      {!log.isLogin ? (
        <div className={`${show}  container`} id="container">
          <div className="form-container sign-up-container">
            <form action="#" onSubmit={handlesubmit}>
              <h1>Crear una cuenta</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f">
                    <FaFacebookF />
                  </i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g">
                    {" "}
                    <FaGoogle />
                  </i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in">
                    <FaLinkedinIn />
                  </i>
                </a>
              </div>
              <span>o usa un email para registrarte</span>

              <input
                type="text"
                name="firstName"
                autoComplete="off"
                placeholder="Nombre..."
                value={user.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Apellido..."
                value={user.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email..."
                value={user.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña..."
                value={user.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Registrarse</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#" onSubmit={sessionSubmit}>
              <h1>Iniciar sesion</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f">
                    <FaFacebookF />
                  </i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g">
                    <FaGoogle />
                  </i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in">
                    <FaLinkedinIn />
                  </i>
                </a>
              </div>
              <span>o usa tu cuenta</span>
              <input
                type="email"
                value={username}
                name="uname"
                onChange={sessionChange}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                name="psw"
                onChange={sessionChange}
                placeholder="Contraseña"
              />
              <a href="#">Olvidaste la contraseña?</a>
              <button type="submit">Iniciar sesion</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Bienvenido!</h1>
                <p>
                  Ya tenes una cuenta? Ingresa tu email y contraseña...
                </p>
                <button className="ghost" id="signIn" onClick={signInButton} >
                  Iniciar sesion
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Sembremos futuro, juntos!</h1>
                <p>Para seguir conectado con nosotros por favor ingresa tu informacion personal!</p>
                <button className="ghost" id="signUp" onClick={signUpButton}>
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => dispatch(LogOut())}>Salir</button>
      )}
    </div>
  );
};

export default Signup;
