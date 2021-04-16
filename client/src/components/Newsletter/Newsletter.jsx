import React, { useState } from "react";
import axios from "axios";

const Newsletter = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [boletinesInformativos, setBoletinesInformativos] = useState(true);
  const [promociones, setPromociones] = useState(true);  
  const [nuevosLanzamientos, setNuevosLanzamientos] = useState(true);  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!boletinesInformativos && !promociones && !nuevosLanzamientos)
    {
        alert("Para suscribirte seleccion al menos un tipo de suscripción");

        return;
    }    

    if (name === "") {
      alert("Digita el nombre");
      return;
    }

    if (email === "") {
      alert("Digita el email");
      return;
    }

    var url = "http://localhost:3001/newsLetter";

    let newsLetter = {
      name: name,
      email: email,
      boletinesInformativos: boletinesInformativos,
      promociones: promociones,
      nuevosLanzamientos: nuevosLanzamientos
    };

    axios
      .post(
        url,
        newsLetter,
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
      .then((res) => {

          alert(res.data.message);
          
          setName("");
          setEmail("");

          setBoletinesInformativos(true);
          setPromociones(true);
          setNuevosLanzamientos(true);
          
      });

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />

        <input
          type="checkbox"
          onChange={(e) => setBoletinesInformativos(!boletinesInformativos)}
          defaultChecked={boletinesInformativos}
        />

        <label>Boletines informativos</label>

        <input
          type="checkbox"
          onChange={(e) => setPromociones(!promociones)}
          defaultChecked={promociones}
        />

        <label>Promociones</label>

        <input
          type="checkbox"
          onChange={(e) => setNuevosLanzamientos(!nuevosLanzamientos)}
          defaultChecked={nuevosLanzamientos}
        />
        <label>Nuevos lanzamientos</label>
        <br />
        <button>Suscribirse</button>
      </form>
    </div>
  );
};

export default Newsletter;
