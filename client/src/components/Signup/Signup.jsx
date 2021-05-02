import React, { createRef, useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import "../../scss/components/Signup/_Signup.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  PostSuccess,
  postUser,
  SwalBooC,
} from "../../redux/postUserReducer/postUserActions";
import Swal from "sweetalert2";
import {
  GLogin,
  FLogin,
  LoginAction,
  LogOut,
  postFbUser,
  LogFailHandle,
} from "../../redux/loginReducer/loginActions";
import { useHistory } from "react-router";
import {
  addProduct,
  emptyCart,
  emptyDb,
  totalPrice,
  userLogged,
} from "../../redux/cartReducer/cartActions";
import { modifyCart } from "../../redux/iconReducer/iconActions";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import DoubleAuth from "./DoubleAuth";

export default function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const log = useSelector((state) => state.loginReducer);
  const post = useSelector((state) => state.postUserReducer);

  const responseSuccessGoogle = (response) => {
    try {
      dispatch(GLogin(response));
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "algo ha salido mal!",
        confirmButtonColor: "#378a19",
      });
    }
  };
  const responseRejectGoogle = (response) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "algo ha salido mal!",
      confirmButtonColor: "#378a19",
    });
  };
  const responseFacebook = (response) => {
    console.log(response);
    try {
      dispatch(FLogin(response.accessToken, response.userID));
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "algo ha salido mal!",
        confirmButtonColor: "#378a19",
      });
    }
    // if (!response.status) {

    //   dispatch(
    //     postFbUser({
    //       firstName: response.first_name,
    //       lastName: response.last_name,
    //       email: response.email,
    //       facebookUser: response.id,
    //     })
    //   );
    // } else {
    //   alert('No se pudo loguear a Facebook');
    // }
  };

  ///////

  const products = useSelector((state) => state.catalogReducer.products);
  //Session iniciada D:
  const productCart = useSelector((state) => state.cartReducer.cart);
  const [input, setInput] = useState({
    uname: "",
    psw: "",
  });
  const [errors, setErrors] = useState({});

  function validateLogin(input) {
    let errors = {};
    if (!input.uname) {
      errors.username = "Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(input.uname)) {
      errors.username = "Email no es valido";
    }
    if (!input.psw) {
      errors.password = "Contrseña es requerida";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(input.psw)
    ) {
      errors.password = "Contraseña no es valida";
    }
    return errors;
  }

  const sessionChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateLogin({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const sessionSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginAction(input.uname, input.psw));
  };

  useEffect(() => {
    async function test() {
      if (log.isLogin) {
        const userId = localStorage.getItem("user");
        history.push({
          pathname: "/",
        });
        dispatch(totalPrice());

        const data = await axios.get(
          `http://localhost:3001/cart/${userId}/cart`
        );
        //const products = await axios.get("http://localhost:3001/products");
        const productsId = data.data.map((x) => x.productId);
        const reduxCart = productCart.map((x) => x.id);
        const unicId = productsId.concat(reduxCart);
        let unic = [...new Set(unicId)];
        const cartSaved = products.filter((x) => unic.includes(x.id));

        dispatch(emptyCart());

        for (let i = 0; i < cartSaved.length; i++) {
          dispatch(modifyCart({ [`Cart-${cartSaved[i].id}`]: true }));
          dispatch(addProduct(cartSaved[i]));
        }
      }
    }
    test();
  }, [log.isLogin, dispatch]);

  useEffect(() => {
    if (log.errorLogin) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: log.error,
        confirmButtonColor: "#378a19",
      });
      dispatch(LogFailHandle());
    }
  }, [log.errorLogin]);

  //////// post user && cambio de form
  const [show, setShow] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorsCreate, setErrorsCreate] = useState({});
  function validateCreate(user) {
    let errors = {};
    if (!user.email) {
      errors.username = "Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Email no es valido";
    }
    if (!user.password) {
      errors.password = "Contrseña es requerida";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(user.password)
    ) {
      errors.password = "Debe contener 'a' 'A' '1' !' y largo 8 ";
    }
    if (!user.confirmPassword) {
      errors.confirmPassword = "Contrseña es requerida";
    } else if (user.password !== user.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
  }

  const signUpButton = () => {
    setShow("right-panel-active");
  };
  const signInButton = () => {
    setShow(null);
  };

  const userChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setErrorsCreate(
      validateCreate({
        ...user,
        [e.target.name]: e.target.value,
      })
    );
  };

  const userSubmit = (e) => {
    e.preventDefault();
    if (
      user.firstName.length &&
      user.lastName.length &&
      !errorsCreate.email &&
      !errorsCreate.password &&
      !errorsCreate.confirmPassword
    ) {
      if (user.password === user.confirmPassword) dispatch(postUser(user));
    }
  };

  useEffect(() => {
    if (post.success) {
      Swal.fire({
        title: "Listo, El usuario ha sido creado",
        confirmButtonColor: "#378a19",
      });

      dispatch(PostSuccess());
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [post.success]);

  useEffect(() => {
    if (post.errorMail) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No lo se rick, parece que este mail se encuentra registrado",
        confirmButtonColor: "#378a19",
      });
      dispatch(SwalBooC());
    }
  }, [post.errorMail]);

  return (
    <div className="Signup">
      {!log.isLogin ? (
        <div>
          <div className={`${show}  container`} id="container">
            <div className="form-container sign-up-container">
              <form action="#" onSubmit={userSubmit}>
                <h1>Crea tu cuenta</h1>
                <div className="social-container">
                  {/* <a href="#" className="social">
                  <i className="fab fa-linkedin-in">
                    <FaLinkedinIn />
                  </i>
                </a> */}
                </div>
                <span>o use tu email para registrarte</span>

                <input
                  type="text"
                  name="firstName"
                  autoComplete="off"
                  placeholder="Nombre..."
                  value={user.firstName}
                  onChange={userChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido..."
                  value={user.lastName}
                  onChange={userChange}
                  required
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email..."
                  value={user.email}
                  onChange={userChange}
                  className={`${errorsCreate.email && "danger"}`}
                />
                {errorsCreate.email && (
                  <p className="danger">{errorsCreate.email}</p>
                )}
                <input
                  type="password"
                  name="password"
                  placeholder="contraseña"
                  value={user.password}
                  onChange={userChange}
                  className={`${errorsCreate.password && "danger"}`}
                />
                {errorsCreate.password && (
                  <p className="danger">{errorsCreate.password}</p>
                )}
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirme contraseña..."
                  value={user.confirmPassword}
                  onChange={userChange}
                  className={`${errorsCreate.confirmPassword && "danger"}`}
                />
                {errorsCreate.confirmPassword && (
                  <p className="danger">{errorsCreate.confirmPassword}</p>
                )}
                <button type="submit">Registrarse</button>
              </form>
            </div>

            <div className="form-container sign-in-container">
              <div className="social-container">
                <GoogleLogin
                  clientId="926134963488-27qle0uk3423ed3dt2jlkd20rtht66g6.apps.googleusercontent.com"
                  autoLoad={false}
                  type="button"
                  icon={true}
                  buttonText="Google"
                  loginHint="Hola"
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseRejectGoogle}
                  cookiePolicy={"single_host_origin"}
                  className="google-login-button"
                />
                <FacebookLogin
                  appId="311325910426887"
                  autoLoad={false}
                  fields="name,email,picture,first_name,last_name"
                  textButton="Facebook"
                  // onClick={componentClicked}
                  cssClass="facebook-login-button"
                  // icon="fa-facebook"
                  icon={<TiSocialFacebookCircular />}
                  callback={responseFacebook}
                />
              </div>

              <form id="loginFrame" action="#" onSubmit={sessionSubmit}>
                <h1>Inicia Sesion</h1>

                <span>o usa tu cuenta</span>
                <input
                  className={`${errors.username && "danger"}`}
                  type="text"
                  value={input.uname}
                  name="uname"
                  onChange={sessionChange}
                  placeholder="Email"
                />
                {input.uname.length < 8 ||
                  (errors.username && (
                    <p className="danger">{errors.username}</p>
                  ))}
                <input
                  className={`${
                    input.psw.length < 8 || (errors.password && "danger")
                  }`}
                  type="password"
                  value={input.psw}
                  name="psw"
                  onChange={sessionChange}
                  placeholder="Contraseña"
                  required
                />
                {input.psw.length < 8 ||
                  (errors.password && (
                    <p className="danger">{errors.password}</p>
                  ))}
                <Link to="/forgot/email">olvidaste tu clave?</Link>

                <button type="submit">INICIA SESION</button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Bienvenido!</h1>
                  <p>Ya tenes una cuenta? Ingresa tu email y contraseña...</p>
                  <button className="ghost" id="signIn" onClick={signInButton}>
                    Iniciar sesion
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Sembremos futuro, juntos!</h1>
                  <p>
                    Para seguir conectado con nosotros por favor ingresa tu
                    informacion personal!
                  </p>
                  <button className="ghost" id="signUp" onClick={signUpButton}>
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="doble">{log.isDoubleAuth ? <DoubleAuth /> : ""}</div>
        </div>
      ) : (
        <button onClick={() => dispatch(LogOut())}>Salir</button>
      )}
    </div>
  );
}
