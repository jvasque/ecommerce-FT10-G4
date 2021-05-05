import axios from "axios";
import React, { useEffect, useState } from "react";

import "../../scss/components/Admin/_AdminNewsletter.scss";

const AdminNewsletter = () => {
  const [email, setEmail] = useState({
    __html: "",
  });
  const [show, setShow] = useState(false);
  // /getEmail
  const getEmail = async () => {
    const email = await axios.get(`http://localhost:3001/newsletter/historial`);
    console.log(email.data)
    setEmail({ __html: email.data[0].html });
    setShow(true);
  };
  useEffect(() => {
    getEmail();
    console.log(email);
  }, []);
  return (
    <div className="container-adminNewsletter">
      <h2>Template Email</h2>
      {show ? <div dangerouslySetInnerHTML={email} /> : ""}
    </div>
  );
};

export default AdminNewsletter;
