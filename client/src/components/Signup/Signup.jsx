import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaGoogle } from 'react-icons/fa';
import '../../scss/components/Signup/_Signup.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  PostSuccess,
  postUser,
  SwalBooC,
} from '../../redux/postUserReducer/postUserActions';
import Swal from 'sweetalert2';
import {
  LoginAction,
  LogOut,
  SwalBoo,
} from '../../redux/loginReducer/loginActions';
import { useHistory } from 'react-router';
import { totalPrice, userLogged } from '../../redux/cartReducer/cartActions';
import { modifyCart } from '../../redux/iconReducer/iconActions';
import axios from 'axios';

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const log = useSelector((state) => state.loginReducer);
  const post = useSelector((state) => state.postUserReducer);

  //Session iniciada D:
  const productCart = useSelector((state) => state.cartReducer.cart);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const sessionChange = (e) => {
    return e.target.name === 'uname'
      ? setUsername(e.target.value)
      : e.target.name === 'psw'
      ? setPassword(e.target.value)
      : () => {};
  };
  const sessionSubmit = async (e) => {
    e.preventDefault();
    if (username.length > 5) {
      dispatch(LoginAction(username, password));
    }
  };

  useEffect(() => {
    async function test() {
      if (log.isLogin) {
        const userId = localStorage.getItem('user');

        history.push({
          pathname: '/',
        });
        dispatch(totalPrice());

        const data = await axios.get(
          `http://localhost:3001/cart/${userId}/cart`
        );
        const products = await axios.get('http://localhost:3001/products');
        const productsId = data.data.map((x) => x.productId);
        const cartSaved = products.data.filter((x) =>
          productsId.includes(x.id)
        );
        dispatch(userLogged(cartSaved));

        for (let i = 0; i < cartSaved.length; i++) {
          dispatch(modifyCart({ [`Cart-${cartSaved[i].id}`]: true }));
        }
      }
    }
    test();
  }, [log.isLogin, dispatch]);

  useEffect(() => {
    if (log.errorLogin) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No voy a mentirte marge, tus datos estan mal',
        confirmButtonColor: '#378a19',
      });
      dispatch(SwalBoo());
    }
  }, [log.errorLogin]);

  //////// post user && cambio de form
  const [show, setShow] = useState(null);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const signUpButton = () => {
    setShow('right-panel-active');
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
    }
  };

  useEffect(() => {
    if (post.success) {
      Swal.fire({
        title: 'Listo, El usuario ha sido creado',
        confirmButtonColor: '#378a19',
      });
      dispatch(PostSuccess());
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    }
  }, [post.success]);

  useEffect(() => {
    if (post.errorMail) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No lo se rick, parece que este mail se encuentra registrado',
        confirmButtonColor: '#378a19',
      });
      dispatch(SwalBooC());
    }
  }, [post.errorMail]);

  return (
    <div className="Signup">
      {!log.isLogin ? (
        <div className={`${show}  container`} id="container">
          <div className="form-container sign-up-container">
            <form action="#" onSubmit={handlesubmit}>
              <h1>Crea tu cuenta</h1>
              {/* <div className="social-container">
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
              <span>o use tu email para registrarte</span> */}

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
              <h1>Inicia Sesion</h1>
              {/* <div className="social-container">
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
              </div> */}
              {/* <span>o usa tu cuenta</span> */}
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
              {/* <a href="#">olvidaste tu clave?</a> */}
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
      ) : (
        <button onClick={() => dispatch(LogOut())}>Salir</button>
      )}
    </div>
  );
};

export default Signup;
