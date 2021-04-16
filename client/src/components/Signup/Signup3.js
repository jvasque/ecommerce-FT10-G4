
import React, { useState} from 'react';
import {useDispatch} from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { postUser } from '../../redux/postUserReducer/postUserActions';
import Swal from 'sweetalert2';

const Signup3 = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    const handleChange = (e) => {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
      };
    const handlesubmit = (e) => {
        e.preventDefault();
       if(user.firstName.length && user.lastName.length){ 
       
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
        });}
      };


  return (
    <div>
      <Formik>
        <Form onSubmit={handlesubmit}>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="Jane" onChange={handleChange} required />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" onChange={handleChange} />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            name="password"
            placeholder="password"
            type="password"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup3;
